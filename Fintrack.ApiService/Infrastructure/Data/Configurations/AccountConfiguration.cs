using Fintrack.ApiService.Domain.Entities;
using Fintrack.ApiService.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Fintrack.ApiService.Infrastructure.Data.Configurations;

public class AccountConfiguration : BaseConfiguration<Account>
{
    public override void Configure(EntityTypeBuilder<Account> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id)
            .HasConversion(id => id.Value, value => AccountId.From(value))
            .IsRequired();

        builder.Property(e => e.Name).IsRequired()
            .HasMaxLength(100);

        builder.Property(e => e.Description).IsRequired()
            .HasMaxLength(500);

        builder.Property(e => e.Type).IsRequired().HasConversion<string>();

        builder.Property(e => e.Balance).IsRequired();

        builder.OwnsOne(e => e.Balance, sa =>
        {
            sa.Property(e => e.Amount).IsRequired().HasPrecision(18,2);
            sa.Property(e => e.Currency)
            .IsRequired()
                .HasMaxLength(3)
                .HasConversion<string>();

            sa.WithOwner();

            sa.HasOne<Domain.Entities.CurrencyCode>()
                .WithMany()
                .HasForeignKey(e => e.Currency)
                .OnDelete(DeleteBehavior.Restrict);
            
        });

        builder.Property(e => e.UserId).IsRequired(false)
        .HasConversion(id => id.Value, value => UserId.From(value));

        builder.HasOne<User>()
            .WithMany()
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Restrict); 

        
    }
}
