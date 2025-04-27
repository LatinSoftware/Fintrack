using Fintrack.ApiService.Domain.ValueObjects;


namespace Fintrack.ApiService.Shared.Extensions;

public static class HttpContextExtensions
{
    public static UserId GetUserId(this HttpContext context, string? userIdQueryParam = null)
    {
        if (string.IsNullOrEmpty(userIdQueryParam))
        {
            if (!Guid.TryParse(context.User.Identity?.Name, out var userId))
            {
                throw new UnauthorizedAccessException("User ID not found in the token.");
            }
            return UserId.From(userId);
        }
        return UserId.From(Guid.Parse(userIdQueryParam));
    }
}
