using System;
using System.Text.Json.Serialization;
using Carter;
using Fintrack.ApiService.Domain.Common.Enums;
using Fintrack.ApiService.Domain.ValueObjects;
using Fintrack.ApiService.Infrastructure.Data;
using Fintrack.ApiService.Shared.Abstractions;
using Fintrack.ApiService.Shared.Extensions;
using FluentResults;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Fintrack.ApiService.Features.Categories;

public sealed class CategoryUpdate
{
    public record Request(string? Name, string? Description, CategoryTypeEnum? Type, Guid? ParentId) : ICommand
    {
        [JsonIgnore]
        public UserId UserId { get; set; }
        [JsonIgnore]
        public CategoryId Id { get; set; }
    }

    public sealed class Validator : AbstractValidator<Request>
    {
        public Validator()
        {
            RuleFor(x => x.Name)
                .MaximumLength(100)
                .When(x => !string.IsNullOrEmpty(x.Name))
                .MinimumLength(3);
            RuleFor(x => x.Description).MaximumLength(500).When(x => !string.IsNullOrEmpty(x.Description));
            RuleFor(x => x.Type).IsInEnum()
                .When(x => x.Type.HasValue);
        }
    }


    public class CategoryUpdateHandler(ApplicationContext applicationContext) : ICommandHandler<Request>
    {

        async Task<Result> IRequestHandler<Request, Result>.Handle(Request request, CancellationToken cancellationToken)
        {
            var category = await applicationContext.Categories
                .FirstOrDefaultAsync(x => x.UserId == request.UserId && x.Id == request.Id, cancellationToken);

            if (category is null)
            {
                return Result.Fail(CategoryErrors.CategoryNotFound(request.Id.Value));
            }

            if (request.ParentId.HasValue)
            {
                var parentCategory = await applicationContext.Categories
                    .FirstOrDefaultAsync(x => x.UserId == request.UserId && x.Id == CategoryId.From(request.ParentId.Value), cancellationToken);

                if (parentCategory is null)
                {
                    return Result.Fail(CategoryErrors.ParentCategoryNotFound(request.ParentId.Value));
                }

                category.SetParent(parentCategory);
            }

            category.Update(request.Name, request.Description, request.Type);

            await applicationContext.SaveChangesAsync(cancellationToken);

            return Result.Ok();
        }
    }

    public class CategoryUpdateEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPut("/categories/{id}", async (ISender sender, HttpContext context, Guid id, Request request) =>
            {
                request.UserId = context.GetUserId(context.Request.Query["userId"].FirstOrDefault());
                request.Id = CategoryId.From(id);

                var result = await sender.Send(request, context.RequestAborted);

                return result.ToActionResult(() => Results.NoContent());
            });
        }
    }
}
