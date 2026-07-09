using AGWire.Api.Domain.Entities;
using AGWire.Api.Domain.Interfaces;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;

namespace AGWire.Api.Infrastructure.Providers;

public class NewsApiProvider : INewsProvider
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private readonly string _baseUrl;

    public NewsApiProvider(HttpClient httpClient, IConfiguration configuration)
    {
        ArgumentNullException.ThrowIfNull(httpClient);
        ArgumentNullException.ThrowIfNull(configuration);

        _httpClient = httpClient;

        var apiKey = configuration["NewsApi:ApiKey"];
        if (string.IsNullOrEmpty(apiKey))
        {
            throw new InvalidOperationException("NewsApi:ApiKey is not configured.");
        }

        var baseUrl = configuration["NewsApi:BaseUrl"];
        if (string.IsNullOrEmpty(baseUrl))
        {
            throw new InvalidOperationException("NewsApi:BaseUrl is not configured.");
        }

        _apiKey = apiKey;
        _baseUrl = baseUrl;
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

    private string BuildTopHeadlinesUrl(string? category)
    {
        var queryParameters = new List<KeyValuePair<string, string?>>
        {
            new("apiKey", _apiKey),
            new("country", "us")
        };

        if (!string.IsNullOrWhiteSpace(category))
        {
            queryParameters.Add(new KeyValuePair<string, string?>("category", category));
        }

        return BuildUrl("top-headlines", queryParameters);
    }

    private string BuildSearchUrl(string query)
    {
        var queryParameters = new List<KeyValuePair<string, string?>>
        {
            new("apiKey", _apiKey),
            new("q", query)
        };

        return BuildUrl("everything", queryParameters);
    }

    private string BuildUrl(string endpoint, IEnumerable<KeyValuePair<string, string?>> queryParameters)
    {
        var normalizedBaseUrl = _baseUrl.EndsWith('/') ? _baseUrl : $"{_baseUrl}/";
        var requestPath = $"{normalizedBaseUrl}{endpoint.TrimStart('/')}";

        var query = queryParameters
            .Where(parameter => !string.IsNullOrWhiteSpace(parameter.Value))
            .ToDictionary(parameter => parameter.Key, parameter => parameter.Value);

        return QueryHelpers.AddQueryString(requestPath, query);
    }
}
