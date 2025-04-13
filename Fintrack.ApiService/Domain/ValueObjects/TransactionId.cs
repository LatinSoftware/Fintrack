
namespace Fintrack.ApiService.Domain.ValueObjects;

public record struct TransactionId(Guid Value) 
{
    public  static TransactionId Empty => new(Guid.Empty);
    public static TransactionId New() => new(Guid.NewGuid());
    public override readonly string ToString() => Value.ToString();
}