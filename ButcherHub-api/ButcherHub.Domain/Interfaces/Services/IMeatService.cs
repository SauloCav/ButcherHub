using ButcherHub.Domain.Models;

namespace ButcherHub.Domain.Interfaces.Services;

public interface IMeatService
{
    Task<IEnumerable<MeatModel>> GetAllAsync();

    Task<MeatModel?> GetByIdAsync(int id);

    Task<MeatModel> CreateAsync(CreateMeatModel model);

    Task<MeatModel?> UpdateAsync(int id, UpdateMeatModel model);

    Task DeleteAsync(int id);
}