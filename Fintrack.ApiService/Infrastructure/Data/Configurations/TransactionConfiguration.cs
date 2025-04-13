using Fintrack.ApiService.Domain.Entities;
using Fintrack.ApiService.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Fintrack.ApiService.Infrastructure.Data.Extensions;

namespace Fintrack.ApiService.Infrastructure.Data.Configurations;

public class TransactionConfiguration : BaseConfiguration<Transaction>
{
    public override void Configure(EntityTypeBuilder<Transaction> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id)
            .ValueGeneratedNever()
            .HasConversion(id => id.Value, value => TransactionId.From(value))
            .IsRequired();

        builder.Property(e => e.Description).IsRequired()
            .HasMaxLength(500);

        builder.Property(e => e.Date).IsRequired();

        builder.Property(e => e.Type).IsRequired().HasConversion<string>();

        builder.Property(e => e.Note).IsRequired(false)
            .HasMaxLength(200).HasConversion(note => note.Value, value => Note.From(value));

        builder.Property(e => e.Description).IsRequired(false)
            .HasMaxLength(1500);

        builder.Property(e => e.OriginAccountId).IsRequired()
            .HasConversion(id => id.Value, value => AccountId.From(value));
        
        builder.Property(e => e.CategoryId).IsRequired()
            .HasConversion(id => id.Value, value => CategoryId.From(value));

        builder.Property(e => e.UserId).IsRequired()
          .HasConversion(id => id.Value, value => UserId.From(value));

        builder.OwnsOne(e => e.Amount, sa => sa.ConfigureMoney("amount"));

        builder.HasOne<Domain.Entities.CurrencyCode>()
            .WithMany()
            .HasForeignKey("currency")
            .HasPrincipalKey(cc => cc.Code)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.HasOne<User>()
            .WithMany()
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.HasOne<Account>()
            .WithMany()
            .HasForeignKey(e => e.OriginAccountId)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.HasOne<Category>()
            .WithMany()
            .HasForeignKey(e => e.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

         


    }
}
