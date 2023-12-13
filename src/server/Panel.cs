namespace server;

using CouchDB.Driver.Types;

public class PanelWrapper : CouchDocument
{
    public Panel Panel { get; set; } = new();
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
