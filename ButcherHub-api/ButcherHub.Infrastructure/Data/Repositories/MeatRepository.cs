using Microsoft.EntityFrameworkCore;
using ButcherHub.Domain.Models;
using ButcherHub.Domain.Interfaces.Repositories;

namespace ButcherHub.Infrastructure.Data;

public class MeatRepository : IMeatRepository
{
    private readonly AppDbContext _ctx;
    public MeatRepository(AppDbContext ctx) => _ctx = ctx;

    public async Task<IEnumerable<MeatModel>> GetAllAsync() =>
      await _ctx.Meats.ToListAsync();

    public async Task<MeatModel?> GetByIdAsync(int id) =>
      await _ctx.Meats.FindAsync(id);

    public async Task<int> CreateAsync(MeatModel m)
    {
        _ctx.Meats.Add(m);
        await _ctx.SaveChangesAsync();
        return m.Id;
    }

    public async Task<bool> UpdateAsync(MeatModel m)
    {
        _ctx.Meats.Update(m);
        await _ctx.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var m = await _ctx.Meats.FindAsync(id)
          ?? throw new KeyNotFoundException($"Meat #{id} not found");
        _ctx.Meats.Remove(m);
        await _ctx.SaveChangesAsync();
        return true;
    }
}