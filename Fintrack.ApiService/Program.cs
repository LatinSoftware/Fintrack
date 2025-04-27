using System.Diagnostics;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Carter;
using Fintrack.ApiService.Behaviors;
using Fintrack.ApiService.Infrastructure.Data;
using Fintrack.ApiService.Shared.Exceptions;
using Fintrack.ApiService.Shared.Security;
using Fintrack.ApiService.Shared.Settings;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;


var builder = WebApplication.CreateBuilder(args);

// add options settings

builder.Services.AddOptions<JwtSettings>().Bind(builder.Configuration.GetSection(JwtSettings.SectionName)).ValidateDataAnnotations().ValidateOnStart();

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

// authentication and authorization

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
            ValidAudience = builder.Configuration["JwtSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecretKey"]!))
  
            
        };

        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                context.NoResult();
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.Response.ContentType = "application/json";
                var result = JsonSerializer.Serialize(new { error = "Unauthorized" });
                return context.Response.WriteAsync(result);
            },
            OnChallenge = context =>
            {
                context.HandleResponse();
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.Response.ContentType = "application/json";
                var result = JsonSerializer.Serialize(new { error = "Unauthorized" });
                return context.Response.WriteAsync(result);
            }
        };

    });

builder.Services.AddAuthorization();

builder.Services.AddExceptionHandler<CustomExceptionHandler>();

// Add services to the container.
builder.Services.AddProblemDetails(options => {
    options.CustomizeProblemDetails = context => {
        context.ProblemDetails.Instance =  $"{context.HttpContext.Request.Method} {context.HttpContext.Request.Path}";
        context.ProblemDetails.Extensions.TryAdd("requestId", context.HttpContext.TraceIdentifier);
        Activity? activity = context.HttpContext.Features.Get<IHttpActivityFeature>()?.Activity;
        context.ProblemDetails.Extensions.TryAdd("traceId", activity?.Id);
    };
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase, allowIntegerValues: true));
});

builder.Services.AddCarter();
builder.Services.AddMediatR(cfg => {
    cfg.RegisterServicesFromAssemblyContaining<Program>();
    cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
});

builder.Services.AddValidatorsFromAssemblyContaining(typeof(Program), includeInternalTypes: true);

builder.Services.AddScoped<IJwtProvider, JwtProvider>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseExceptionHandler();
app.UseStatusCodePages();

app.UseAuthentication();
app.UseAuthorization();

using var scope = app.Services.CreateScope();
var db = scope.ServiceProvider.GetRequiredService<ApplicationContext>();
db.Database.EnsureCreated();
Seed.ExecuteAsync(db);



if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}


app.MapDefaultEndpoints();

app.MapCarter();

app.Run();
