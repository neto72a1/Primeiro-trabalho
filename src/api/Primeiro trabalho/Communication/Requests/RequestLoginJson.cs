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

public class RequestLoginJson
{
    [Required]
    public string Identifier { get; set; } // CPF ou Matrícula
    [Required]
    public string Password { get; set; }
}
