using System.Text.Json.Serialization;
using Carter;
using Fintrack.ApiService.Domain.ValueObjects;
using Fintrack.ApiService.Infrastructure.Data;
using Fintrack.ApiService.Shared.Abstractions;
using Fintrack.ApiService.Shared.Extensions;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Fintrack.ApiService.Features.Accounts;

public sealed class AccountDelete
{
    public record Request(AccountId Id) : ICommand
    {
        [JsonIgnore]
        public UserId UserId { get; set; }
    }

    public class AccountDeleteHandler(ApplicationContext applicationContext) : ICommandHandler<Request>
    {
        public async Task<Result> Handle(Request request, CancellationToken cancellationToken)
        {
            var account = await applicationContext.Accounts
                .FirstOrDefaultAsync(x => x.UserId == request.UserId && x.Id == request.Id, cancellationToken);

            if (account is null)
            {
                return Result.Fail(AccountErrors.AccountNotFound(request.Id.Value));
            }

            applicationContext.Accounts.Remove(account);

            await applicationContext.SaveChangesAsync(cancellationToken);

            return Result.Ok();
        }
    }

    public class CategoryDeleteEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapDelete("/accounts/{id}", async (ISender sender, HttpContext context, Guid id) =>
            {
                var userId = context.GetUserId(context.Request.Query["userId"].FirstOrDefault());

                var result = await sender.Send(new Request(AccountId.From(id)) { UserId = userId }, context.RequestAborted);

                return result.ToActionResult(() => Results.NoContent());
            });
        }
    }
}