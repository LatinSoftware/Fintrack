
namespace Fintrack.ApiService.Domain.ValueObjects;

public record struct UserId(Guid Value) 
{
    public  static UserId Empty => new(Guid.Empty);
    public static UserId New() => new(Guid.NewGuid());
    public static UserId From(Guid value) => new(value);
    public override readonly string ToString() => Value.ToString();
}
