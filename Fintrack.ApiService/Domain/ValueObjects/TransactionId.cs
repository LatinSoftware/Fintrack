
namespace Fintrack.ApiService.Domain.ValueObjects;

public record struct TransactionId(Guid Value) 
{
    public  static TransactionId Empty => new(Guid.Empty);
    public static TransactionId New() => new(Guid.NewGuid());
    public static TransactionId From(Guid value) => new(value);
    public override readonly string ToString() => Value.ToString();
}