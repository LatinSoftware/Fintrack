using FluentResults;

namespace Fintrack.ApiService.Shared.Errors;

public class NotFoundError : Error
{
    public NotFoundError(string message)
        : base(message)
    {
        WithMetadata("StatusCode", StatusCodes.Status404NotFound);
    }
}

