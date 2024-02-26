using Electricity_Billing.Interfaces;
using Electricity_Billing.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Electricity_Billing.ViewModels
{
    public class JWTManagerRepository : IJWTMangerRepository
    {
        Dictionary<string, string> UserRecords;

        private readonly IConfiguration configuration;
        private readonly ElectricityBillingContext db;

        public JWTManagerRepository(IConfiguration _configuration, ElectricityBillingContext _db)
        {
            db = _db;
            configuration = _configuration;
        }
        public Tokens Authenicate(LoginViewModel registerViewModel, bool IsRegister)
        {
            var _isadmin = false;
            if (IsRegister)
            {
                if (db.Logins.Any(x => x.Emailid == registerViewModel.Emailid))
                {
                    return null;
                }
                Login tblLogin = new Login();
                tblLogin.Emailid = registerViewModel.Emailid;
                tblLogin.Password = registerViewModel.Password;
                tblLogin.Fullname = registerViewModel.Fullname;
                 tblLogin.Phonenumber = registerViewModel.Phonenumber;
                 tblLogin.Address = registerViewModel.Address;
                 tblLogin.Isadmin = registerViewModel.Isadmin;
                db.Logins.Add(tblLogin);
                db.SaveChanges();
            }
            else
            {
                _isadmin = db.Logins.Any(x => x.Emailid == registerViewModel.Emailid && x.Password == registerViewModel.Password && x.Isadmin == 1);
            }
            UserRecords = db.Logins.ToList().ToDictionary(x => x.Emailid, x => x.Password);
            if (!UserRecords.Any(x => x.Key == registerViewModel.Emailid && x.Value == registerViewModel.Password))
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenkey = Encoding.UTF8.GetBytes(configuration["JWT:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] {
                new Claim(ClaimTypes.Name,registerViewModel.Emailid)
                }),
                Expires = DateTime.UtcNow.AddMinutes(10),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenkey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return new Tokens { Token = tokenHandler.WriteToken(token), Isadmin = _isadmin };
        }
    }
}