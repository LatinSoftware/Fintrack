using Carter;
using Fintrack.ApiService.Domain.Common.Enums;
using Fintrack.ApiService.Domain.Entities;
using Fintrack.ApiService.Domain.ValueObjects;
using Fintrack.ApiService.Infrastructure.Data;
using Fintrack.ApiService.Shared.Abstractions;
using Fintrack.ApiService.Shared.Extensions;
using FluentResults;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Fintrack.ApiService.Features.Categories;

public class CategoryCreate
{
    public record Response(Guid Id, string Name, string Description, CategoryTypeEnum Type);
    public record Request(string Name, string Description, CategoryTypeEnum Type, Guid UserId, Guid? ParentId = null) : ICommand<Response>;

    public class Validator : AbstractValidator<Request>
    {
        public Validator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage("Name is required.");
            RuleFor(x => x.Description).NotEmpty().WithMessage("Description is required.");
            RuleFor(x => x.Type).IsInEnum().WithMessage("Invalid category type.");
            RuleFor(x => x.UserId).NotEmpty().WithMessage("User ID is required.");
        }
    }

    public sealed class CreateCategoryHandler(ApplicationContext applicationContext) : IRequestHandler<Request, Result<Response>>
    {
        public async Task<Result<Response>> Handle(Request request, CancellationToken cancellationToken)
        {
             if(request.ParentId.HasValue)
            {
                var existParent = await applicationContext.Categories.AnyAsync(c => c.Id == CategoryId.From(request.ParentId.Value), cancellationToken: cancellationToken);
                if (!existParent)
                    return Result.Fail(CategoryErrors.ParentCategoryNotFound(request.ParentId.Value));
            }

            var category = Category.Create(request.Name, request.Description, request.Type, UserId.From(request.UserId), request.ParentId.HasValue ? CategoryId.From(request.ParentId.Value) : null);
            applicationContext.Categories.Add(category);
            await applicationContext.SaveChangesAsync(cancellationToken);

            return Result.Ok(new Response(category.Id.Value, category.Name, category.Description, category.Type));
        }
    }



    public sealed class Endpoints : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/categories", async (Request request, ISender sender, HttpContext ctx) =>
            {
                var result = await sender.Send(request);
                
                return result.ToActionResult(
                    response => Results.Created($"/categories/{response.Id}", response));

            })
            .WithName("CreateCategory")
            .Produces<Response>(StatusCodes.Status201Created)
            .Produces(StatusCodes.Status400BadRequest);
        }
    }
}
