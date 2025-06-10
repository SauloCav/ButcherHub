using Microsoft.AspNetCore.Mvc;
using ButcherHub.Domain.Interfaces.Services;
using ButcherHub.Domain.Models;

namespace ButcherHub.Api.Controllers;

[ApiController]
[Route("api/meats")]
public class MeatManagementController : ControllerBase
{
    private readonly IMeatService _meatService;

    public MeatManagementController(IMeatService meatService)
    {
        _meatService = meatService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var list = await _meatService.GetAllAsync();
        return Ok(list);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var meat = await _meatService.GetByIdAsync(id);
        return meat is null
            ? NotFound(new { message = "Meat not found" })
            : Ok(meat);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateMeatModel model)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var created = await _meatService.CreateAsync(model);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateMeatModel model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var updated = await _meatService.UpdateAsync(id, model);
        if (updated is null)
            return NotFound(new { message = "Meat not found" });

        return Ok(updated);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _meatService.DeleteAsync(id);
            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}