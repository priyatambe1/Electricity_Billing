using System;
using System.Collections.Generic;

namespace Electricity_Billing.Models;

public partial class Payment
{
    public int Paymentid { get; set; }

    public DateTime Paymentdate { get; set; }

    public int Id { get; set; }

    public int Billid { get; set; }

    public string Paymentstatus { get; set; } = null!;

    public virtual Bill Bill { get; set; } = null!;

    public virtual Login IdNavigation { get; set; } = null!;
}
