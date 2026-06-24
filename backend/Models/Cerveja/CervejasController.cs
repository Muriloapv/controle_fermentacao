using arBrain.Data;
using arBrain.DTOs.Cerveja;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace arBrain.Models;

[ApiController]
[Route("api/[controller]")]
public class CervejasController : ControllerBase
{
    private readonly AppDbContext _appDbContext;

    public CervejasController(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    [HttpPost]
    public async Task<IActionResult> AddCerveja(CervejaDto dto)
    {
        var cerveja = new Cerveja
        {
            CervejaNome = dto.CervejaNome,
            CervejaObservacao = dto.CervejaObservacao,
            CervejaEstiloId = dto.CervejaEstiloId
        };

        _appDbContext.Cervejas.Add(cerveja);
        await _appDbContext.SaveChangesAsync();

        return Created("Cerveja criada com sucesso", cerveja);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Cerveja>>> GetCervejas()
    {   //precisa ter await pois terá um leve delay entre request ao banco e o retorno
        var listCervejas = await _appDbContext.Cervejas.ToListAsync();
        return Ok(listCervejas);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Cerveja>> GetCervejaById(int id)
    {   //precisa ter await pois terá um leve delay entre request ao banco e o retorno
        var cerveja = await _appDbContext.Cervejas.FindAsync(id);

        if (cerveja == null)
        {
            return NotFound("Cerveja não encontrada! Verifique o ID informado");
        }

        return Ok(cerveja);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCerveja(int id, [FromBody] Cerveja cervejaAtualizada)
    {
        var cervejaAtual = await _appDbContext.Cervejas.FindAsync(id);

        if (cervejaAtual == null)
        {
            return NotFound("Cerveja não encontrada! Verifique o ID informado");
        }

        _appDbContext.Entry(cervejaAtual).CurrentValues.SetValues(cervejaAtualizada);
        await _appDbContext.SaveChangesAsync();
        return StatusCode(201, cervejaAtual);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCerveja(int id)
    {
        var cerveja = await _appDbContext.Cervejas.FindAsync(id);

        if (cerveja == null)
        {
            return NotFound("Cerveja não encontrada! Verifique o ID informado");
        }

        cerveja.CervejaExclusao = DateTime.UtcNow;

        await _appDbContext.SaveChangesAsync();
        return Ok("Cerveja deletada com Sucesso!" + cerveja);
    }


}