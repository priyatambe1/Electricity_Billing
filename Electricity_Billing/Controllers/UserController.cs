using Electricity_Billing.Models;
using Electricity_Billing.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Electricity_Billing.Controllers
{
     [Authorize]
    //  [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ElectricityBillingContext _context;

        public UserController(ElectricityBillingContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Login>>> GetUsers()
        {
            return await _context.Logins.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Login>> GetUser(int id)
        {
            var user = await _context.Logins.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<Login>> PostUser(Login user)
        {
            _context.Logins.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, Login user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Logins.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Logins.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpGet("profile")]
        public async Task<ActionResult<RegisterViewModel>> GetProfile()
        {
            // Retrieve the email of the authenticated user from Claims
            var userEmail = User.Identity.Name;

            // Fetch user profile details based on the email
            var user = await _context.Logins.FirstOrDefaultAsync(u => u.Emailid == userEmail);
            if (user == null)
            {
                return NotFound("User not found");
            }

            // Return profile details to the client
            var profile = new RegisterViewModel
            {
                Emailid = user.Emailid,
                Fullname = user.Fullname,
                Address = user.Address,
                Phonenumber = user.Phonenumber
            };

            return Ok(profile);
        }


        private bool UserExists(int id)
        {
            return _context.Logins.Any(e => e.Id == id);
        }
    
    
    
    }
}
