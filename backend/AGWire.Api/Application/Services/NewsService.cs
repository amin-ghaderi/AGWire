using AGWire.Api.Domain.Entities;

namespace AGWire.Api.Application.Services;

public class NewsService
{
    public Task<IReadOnlyList<Article>> GetTopHeadlinesAsync(
        string? category = null,
        CancellationToken cancellationToken = default)
    {
        // Future: resolve enabled providers via ProviderResolver
        // Future: fetch headlines from each provider in parallel
        // Future: aggregate results across providers
        // Future: deduplicate articles by Url
        // Future: apply category filtering when category is provided
        // Future: sort by PublishedAt descending
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<Article>> SearchAsync(
        string query,
        CancellationToken cancellationToken = default)
    {
        // Future: resolve enabled providers via ProviderResolver
        // Future: search each provider in parallel
        // Future: aggregate results across providers
        // Future: deduplicate articles by Url
        // Future: sort by relevance or PublishedAt
        throw new NotImplementedException();
    }
}
