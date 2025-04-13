using Fintrack.ApiService.Domain.ValueObjects;
using Fintrack.ApiService.Infrastructure.Data.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Fintrack.ApiService.Infrastructure.Data.Extensions;

public static class OwnedNavigationBuilderExtension
{
    public static void ConfigureMoney<T>(this OwnedNavigationBuilder<T, Money> moneyBuilder, string amountColumn = "balance", string currencyColumn = "currency") 
        where T : class
    {
        moneyBuilder.Property(m => m.Amount)
                    .HasColumnName(amountColumn)
                    .HasPrecision(18, 2) 
                    ;

        moneyBuilder.Property(m => m.Currency)
                    .HasColumnName(currencyColumn)
                    .HasConversion(new CurrencyCodeConverter())
                    .HasMaxLength(3)
                    ;

        moneyBuilder.WithOwner();

        

    }
}
