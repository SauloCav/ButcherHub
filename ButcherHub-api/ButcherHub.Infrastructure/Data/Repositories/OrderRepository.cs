using Microsoft.EntityFrameworkCore;
using ButcherHub.Domain.Models;
using ButcherHub.Domain.Interfaces.Repositories;

namespace ButcherHub.Infrastructure.Data;

public class OrderRepository : IOrderRepository
{
    private readonly AppDbContext _ctx;
    public OrderRepository(AppDbContext ctx) => _ctx = ctx;

    public async Task<IEnumerable<OrderModel>> GetAllAsync() =>
        await _ctx.Orders
                  .Include(o => o.Buyer)
                  .Include(o => o.Items)
                    .ThenInclude(oi => oi.Meat)
                  .ToListAsync();

    public async Task<OrderModel?> GetByIdAsync(int id) =>
        await _ctx.Orders
                  .Include(o => o.Buyer)
                  .Include(o => o.Items)
                    .ThenInclude(oi => oi.Meat)
                  .FirstOrDefaultAsync(o => o.Id == id);

    public async Task<int> CreateAsync(OrderModel order, IEnumerable<OrderItemModel> items)
    {
        order.Items = items.ToList();
        _ctx.Orders.Add(order);
        await _ctx.SaveChangesAsync();
        return order.Id;
    }

    public async Task UpdateAsync(OrderModel order, IEnumerable<OrderItemModel> items)
    {
        var existing = await _ctx.Orders
                                 .Include(o => o.Items)
                                 .FirstOrDefaultAsync(o => o.Id == order.Id)
                       ?? throw new KeyNotFoundException($"Order #{order.Id} not found");

        existing.OrderDate = order.OrderDate;
        existing.BuyerId = order.BuyerId;

        _ctx.OrderItems.RemoveRange(existing.Items);
        existing.Items = items.ToList();
        await _ctx.SaveChangesAsync();
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var o = await _ctx.Orders.FindAsync(id)
             ?? throw new KeyNotFoundException($"Order #{id} not found");
        _ctx.Orders.Remove(o);
        await _ctx.SaveChangesAsync();
        return true;
    }

    public Task<bool> ExistsByMeatIdAsync(int meatId) =>
        _ctx.OrderItems.AnyAsync(oi => oi.MeatId == meatId);

    public Task<bool> ExistsByBuyerIdAsync(int buyerId) =>
        _ctx.Orders.AnyAsync(o => o.BuyerId == buyerId);
}