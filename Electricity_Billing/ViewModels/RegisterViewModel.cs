using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Electricity_Billing.ViewModels
{
    public class RegisterViewModel
    {
        public string? Fullname { get; set; }
        public string Emailid { get; set; }
        public decimal? Phonenumber { get; set; }
        public string? Address { get; set; }

        public string Password { get; set; }
        public int? Isadmin { get; set; }
    }
}