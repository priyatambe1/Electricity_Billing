using System;
using System.Collections.Generic;

namespace Electricity_Billing.Models;

public partial class Bill
{
    public int Billid { get; set; }

    public DateTime Billgendate { get; set; }

    public double Perunitcost { get; set; }

    public double Totalunits { get; set; }

    public decimal Billamount { get; set; }

    public DateTime Billduedate { get; set; }

    public int? Id { get; set; }

    public virtual Login? IdNavigation { get; set; }

    public virtual ICollection<Payment> Payments { get; } = new List<Payment>();
}
