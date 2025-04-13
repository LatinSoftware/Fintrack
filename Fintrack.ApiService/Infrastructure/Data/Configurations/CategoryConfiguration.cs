using Fintrack.ApiService.Domain.Entities;
using Fintrack.ApiService.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Fintrack.ApiService.Infrastructure.Data.Configurations;

public class CategoryConfiguration : BaseConfiguration<Category>
{
    public override void Configure(EntityTypeBuilder<Category> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id)
            .ValueGeneratedNever()
            .HasConversion(id => id.Value, value => CategoryId.From(value))
            .IsRequired();

        builder.Property(e => e.Name).IsRequired()
            .HasMaxLength(100);

        builder.Property(e => e.Description).IsRequired(false)
            .HasMaxLength(500);

        builder.Property(e => e.Type).IsRequired().HasConversion<string>().HasMaxLength(100);

        builder.Property(e => e.UserId)
        .HasConversion(id => id.Value, value => UserId.From(value))
        .IsRequired();



        builder.Property(e => e.ParentId)
        .IsRequired(false)
        .HasConversion(
            id => ConvertParentIdToGuid(id),
            value => ConvertGuidToParentId(value));
        
        builder.HasOne<User>()
            .WithMany()
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Restrict);

    }

    private static Guid? ConvertParentIdToGuid(CategoryId? id)
    {
        return id.HasValue ? id.Value.Value : (Guid?)null;
    }

    private static CategoryId? ConvertGuidToParentId(Guid? value)
    {
        return value.HasValue ? CategoryId.From(value.Value) : null;
    }
}
