using Microsoft.AspNetCore.Mvc;
using ButcherHub.Domain.Models;
using ButcherHub.Domain.Interfaces.Services;

namespace ButcherHub.Api.Controllers;

[ApiController]
[Route("api/buyers")]
public class BuyerManagementController : ControllerBase
{
    private readonly IBuyerService _buyerService;

    public BuyerManagementController(IBuyerService buyerService)
        => _buyerService = buyerService;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var list = await _buyerService.GetAllAsync();
        return Ok(list);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var buyer = await _buyerService.GetByIdAsync(id);
        return buyer is null
            ? NotFound(new { message = "Buyer not found" })
            : Ok(buyer);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBuyerModel model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var created = await _buyerService.CreateAsync(model);
        return CreatedAtAction(
            nameof(GetById),
            new { id = created.Id },
            created
        );
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        [FromBody] UpdateBuyerModel model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var updated = await _buyerService.UpdateAsync(id, model);
        if (updated is null)
            return NotFound(new { message = "Buyer not found" });

        return Ok(updated);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _buyerService.DeleteAsync(id);
            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}