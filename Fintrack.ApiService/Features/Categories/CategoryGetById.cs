using Carter;
using Fintrack.ApiService.Domain.Common.Enums;
using Fintrack.ApiService.Domain.ValueObjects;
using Fintrack.ApiService.Infrastructure.Data;
using Fintrack.ApiService.Shared.Abstractions;
using Fintrack.ApiService.Shared.Extensions;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Fintrack.ApiService.Features.Categories;

public sealed class CategoryGetById
{
    public record Request(UserId UserId, CategoryId Id, bool IncludeChildren) : IQuery<Response>;
    public record Response(Guid Id, string Name, string Description, CategoryTypeEnum Type, List<Child>? Children = null)
    {
        public bool HasChildren => Children?.Count > 0;
    }
    public record Child(Guid Id, string Name, string Description, CategoryTypeEnum Type);

    public record CategoryGetByIdHandler(ApplicationContext ApplicationContext) : IQueryHandler<Request, Response>
    {
        public async Task<Result<Response>> Handle(Request request, CancellationToken cancellationToken)
        {
            var query = ApplicationContext.Categories
                .AsNoTracking()
                .Where(x => x.UserId == request.UserId && x.Id == request.Id);

            if (request.IncludeChildren)
            {
                query = query.Include(x => x.Children);
            }

            var category = await query.Select(x => new Response(
                    x.Id.Value,
                    x.Name,
                    x.Description,
                    x.Type,
                    request.IncludeChildren ? x.Children.Select(c => new Child(c.Id.Value, c.Name, c.Description, c.Type)).ToList() : null
                )).FirstOrDefaultAsync(cancellationToken);


            return category is null
                ? Result.Fail<Response>(CategoryErrors.CategoryNotFound(request.Id.Value))
                : Result.Ok(category);

        }
    }

    public class CategoryGetByIdEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/categories/{id}", async (ISender sender, HttpContext context, Guid id) =>
            {
                var userId = context.GetUserId(context.Request.Query["userId"].FirstOrDefault());
                var includeChildren = context.Request.Query["includeChildren"].FirstOrDefault() == "true";

                var result = await sender.Send(new Request(userId, CategoryId.From(id), includeChildren), context.RequestAborted);

                return result.ToActionResult(data => Results.Ok(data));
            });
        }
    }

}
