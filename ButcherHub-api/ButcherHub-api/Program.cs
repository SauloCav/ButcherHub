using ButcherHub.Application.Services;
using ButcherHub.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using ButcherHub.Domain.Interfaces.Services;
using ButcherHub.Domain.Interfaces.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
.AddJsonOptions(opts =>{opts.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;});
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IMeatRepository, MeatRepository>();
builder.Services.AddScoped<IMeatService, MeatService>();
builder.Services.AddScoped<IBuyerRepository, BuyerRepository>();
builder.Services.AddScoped<IBuyerService, BuyerService>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
          .WithOrigins("http://localhost:5173")
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

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseCors("AllowFrontend");

app.UseAuthorization();
app.MapControllers();

app.Run();
