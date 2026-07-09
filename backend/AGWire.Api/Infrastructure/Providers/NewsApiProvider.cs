using AGWire.Api.Domain.Entities;
using AGWire.Api.Domain.Interfaces;
using Microsoft.Extensions.Configuration;

namespace AGWire.Api.Infrastructure.Providers;

public class NewsApiProvider : INewsProvider
{
    private readonly HttpClient _httpClient;
    private readonly string? _apiKey;
    private readonly string? _baseUrl;

    public NewsApiProvider(HttpClient httpClient, IConfiguration configuration)
    {
        ArgumentNullException.ThrowIfNull(httpClient);
        ArgumentNullException.ThrowIfNull(configuration);

        _httpClient = httpClient;
        _apiKey = configuration["NewsApi:ApiKey"];
        _baseUrl = configuration["NewsApi:BaseUrl"];
    }

    public string ProviderType => "newsapi";

    public Task<IReadOnlyList<Article>> GetTopHeadlinesAsync(
        string? category = null,
        CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<Article>> SearchAsync(string query, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
