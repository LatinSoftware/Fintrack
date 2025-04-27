using Carter;
using Fintrack.ApiService.Domain.Entities;
using Fintrack.ApiService.Infrastructure.Data;
using Fintrack.ApiService.Shared.Abstractions;
using Fintrack.ApiService.Shared.Extensions;
using Fintrack.ApiService.Shared.Security;
using FluentResults;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Fintrack.ApiService.Features.Auth;

public sealed class Register
{
    public record Request(string Name, string Email, string Password) : ICommand<Response>;
    public record Response(Guid UserId, string Email);

    public class Handler(ApplicationContext context) : ICommandHandler<Request, Response>
    {
        public async Task<Result<Response>> Handle(Request request, CancellationToken cancellationToken)
        {
            var existEmail = await context.Users.AnyAsync(x => x.Email == request.Email, cancellationToken: cancellationToken);

            if (existEmail)
            {
                return Result.Fail(AuthError.EmailAlreadyExists);
            }

            var user = User.Create(request.Name, request.Email, PasswordHasher.Hash(request.Password));
            context.Users.Add(user);
            await context.SaveChangesAsync(cancellationToken);

            return Result.Ok(new Response(
                UserId: user.Id.Value,
                Email: user.Email
            ));
        }
    }

    public class Validator : AbstractValidator<Request>
    {
        public Validator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
        }
    }

    public class Endpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/auth/register", async (ISender sender, Request request) =>
            {
                var result = await sender.Send(request);
                return result.ToActionResult(response => Results.Created($"/auth/login", response));
            })
            .WithName("Register")
            .Produces<Response>(StatusCodes.Status201Created)
            .Produces(StatusCodes.Status409Conflict)
            .Produces(StatusCodes.Status422UnprocessableEntity)
            .WithTags("Auth");
        }
    }
}
