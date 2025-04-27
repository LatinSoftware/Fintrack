using System;
using System.Text.Json.Serialization;
using Carter;
using Fintrack.ApiService.Domain.ValueObjects;
using Fintrack.ApiService.Infrastructure.Data;
using Fintrack.ApiService.Shared.Abstractions;
using Fintrack.ApiService.Shared.Extensions;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Fintrack.ApiService.Features.Categories;

public sealed class CategoryDelete
{
    public record Request(CategoryId Id) : ICommand
    {
        [JsonIgnore]
        public UserId UserId { get; set; }
    }

    public class CategoryDeleteHandler(ApplicationContext applicationContext) : ICommandHandler<Request>
    {
        public async Task<Result> Handle(Request request, CancellationToken cancellationToken)
        {
            var category = await applicationContext.Categories
                .FirstOrDefaultAsync(x => x.UserId == request.UserId && x.Id == request.Id, cancellationToken);

            if (category is null)
            {
                return Result.Fail(CategoryErrors.CategoryNotFound(request.Id.Value));
            }

            applicationContext.Categories.Remove(category);

            await applicationContext.SaveChangesAsync(cancellationToken);

            return Result.Ok();
        }
    }

    public class CategoryDeleteEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapDelete("/categories/{id}", async (ISender sender, HttpContext context, Guid id) =>
            {
                var userId = context.GetUserId(context.Request.Query["userId"].FirstOrDefault());

                var result = await sender.Send(new Request(CategoryId.From(id)) { UserId = userId }, context.RequestAborted);

                return result.ToActionResult(() => Results.NoContent());
            });
        }
    }
}

