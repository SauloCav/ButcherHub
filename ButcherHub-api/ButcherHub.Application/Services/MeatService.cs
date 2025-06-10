using ButcherHub.Domain.Models;
using ButcherHub.Domain.Interfaces.Services;
using ButcherHub.Domain.Interfaces.Repositories;

namespace ButcherHub.Application.Services;

public class MeatService : IMeatService
{
    private readonly IMeatRepository _meatRepo;
    private readonly IOrderRepository _orderRepo;

    public MeatService(
         IMeatRepository repo,
         IOrderRepository orderRepo)
    {
        _meatRepo = repo;
        _orderRepo = orderRepo;
    }

    public Task<IEnumerable<MeatModel>> GetAllAsync()
        => _meatRepo.GetAllAsync();

    public Task<MeatModel?> GetByIdAsync(int id)
        => _meatRepo.GetByIdAsync(id);

    public async Task<MeatModel> CreateAsync(CreateMeatModel model)
    {
        var m = new MeatModel
        {
            Description = model.Description,
            Origin = model.Origin
        };
        m.Id = await _meatRepo.CreateAsync(m);
        return m;
    }

    public async Task<MeatModel?> UpdateAsync(int id, UpdateMeatModel model)
    {
        var existing = await _meatRepo.GetByIdAsync(id);
        if (existing is null) return null;

        existing.Description = model.Description;
        existing.Origin = model.Origin;
        var ok = await _meatRepo.UpdateAsync(existing);
        return ok ? existing : null;
    }

    public async Task DeleteAsync(int id)
    {
        if (await _orderRepo.ExistsByMeatIdAsync(id))
            throw new InvalidOperationException(
            "This meat cannot be deleted because it is associated with an order");
        
        await _meatRepo.DeleteAsync(id);
    }
}