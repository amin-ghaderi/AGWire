using System.Text.Json;
using AGWire.Api.Domain.Entities;
using AGWire.Api.Domain.Interfaces;

namespace AGWire.Api.Infrastructure.Persistence.Json;

public class JsonProviderRepository : IProviderRepository
{
    private const string RelativeFilePath = "Data/providers.json";

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        WriteIndented = true
    };

    private readonly string _filePath;

    public JsonProviderRepository(string? filePath = null)
    {
        _filePath = filePath ?? Path.Combine(Directory.GetCurrentDirectory(), RelativeFilePath);
    }

    public async Task<IReadOnlyList<Provider>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await ReadProvidersAsync(cancellationToken);
    }

    public async Task<Provider?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var providers = await ReadProvidersAsync(cancellationToken);
        return providers.FirstOrDefault(provider => provider.Id == id);
    }

    public async Task AddAsync(Provider provider, CancellationToken cancellationToken = default)
    {
        var providers = (await ReadProvidersAsync(cancellationToken)).ToList();
        providers.Add(provider);
        await WriteProvidersAsync(providers, cancellationToken);
    }

    public async Task UpdateAsync(Provider provider, CancellationToken cancellationToken = default)
    {
        var providers = (await ReadProvidersAsync(cancellationToken)).ToList();
        var index = providers.FindIndex(existing => existing.Id == provider.Id);

        if (index < 0)
        {
            throw new InvalidOperationException($"Provider with id '{provider.Id}' was not found.");
        }

        providers[index] = provider;
        await WriteProvidersAsync(providers, cancellationToken);
    }

    private async Task<IReadOnlyList<Provider>> ReadProvidersAsync(CancellationToken cancellationToken)
    {
        if (!File.Exists(_filePath))
        {
            return [];
        }

        await using var stream = new FileStream(
            _filePath,
            FileMode.Open,
            FileAccess.Read,
            FileShare.Read,
            bufferSize: 4096,
            useAsync: true);

        if (stream.Length == 0)
        {
            return [];
        }

        var providers = await JsonSerializer.DeserializeAsync<List<Provider>>(stream, JsonOptions, cancellationToken);
        return providers ?? [];
    }

    private async Task WriteProvidersAsync(IList<Provider> providers, CancellationToken cancellationToken)
    {
        var directory = Path.GetDirectoryName(_filePath);
        if (!string.IsNullOrEmpty(directory))
        {
            Directory.CreateDirectory(directory);
        }

        await using var stream = new FileStream(
            _filePath,
            FileMode.Create,
            FileAccess.Write,
            FileShare.None,
            bufferSize: 4096,
            useAsync: true);

        await JsonSerializer.SerializeAsync(stream, providers, JsonOptions, cancellationToken);
    }
}
