using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeddingSmirkinsSite.DataBase;
using WeddingSmirkinsSite.Models;

[ApiController]
[Route("api/[controller]")]
public class RegistrationController : ControllerBase
{
    private readonly AppDbContext _context;

    public RegistrationController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromBody] Registration data)
    {
        if (!ModelState.IsValid || !data.confirmed)
            return BadRequest("Некорректные данные");

        var exists = await _context.Guest
            .AnyAsync(r => r.phone_number == data.phone_number);

        if (exists)
            return Conflict("Пользователь с таким номером уже зарегистрирован.");

        _context.Guest.Add(data);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Регистрация сохранена!" });
    }
}
