
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Electricity_Billing.ViewModels;

namespace Electricity_Billing.Interfaces
{
    public interface IJWTMangerRepository
    {
        Tokens Authenicate(LoginViewModel users, bool IsRegister);
    }
}