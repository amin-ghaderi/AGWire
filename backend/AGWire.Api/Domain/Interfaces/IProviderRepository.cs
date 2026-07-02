using AGWire.Api.Domain.Entities;

namespace AGWire.Api.Domain.Interfaces;

public interface IProviderRepository
{
    Task<IReadOnlyList<Provider>> GetAllAsync(CancellationToken cancellationToken = default);

    Task<Provider?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    Task AddAsync(Provider provider, CancellationToken cancellationToken = default);

    Task UpdateAsync(Provider provider, CancellationToken cancellationToken = default);
}
