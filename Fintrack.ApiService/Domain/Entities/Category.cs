using Fintrack.ApiService.Domain.Common;
using Fintrack.ApiService.Domain.Common.Enums;
using Fintrack.ApiService.Domain.ValueObjects;

namespace Fintrack.ApiService.Domain.Entities;

public class Category : BaseEntity
{
    public CategoryId Id { get; private set; } = CategoryId.New();
    public string Name { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public TransactionType Type {get; private set;}
    public Guid? ParentId { get; private set; }
    public Guid? UserId { get; private set; } = null;
    public Category? Parent { get; set; } 
    public ICollection<Category> Children { get; set; } = [];

    private Category() { }
    public Category(string name, string description, TransactionType type, Guid UserId, Guid? parentId = null)
    {
        Name = name;
        Description = description;
        Type = type;
        ParentId = parentId;
    }

    public static Category Create(string name, string description, TransactionType type, Guid UserId, Guid? parentId = null)
    {
        return new Category(name, description, type, UserId, parentId);
    }
    
    public void Update(string? name, string? description, TransactionType? type, Guid? parentId = null)
    {
        if (!string.IsNullOrEmpty(name))
            Name = name;
        if (!string.IsNullOrEmpty(description))
            Description = description;
        if (type.HasValue)
            Type = type.Value;
        if (parentId.HasValue)
            ParentId = parentId.Value;
    }

}
