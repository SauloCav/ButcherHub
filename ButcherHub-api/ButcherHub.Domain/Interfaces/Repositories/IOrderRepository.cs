using ButcherHub.Domain.Models;

namespace ButcherHub.Domain.Interfaces.Repositories;

public interface IOrderRepository
{
    Task<IEnumerable<OrderModel>> GetAllAsync();

    Task<OrderModel?> GetByIdAsync(int id);

    Task<int> CreateAsync(OrderModel order, IEnumerable<OrderItemModel> items);

    Task UpdateAsync(OrderModel order, IEnumerable<OrderItemModel> items);

    Task<bool> DeleteAsync(int id);

    Task<bool> ExistsByMeatIdAsync(int meatId);

    Task<bool> ExistsByBuyerIdAsync(int buyerId);
}