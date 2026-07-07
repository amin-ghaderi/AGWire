using AGWire.Api.Domain.Entities;
using AGWire.Api.Domain.Interfaces;

namespace AGWire.Api.Infrastructure.Providers;

public class NewsApiProvider : INewsProvider
{
    public string ProviderType => "newsapi";

    public Task<IReadOnlyList<Article>> GetTopHeadlinesAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<Article>> SearchAsync(string query, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
