using System;

namespace Fintrack.ApiService.Shared.Models;

public sealed class PagedResult<T>
{
    public Meta Meta { get; }
    public IEnumerable<T> Data { get; }

    private PagedResult(IEnumerable<T> data, Meta meta)
    {
        Data = data;
        Meta = meta;
    }

    public static PagedResult<T> Create(IEnumerable<T> data, int totalItems, int limit, int offset)
    {
        var meta = new Meta(
            total: totalItems,
            limit: limit,
            offset: offset,
            hasNextPage: (offset + limit) < totalItems,
            hasPreviousPage: offset > 0
        );

        return new PagedResult<T>(data, meta);
    }
}

public sealed class Meta
{
    public int Total { get; }
    public int Limit { get; }
    public int Offset { get; }
    public bool HasNextPage { get; }
    public bool HasPreviousPage { get; }

    public Meta(int total, int limit, int offset, bool hasNextPage, bool hasPreviousPage)
    {
        Total = total;
        Limit = limit;
        Offset = offset;
        HasNextPage = hasNextPage;
        HasPreviousPage = hasPreviousPage;
    }
}

