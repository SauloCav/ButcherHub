using System.ComponentModel.DataAnnotations;

namespace ButcherHub.Domain.Models;

public class CreateOrderItemModel
{
    [Required]
    public int MeatId { get; set; }

    [Required]
    public decimal Price { get; set; }

    [Required]
    public required string Currency { get; set; }
}