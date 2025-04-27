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

public sealed class AccountGetAll
{
    public record Query(Guid UserId, string? Name, AccountType? Type) : IQuery<IEnumerable<AccountDto>>;
    public record AccountDto(Guid Id, string Name, string Description, AccountType Type, Money Balance);

    public class AccountGetAllHandler(ApplicationContext applicationContext) : IQueryHandler<Query, IEnumerable<AccountDto>>
    {
        public async Task<Result<IEnumerable<AccountDto>>> Handle(Query request, CancellationToken cancellationToken)
        {

            var query = applicationContext.Accounts
            .AsNoTracking()
            .Where(c => c.UserId == UserId.From(request.UserId));

            if (!string.IsNullOrWhiteSpace(request.Name))
            {
                query = query.Where(c => c.Name.Contains(request.Name, StringComparison.CurrentCultureIgnoreCase));
            }

            if (request.Type.HasValue)
            {
                query = query.Where(c => c.Type == request.Type.Value);
            }

            var accounts = await query
                .AsNoTracking()
                .Where(c => c.UserId == UserId.From(request.UserId))
                .Select(c => new AccountDto(c.Id.Value, c.Name, c.Description, c.Type, c.Balance))
                .ToListAsync(cancellationToken);


            return accounts;
        }
    }

    public class AccountGetAllEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/accounts", async (ISender sender, HttpContext context) =>
            {
                var userIdQueryParam = context.Request.Query["userId"].FirstOrDefault();
                var name = context.Request.Query["name"].FirstOrDefault();
                var typeString = context.Request.Query["type"].FirstOrDefault();

                var userId = context.GetUserId(userIdQueryParam);

                AccountType? type = null;
                if (Enum.TryParse<AccountType>(typeString, true, out var parsedType))
                {
                    type = parsedType;
                }

                var result = await sender.Send(new Query(userId.Value, name, type));
                return result.ToActionResult(response => Results.Ok(response));

            })
            .WithName("GetAllAccounts")
            .Produces<IEnumerable<AccountDto>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status500InternalServerError);
            ;
        }
    }
}