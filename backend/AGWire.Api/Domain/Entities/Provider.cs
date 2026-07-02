namespace AGWire.Api.Domain.Entities;

public class Provider
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public required string Type { get; set; }

    public string? ApiKey { get; set; }

    public bool Enabled { get; set; }

    public int Priority { get; set; }
}
