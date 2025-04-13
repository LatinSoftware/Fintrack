namespace Fintrack.ApiService.Domain.ValueObjects;

public sealed record CurrencyCode
{
    public string Code {get; private set; } = string.Empty;
    public CurrencyCode(string code)
    {
        if (string.IsNullOrWhiteSpace(code)) throw new ArgumentException("Currency code cannot be empty.");
        Code = code.ToUpperInvariant();
    }

    public static implicit operator string(CurrencyCode currencyCode) => currencyCode.Code;
    public static implicit operator CurrencyCode(string code) => new CurrencyCode(code);
    public override string ToString() => Code;
}
