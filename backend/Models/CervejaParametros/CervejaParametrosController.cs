using arBrain.Data;
using arBrain.DTOs.CervejaParametro;
using arBrain.Models.CervejaParametros;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace arBrain.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CervejaParametroController : ControllerBase
{
    private readonly AppDbContext _appDbContext;

    public CervejaParametroController(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    [HttpPost]
    public async Task<IActionResult> AddParametro(CervejaParametroDto dto)
    {
        var parametro = new CervejaParametro
        {
            CervejaId                      = dto.CervejaId,
            CervejaParametroTemperaturaMin = dto.CervejaParametroTemperaturaMin,
            CervejaParametroTemperaturaMax = dto.CervejaParametroTemperaturaMax,
            CervejaParametroPhMin          = dto.CervejaParametroPhMin,
            CervejaParametroPhMax          = dto.CervejaParametroPhMax,
            CervejaParametroExtratoMin     = dto.CervejaParametroExtratoMin,
            CervejaParametroExtratoMax     = dto.CervejaParametroExtratoMax,
            CervejaParametroObservacao     = dto.CervejaParametroObservacao
        };

        _appDbContext.CervejaParametros.Add(parametro);
        await _appDbContext.SaveChangesAsync();

        return Created("Parâmetro da cerveja criado com sucesso", parametro);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CervejaParametro>>> GetParametros()
    {
        var listParametros = await _appDbContext.CervejaParametros.ToListAsync();
        return Ok(listParametros);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CervejaParametro>> GetParametroById(int id)
    {
        var parametro = await _appDbContext.CervejaParametros.FindAsync(id);

        if (parametro == null)
            return NotFound("Parâmetro da cerveja não encontrado! Verifique o ID informado.");

        return Ok(parametro);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateParametro(int id, [FromBody] CervejaParametroDto dto)
    {
        var parametroAtual = await _appDbContext.CervejaParametros.FindAsync(id);

        if (parametroAtual == null)
            return NotFound("Parâmetro da cerveja não encontrado! Verifique o ID informado.");

        parametroAtual.CervejaId                      = dto.CervejaId;
        parametroAtual.CervejaParametroTemperaturaMin = dto.CervejaParametroTemperaturaMin;
        parametroAtual.CervejaParametroTemperaturaMax = dto.CervejaParametroTemperaturaMax;
        parametroAtual.CervejaParametroPhMin          = dto.CervejaParametroPhMin;
        parametroAtual.CervejaParametroPhMax          = dto.CervejaParametroPhMax;
        parametroAtual.CervejaParametroExtratoMin     = dto.CervejaParametroExtratoMin;
        parametroAtual.CervejaParametroExtratoMax     = dto.CervejaParametroExtratoMax;
        parametroAtual.CervejaParametroObservacao     = dto.CervejaParametroObservacao;

        await _appDbContext.SaveChangesAsync();

        return Ok(parametroAtual);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteParametro(int id)
    {
        var parametro = await _appDbContext.CervejaParametros.FindAsync(id);

        if (parametro == null)
            return NotFound("Parâmetro da cerveja não encontrado! Verifique o ID informado.");

        parametro.CervejaParametroExclusao = DateTime.UtcNow;

        await _appDbContext.SaveChangesAsync();

        return Ok(new { message = "Parâmetro da cerveja deletado com sucesso!", data = parametro });
    }
}
