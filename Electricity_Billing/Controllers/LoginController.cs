using Electricity_Billing.Interfaces;
using Electricity_Billing.Models;
using Electricity_Billing.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Electricity_Billing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        ElectricityBillingContext db;
        IJWTMangerRepository iJWTMangerRepository;
        public LoginController(ElectricityBillingContext _db, IJWTMangerRepository _iJWTMangerRepository)
        {
            db = _db;
            iJWTMangerRepository = _iJWTMangerRepository;
        }
        [HttpGet]
        public IEnumerable<Login> GetLogins()
        {
            return db.Logins;
        }
        
        [HttpPost]
        [Route("login")]
        public IActionResult Login(LoginViewModel loginViewModel)
        {
            var token = iJWTMangerRepository.Authenicate(loginViewModel, false);
            if (token == null)
            {
                return Unauthorized();
            }
            return Ok(token);
        }
        [HttpPost]
        [Route("register")]
        public IActionResult Register(RegisterViewModel registerViewModel)
        {
            LoginViewModel login = new LoginViewModel();
            login.Emailid = registerViewModel.Emailid;
            login.Password = registerViewModel.Password;
            login.Fullname = registerViewModel.Fullname;
            login.Phonenumber = registerViewModel.Phonenumber;
            login.Address = registerViewModel.Address;
            login.Isadmin = registerViewModel.Isadmin;

            var token = iJWTMangerRepository.Authenicate(login, true);
            if (token == null)
            {
                return Unauthorized();
            }
            return Ok(token);
        }
  }
}