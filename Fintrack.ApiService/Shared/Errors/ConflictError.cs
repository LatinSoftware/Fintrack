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

