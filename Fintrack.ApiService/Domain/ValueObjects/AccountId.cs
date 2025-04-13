
namespace Fintrack.ApiService.Domain.ValueObjects;

public record struct AccountId(Guid Value) 
{
    public  static AccountId Empty => new(Guid.Empty);
    public static AccountId New() => new(Guid.NewGuid());
    public override readonly string ToString() => Value.ToString();
}
