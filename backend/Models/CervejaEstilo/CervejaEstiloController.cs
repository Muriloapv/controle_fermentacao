using System.Text;
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
            CervejaEstiloDescricao = dto.CervejaEstiloDescricao,
            CervejaEstiloObservacao = dto.CervejaEstiloObservacao
        };

        _appDbContext.CervejaEstilos.Add(estilo);
        await _appDbContext.SaveChangesAsync();

        return Created("Estilo de Cerveja criada com sucesso", estilo);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CervejaEstilo>>> GetEstilos()
    {   //precisa ter await pois terá um leve delay entre request ao banco e o retorno
        var listEstilos = await _appDbContext.CervejaEstilos.ToListAsync();
        return Ok(listEstilos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CervejaEstilo>> GetEstilosById(int id)
    {   //precisa ter await pois terá um leve delay entre request ao banco e o retorno
        var cerveja = await _appDbContext.CervejaEstilos.FindAsync(id);

        if (cerveja == null)
        {
            return NotFound("Estilo de Cerveja não encontrada! Verifique o ID informado");
        }

        return Ok(cerveja);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEstilo(int id, [FromBody] CervejaEstilo estiloAtt)
    {
        var estiloAtual = await _appDbContext.CervejaEstilos.FindAsync(id);

        if (estiloAtual == null)
        {
            return NotFound("Estilo de Cerveja não encontrada! Verifique o ID informado");
        }

        _appDbContext.Entry(estiloAtual).CurrentValues.SetValues(estiloAtt);
        await _appDbContext.SaveChangesAsync();
        return StatusCode(201, estiloAtual);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEstilo(int id)
    {
        var estilo = await _appDbContext.CervejaEstilos.FindAsync(id);

        if (estilo == null)
        {
            return NotFound("Estilo de Cerveja não encontrada! Verifique o ID informado");
        }

        estilo.CervejaEstiloExclusao = DateTime.UtcNow;

        await _appDbContext.SaveChangesAsync();
        return Ok("Cerveja deletada com Sucesso!" + estilo);
    }

}