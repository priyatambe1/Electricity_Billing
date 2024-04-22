using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Electricity_Billing.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Electricity_Billing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillController : ControllerBase
    {
        private readonly ElectricityBillingContext _context;

        public BillController(ElectricityBillingContext context)
        {
            _context = context;
        }

        // GET: api/Bill
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bill>>> GetBills()
        {
            return await _context.Bills
                .Include(b => b.IdNavigation) // Include navigation property
                .ToListAsync();
        }

        // GET: api/Bill/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bill>> GetBill(int id)
        {
            var bill = await _context.Bills
                .Include(b => b.IdNavigation) // Include navigation property
                .FirstOrDefaultAsync(b => b.Billid == id);

            if (bill == null)
            {
                return NotFound();
            }

            return bill;    
        }

        // POST: api/Bill
        [HttpPost]
        public async Task<ActionResult<Bill>> PostBill(Bill bill)
        {
            _context.Bills.Add(bill);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBill), new { id = bill.Billid }, bill);
        }

        // PUT: api/Bill/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBill(int id, Bill bill)
        {
            if (id != bill.Billid)
            {
                return BadRequest();
            }

            _context.Entry(bill).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BillExists(id))
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

        // DELETE: api/Bill/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBill(int id)
        {
            var bill = await _context.Bills.FindAsync(id);
            if (bill == null)
            {
                return NotFound();
            }

            _context.Bills.Remove(bill);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BillExists(int id)
        {
            return _context.Bills.Any(e => e.Billid == id);
        }
    }
}
