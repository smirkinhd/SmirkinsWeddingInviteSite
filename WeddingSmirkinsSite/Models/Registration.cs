namespace WeddingSmirkinsSite.Models;

public class Registration
{
    public int Id { get; set; }
    public string Surname { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string Patronymic { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public bool Confirmed { get; set; }
}
