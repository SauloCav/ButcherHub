namespace ButcherHub.Domain.Models;

public class OrderItemModel
{
    public int OrderId { get; set; }
    public int MeatId { get; set; }
    public decimal Price { get; set; }
    public string Currency { get; set; } = null!;

    public OrderModel Order { get; set; } = null!;
    public MeatModel Meat { get; set; } = null!;
}