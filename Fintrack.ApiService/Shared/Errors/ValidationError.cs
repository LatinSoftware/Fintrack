using FluentResults;

namespace Fintrack.ApiService.Shared.Errors;

public class ValidationError : Error
{
    public ValidationError(string message)
        : base(message)
    {
        WithMetadata("StatusCode", StatusCodes.Status422UnprocessableEntity);
    }
}
