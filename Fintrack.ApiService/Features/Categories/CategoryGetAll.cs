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

public sealed class CategoryGetAll
{

    public record Query(Guid UserId, string? Name, CategoryTypeEnum? Type) : IQuery<IEnumerable<CategoryDto>>;
    public record CategoryDto(Guid Id, string Name, string Description, CategoryTypeEnum Type, CategoryId? ParentId = null);

    public class QueryHandler(ApplicationContext applicationContext) : IQueryHandler<Query, IEnumerable<CategoryDto>>
    {
        public async Task<Result<IEnumerable<CategoryDto>>> Handle(Query request, CancellationToken cancellationToken)
        {

            var query = applicationContext.Categories
            .AsNoTracking()
            .Where(c => c.UserId == UserId.From(request.UserId));

            if (!string.IsNullOrWhiteSpace(request.Name))
            {
                query = query.Where(c => c.Name.ToLower().Contains(request.Name.ToLower()));
            }

            if (request.Type.HasValue)
            {
                query = query.Where(c => c.Type == request.Type.Value);
            }

            var categories = await query
                .AsNoTracking()
                .Where(c => c.UserId == UserId.From(request.UserId))
                .Select(c => new CategoryDto(c.Id.Value, c.Name, c.Description, c.Type, c.ParentId))
                .ToListAsync(cancellationToken);


            return categories;
        }
    }

    public class CategoryGetAllEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/categories", async (ISender sender, HttpContext context) =>
            {
                var userIdQueryParam = context.Request.Query["userId"].FirstOrDefault();
                var name = context.Request.Query["name"].FirstOrDefault();
                var typeString = context.Request.Query["type"].FirstOrDefault();

                 Guid userId;


                if (string.IsNullOrEmpty(userIdQueryParam))
                {
                    if (!Guid.TryParse(context.User.Identity?.Name, out userId))
                    {
                        throw new UnauthorizedAccessException("User ID not found in the token.");
                    }
                }
                else
                {
                    userId = Guid.Parse(userIdQueryParam);
                }


                CategoryTypeEnum? type = null;
                if (!string.IsNullOrEmpty(typeString) && Enum.TryParse<CategoryTypeEnum>(typeString, true, out var parsedType))
                {
                    type = parsedType;
                }

                var result = await sender.Send(new Query(userId, name, type));
                return result.ToActionResult(response => Results.Ok(response));

            })
            .WithName("GetAllCategories")
            .Produces<IEnumerable<CategoryDto>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status500InternalServerError);
            ;
        }
    }

}
