using Fintrack.ApiService.Domain.Common;
using Fintrack.ApiService.Domain.Common.Enums;
using Fintrack.ApiService.Domain.ValueObjects;

namespace Fintrack.ApiService.Domain.Entities;

public class Account : BaseEntity
{
    public AccountId Id { get; private set; } = AccountId.New();
    public string Name {get; private set;} = string.Empty;
    public string Description {get; private set;} = string.Empty;
    public AccountType Type {get; private set;}
    public Money Balance {get; private set;}
    public UserId UserId { get; private set; }


    private Account() { }
    public Account(string name, string description, AccountType type, Money balance, UserId userId)
    {
        Name = name;
        Description = description;
        Type = type;
        Balance = balance;
        UserId = userId;
    }

    public static Account Create(string name, string description, AccountType type, Money balance, UserId userId)
    {
        return new Account(name, description, type, balance, userId);
    }
    public void Update(string? name, string? description, AccountType? type, Money? balance)
    {
        if (!string.IsNullOrEmpty(name))
            Name = name;
        if (!string.IsNullOrEmpty(description))
            Description = description;
        if (type.HasValue)
            Type = type.Value;
        if (balance != null)
            Balance = balance;
    }

}
