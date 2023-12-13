namespace server;

using CouchDB.Driver.Extensions;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("panels")]
public class PanelsController : ControllerBase
{
    private readonly PanelsContext _context;

    public PanelsController()
    {
        _context = new PanelsContext();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<PanelWrapper>>> Get([FromRoute] string id)
    {
        var panel = await _context.Panels.FirstOrDefaultAsync(x => x.Id == id);
        return panel != default
            ? Ok(panel)
            : NotFound();
    }

    [HttpPost("{id}")]
    public async Task<ActionResult<PanelWrapper>> Create([FromRoute] string id)
    {
        var newPanel = new PanelWrapper()
        {
            Id = id,
            Panel = new Panel()
            {
                List = new List<string>()
                {
                    "one",
                    "two",
                    "three",
                }
            }
        };

        var addResult = await _context.Panels.AddAsync(newPanel);
        
        return Ok(addResult);
    }
}