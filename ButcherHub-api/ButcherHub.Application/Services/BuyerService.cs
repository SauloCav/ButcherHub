using ButcherHub.Domain.Models;
using ButcherHub.Domain.Interfaces.Services;
using ButcherHub.Domain.Interfaces.Repositories;

namespace ButcherHub.Application.Services;

public class BuyerService : IBuyerService
{
    private readonly IBuyerRepository _repo;
    private readonly IOrderRepository _orderRepo;

    public BuyerService(
         IBuyerRepository repo,
         IOrderRepository orderRepo)
    {
        _repo = repo;
        _orderRepo = orderRepo;
    }

    public Task<IEnumerable<BuyerModel>> GetAllAsync()
        => _repo.GetAllAsync();

    public Task<BuyerModel?> GetByIdAsync(int id)
        => _repo.GetByIdAsync(id);

    public async Task<BuyerModel> CreateAsync(CreateBuyerModel model)
    {
        var m = new BuyerModel
        {
            Name = model.Name,
            DocumentNumber = model.DocumentNumber,
            City = model.City,
            State = model.State
        };
        m.Id = await _repo.CreateAsync(m);
        return m;
    }

    public async Task<BuyerModel?> UpdateAsync(int id, UpdateBuyerModel model)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing is null) return null;

        existing.Name = model.Name;
        existing.DocumentNumber = model.DocumentNumber;
        existing.City = model.City;
        existing.State = model.State;

        return await _repo.UpdateAsync(existing)
            ? existing
            : null;
    }

    public async Task DeleteAsync(int id)
    {
        if (await _orderRepo.ExistsByBuyerIdAsync(id))
            throw new InvalidOperationException(
            "This buyer cannot be deleted because it is associated with an order");
        
        await _repo.DeleteAsync(id);
    }
}