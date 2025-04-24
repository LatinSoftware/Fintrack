using FluentResults;

namespace Fintrack.ApiService.Shared.Errors;

public class DomainError : Error
{
    public DomainError(string message)
        : base(message)
    {
        WithMetadata("StatusCode", StatusCodes.Status400BadRequest);
    }
}

