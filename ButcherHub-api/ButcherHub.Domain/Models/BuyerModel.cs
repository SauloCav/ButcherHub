namespace ButcherHub.Domain.Models;

public class BuyerModel
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string DocumentNumber { get; set; } = string.Empty;

    public string? City { get; set; }

    public string? State { get; set; }
}