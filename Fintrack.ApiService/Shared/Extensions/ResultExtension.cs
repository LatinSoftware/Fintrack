using FluentResults;


namespace Fintrack.ApiService.Shared.Extensions;

public static class ResultExtension
{
    public static IResult ToActionResult<T>(this Result<T> result, Func<T, IResult> onSuccess)
    {
        if (result.IsSuccess)
            return onSuccess(result.Value);

        var statusCode = MapErrorToStatusCode(result.Errors);

        return Results.Problem(
            statusCode: statusCode,
            title: "One or more errors occurred.",
            type: $"https://httpstatuses.com/{statusCode}",
            detail: string.Join(" | ", result.Errors.Select(e => e.Message))
        );
    }

    private static int MapErrorToStatusCode(List<IError> errors)
    {
        var statusCodeMeta = errors
            .Select(e => e.Metadata.TryGetValue("StatusCode", out var code) ? code : null)
            .FirstOrDefault(code => code is not null);

        return statusCodeMeta is int status ? status : StatusCodes.Status400BadRequest;
    }
}
