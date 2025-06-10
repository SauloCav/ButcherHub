namespace ButcherHub.Domain.Models;

public class OrderModel
{
    public int Id { get; set; }

    public DateTime OrderDate { get; set; }

    public int BuyerId { get; set; }

    public BuyerModel Buyer { get; set; } = null!;

    public List<OrderItemModel> Items { get; set; } = new();
}