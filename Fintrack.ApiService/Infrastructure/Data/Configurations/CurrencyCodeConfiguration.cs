using System;
using Fintrack.ApiService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Fintrack.ApiService.Infrastructure.Data.Configurations;

public class CurrencyCodeConfiguration : IEntityTypeConfiguration<CurrencyCode>
{
    public void Configure(EntityTypeBuilder<CurrencyCode> builder)
    {
        builder.HasKey(e => e.Code);
        builder.Property(e => e.Code)
            .IsRequired()
            .HasMaxLength(3);
        builder.Property(e => e.Name)
            .IsRequired()
            .HasMaxLength(50);
        builder.Property(e => e.Symbol)
            .IsRequired()
            .HasMaxLength(10);
    }
}
