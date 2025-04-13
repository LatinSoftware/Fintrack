namespace Fintrack.ApiService.Domain.ValueObjects;

public record Note
{
    public string Value { get; private set; } = string.Empty;
    public Note(string value)
    {
        if (string.IsNullOrWhiteSpace(value)) throw new ArgumentException("Note cannot be empty.");
         if (value.Length > 200) throw new ArgumentException("Note is more than 200 long", nameof(value));

        Value = value;
    }

    public static Note From(string value) => new(value);
    public static Note Empty() => new(string.Empty);
    public static Note New(string value) => new(value);

    public static implicit operator string(Note note) => note.Value;
    public static implicit operator Note(string value) => new(value);
    public override string ToString() => Value;
    
}
