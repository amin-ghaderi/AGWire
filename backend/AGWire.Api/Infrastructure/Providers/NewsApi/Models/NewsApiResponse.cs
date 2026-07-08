namespace AGWire.Api.Infrastructure.Providers.NewsApi.Models;

public class NewsApiResponse
{
    public string? Status { get; set; }

    public int TotalResults { get; set; }

    public List<NewsApiArticle> Articles { get; set; } = [];
}
