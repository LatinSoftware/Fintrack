using FluentResults;
using MediatR;

namespace Fintrack.ApiService.Shared.Abstractions;

public interface ICommand : IRequest<Result>
{

}

public interface ICommand<TResponse> : IRequest<Result<TResponse>> where TResponse : class
{

}

public interface ICommandHandler<in TCommand> : IRequestHandler<TCommand, Result> where TCommand : ICommand
{

}

public interface ICommandHandler<in TCommand, TResponse> : IRequestHandler<TCommand, Result<TResponse>> where TCommand : ICommand<TResponse> where TResponse : class
{

}

