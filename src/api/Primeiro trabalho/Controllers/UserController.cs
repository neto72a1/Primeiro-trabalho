using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;



public class Usuario
{
    [Key]
    public int Id { get; set; }
    public string NomeCompleto { get; set; }
    public string Cpf { get; set; }
    public int Idade { get; set; }
    public int Matricula { get; set; }
    public string Senha { get; set; } 
    public string ConfirmarSenha { get; set; }
}


public class LoginRequest
{
    [Required]
    public string Identifier { get; set; } // CPF ou Matrícula
    [Required]
    public string Password { get; set; }
}


public class RegisterRequest
{
    [Required]
    public string FullName { get; set; }
    [Required]
    public string CPF { get; set; }
    [Required]
    public int Age { get; set; }
    [Required]
    public string Registration { get; set; }
    [Required]
    public string Password { get; set; }
    public string ConfirmPassword { get; set; }
}


public class AuthResponse
{
    public string Token { get; set; }
    
}


public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Usuario> Usuarios { get; set; }
}

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await _context.Usuarios.SingleOrDefaultAsync(u =>
            u.Cpf == model.Identifier || u.Matricula == model.Identifier);

        if (user == null)
        {
            return Unauthorized("Usuário não encontrado.");
        }

        
        if (user.Senha != model.Password)
        {
            return Unauthorized("Senha incorreta.");
        }

        
        var token = GenerateJwtToken(user);

        return Ok(new AuthResponse { Token = token });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (await _context.Usuarios.AnyAsync(u => u.Cpf == model.CPF))
        {
            return Conflict("CPF já cadastrado.");
        }

        if (await _context.Usuarios.AnyAsync(u => u.Matricula == model.Registration))
        {
            return Conflict("Matrícula já cadastrada.");
        }

        var newUser = new Usuario
        {
            NomeCompleto = model.FullName,
            Cpf = model.CPF,
            Idade = model.Age,
            Matricula = model.Registration,
            Senha = model.Password, 
            ConfirmarSenha = model.ConfirmPassword,
        };

        _context.Usuarios.Add(newUser);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(Login), new { identifier = newUser.Cpf }, "Usuário cadastrado com sucesso.");
    }

    private string GenerateJwtToken(Usuario user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.NomeCompleto),
            new Claim("cpf", user.Cpf),
            new Claim("matricula", user.Matricula),
            
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(2), 
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}