using Fintrack.ApiService.Domain.Entities;
using Fintrack.ApiService.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Fintrack.ApiService.Infrastructure.Data.Extensions;

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

        builder.Property(e => e.UserId).IsRequired()
        .HasConversion(id => id.Value, value => UserId.From(value));

        builder.OwnsOne(e => e.Balance, sa => sa.ConfigureMoney());

        builder.HasOne<Domain.Entities.CurrencyCode>()
            .WithMany()
            .HasForeignKey("currency")
            .HasPrincipalKey(cc => cc.Code)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne<User>()
            .WithMany()
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Restrict); 

        
    }
}
