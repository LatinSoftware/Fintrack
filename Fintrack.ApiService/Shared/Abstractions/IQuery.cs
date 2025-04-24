using FluentResults;
using MediatR;

namespace Fintrack.ApiService.Shared.Abstractions;

public interface IQuery<TResponse> : IRequest<Result<TResponse>> where TResponse : class
{

}

