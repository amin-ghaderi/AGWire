using AGWire.Api.Domain.Entities;

namespace AGWire.Api.Domain.Interfaces;

public interface INewsProvider
{
    string ProviderType { get; }

    Task<IReadOnlyList<Article>> GetTopHeadlinesAsync(
        string? category = null,
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<Article>> SearchAsync(string query, CancellationToken cancellationToken = default);
}
