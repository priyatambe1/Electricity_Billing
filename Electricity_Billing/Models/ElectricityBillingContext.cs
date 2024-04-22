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

    public virtual DbSet<Bill> Bills { get; set; }

    public virtual DbSet<Login> Logins { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Database=Electricity_Billing;Username=postgres;Password=Priya;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Bill>(entity =>
        {
            entity.HasKey(e => e.Billid).HasName("bill_pkey");

            entity.ToTable("bill");

            entity.Property(e => e.Billid).HasColumnName("billid");
            entity.Property(e => e.Billamount).HasColumnName("billamount");
            entity.Property(e => e.Billduedate)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("billduedate");
            entity.Property(e => e.Billgendate)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("billgendate");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Perunitcost).HasColumnName("perunitcost");
            entity.Property(e => e.Totalunits).HasColumnName("totalunits");

            entity.HasOne(d => d.IdNavigation).WithMany(p => p.Bills)
                .HasForeignKey(d => d.Id)
                .HasConstraintName("bill_id_fkey");
        });

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

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.Paymentid).HasName("payment_pkey");

            entity.ToTable("payment");

            entity.HasIndex(e => e.Id, "IX_payment_Id");

            entity.HasIndex(e => e.Billid, "IX_payment_billid");

            entity.Property(e => e.Paymentid).HasColumnName("paymentid");
            entity.Property(e => e.Billid).HasColumnName("billid");
            entity.Property(e => e.Paymentdate)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("paymentdate");
            entity.Property(e => e.Paymentstatus).HasColumnName("paymentstatus");

            entity.HasOne(d => d.Bill).WithMany(p => p.Payments)
                .HasForeignKey(d => d.Billid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_payment_bill");

            entity.HasOne(d => d.IdNavigation).WithMany(p => p.Payments)
                .HasForeignKey(d => d.Id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_payment_login");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
