using Carter;
using Fintrack.ApiService.Domain.ValueObjects;
using Fintrack.ApiService.Infrastructure.Data;
using Fintrack.ApiService.Shared.Abstractions;
using Fintrack.ApiService.Shared.Extensions;
using FluentResults;
using MediatR;

namespace Fintrack.ApiService.Features.Transactions;

public sealed class TransactionDelete
{
    public record Request(TransactionId Id) : ICommand;

    public class Handler(ApplicationContext context) : ICommandHandler<Request>
    {
        public async Task<Result> Handle(Request request, CancellationToken cancellationToken)
        {
            var transaction = await context.Transactions.FindAsync([request.Id], cancellationToken: cancellationToken);
            if (transaction is null)
                return Result.Fail(TransactionError.TransactionNotFound(request.Id));

            context.Transactions.Remove(transaction);
            await context.SaveChangesAsync(cancellationToken);

            return Result.Ok();
        }
    }

    public class Endpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapDelete("/transactions/{id}", async (Guid id, ISender sender, CancellationToken cancellationToken) =>
            {
                var transactionId = TransactionId.From(id);
                var result = await sender.Send(new Request(transactionId), cancellationToken);
                return result.ToActionResult(() => Results.NoContent());
            });
        }
    }
}
