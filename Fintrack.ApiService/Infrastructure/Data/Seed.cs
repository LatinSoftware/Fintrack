using Fintrack.ApiService.Domain.Entities;

namespace Fintrack.ApiService.Infrastructure.Data;

public static class Seed
{
    public static void ExecuteAsync(ApplicationContext context)
    {
        if (!context.Users.Any())
        {
            var user = new User("system", "system@example.com", "system");
            context.Users.Add(user);
            context.SaveChanges();
        }
    }
}
