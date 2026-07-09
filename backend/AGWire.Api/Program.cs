using AGWire.Api.Application.Services;
using AGWire.Api.Domain.Interfaces;
using AGWire.Api.Endpoints;
using AGWire.Api.Infrastructure.Persistence.Json;
using AGWire.Api.Infrastructure.Providers;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IProviderRepository, JsonProviderRepository>();
builder.Services.AddScoped<ProviderService>();
builder.Services.AddScoped<NewsService>();
builder.Services.AddHttpClient<INewsProvider, NewsApiProvider>();
builder.Services.AddSingleton<ProviderResolver>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "AGWire API",
        Version = "v1"
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("DefaultCors", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("DefaultCors");

app.MapGet("/health", () => "AGWire API is running");

app.MapNewsEndpoints();

app.Run();
