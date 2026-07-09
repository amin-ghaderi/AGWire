using AGWire.Api.Application.Services;

namespace AGWire.Api.Endpoints;

public static class NewsEndpoints
{
    public static void MapNewsEndpoints(this WebApplication app)
    {
        app.MapGet("/api/news", async (string? category, NewsService newsService, CancellationToken cancellationToken) =>
        {
            var articles = await newsService.GetTopHeadlinesAsync(category, cancellationToken);
            return Results.Ok(articles);
        });

        app.MapGet("/api/news/search", async (string? q, NewsService newsService, CancellationToken cancellationToken) =>
        {
            if (string.IsNullOrWhiteSpace(q))
            {
                return Results.BadRequest();
            }

            var results = await newsService.SearchAsync(q, cancellationToken);
            return Results.Ok(results);
        });
    }
}
