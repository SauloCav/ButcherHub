using ButcherHub.Domain.Models;

namespace ButcherHub.Domain.Interfaces.Services;

public interface IOrderService
{
    Task<IEnumerable<OrderModel>> GetAllAsync();

    Task<OrderModel?> GetByIdAsync(int id);

    Task<OrderModel> CreateAsync(OrderModel order, IEnumerable<OrderItemModel> items);

    Task<OrderModel> UpdateAsync(OrderModel order, IEnumerable<OrderItemModel> items);

    Task DeleteAsync(int id);
}