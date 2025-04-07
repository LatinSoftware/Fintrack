var builder = DistributedApplication.CreateBuilder(args);

var apiService = builder.AddProject<Projects.Fintrack_ApiService>("api");
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
