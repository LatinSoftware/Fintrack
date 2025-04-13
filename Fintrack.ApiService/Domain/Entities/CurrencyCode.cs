namespace Fintrack.ApiService.Domain.Entities;

public class CurrencyCode
{
    public string Code { get; private set; } = string.Empty;
    public string Name { get; private set; } = string.Empty;
    public string Symbol { get; private set; } = string.Empty;

    private CurrencyCode() { }
    public CurrencyCode(string code, string name, string symbol)
    {
        Code = code;
        Name = name;
        Symbol = symbol;

    }

    public static CurrencyCode Create(string code, string name, string symbol)
    {
        return new CurrencyCode(code, name, symbol);
    }
}
