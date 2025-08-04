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
        if (!ModelState.IsValid || !data.Confirmed)
            return BadRequest("Некорректные данные");

        var exists = await _context.Registrations
            .AnyAsync(r => r.PhoneNumber == data.PhoneNumber);

        if (exists)
            return Conflict("Пользователь с таким номером уже зарегистрирован.");

        _context.Registrations.Add(data);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Регистрация сохранена!" });
    }
}
