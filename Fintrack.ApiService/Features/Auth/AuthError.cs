using Fintrack.ApiService.Shared.Errors;
using FluentResults;

namespace Fintrack.ApiService.Features.Auth;

public static class AuthError
{
    public static Error EmailAlreadyExists => new ConflictError("Email already exists.");
    public static Error InvalidCredentials => new UnauthorizeError("Invalid credentials.");
}
