using Fintrack.ApiService.Shared.Errors;
using FluentResults;

namespace Fintrack.ApiService.Features.Categories;

public static class CategoryErrors
{
    public static Error ParentCategoryNotFound(Guid parentId) => new NotFoundError($"Parent category with ID '{parentId}' was not found.");
    public static Error CategoryNotFound(Guid categoryId) => new NotFoundError($"Category with ID '{categoryId}' was not found.");

    public static class Validator
    {
        public static Error InvalidCategoryType => new ValidationError("Invalid category type.");
        public static Error NameRequired => new ValidationError("Name is required.");
        public static Error DescriptionRequired => new ValidationError("Description is required.");
        public static Error UserIdRequired => new ValidationError("User ID is required.");
        public static Error NameMaxLength => new ValidationError("Name cannot exceed 100 characters.");
        public static Error DescriptionMaxLength => new ValidationError("Description cannot exceed 500 characters.");
    }
}
