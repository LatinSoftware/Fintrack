using Fintrack.ApiService.Shared.Errors;
using FluentResults;

namespace Fintrack.ApiService.Features.Categories;

public static class CategoryErrors
{
    public static Error ParentCategoryNotFound(Guid parentId) => new NotFoundError($"Parent category with ID '{parentId}' was not found.");
}
