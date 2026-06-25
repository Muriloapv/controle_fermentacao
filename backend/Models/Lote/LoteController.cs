using arBrain.Data;
using arBrain.DTOs.Lote;
using arBrain.Models.Lote;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace arBrain.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoteController : ControllerBase
{
    private readonly AppDbContext _appDbContext;

    public LoteController(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    [HttpPost]
    public async Task<IActionResult> AddLote(LoteDto dto)
    {
        var lote = new Lote
        {
            LoteDescricao   = dto.LoteDescricao,
            LoteQuantidade  = dto.LoteQuantidade,
            LoteObservacao  = dto.LoteObservacao,
            TanqueId        = dto.TanqueId,
            CervejaId       = dto.CervejaId,
            LoteInicio      = dto.LoteInicio,
            LoteFinalizacao = dto.LoteFinalizacao
        };

        _appDbContext.Lotes.Add(lote);
        await _appDbContext.SaveChangesAsync();

        return Created("Lote criado com sucesso", lote);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Lote>>> GetLotes()
    {
        var listLotes = await _appDbContext.Lotes.ToListAsync();
        return Ok(listLotes);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Lote>> GetLoteById(int id)
    {
        var lote = await _appDbContext.Lotes.FindAsync(id);

        if (lote == null)
            return NotFound("Lote não encontrado! Verifique o ID informado");

        return Ok(lote);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateLote(int id, [FromBody] LoteDto dto)
    {
        var loteAtual = await _appDbContext.Lotes.FindAsync(id);

        if (loteAtual == null)
            return NotFound("Lote não encontrado! Verifique o ID informado");

        loteAtual.LoteDescricao   = dto.LoteDescricao;
        loteAtual.LoteQuantidade  = dto.LoteQuantidade;
        loteAtual.LoteObservacao  = dto.LoteObservacao;
        loteAtual.TanqueId        = dto.TanqueId;
        loteAtual.CervejaId       = dto.CervejaId;
        loteAtual.LoteInicio      = dto.LoteInicio;
        loteAtual.LoteFinalizacao = dto.LoteFinalizacao;

        await _appDbContext.SaveChangesAsync();

        return Ok(loteAtual);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLote(int id)
    {
        var lote = await _appDbContext.Lotes.FindAsync(id);

        if (lote == null)
            return NotFound("Lote não encontrado! Verifique o ID informado");

        lote.LoteExclusao = DateTime.UtcNow;

        await _appDbContext.SaveChangesAsync();
        return Ok(new { message = "Lote deletado com sucesso!", data = lote });
    }
}
