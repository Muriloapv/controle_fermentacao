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
            LoteId               = dto.LoteId,
            HistoricoPh          = dto.HistoricoPh,
            HistoricoExtrato     = dto.HistoricoExtrato,
            HistoricoTemperatura = dto.HistoricoTemperatura,
            HistoricoResponsavel = dto.HistoricoResponsavel,
            HistoricoObservacao  = dto.HistoricoObservacao,
            HistoricoDataColeta  = dto.HistoricoDataColeta
        };

        _appDbContext.FermentacaoHistoricos.Add(historico);
        await _appDbContext.SaveChangesAsync();

        return Created("Historico registrado com sucesso!", historico);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<FermentacaoHistorico>>> GetHistoricos()
    {
        var listHistorico = await _appDbContext.FermentacaoHistoricos.ToListAsync();
        return Ok(listHistorico);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<FermentacaoHistorico>> GetHistoricoById(int id)
    {
        var historico = await _appDbContext.FermentacaoHistoricos.FindAsync(id);

        if (historico == null)
            return NotFound("Historico não encontrado! Verifique o ID informado");

        return Ok(historico);
    }

    // O historico não pode ser alterado nem deletado para garantir a confiabilidade das informações

    [HttpGet("ultimos-registros")]
    public async Task<ActionResult<IEnumerable<LoteParametroAtualDto>>> GetLotesParametrosAtuais()
    {
         var dados = await _appDbContext.LotesParametrosAtuais.FromSqlRaw("""
                with ftUltimoRegistro as (
                    select fh.lote_id, max( fh.historico_id ) as historico_id 
                    from fermentacao_historicos fh 
                    group by fh.lote_id
                )
                select lot.lote_id, lot.lote_descricao, cp.cerveja_parametro_extrato_min, cp.cerveja_parametro_extrato_max, cp.cerveja_parametro_temperatura_min, cp.cerveja_parametro_temperatura_max, cp.cerveja_parametro_ph_min, cp.cerveja_parametro_ph_max,   
                    case when fh.historico_temperatura < cp.cerveja_parametro_temperatura_min then 'abaixo'
                            when fh.historico_temperatura > cp.cerveja_parametro_temperatura_max then 'acima'
                            else 'ok'
                    end as temperatura_padrao,
                    case when fh.historico_ph < cp.cerveja_parametro_extrato_max then 'abaixo'
                            when fh.historico_ph > cp.cerveja_parametro_ph_max then 'acima'
                            else 'ok'
                    end as ph_padrao,
                    case when fh.historico_extrato < cp.cerveja_parametro_extrato_min then 'abaixo'
                            when fh.historico_extrato > cp.cerveja_parametro_extrato_max then 'acima'
                            else 'ok'
                    end as extrato_padrao
                from ftUltimoRegistro	    ft
                join fermentacao_historicos fh  on fh.historico_id = ft.historico_id 
                join lotes 					lot on lot.lote_id    = ft.lote_id and lot.lote_exclusao is null and lot.lote_finalizacao is null
                join cerveja_parametros 	cp  on cp.cerveja_id = lot.cerveja_id and cp.cerveja_parametro_exclusao is null
                order by ft.lote_id 
         """).ToListAsync();

         return Ok(dados);
    }


}
