using System;
using Fintrack.ApiService.Domain.Common.Enums;
using Fintrack.ApiService.Domain.ValueObjects;
using Fintrack.ApiService.Shared.Errors;

namespace Fintrack.ApiService.Features.Transactions;

public class TransactionError
{
    public static DomainError CategoryNotFound(CategoryId categoryId) =>
            new($"CategoryId {categoryId.Value} not found.");

    public static DomainError AccountNotFound(AccountId accountId) =>
        new($"AccountId {accountId.Value} not found.");

    public static DomainError CurrencyCodeNotFound(string currencyCode) =>
        new($"CurrencyCode {currencyCode} not found.");

    public static DomainError AccountTypeMismatch(TransactionType transactionType, TransactionType accountType) =>
        new($"Account type '{accountType}' does not match transaction type '{transactionType}'.");

    public static DomainError CategoryTypeMismatch(TransactionType transactionType, CategoryTypeEnum categoryType) =>
    new($"Category type '{categoryType}' does not match expected transaction type '{transactionType}'.");
}
