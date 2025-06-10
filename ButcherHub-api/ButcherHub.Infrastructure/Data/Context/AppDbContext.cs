using Microsoft.EntityFrameworkCore;
using ButcherHub.Domain.Models;

namespace ButcherHub.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
      : base(options) { }

    public DbSet<MeatModel> Meats { get; set; }
    public DbSet<BuyerModel> Buyers { get; set; }
    public DbSet<OrderModel> Orders { get; set; }
    public DbSet<OrderItemModel> OrderItems { get; set; }

    protected override void OnModelCreating(ModelBuilder model)
    {
        model.Entity<MeatModel>().ToTable("Meat");
        model.Entity<BuyerModel>().ToTable("Buyer");
        model.Entity<OrderModel>().ToTable("Order");
        model.Entity<OrderItemModel>().ToTable("OrderItem");

        model.Entity<OrderItemModel>()
             .HasKey(oi => new { oi.OrderId, oi.MeatId });
    }
}