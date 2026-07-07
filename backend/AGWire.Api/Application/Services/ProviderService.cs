using AGWire.Api.Domain.Entities;
using AGWire.Api.Domain.Interfaces;

namespace AGWire.Api.Application.Services;

public class ProviderService
{
    private readonly IProviderRepository _providerRepository;

    public ProviderService(IProviderRepository providerRepository)
    {
        _providerRepository = providerRepository;
    }

    public Task<IReadOnlyList<Provider>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return _providerRepository.GetAllAsync(cancellationToken);
    }

    public Task<Provider?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return _providerRepository.GetByIdAsync(id, cancellationToken);
    }

    public Task AddAsync(Provider provider, CancellationToken cancellationToken = default)
    {
        return _providerRepository.AddAsync(provider, cancellationToken);
    }

    public Task UpdateAsync(Provider provider, CancellationToken cancellationToken = default)
    {
        return _providerRepository.UpdateAsync(provider, cancellationToken);
    }
}
