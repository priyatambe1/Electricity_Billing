using Electricity_Billing.Interfaces;
using Electricity_Billing.Models;
using Electricity_Billing.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Electricity_Billing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ElectricityBillingContext _db;
        private readonly IJWTMangerRepository _iJWTMangerRepository;

        public LoginController(ElectricityBillingContext db, IJWTMangerRepository iJWTMangerRepository)
        {
            _db = db;
            _iJWTMangerRepository = iJWTMangerRepository;
        }

        [HttpGet]
        public IActionResult GetLogins()
        {
            return Ok(_db.Logins);
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(LoginViewModel loginViewModel)
        {
            var token = _iJWTMangerRepository.Authenicate(loginViewModel, false);
            if (token == null)
            {
                return Unauthorized();
            }
            
            // return Ok(new { Token = token.Token });
            return Ok(token);
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register(RegisterViewModel registerViewModel)
        {
            LoginViewModel login = new LoginViewModel
            {
                Emailid = registerViewModel.Emailid,
                Password = registerViewModel.Password,
                Fullname = registerViewModel.Fullname,
                Phonenumber = registerViewModel.Phonenumber,
                Address = registerViewModel.Address,
                Isadmin = registerViewModel.Isadmin
            };

            var token = _iJWTMangerRepository.Authenicate(login, true);
            if (token == null)
            {
                return Unauthorized();
            }
            
            // return Ok(new { Token = token.Token });
                return Ok(token);

        }        
    }
}
