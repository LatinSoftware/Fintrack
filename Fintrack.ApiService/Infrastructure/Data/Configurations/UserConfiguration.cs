

using Fintrack.ApiService.Domain.Entities;
using Fintrack.ApiService.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Fintrack.ApiService.Infrastructure.Data.Configurations;

public class UserConfiguration :  BaseConfiguration<User>
{
    public override void Configure(EntityTypeBuilder<User> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id)
            .ValueGeneratedNever()
            .HasConversion(id => id.Value, value =>  UserId.From(value))
            .IsRequired();

        builder.Property(e => e.Name).IsRequired()
            .HasMaxLength(100);

        builder.Property(e => e.Email).IsRequired()
            .HasMaxLength(255);

        builder.Property(e => e.Password).IsRequired(false)
            .HasMaxLength(255);

        builder.Property(e => e.Provider).IsRequired(false)
            .HasMaxLength(255);

        builder.Property(e => e.ProviderId).IsRequired(false)
            .HasMaxLength(255);

        builder.Property(e => e.IsDeleted).IsRequired().HasDefaultValue(false);

        builder.HasQueryFilter(u => !u.IsDeleted);
    }
}
