namespace WeddingSmirkinsSite.Models;

public class Guest
{
    public int id { get; set; }
    public string surname { get; set; } = string.Empty;
    public string first_name { get; set; } = string.Empty;
    public string patronymic { get; set; } = string.Empty;
    public string phone_number { get; set; } = string.Empty;
    public bool confirmed { get; set; }
}
