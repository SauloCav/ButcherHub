using ButcherHub.Domain.Models;

namespace ButcherHub.Domain.Interfaces.Repositories;

public interface IMeatRepository
{
    Task<IEnumerable<MeatModel>> GetAllAsync();

    Task<MeatModel?> GetByIdAsync(int id);

    Task<int> CreateAsync(MeatModel meat);

    Task<bool> UpdateAsync(MeatModel meat);

    Task<bool> DeleteAsync(int id);
}