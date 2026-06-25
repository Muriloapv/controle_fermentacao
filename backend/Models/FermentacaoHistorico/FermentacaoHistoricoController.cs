using System.Data.SqlTypes;
using System.Xml;
using arBrain.Data;
using arBrain.DTOs.FermentacaoHistorico;
using arBrain.Models.FermentacaoHistorico;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace arBrain.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FermentacaoHistoricoController : ControllerBase
{
    private readonly AppDbContext _appDbContext;

    public FermentacaoHistoricoController(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    [HttpPost]
    public async Task<IActionResult> AddHistorico(FermentacaoHistoricoDto dto)
    {
        var historico = new FermentacaoHistorico
        {
            HistoricoPh = dto.HistoricoPh,
            HistoricoExtrato = dto.HistoricoExtrato,
            HistoricoTemperatura = dto.HistoricoTemperatura,
            HistoricoResponsavel = dto.HistoricoResponsavel,
            HistoricoObservacao = dto.HistoricoObservacao,
            HistoricoDataColeta = dto.HistoricoDataColeta
        };

        _appDbContext.FermentacaoHistoricos.Add(historico);
        await _appDbContext.SaveChangesAsync();

        return Created( "Historico registrado com sucesso!", historico);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<FermentacaoHistorico>>> GetHistoricos()
    {
        var listHistorico = await _appDbContext.FermentacaoHistoricos.ToListAsync();
        return Ok( listHistorico );
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<FermentacaoHistorico>> GetHistoricoById(int id )
    {
        var historico = await _appDbContext.FermentacaoHistoricos.FindAsync(id);

        if ( historico == null)
        {
            return NotFound("Historico não encontrado! Verifique o ID informado");
        }

        return Ok( historico );
    }


    //O historico não deve poder ser alterado nem deletado, visando a confiabilidade das informações
    // [HttpPut("`{id}")] || [[HttpDelete("{id}")]]


}