using System.Security.Cryptography.X509Certificates;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Carter;
using Fintrack.ApiService.Domain.Common.Enums;
using Fintrack.ApiService.Domain.Entities;
using Fintrack.ApiService.Domain.ValueObjects;
using Fintrack.ApiService.Infrastructure.Data;
using Fintrack.ApiService.Shared.Abstractions;
using Fintrack.ApiService.Shared.Extensions;
using Fintrack.ApiService.Shared.Helpers;
using FluentResults;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Fintrack.ApiService.Features.Transactions;

public sealed class TransactionCreate
{
    public record Request(
        TransactionType Type,
        Guid OriginAccountId,
        Guid CategoryId,
        decimal Amount,
        string CurrencyCode,
        string Note,
        string? Description,
        DateTime TransactionDate
        ) : ICommand<Response>
    {
        [JsonIgnore]
        public UserId UserId { get; set; } = default!;
    }

    public record Response(
        Guid Id,
        TransactionType Type,
        Guid OriginAccountId,
        Guid CategoryId,
        decimal Amount,
        string CurrencyCode,
        string Note,
        string? Description,
        DateTime TransactionDate,
        DateTime CreatedAt
        );

    public class Validator : AbstractValidator<Request>
    {
        public Validator()
        {
            RuleFor(x => x.UserId).NotEmpty();
            RuleFor(x => x.Type).IsInEnum();
            RuleFor(x => x.OriginAccountId).NotEmpty();
            RuleFor(x => x.CategoryId).NotEmpty();
            RuleFor(x => x.Amount).GreaterThan(0);
            RuleFor(x => x.CurrencyCode).NotEmpty().Length(3);
            RuleFor(x => x.Note).MaximumLength(200);
            RuleFor(x => x.Description).MaximumLength(1500).Empty();
            RuleFor(x => x.TransactionDate).NotEmpty();
        }
    }

    public class TransactionCreateHandler(ApplicationContext context) : ICommandHandler<Request, Response>
    {
        public async Task<Result<Response>> Handle(Request request, CancellationToken cancellationToken)
        {

            var validationResult = await ValidateRequest(
                CategoryId.From(request.CategoryId),
                AccountId.From(request.OriginAccountId),
                Money.From(request.Amount, request.CurrencyCode),
                request.UserId,
                request.Type,
                context
            );

            if (validationResult.IsFailed)
            {
                return Result.Fail<Response>(validationResult.Errors);
            }

            var transaction = Transaction.Create(
                AccountId.From(request.OriginAccountId),
                CategoryId.From(request.CategoryId),
                request.Type,
                Money.From(request.Amount, request.CurrencyCode),
                Note.From(request.Note),
                request.UserId,
                request.TransactionDate,
                request.Description
            );

            await context.Transactions.AddAsync(transaction, cancellationToken);

            await context.SaveChangesAsync(cancellationToken);

            return Result.Ok(new Response(
                transaction.Id.Value,
                transaction.Type,
                transaction.OriginAccountId.Value,
                transaction.CategoryId.Value,
                transaction.Amount.Amount,
                transaction.Amount.Currency.Code,
                transaction.Note.Value,
                transaction.Description,
                transaction.Date,
                transaction.CreatedAt
            ));
        }

        private static async Task<Result> ValidateRequest(
            CategoryId categoryId,
            AccountId accountId,
            Money money,
            UserId userId,
            TransactionType transactionType,
            ApplicationContext context
        )
        {
            var category = await context.Categories
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == categoryId && x.UserId == userId);

            var account = await context.Accounts
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == accountId && x.UserId == userId);

            var currencyExists = await context.CurrencyCodes
                .AsNoTracking()
                .AnyAsync(x => x.Code == money.Currency.Code);

            var errors = new List<IError>();

            if (category is null)
                errors.Add(TransactionError.CategoryNotFound(categoryId));

            if (account is null)
                errors.Add(TransactionError.AccountNotFound(accountId));

            if (!currencyExists)
                errors.Add(TransactionError.CurrencyCodeNotFound(money.Currency.Code));


            if (category is not null && !CategoryMatchesTransactionType.Math(transactionType, category.Type))
                errors.Add(TransactionError.CategoryTypeMismatch(transactionType, category.Type));

            return errors.Count != 0 ? Result.Fail(errors) : Result.Ok();
        }

    }

    public class TransactionCreateEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/transactions", async (ISender sender, HttpContext context, Request request) =>
            {
                request.UserId = context.GetUserId(context.Request.Query["userId"].FirstOrDefault());
                var result = await sender.Send(request);
                return result.ToActionResult((data) => Results.Created($"/transactions/{data.Id}", data));
            });
        }
    }
}
