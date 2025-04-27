using Fintrack.ApiService.Shared.Errors;
using FluentResults;

namespace Fintrack.ApiService.Features.Accounts;

public static class AccountErrors
{
    public static Error AccountNotFound(Guid accountId) => new NotFoundError($"Account with ID '{accountId}' was not found.");
    public static Error AcocuntBalanceNegative(Guid accountId) => new ValidationError($"Acocunt with ID '{accountId}' has a negative balance.");
    public static Error UserNotFound(Guid userId) => new NotFoundError($"User with ID '{userId}' was not found.");
}