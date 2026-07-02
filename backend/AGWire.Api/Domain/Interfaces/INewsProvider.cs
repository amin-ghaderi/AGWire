using AGWire.Api.Domain.Entities;

namespace AGWire.Api.Domain.Interfaces;

public interface INewsProvider
{
    Task<IReadOnlyList<Article>> GetTopHeadlinesAsync(CancellationToken cancellationToken = default);

    Task<IReadOnlyList<Article>> SearchAsync(string query, CancellationToken cancellationToken = default);
}
