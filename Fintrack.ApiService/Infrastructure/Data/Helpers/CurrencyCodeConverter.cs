using Fintrack.ApiService.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Fintrack.ApiService.Infrastructure.Data.Helpers;

public class CurrencyCodeConverter : ValueConverter<CurrencyCode, string>
{
    public CurrencyCodeConverter()
        : base(
            currency => currency.Code,          // Convert to string when saving
            code => new CurrencyCode(code))     // Convert to CurrencyCode when reading
    {
    }
}
