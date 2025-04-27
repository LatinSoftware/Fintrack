using Fintrack.ApiService.Domain.Common.Enums;
using Fintrack.ApiService.Domain.Entities;
using Fintrack.ApiService.Domain.ValueObjects;

namespace Fintrack.ApiService.Infrastructure.Data;

public static class Seed
{
    public static void ExecuteAsync(ApplicationContext context)
    {
        if (!context.Users.Any())
        {
            var user = new User("system", "system@example.com", "system");
            context.Users.Add(user);
            context.SaveChanges();
        }

        if (!context.CurrencyCodes.Any())
        {
            var currencyCodes = new List<Domain.Entities.CurrencyCode>
            {
                new("USD", "United States Dollar", "$"),
                new("EUR", "Euro", "€"),
                new("GBP", "British Pound Sterling", "£"),
                new("JPY", "Japanese Yen", "¥"),
                new("AUD", "Australian Dollar", "A$"),
                new("CAD", "Canadian Dollar", "C$"),
                new("CHF", "Swiss Franc", "CHF"),
                new("CNY", "Chinese Yuan", "¥"),
                new("SEK", "Swedish Krona", "kr"),
                new("DOP", "Dominican Peso", "RD$"),
                new("ARS", "Argentine Peso", "$"),
            };

            context.CurrencyCodes.AddRange(currencyCodes);
            context.SaveChanges();
        }

        if(!context.Accounts.Any())
        {
            var user = context.Users.FirstOrDefault(u => u.Name == "system");
            if (user != null)
            {
                var accounts = new List<Account>
                {
                    Account.Create("cash", "Cash account", AccountType.Cash, Money.From(0, "DOP"), user.Id),
                    Account.Create("savings", "Savings account", AccountType.Bank, Money.From(0, "DOP"), user.Id),
                };

                context.Accounts.AddRange(accounts);
                context.SaveChanges();
            }
        }
    }
}
