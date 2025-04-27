using FluentResults;

namespace Fintrack.ApiService.Shared.Errors;

public class ConflictError : Error
{
    public ConflictError(string message)
        : base(message)
    {
        WithMetadata("StatusCode", StatusCodes.Status409Conflict);
    }
}

public class UnauthorizeError : Error
{
    public UnauthorizeError(string message)
        : base(message)
    {
        WithMetadata("StatusCode", StatusCodes.Status401Unauthorized);
        WithMetadata("ErrorCode", "Unauthorized");
        WithMetadata("ErrorType", "Authentication");
    }
}
