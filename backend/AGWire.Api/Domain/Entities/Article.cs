namespace AGWire.Api.Domain.Entities;

public class Article
{
    public required string Id { get; set; }

    public required string Title { get; set; }

    public string? Description { get; set; }

    public string? Content { get; set; }

    public string? ImageUrl { get; set; }

    public DateTime PublishedAt { get; set; }

    public required string SourceName { get; set; }

    public required string Url { get; set; }

    public string? Category { get; set; }
}
