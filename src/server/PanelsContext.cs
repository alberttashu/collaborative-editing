namespace server;

using CouchDB.Driver;
using CouchDB.Driver.Options;

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