namespace Fintrack.ApiService.Domain.ValueObjects;

public record struct CategoryId(Guid Value)
{
    public  static CategoryId Empty => new(Guid.Empty);
    public static CategoryId New() => new(Guid.NewGuid());
    public static CategoryId From(Guid value) => new(value);
    public override readonly string ToString() => Value.ToString();
}
