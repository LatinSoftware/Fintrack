using System.Text.Json.Serialization;
using Carter;
using Fintrack.ApiService.Domain.Common.Enums;
using Fintrack.ApiService.Domain.ValueObjects;
using Fintrack.ApiService.Infrastructure.Data;
using Fintrack.ApiService.Shared.Abstractions;
using Fintrack.ApiService.Shared.Extensions;
using FluentResults;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Fintrack.ApiService.Features.Accounts;

public sealed class AccountUpdate
{
    public record Request(string? Name, string? Description, AccountType? Type, Money? Balance) : ICommand
    {
        [JsonIgnore]
        public AccountId Id { get; set; }
        [JsonIgnore]
        public UserId UserId { get; set; }
    }

    public sealed class Validator : AbstractValidator<Request>
    {
        public Validator()
        {
            RuleFor(x => x.Name)
                .MaximumLength(100)
                .When(x => !string.IsNullOrEmpty(x.Name))
                .MinimumLength(3);
            RuleFor(x => x.Description).MaximumLength(500).When(x => !string.IsNullOrEmpty(x.Description));
            RuleFor(x => x.Type).IsInEnum()
                .When(x => x.Type.HasValue);
            RuleFor(x => x.Balance).Must(x => x?.Amount >= 0);
        }
    }

    public class AccountUpdateHandler(ApplicationContext applicationContext) : ICommandHandler<Request>
    {
        async Task<Result> IRequestHandler<Request, Result>.Handle(Request request, CancellationToken cancellationToken)
        {
            var account = await applicationContext.Accounts
                .FirstOrDefaultAsync(x => x.UserId == request.UserId && x.Id == request.Id, cancellationToken);

            if (account is null)
            {
                return Result.Fail(AccountErrors.AccountNotFound(request.Id.Value));
            }

            account.Update(request.Name, request.Description, request.Type, request.Balance);

            await applicationContext.SaveChangesAsync(cancellationToken);

            return Result.Ok();
        }
    }

    public class AccountUpdateEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPut("/accounts/{id}", async (ISender sender, HttpContext context, Guid id, Request request) =>
            {
                request.UserId = context.GetUserId(context.Request.Query["userId"].FirstOrDefault());
                request.Id = AccountId.From(id);

                var result = await sender.Send(request, context.RequestAborted);

                return result.ToActionResult(() => Results.NoContent());
            });
        }
    }
}