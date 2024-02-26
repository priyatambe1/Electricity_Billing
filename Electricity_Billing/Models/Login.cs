using System;
using System.Collections.Generic;

namespace Electricity_Billing.Models;

public partial class Login
{
    public int Id { get; set; }

    public string? Fullname { get; set; }

    public string Emailid { get; set; }

    public decimal? Phonenumber { get; set; }

    public string? Address { get; set; }

    public string Password { get; set; }

    public int? Isadmin { get; set; }
}
