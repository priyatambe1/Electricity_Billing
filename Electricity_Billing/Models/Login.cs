using System;
using System.Collections.Generic;

namespace Electricity_Billing.Models;

public partial class Login
{
    public int Id { get; set; }

    public string? Fullname { get; set; }

    public string Emailid { get; set; } = null!;

    public decimal? Phonenumber { get; set; }

    public string? Address { get; set; }

    public string Password { get; set; } = null!;

    public int? Isadmin { get; set; }

    public virtual ICollection<Bill> Bills { get; } = new List<Bill>();

    public virtual ICollection<Payment> Payments { get; } = new List<Payment>();
}
