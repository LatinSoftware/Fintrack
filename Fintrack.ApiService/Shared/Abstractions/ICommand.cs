using FluentResults;
using MediatR;

namespace Fintrack.ApiService.Shared.Abstractions;

public interface ICommand : IRequest<Result>
{

}

public interface ICommand<TResponse> : IRequest<Result<TResponse>> where TResponse : class
{

}

