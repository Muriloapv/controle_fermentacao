using arBrain.Data;
using arBrain.DTOs.Tanque;
using arBrain.Models.Tanque;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace arBrain.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TanqueController : ControllerBase
{
    private readonly AppDbContext _appDbContext;

    public TanqueController(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    [HttpPost]
    public async Task<IActionResult> AddTanque(TanqueDto dto)
    {
        var tanque = new Tanque
        {
            TanqueDescricao  = dto.TanqueDescricao,
            TanqueObservacao = dto.TanqueObservacao,
            TanqueCapacidade = dto.TanqueCapacidade
        };

        _appDbContext.Tanques.Add(tanque);
        await _appDbContext.SaveChangesAsync();

        return Created("Tanque registrado com sucesso!", tanque);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Tanque>>> GetTanques()
    {
        var listTanques = await _appDbContext.Tanques.ToListAsync();
        return Ok(listTanques);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Tanque>> GetTanqueById(int id)
    {
        var tanque = await _appDbContext.Tanques.FindAsync(id);

        if (tanque == null)
            return NotFound("Tanque não encontrado! Verifique o ID informado.");

        return Ok(tanque);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTanque(int id, [FromBody] TanqueDto dto)
    {
        var tanqueAtual = await _appDbContext.Tanques.FindAsync(id);

        if (tanqueAtual == null)
            return NotFound("Tanque não encontrado! Verifique o ID informado.");

        tanqueAtual.TanqueDescricao  = dto.TanqueDescricao;
        tanqueAtual.TanqueCapacidade = dto.TanqueCapacidade;
        tanqueAtual.TanqueObservacao = dto.TanqueObservacao;

        await _appDbContext.SaveChangesAsync();

        return Ok(tanqueAtual);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTanque(int id)
    {
        var tanque = await _appDbContext.Tanques.FindAsync(id);

        if (tanque == null)
            return NotFound("Tanque não encontrado! Verifique o ID informado.");

        tanque.TanqueExclusao = DateTime.UtcNow;
        await _appDbContext.SaveChangesAsync();

        return Ok(new { message = "Tanque deletado com sucesso!", data = tanque });
    }
}
