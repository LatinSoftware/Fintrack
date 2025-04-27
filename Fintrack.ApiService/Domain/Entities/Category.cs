using Fintrack.ApiService.Domain.Common;
using Fintrack.ApiService.Domain.Common.Enums;
using Fintrack.ApiService.Domain.ValueObjects;

namespace Fintrack.ApiService.Domain.Entities;

public class Category : BaseEntity
{
    public CategoryId Id { get; private set; } = CategoryId.New();
    public string Name { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public CategoryTypeEnum Type {get; private set;}
    public CategoryId? ParentId { get; private set; }
    public UserId UserId { get; private set; }
    public Category? Parent { get; set; } 
    public ICollection<Category> Children { get; set; } = [];

    private Category() { }
    public Category(string name, string description, CategoryTypeEnum type, UserId userId, CategoryId? parentId = null)
    {
        Name = name;
        Description = description;
        Type = type;
        ParentId = parentId;
        UserId = userId;
    }

    public static Category Create(string name, string description, CategoryTypeEnum type, UserId userId, CategoryId? parentId = null)
    {
        return new Category(name, description, type, userId, parentId);
    }
    
    public void Update(string? name, string? description, CategoryTypeEnum? type)
    {
        if (!string.IsNullOrEmpty(name))
            Name = name;
        if (!string.IsNullOrEmpty(description))
            Description = description;
        if (type.HasValue)
            Type = type.Value;
    }

    public void SetParent(Category parent)
    {
        Parent = parent;
        ParentId = parent.Id;
    }
    
}
