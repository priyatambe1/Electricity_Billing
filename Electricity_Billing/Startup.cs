using System.Text;
using System.Text.Json.Serialization;
using Electricity_Billing.Interfaces;
using Electricity_Billing.Models;
using Electricity_Billing.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

namespace Electricity_Billing.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthorization();
            services.AddControllers();
            services.AddSwaggerGen();
            services.AddDbContext<ElectricityBillingContext>(options => options.UseNpgsql(Configuration.GetConnectionString("ConnectionString")));
            services.AddTransient<IJWTMangerRepository, JWTManagerRepository>();

            services.AddControllers()
     .AddJsonOptions(options =>
     {
         options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
     });



            services.AddAuthentication(x =>
          {
              x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
              x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
          }).AddJwtBearer(o =>
          {
              var key = Encoding.UTF8.GetBytes(Configuration["JWT:Key"]);
              o.SaveToken = true;
              o.TokenValidationParameters = new TokenValidationParameters
              {
                  ValidateIssuer = false,
                  ValidateAudience = false,
                  ValidateLifetime = true,
                  ValidateIssuerSigningKey = true,
                  ValidIssuer = Configuration["JWT:Issuer"],
                  ValidAudience = Configuration["JWT:Audience"],
                  IssuerSigningKey = new SymmetricSecurityKey(key)
              };
          });
        }



        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseHttpsRedirection();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}