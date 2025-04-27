using FluentResults;
using MediatR;

namespace Fintrack.ApiService.Shared.Abstractions;

public interface IQuery<TResponse> : IRequest<Result<TResponse>> where TResponse : class
{

}

public interface IQueryHandler<in TQuery, TResponse> : IRequestHandler<TQuery, Result<TResponse>>
    where TQuery : IQuery<TResponse>
    where TResponse : class
{
}

