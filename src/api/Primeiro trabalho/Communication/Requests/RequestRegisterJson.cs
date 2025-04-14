using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Primeiro_trabalho.Communication.Requests;

public class requestRegister
{
    [Required]
    public string NomeCompleto { get; set; }
    [Required]
    public string CPF { get; set; }
    [Required]
    public int Idade { get; set; }
    [Required]
    public string Matricula { get; set; }
    [Required]
    public string Senha { get; set; }
}
