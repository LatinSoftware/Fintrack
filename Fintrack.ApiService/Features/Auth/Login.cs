using Carter;
using Fintrack.ApiService.Infrastructure.Data;
using Fintrack.ApiService.Shared.Abstractions;
using Fintrack.ApiService.Shared.Extensions;
using Fintrack.ApiService.Shared.Security;
using FluentResults;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Fintrack.ApiService.Features.Auth;

public sealed class Login
{
    public record Request(string Email, string Password) : ICommand<Response>;
    public record Response(string Token, string RefreshToken, DateTime ExpiresAt);

    public class Handler(ApplicationContext context, IJwtProvider jwtProvider) : ICommandHandler<Request, Response>
    {
        public async Task<Result<Response>> Handle(Request request, CancellationToken cancellationToken)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Email == request.Email, cancellationToken: cancellationToken);   

            if(user is null || PasswordHasher.Verify(user.Password, request.Password) is false)
            {
                return Result.Fail(AuthError.InvalidCredentials);
            }

            var token = jwtProvider.Generate(user.Id.Value, user.Email, user.Name);

            return Result.Ok(new Response(
                Token: token,
                RefreshToken: string.Empty,
                ExpiresAt: DateTime.UtcNow.AddMinutes(60)
            ));
        }
    }

    public class Validator : AbstractValidator<Request>
    {
        public Validator()
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
        }
    }

    public class Endpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/auth/login", async (ISender sender, Request request) =>
            {
                var result = await sender.Send(request);
                return result.ToActionResult(response => Results.Ok(response));
            })
            .WithName("Login")
            .Produces<Response>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status401Unauthorized)
            .Produces(StatusCodes.Status422UnprocessableEntity)
            .WithTags("Auth");
        }
    }
}
