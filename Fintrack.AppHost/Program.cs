var builder = DistributedApplication.CreateBuilder(args);

var username = builder.AddParameter("username", secret: true);
var password = builder.AddParameter("password", secret: true);

var postgres = builder.AddPostgres("postgres", username, password, 5432).WithDataVolume();
var postgresDb  = postgres.AddDatabase("fintrackdb", "fintrack");

var apiService = builder.AddProject<Projects.Fintrack_ApiService>("api")
.WithReference(postgresDb)
.WaitFor(postgres)
;
var webPort = 5173;


builder
.AddNpmApp("web", "../Fintrack.Web", "dev")
.WithPnpmPackageInstallation()
.WaitFor(apiService)
.WithReference(apiService)
.WithEnvironment("BROWSER", "none")
.WithHttpEndpoint(env: "VITE_PORT", port: webPort)
.WithExternalHttpEndpoints()
.PublishAsDockerFile();


builder.Build().Run();
