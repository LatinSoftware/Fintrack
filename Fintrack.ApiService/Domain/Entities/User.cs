using Fintrack.ApiService.Domain.Common;
using Fintrack.ApiService.Domain.ValueObjects;

namespace Fintrack.ApiService.Domain.Entities
{
    public class User : BaseEntity
    {
        public UserId Id { get; private set; } = UserId.New();
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? Provider { get; set; }
        public string? ProviderId { get; set; }
        public bool IsDeleted { get; set; } = false;

        private User() { }

        public User(string name, string email, string password)
        {
            if (string.IsNullOrWhiteSpace(name)) throw new ArgumentException("Name cannot be empty.");
            if (string.IsNullOrWhiteSpace(email)) throw new ArgumentException("Email cannot be empty.");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Password cannot be empty.");

            Name = name;
            Email = email;
            Password = password;
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
            IsDeleted = false;
        }

        public static User Create(string name, string email, string password)
        {
            return new User(name, email, password);
        }


        public void Update(string? name, string? email, string? password)
        {
            if (!string.IsNullOrEmpty(name)) {
                Name = name;
            }

            if (!string.IsNullOrEmpty(email))
            {
                Email = email;
            }

            if (!string.IsNullOrEmpty(password))
            {
                Password = password;
            }

            UpdatedAt = DateTime.UtcNow;
        }

        public void SetProvider(string provider, string providerId)
        {
            if (string.IsNullOrWhiteSpace(provider)) throw new ArgumentException("Provider cannot be empty.");
            if (string.IsNullOrWhiteSpace(providerId)) throw new ArgumentException("Provider ID cannot be empty.");

            Provider = provider;
            ProviderId = providerId;
            UpdatedAt = DateTime.UtcNow;
        }

        public void Delete()
        {
            IsDeleted = true;
            UpdatedAt = DateTime.UtcNow;
        }

        public void Restore()
        {
            IsDeleted = false;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
