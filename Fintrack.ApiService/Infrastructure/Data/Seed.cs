using Fintrack.ApiService.Domain.Entities;

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
            var currencyCodes = new List<CurrencyCode>
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
    }
}
