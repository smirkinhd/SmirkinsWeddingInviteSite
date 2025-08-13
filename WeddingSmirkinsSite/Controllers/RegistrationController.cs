using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using WeddingSmirkinsSite.Models;

[ApiController]
[Route("api/[controller]")]
public class RegistrationController : ControllerBase
{
    private readonly string _connectionString;

    public RegistrationController(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromBody] Guest data)
    {
        if (!ModelState.IsValid || !data.confirmed)
            return BadRequest("Некорректные данные");

        await using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        await using (var checkCmd = new NpgsqlCommand(
            "SELECT EXISTS (SELECT 1 FROM public.\"Guest\" WHERE phone_number = @phone)", conn))
        {
            checkCmd.Parameters.AddWithValue("phone", data.phone_number);
            var exists = (bool)await checkCmd.ExecuteScalarAsync();
            if (exists)
                return Conflict("Пользователь с таким номером уже зарегистрирован.");
        }

        await using (var insertCmd = new NpgsqlCommand(
            @"INSERT INTO public.""Guest"" 
              (surname, first_name, patronymic, phone_number, confirmed, created_at)
              VALUES (@surname, @first_name, @patronymic, @phone, @confirmed, @created_at)
              RETURNING id;", conn))
        {
            insertCmd.Parameters.AddWithValue("surname", data.surname);
            insertCmd.Parameters.AddWithValue("first_name", data.first_name);
            insertCmd.Parameters.AddWithValue("patronymic", (object?)data.patronymic ?? DBNull.Value);
            insertCmd.Parameters.AddWithValue("phone", data.phone_number);
            insertCmd.Parameters.AddWithValue("confirmed", data.confirmed);
            insertCmd.Parameters.AddWithValue("created_at", DateTime.UtcNow);

            var newId = (long)await insertCmd.ExecuteScalarAsync();
            return Ok(new { message = "Регистрация сохранена!", id = newId });
        }
    }
}
