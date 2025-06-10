using System.ComponentModel.DataAnnotations;

namespace ButcherHub.Domain.Models;

public class CreateBuyerModel
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string DocumentNumber { get; set; } = string.Empty;

    [Required]
    public required string City { get; set; }

    [Required]
    public required string State { get; set; }
}