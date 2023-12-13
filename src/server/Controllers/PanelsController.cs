using CouchDB.Driver;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers;

using CouchDB.Driver.Extensions;
using CouchDB.Driver.Options;
using CouchDB.Driver.Types;

class PanelsContext : CouchContext
{
    public CouchDatabase<PanelWrapper> Panels { get; set; }

    protected override void OnConfiguring(CouchOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        optionsBuilder
            .UseEndpoint("http://localhost:5984/")
            .EnsureDatabaseExists()
            .UseBasicAuthentication("admin", "password");
    }

    protected override void OnDatabaseCreating(CouchDatabaseBuilder databaseBuilder)
    {
        base.OnDatabaseCreating(databaseBuilder);
        databaseBuilder.Document<PanelWrapper>()
            .ToDatabase("panels");
    }
}

[ApiController]
[Route("panels")]
public class PanelsController : ControllerBase
{
    private readonly ILogger<PanelsController> _logger;
    private readonly PanelsContext _context;

    public PanelsController(ILogger<PanelsController> logger)
    {
        _logger = logger;
        _context = new PanelsContext();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<Panel>>> Get([FromRoute] string id)
    {
        var panel = await _context.Panels.FirstOrDefaultAsync(x => x.Id == id);
        return panel != default
            ? Ok(panel)
            : NotFound();
    }

    [HttpPost("{id}")]
    public async Task<ActionResult<string>> Create([FromRoute] string id)
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
        return Ok(addResult.Id);
    }
}

internal class MyContext
{
}

/*
 *
    let [panel, setPanel] = useState({
        counter: 1,
        list: [ "one", "two" ],
        switches: {
            a: true,
            b: false,
            c: true,
            d: false
        }
    });
 * */
public class PanelWrapper : CouchDocument
{
    public Panel Panel { get; set; }
}

public class Panel
{
    public int Counter { get; set; }
    public IReadOnlyCollection<string>? List { get; set; }
    public Switches Switches { get; set; } = new();
}

public class Switches
{
    public bool A { get; set; }
    public bool B { get; set; }
    public bool C { get; set; }
    public bool D { get; set; }
}
