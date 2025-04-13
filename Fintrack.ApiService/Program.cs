using Fintrack.ApiService.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);


// Add service defaults & Aspire client integrations.
builder.AddServiceDefaults();

// builder.AddNpgsqlDbContext<ApplicationContext>(connectionName: "fintrackdb");
builder.Services.AddDbContextPool<ApplicationContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("fintrackdb") ?? throw new InvalidOperationException("Connection string 'fintrackdb' not found."));
    options.UseSnakeCaseNamingConvention();
});

builder.EnrichNpgsqlDbContext<ApplicationContext>(configureSettings: settings =>
{
    settings.DisableRetry = false;
    settings.CommandTimeout = 30;
});

// Add services to the container.
builder.Services.AddProblemDetails();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();


var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler();

using var scope = app.Services.CreateScope();
var db = scope.ServiceProvider.GetRequiredService<ApplicationContext>();
db.Database.EnsureCreated();



if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

string[] summaries = ["Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"];

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.MapDefaultEndpoints();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
