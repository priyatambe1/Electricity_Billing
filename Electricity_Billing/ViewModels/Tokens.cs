using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Electricity_Billing.ViewModels
{
    public class Tokens
    {
        public string Token { get; set; }

        public string RefreshToken { get; set; }

        public bool Isadmin { get; set; }
    }
}