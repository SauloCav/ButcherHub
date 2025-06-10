using ButcherHub.Shared.Utils.Enum;
using System.ComponentModel.DataAnnotations;

namespace ButcherHub.Domain.Models;

public class CreateMeatModel
{
    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    public MeatOrigin Origin { get; set; }
}