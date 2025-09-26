using Fintrack.ApiService.Domain.Common;
using Fintrack.ApiService.Domain.Common.Enums;
using Fintrack.ApiService.Domain.ValueObjects;

namespace Fintrack.ApiService.Domain.Entities;

public class Transaction : BaseEntity
{
    public TransactionId Id { get; private set; } = TransactionId.New();
    public UserId UserId { get; private set; }
    public AccountId OriginAccountId { get; private set; }
    public CategoryId CategoryId { get; private set; }
    public Money Amount { get; private set; } = default!;
    public TransactionType Type { get; private set; }
    public Note Note { get; private set; }
    public string? Description { get; private set; }
    public DateTime Date { get; private set; }

    public Account OriginAccount { get; set; }
    public Category Category { get; set; }


    private Transaction() { }
    public Transaction(AccountId originAccountId, CategoryId categoryId, TransactionType type, Money amount, Note note, UserId userId, DateTime date, string? description)
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

    public static Transaction Create(AccountId originAccountId, CategoryId categoryId, TransactionType type, Money amount, Note note, UserId userId, DateTime date, string? description)
    {
        return new Transaction(originAccountId, categoryId, type, amount, note, userId, date, description);
    }
    public void Update(AccountId? originAccountId, CategoryId? categoryId, TransactionType? type, Money? amount, Note? note, DateTime? date, string? description)
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
