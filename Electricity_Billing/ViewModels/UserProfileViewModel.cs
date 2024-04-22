using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Electricity_Billing.ViewModels
{
    public class UserProfileViewModel
    {
        
     public string Emailid { get; set; }

        public string Password { get; set; }
        public string? Fullname { get; internal set; }
        public string? Address { get; internal set; }
        public decimal? Phonenumber { get; internal set; }


    }
}