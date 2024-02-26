using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Electricity_Billing.Models;

public partial class ElectricityBillingContext : DbContext
{
    public ElectricityBillingContext()
    {
    }

    public ElectricityBillingContext(DbContextOptions<ElectricityBillingContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Login> Logins { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Database=Electricity_Billing;Username=postgres;Password=Priya;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Login>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("login_pkey");

            entity.ToTable("login");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.Emailid)
                .HasMaxLength(255)
                .HasColumnName("emailid");
            entity.Property(e => e.Fullname)
                .HasMaxLength(255)
                .HasColumnName("fullname");
            entity.Property(e => e.Isadmin).HasColumnName("isadmin");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Phonenumber)
                .HasPrecision(10)
                .HasColumnName("phonenumber");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
