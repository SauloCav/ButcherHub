using ButcherHub.Domain.Models;
using ButcherHub.Domain.Interfaces.Services;
using ButcherHub.Domain.Interfaces.Repositories;

namespace ButcherHub.Application.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _repo;
    public OrderService(IOrderRepository repo) => _repo = repo;

    public Task<IEnumerable<OrderModel>> GetAllAsync() =>
        _repo.GetAllAsync();

    public Task<OrderModel?> GetByIdAsync(int id) =>
        _repo.GetByIdAsync(id);

    public async Task<OrderModel> CreateAsync(OrderModel order, IEnumerable<OrderItemModel> items)
    {
        var newId = await _repo.CreateAsync(order, items);
        return await _repo.GetByIdAsync(newId) 
               ?? throw new KeyNotFoundException($"Order #{newId} not found");
    }

    public async Task<OrderModel> UpdateAsync(OrderModel order, IEnumerable<OrderItemModel> items)
    {
        await _repo.UpdateAsync(order, items);
        return await _repo.GetByIdAsync(order.Id) 
               ?? throw new KeyNotFoundException($"Order #{order.Id} not found");
    }

    public async Task DeleteAsync(int id)
    {
        await _repo.DeleteAsync(id);
    }
}