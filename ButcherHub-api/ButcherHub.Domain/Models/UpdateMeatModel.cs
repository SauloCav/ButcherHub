using ButcherHub.Shared.Utils.Enum;

namespace ButcherHub.Domain.Models;

public class UpdateMeatModel
{
    public string Description { get; set; } = string.Empty;

    public MeatOrigin Origin { get; set; }
}