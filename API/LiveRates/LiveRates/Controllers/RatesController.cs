using LiveRates.DataStorage;
using LiveRates.HubConfig;
using LiveRates.TimerFeatures;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LiveRates.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatesController : ControllerBase
    {
        private readonly ILogger _logger;
        private IHubContext<RatesHub> _hub;
        public RatesController(IHubContext<RatesHub> hub)
        {
            _hub = hub;
        }
        // GET: api/RateChanges
        [EnableCors("Policy1")]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var timerManager = new TimerManager(() => _hub.Clients.All.SendAsync("transferRatesData", DataManager.GetData()));

                return Ok(new { Message = "Request Completed" });

            }
            catch(Exception ex)
            {
               return BadRequest("Three requests per hour limit has reaced");
            }

        }

    }
}
