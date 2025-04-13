using Fintrack.ApiService.Domain.Common;
using Fintrack.ApiService.Domain.Common.Enums;
using Fintrack.ApiService.Domain.ValueObjects;

namespace Fintrack.ApiService.Domain.Entities;

public class Transaction : BaseEntity
{
    public Guid UserId { get; private set; }
    public Guid OriginAccountId { get; private set; }
    public Guid CategoryId { get; private set; }
    public Money Amount {get; private set;}
    public AccountType Type { get; private set; }
    public Note Note { get; private set; }
    public string? Description {get; private set;}
    public DateTime Date { get; private set; }

    public Transaction(Guid originAccountId, Guid categoryId, AccountType type, Money amount,  Note note, Guid userId, DateTime date, string? description)
    {
        UserId = userId;
        OriginAccountId = originAccountId;
        CategoryId = categoryId;
        Amount = amount;
        Type = type;
        Note = note;
        Description = description;
        Date = date;
    }

    public static Transaction Create(Guid originAccountId, Guid categoryId, AccountType type, Money amount, Note note, Guid userId, DateTime date, string? description)
    {
        return new Transaction(originAccountId, categoryId, type, amount, note, userId, date, description);
    }
    public void Update(Guid? originAccountId, Guid? categoryId, AccountType? type, Money? amount, Note? note, DateTime? date, string? description)
    {
        if (originAccountId.HasValue)
            OriginAccountId = originAccountId.Value;
        if (categoryId.HasValue)
            CategoryId = categoryId.Value;
        if (type.HasValue)
            Type = type.Value;
        if (amount != null)
            Amount = amount;
        if (note != null)
            Note = note;
        if (date.HasValue)
            Date = date.Value;
        if (!string.IsNullOrEmpty(description))
            Description = description;
    }
}
