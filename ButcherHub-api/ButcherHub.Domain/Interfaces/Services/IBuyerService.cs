using ButcherHub.Domain.Models;

namespace ButcherHub.Domain.Interfaces.Services;

public interface IBuyerService
{
    Task<IEnumerable<BuyerModel>> GetAllAsync();

    Task<BuyerModel?> GetByIdAsync(int id);

    Task<BuyerModel> CreateAsync(CreateBuyerModel model);

    Task<BuyerModel?> UpdateAsync(int id, UpdateBuyerModel model);

    Task DeleteAsync(int id);
}