using Microsoft.EntityFrameworkCore;
using ButcherHub.Domain.Models;
using ButcherHub.Domain.Interfaces.Repositories;

namespace ButcherHub.Infrastructure.Data;

public class BuyerRepository : IBuyerRepository
{
    private readonly AppDbContext _ctx;
    public BuyerRepository(AppDbContext ctx) => _ctx = ctx;

    public async Task<IEnumerable<BuyerModel>> GetAllAsync() =>
      await _ctx.Buyers.ToListAsync();

    public async Task<BuyerModel?> GetByIdAsync(int id) =>
      await _ctx.Buyers.FindAsync(id);

    public async Task<int> CreateAsync(BuyerModel m)
    {
        _ctx.Buyers.Add(m);
        await _ctx.SaveChangesAsync();
        return m.Id;
    }

    public async Task<bool> UpdateAsync(BuyerModel m)
    {
        _ctx.Buyers.Update(m);
        await _ctx.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var b = await _ctx.Buyers.FindAsync(id)
          ?? throw new KeyNotFoundException($"Buyer #{id} not found");
        _ctx.Buyers.Remove(b);
        await _ctx.SaveChangesAsync();
        return true;
    }
}