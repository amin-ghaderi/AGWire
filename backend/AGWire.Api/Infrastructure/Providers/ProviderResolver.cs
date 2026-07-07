using AGWire.Api.Domain.Interfaces;

namespace AGWire.Api.Infrastructure.Providers;

public class ProviderResolver
{
    private readonly IReadOnlyList<INewsProvider> _providers;

    public ProviderResolver(IEnumerable<INewsProvider> providers)
    {
        _providers = providers.ToList();
    }

    public INewsProvider GetProvider(string providerType)
    {
        var provider = _providers.FirstOrDefault(candidate =>
            string.Equals(candidate.ProviderType, providerType, StringComparison.OrdinalIgnoreCase));

        if (provider is null)
        {
            throw new InvalidOperationException($"No news provider registered for type '{providerType}'.");
        }

        return provider;
    }
}
