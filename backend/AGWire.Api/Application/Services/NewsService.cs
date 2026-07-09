using AGWire.Api.Domain.Entities;
using AGWire.Api.Domain.Interfaces;
using AGWire.Api.Infrastructure.Providers;

namespace AGWire.Api.Application.Services;

public class NewsService
{
    private readonly IProviderRepository _providerRepository;
    private readonly ProviderResolver _providerResolver;

    public NewsService(IProviderRepository providerRepository, ProviderResolver providerResolver)
    {
        _providerRepository = providerRepository;
        _providerResolver = providerResolver;
    }

    public async Task<IReadOnlyList<Article>> GetTopHeadlinesAsync(
        string? category = null,
        CancellationToken cancellationToken = default)
    {
        var provider = await GetHighestPriorityEnabledProviderAsync(cancellationToken);
        if (provider is null)
        {
            return [];
        }

        var newsProvider = _providerResolver.GetProvider(provider.Type);
        return await newsProvider.GetTopHeadlinesAsync(category, cancellationToken);
    }

    public async Task<IReadOnlyList<Article>> SearchAsync(
        string query,
        CancellationToken cancellationToken = default)
    {
        var provider = await GetHighestPriorityEnabledProviderAsync(cancellationToken);
        if (provider is null)
        {
            return [];
        }

        var newsProvider = _providerResolver.GetProvider(provider.Type);
        return await newsProvider.SearchAsync(query, cancellationToken);
    }

    private async Task<Provider?> GetHighestPriorityEnabledProviderAsync(CancellationToken cancellationToken)
    {
        var providers = await _providerRepository.GetAllAsync(cancellationToken);
        return providers
            .Where(provider => provider.Enabled)
            .OrderBy(provider => provider.Priority)
            .FirstOrDefault();
    }
}
