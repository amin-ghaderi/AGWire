using AGWire.Api.Domain.Entities;
using AGWire.Api.Domain.Interfaces;
using AGWire.Api.Infrastructure.Providers.NewsApi.Models;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Json;

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

    public async Task<IReadOnlyList<Article>> GetTopHeadlinesAsync(
        string? category = null,
        CancellationToken cancellationToken = default)
    {
        var requestUrl = BuildTopHeadlinesUrl(category);
        using var response = await _httpClient.GetAsync(requestUrl, cancellationToken);
        response.EnsureSuccessStatusCode();

        var newsApiResponse = await response.Content.ReadFromJsonAsync<NewsApiResponse>(cancellationToken);
        if (newsApiResponse is null)
        {
            throw new InvalidOperationException("Failed to deserialize NewsAPI top-headlines response.");
        }

        return MapArticles(newsApiResponse.Articles, category);
    }

    public async Task<IReadOnlyList<Article>> SearchAsync(string query, CancellationToken cancellationToken = default)
    {
        var requestUrl = BuildSearchUrl(query);
        using var response = await _httpClient.GetAsync(requestUrl, cancellationToken);
        response.EnsureSuccessStatusCode();

        var newsApiResponse = await response.Content.ReadFromJsonAsync<NewsApiResponse>(cancellationToken);
        if (newsApiResponse is null)
        {
            throw new InvalidOperationException("Failed to deserialize NewsAPI search response.");
        }

        return MapArticles(newsApiResponse.Articles, category: null);
    }

    private static IReadOnlyList<Article> MapArticles(IEnumerable<NewsApiArticle> articles, string? category)
    {
        return articles
            .Where(article => !string.IsNullOrWhiteSpace(article.Url) && !string.IsNullOrWhiteSpace(article.Title))
            .Select(article => new Article
            {
                Id = article.Url!,
                Title = article.Title!,
                Description = article.Description,
                Content = article.Content,
                ImageUrl = article.UrlToImage,
                PublishedAt = article.PublishedAt ?? DateTime.UtcNow,
                SourceName = article.Source?.Name ?? "Unknown",
                Url = article.Url!,
                Category = category
            })
            .ToList();
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
