using System.ComponentModel.DataAnnotations;

namespace ButcherHub.Domain.Models;

public class CreateOrderModel
{
    [Required] 
    public DateTime OrderDate { get; set; }

    [Required] 
    public int BuyerId { get; set; }

    [Required] 
    public List<CreateOrderItemModel> Items { get; set; } = new();
}

public class UpdateOrderModel : CreateOrderModel { }