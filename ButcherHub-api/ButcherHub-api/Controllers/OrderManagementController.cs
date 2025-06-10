using Microsoft.AspNetCore.Mvc;
using ButcherHub.Domain.Models;
using ButcherHub.Domain.Interfaces.Services;

namespace ButcherHub.Api.Controllers;

[ApiController]
[Route("api/orders")]
public class OrderManagementController : ControllerBase
{
    private readonly IOrderService _orderService;
    public OrderManagementController(IOrderService orderService) =>
        _orderService = orderService;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var list = await _orderService.GetAllAsync();
        return Ok(list);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var order = await _orderService.GetByIdAsync(id);
        return order is null
            ? NotFound(new { message = "Order not found" })
            : Ok(order);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateOrderModel model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var order = new OrderModel
        {
            OrderDate = model.OrderDate,
            BuyerId = model.BuyerId
        };
        var items = model.Items
            .Select(i => new OrderItemModel
            {
                MeatId = i.MeatId,
                Price = i.Price,
                Currency = i.Currency
            })
            .ToList();

        var created = await _orderService.CreateAsync(order, items);
        return CreatedAtAction(
            nameof(GetById),
            new { id = created.Id },
            created
        );
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        [FromBody] UpdateOrderModel model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var order = new OrderModel { Id = id, OrderDate = model.OrderDate, BuyerId = model.BuyerId };
        var items = model.Items.Select(i => new OrderItemModel { MeatId = i.MeatId, Price = i.Price, Currency = i.Currency }).ToList();

        try
        {
            var updated = await _orderService.UpdateAsync(order, items);
            return Ok(updated);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _orderService.DeleteAsync(id);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}