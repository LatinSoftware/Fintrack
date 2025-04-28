using System.Text.Json.Serialization;
using Carter;
using Fintrack.ApiService.Domain.Common.Enums;
using Fintrack.ApiService.Domain.ValueObjects;
using Fintrack.ApiService.Infrastructure.Data;
using Fintrack.ApiService.Shared.Abstractions;
using Fintrack.ApiService.Shared.Extensions;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Fintrack.ApiService.Features.Transactions;

public sealed class TransactionGetById
{
    public record Response(
        Guid Id, 
        TransactionType Type,
        string Note, 
        string? Description,
        Guid OriginAccountId, 
        Guid CategoryId,
        decimal Amount, 
        string CurrencyCode,
        DateTime TransactionDate,
        DateTime CreatedAt);

    public class Request : IQuery<Response>
    {
        [JsonIgnore] public required UserId UserId { get; set; } = default!;
        [JsonIgnore] public required TransactionId TransactionId { get; set; } = default!;
    }

    public class TransactionGetByIdHandler(ApplicationContext applicationContext) : IQueryHandler<Request, Response>
    {
        public async Task<Result<Response>> Handle(Request request, CancellationToken cancellationToken)
        {
            var transaction = await applicationContext.Transactions
                .Where(t => t.UserId == request.UserId && t.Id == request.TransactionId)
                .Select(t => new Response(
                    t.Id.Value,
                    t.Type,
                    t.Note,
                    t.Description,
                    t.OriginAccountId.Value,
                    t.CategoryId.Value,
                    t.Amount.Amount,
                    t.Amount.Currency.Code,
                    t.Date,
                    t.CreatedAt))
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);

            if (transaction is null)
            {
                return Result.Fail(TransactionError.TransactionNotFound(request.TransactionId));
            }

            return Result.Ok(transaction);
        }
    }

    public class TransactionGetByIdEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/transactions/{transactionId}", async ( ISender sender, HttpContext context, Guid transactionId) =>
            {
                var request = new Request
                {
                    UserId = context.GetUserId(),
                    TransactionId = TransactionId.From(transactionId)
                };
                var result = await sender.Send(request, CancellationToken.None);
                return result.ToActionResult(data => Results.Ok(data));
            })
            .WithName("GetTransactionById")
            .Produces<Response>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound);
        }
    }
}
