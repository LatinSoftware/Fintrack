using Carter;
using Fintrack.ApiService.Domain.Common.Enums;
using Fintrack.ApiService.Domain.Entities;
using Fintrack.ApiService.Domain.ValueObjects;
using Fintrack.ApiService.Infrastructure.Data;
using Fintrack.ApiService.Shared.Abstractions;
using Fintrack.ApiService.Shared.Extensions;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Fintrack.ApiService.Features.Accounts;

public class AccountCreate
{
    public record Response(Guid Id, string Name, string Description, AccountType Type, Money Balance);
    public record Request(string Name, string Description, AccountType Type, Money Balance, Guid UserId) : ICommand<Response>;

    public sealed class AccountCreateHandler(ApplicationContext applicationContext) : IRequestHandler<Request, Result<Response>>
    {
        public async Task<Result<Response>> Handle(Request request, CancellationToken cancellationToken)
        {
            if (request.UserId != Guid.Empty)
            {
                var existUser = await applicationContext.Users.AnyAsync(c => c.Id == UserId.From(request.UserId), cancellationToken: cancellationToken);
                if (!existUser)
                    return Result.Fail(AccountErrors.UserNotFound(request.UserId));
            }

            // if (request.Balance.Amount < 0)
            // {
            //     return Result.Fail(AccountErrors)
            // }

            var account = Account.Create(request.Name, request.Description, request.Type, request.Balance, UserId.From(request.UserId));
            applicationContext.Accounts.Add(account);
            await applicationContext.SaveChangesAsync(cancellationToken);

            return Result.Ok(new Response(account.Id.Value, account.Name, account.Description, account.Type, account.Balance));
        }
    }

    public sealed class Endpoints : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/accounts", async (Request request, ISender sender, HttpContext ctx) =>
            {
                var result = await sender.Send(request);

                return result.ToActionResult(
                    response => Results.Created($"/accounts/{response.Id}", response));

            })
            .WithName("AccountCreate")
            .Produces<Response>(StatusCodes.Status201Created)
            .Produces(StatusCodes.Status400BadRequest);
        }
    }
}