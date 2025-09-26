using System.Text.Json.Serialization;
using Carter;
using Fintrack.ApiService.Domain.Common.Enums;
using Fintrack.ApiService.Domain.ValueObjects;
using Fintrack.ApiService.Infrastructure.Data;
using Fintrack.ApiService.Shared.Abstractions;
using Fintrack.ApiService.Shared.Extensions;
using Fintrack.ApiService.Shared.Models;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Fintrack.ApiService.Features.Transactions;

public sealed class TransactionFilter
{
    public record Response(
        Guid Id,
        TransactionType Type,
        string Note,
        string? Description,
        decimal Amount,
        string CurrencyCode,
        TransactionAccount OriginAccount,
        TransactionCategory Category,
        DateTime TransactionDate,
        DateTime CreatedAt
        );

    public record TransactionAccount(Guid Id, string Name);
    public record TransactionCategory(Guid Id, string Name);

    public class Request : IQuery<PagedResult<Response>>
    {
        [JsonIgnore] public UserId UserId { get; set; } = default!;
        public CategoryId? Category { get; set; }
        public AccountId? OriginAccount { get; set; }
        public DateOnly? From { get; set; } = new DateOnly();
        public DateOnly? To { get; set; } = new DateOnly();
        public TransactionType? Type { get; set; }
        public int Limit { get; set; } = 10;
        public int Offset { get; set; } = 0;
    }


    public class TransactionFilterHandler(ApplicationContext applicationContext) : IQueryHandler<Request, PagedResult<Response>>
    {
        public async Task<Result<PagedResult<Response>>> Handle(Request request, CancellationToken cancellationToken)
        {
            var query = applicationContext
            .Transactions
            .AsNoTracking().Where(x => x.UserId == request.UserId);


            if (request.Category.HasValue)
                query = query.Where(x => x.CategoryId == request.Category.Value);

            if (request.OriginAccount.HasValue)
                query = query.Where(x => x.OriginAccountId == request.OriginAccount.Value);

            if (request.From.HasValue)
                query = query.Where(x => DateOnly.FromDateTime(x.Date) >= request.From.Value);

            if (request.To.HasValue)
                query = query.Where(x => DateOnly.FromDateTime(x.Date) <= request.To.Value);

            if (request.Type.HasValue)
                query = query.Where(x => x.Type == request.Type.Value);

            var totalItems = query.Count();
            var items = await query
                .Skip(request.Offset)
                .Take(request.Limit)
                .OrderByDescending(x => x.Date)
                .Select(t => new Response(
                    t.Id.Value,
                    t.Type,
                    t.Note.Value,
                    t.Description,
                    t.Amount.Amount,
                    t.Amount.Currency.Code,
                    new TransactionAccount(t.OriginAccount.Id.Value, t.OriginAccount.Name),
                    new TransactionCategory(t.Category.Id.Value, t.Category.Name),
                    t.Date,
                    t.CreatedAt
                )).ToListAsync(cancellationToken);

            var result = PagedResult<Response>.Create(items, totalItems, request.Limit, request.Offset);

            return Result.Ok(result);
        }
    }

    public class TransactionFilterEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/transactions", async (ISender sender,
            Guid? originAccount, Guid? category, DateOnly? from, DateOnly? to,
            TransactionType? type, int limit, int offset, HttpContext httpContext) =>
            {
                var request = new Request
                {
                    UserId = httpContext.GetUserId(),
                    OriginAccount = originAccount.HasValue ? new AccountId(originAccount.Value) : null,
                    Category = category.HasValue ? new CategoryId(category.Value) : null,
                    From = from,
                    To = to,
                    Type = type,
                    Limit = limit,
                    Offset = offset
                };
                var result = await sender.Send(request);
                return result.ToActionResult(data => Results.Ok(data));
            })
            .WithName("GetTransactions")
            .Produces<PagedResult<Response>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .WithTags("Transactions");
        }
    }
}
