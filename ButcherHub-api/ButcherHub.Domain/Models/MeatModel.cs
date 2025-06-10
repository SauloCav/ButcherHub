using ButcherHub.Shared.Utils.Enum;
using System.ComponentModel.DataAnnotations;

namespace ButcherHub.Domain.Models;

public class MeatModel
{
    public int Id { get; set; }

    [Required]
    public required string Description { get; set; }

    public MeatOrigin Origin { get; set; }
}