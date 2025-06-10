using ButcherHub.Domain.Models;

namespace ButcherHub.Domain.Interfaces.Repositories;

public interface IBuyerRepository
{
    Task<IEnumerable<BuyerModel>> GetAllAsync();

    Task<BuyerModel?> GetByIdAsync(int id);

    Task<int> CreateAsync(BuyerModel buyer);

    Task<bool> UpdateAsync(BuyerModel buyer);

    Task<bool> DeleteAsync(int id);
}