using arBrain.Data;
using arBrain.DTOs.CervejaEstilo;
using arBrain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace arBrain.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CervejaEstiloController : ControllerBase
{
    private readonly AppDbContext _appDbContext;

    public CervejaEstiloController(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    [HttpPost]
    public async Task<IActionResult> AddEstilo(CervejaEstiloDto dto)
    {
        var estilo = new CervejaEstilo
        {
            CervejaEstiloDescricao  = dto.CervejaEstiloDescricao,
            CervejaEstiloObservacao = dto.CervejaEstiloObservacao
        };

        _appDbContext.CervejaEstilos.Add(estilo);
        await _appDbContext.SaveChangesAsync();

        return Created( "Estilo de Cerveja criado com sucesso", estilo );
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CervejaEstilo>>> GetEstilos()
    {
        var listEstilos = await _appDbContext.CervejaEstilos.ToListAsync();
        return Ok(listEstilos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CervejaEstilo>> GetEstiloById(int id)
    {
        var estilo = await _appDbContext.CervejaEstilos.FindAsync(id);

        if (estilo == null)
            return NotFound("Estilo de Cerveja não encontrado! Verifique o ID informado");

        return Ok(estilo);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEstilo(int id, [FromBody] CervejaEstiloDto dto)
    {
        var estiloAtual = await _appDbContext.CervejaEstilos.FindAsync(id);

        if (estiloAtual == null)
            return NotFound("Estilo de Cerveja não encontrado! Verifique o ID informado");

        estiloAtual.CervejaEstiloDescricao  = dto.CervejaEstiloDescricao;
        estiloAtual.CervejaEstiloObservacao = dto.CervejaEstiloObservacao;

        await _appDbContext.SaveChangesAsync();
        return Ok(estiloAtual);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEstilo(int id)
    {
        var estilo = await _appDbContext.CervejaEstilos.FindAsync(id);

        if (estilo == null)
            return NotFound("Estilo de Cerveja não encontrado! Verifique o ID informado");

        estilo.CervejaEstiloExclusao = DateTime.UtcNow;

        await _appDbContext.SaveChangesAsync();
        return Ok(new { message = "Estilo de Cerveja deletado com sucesso!", data = estilo });
    }
}
