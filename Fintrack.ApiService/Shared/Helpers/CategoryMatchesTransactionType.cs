using System;
using Fintrack.ApiService.Domain.Common.Enums;

namespace Fintrack.ApiService.Shared.Helpers;

public class CategoryMatchesTransactionType
{
    public static bool Math(TransactionType transactionType, CategoryTypeEnum categoryType)
    {
        return transactionType switch
        {
            TransactionType.Income => categoryType == CategoryTypeEnum.Income,
            TransactionType.Expense => categoryType == CategoryTypeEnum.Expense,
            TransactionType.Transfer => false,
            _ => false
        };
    }
}
