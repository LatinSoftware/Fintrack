using Carter;
using Fintrack.ApiService.Domain.Common.Enums;
using Fintrack.ApiService.Domain.ValueObjects;
using Fintrack.ApiService.Infrastructure.Data;
using Fintrack.ApiService.Shared.Abstractions;
using Fintrack.ApiService.Shared.Extensions;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Fintrack.ApiService.Features.Accounts;

public sealed class AccountGetById
{
    public record Request(UserId UserId, AccountId Id) : IQuery<Response>;
    public record Response(Guid Id, string Name, string Description, AccountType Type, Money Balance);

    public class AccountGetByIdHanlder(ApplicationContext ApplicationContext) : IQueryHandler<Request, Response>
    {
        public async Task<Result<Response>> Handle(Request request, CancellationToken cancellationToken)
        {
            var query = ApplicationContext.Accounts
                .AsNoTracking()
                .Where(x => x.UserId == request.UserId && x.Id == request.Id);

            var account = await query.Select(x => new Response(
                    x.Id.Value,
                    x.Name,
                    x.Description,
                    x.Type,
                    x.Balance
                )).FirstOrDefaultAsync(cancellationToken);

            return account is null
                ? Result.Fail<Response>(AccountErrors.AccountNotFound(request.Id.Value))
                : Result.Ok(account);
        }
    }

    public class AccountGetByIdEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/accounts/{id}", async (ISender sender, HttpContext context, Guid id) =>
            {
                var userId = context.GetUserId(context.Request.Query["userId"].FirstOrDefault());

                var result = await sender.Send(new Request(userId, AccountId.From(id)), context.RequestAborted);

                return result.ToActionResult(data => Results.Ok(data));
            });
        }
    }
}