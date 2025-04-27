using Fintrack.ApiService.Shared.Errors;
using FluentResults;

namespace Fintrack.ApiService.Features.Accounts;

public static class AccountErrors
{
    public static Error AccountNotFound(Guid accountId) => new NotFoundError($"Account with ID '{accountId}' was not found.");
    public static Error AccountInvalidBalance(Guid accountId) => new ValidationError($"Account with ID '{accountId}' has an invalid balance.");
    public static Error AccountNegativeBalance(Guid accountId) => new ValidationError($"Account with ID '{accountId}' has a negative balance.");
    public static Error AccountInvalidCurrency(Guid accountId) => new ValidationError($"Account with ID '{accountId}' has a non supported currency.");
    public static Error UserNotFound(Guid userId) => new NotFoundError($"User with ID '{userId}' was not found.");
}