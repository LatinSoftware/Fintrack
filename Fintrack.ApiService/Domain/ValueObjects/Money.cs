namespace Fintrack.ApiService.Domain.ValueObjects;

public record Money
{
    public decimal Amount { get; private set; } = 0.0m;
    public CurrencyCode Currency { get; private set; }

    public Money(decimal amount, CurrencyCode currency)
    {
        if (amount < 0) throw new ArgumentException("Amount cannot be negative.");
        Amount = amount;
        Currency = currency;
    }

     public override string ToString() => $"{Amount} {Currency}";
}
