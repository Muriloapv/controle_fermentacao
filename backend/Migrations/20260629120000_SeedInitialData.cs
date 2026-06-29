using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Infrastructure;
using arBrain.Data;

#nullable disable

namespace arBrain.Migrations
{
    /// <inheritdoc />
    [DbContext(typeof(AppDbContext))]
    [Migration("20260629120000_SeedInitialData")]
    public partial class SeedInitialData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                insert into cerveja_estilos
                    (cerveja_estilo_id, cerveja_estilo_descricao, cerveja_estilo_observacao, cerveja_estilo_inclusao, cerveja_estilo_exclusao)
                values
                    (1, 'India Pale Ale (IPA)', 'Estilo lupulado com perfil aromático intenso.', '2026-06-01 08:00:00', null),
                    (2, 'Pilsen', 'Estilo claro, leve e refrescante.', '2026-06-01 08:05:00', null),
                    (3, 'Witbier', 'Cerveja de trigo com notas cítricas e especiarias.', '2026-06-01 08:10:00', null),
                    (4, 'Stout', 'Estilo escuro com notas torradas.', '2026-06-01 08:15:00', null),
                    (5, 'American Pale Ale', 'Estilo equilibrado com presença moderada de lúpulo.', '2026-06-01 08:20:00', null)
                on conflict (cerveja_estilo_id) do nothing;

                insert into tanques
                    (tanque_id, tanque_descricao, tanque_capacidade, tanque_observacao, tanque_inclusao, tanque_exclusao)
                values
                    (1, 'Tanque 01', 500.00, 'Tanque principal para fermentação de ales.', '2026-06-01 09:00:00', null),
                    (2, 'Tanque 02', 750.00, 'Tanque com controle dedicado de temperatura.', '2026-06-01 09:05:00', null),
                    (3, 'Tanque 03', 1000.00, 'Tanque usado para lotes maiores.', '2026-06-01 09:10:00', null),
                    (4, 'Tanque 04', 300.00, 'Tanque piloto para testes de receita.', '2026-06-01 09:15:00', null),
                    (5, 'Tanque 05', 650.00, 'Tanque reserva para fermentações sazonais.', '2026-06-01 09:20:00', null)
                on conflict (tanque_id) do nothing;

                insert into cervejas
                    (cerveja_id, cerveja_nome, cerveja_observacao, cerveja_estilo_id, cerveja_inclusao, cerveja_exclusao)
                values
                    (1, 'Hop Storm IPA', 'Receita com perfil cítrico e amargor alto.', 1, '2026-06-01 10:00:00', null),
                    (2, 'Vale Pilsen', 'Receita base de baixa fermentação.', 2, '2026-06-01 10:05:00', null),
                    (3, 'Trigo Dourado', 'Receita leve com trigo e casca de laranja.', 3, '2026-06-01 10:10:00', null),
                    (4, 'Meia-Noite Stout', 'Receita escura com notas de café.', 4, '2026-06-01 10:15:00', null),
                    (5, 'Costa APA', 'Receita com lúpulos americanos e corpo médio.', 5, '2026-06-01 10:20:00', null)
                on conflict (cerveja_id) do nothing;

                insert into cerveja_parametros
                    (
                        cerveja_parametro_id,
                        cerveja_id,
                        cerveja_parametro_temperatura_min,
                        cerveja_parametro_temperatura_max,
                        cerveja_parametro_ph_min,
                        cerveja_parametro_ph_max,
                        cerveja_parametro_extrato_min,
                        cerveja_parametro_extrato_max,
                        cerveja_parametro_observacao,
                        cerveja_parametro_inclusao,
                        cerveja_parametro_exclusao
                    )
                values
                    (1, 1, 18.00, 22.00, 4.200, 4.600, 2.00, 3.00, 'Faixa recomendada para IPA.', '2026-06-01 11:00:00', null),
                    (2, 2, 10.00, 14.00, 4.300, 4.800, 2.20, 2.80, 'Faixa recomendada para Pilsen.', '2026-06-01 11:05:00', null),
                    (3, 3, 17.00, 21.00, 4.000, 4.400, 2.50, 3.20, 'Faixa recomendada para Witbier.', '2026-06-01 11:10:00', null),
                    (4, 4, 18.00, 21.00, 4.300, 4.700, 3.00, 4.00, 'Faixa recomendada para Stout.', '2026-06-01 11:15:00', null),
                    (5, 5, 17.00, 22.00, 4.200, 4.600, 2.20, 3.00, 'Faixa recomendada para APA.', '2026-06-01 11:20:00', null)
                on conflict (cerveja_parametro_id) do nothing;

                insert into lotes
                    (lote_id, lote_descricao, lote_quantidade, lote_observacao, tanque_id, cerveja_id, lote_inicio, lote_finalizacao, lote_exclusao)
                values
                    (1, 'Lote IPA 001', 480.00, 'Primeiro lote da Hop Storm IPA.', 1, 1, '2026-06-02 08:00:00', null, null),
                    (2, 'Lote Pilsen 001', 700.00, 'Lote de produção regular.', 2, 2, '2026-06-02 09:00:00', null, null),
                    (3, 'Lote Witbier 001', 920.00, 'Lote com perfil cítrico.', 3, 3, '2026-06-03 08:30:00', null, null),
                    (4, 'Lote Stout 001', 280.00, 'Lote piloto de stout.', 4, 4, '2026-06-03 10:00:00', null, null),
                    (5, 'Lote APA 001', 620.00, 'Lote sazonal de APA.', 5, 5, '2026-06-04 08:00:00', null, null)
                on conflict (lote_id) do nothing;

                insert into fermentacao_historicos
                    (historico_id, lote_id, historico_ph, historico_temperatura, historico_extrato, historico_observacao, historico_responsavel, historico_data_coleta)
                values
                    (1, 1, 4.400, 20.00, 2.60, 'Registro dentro do padrão.', 'Mestre Cervejeiro', '2026-06-05 08:00:00'),
                    (2, 2, 4.500, 13.00, 2.50, 'Registro dentro do padrão.', 'Mestre Cervejeiro', '2026-06-05 09:00:00'),
                    (3, 3, 4.500, 21.30, 3.10, 'Temperatura próxima do limite superior.', 'Analista de Fermentação', '2026-06-05 10:00:00'),
                    (4, 4, 4.900, 23.50, 4.40, 'Registro fora da faixa recomendada.', 'Analista de Fermentação', '2026-06-05 11:00:00'),
                    (5, 5, 4.100, 16.70, 2.10, 'Registro requer atenção.', 'Mestre Cervejeiro', '2026-06-05 12:00:00')
                on conflict (historico_id) do nothing;

                select setval(pg_get_serial_sequence('cerveja_estilos', 'cerveja_estilo_id'), greatest((select max(cerveja_estilo_id) from cerveja_estilos), 1));
                select setval(pg_get_serial_sequence('tanques', 'tanque_id'), greatest((select max(tanque_id) from tanques), 1));
                select setval(pg_get_serial_sequence('cervejas', 'cerveja_id'), greatest((select max(cerveja_id) from cervejas), 1));
                select setval(pg_get_serial_sequence('cerveja_parametros', 'cerveja_parametro_id'), greatest((select max(cerveja_parametro_id) from cerveja_parametros), 1));
                select setval(pg_get_serial_sequence('lotes', 'lote_id'), greatest((select max(lote_id) from lotes), 1));
                select setval(pg_get_serial_sequence('fermentacao_historicos', 'historico_id'), greatest((select max(historico_id) from fermentacao_historicos), 1));
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                delete from fermentacao_historicos
                where historico_data_coleta in (
                    '2026-06-05 08:00:00',
                    '2026-06-05 09:00:00',
                    '2026-06-05 10:00:00',
                    '2026-06-05 11:00:00',
                    '2026-06-05 12:00:00'
                );

                delete from lotes
                where lote_descricao in (
                    'Lote IPA 001',
                    'Lote Pilsen 001',
                    'Lote Witbier 001',
                    'Lote Stout 001',
                    'Lote APA 001'
                );

                delete from cerveja_parametros
                where cerveja_parametro_observacao in (
                    'Faixa recomendada para IPA.',
                    'Faixa recomendada para Pilsen.',
                    'Faixa recomendada para Witbier.',
                    'Faixa recomendada para Stout.',
                    'Faixa recomendada para APA.'
                );

                delete from cervejas
                where cerveja_nome in (
                    'Hop Storm IPA',
                    'Vale Pilsen',
                    'Trigo Dourado',
                    'Meia-Noite Stout',
                    'Costa APA'
                );

                delete from tanques
                where tanque_descricao in (
                    'Tanque 01',
                    'Tanque 02',
                    'Tanque 03',
                    'Tanque 04',
                    'Tanque 05'
                );

                delete from cerveja_estilos
                where cerveja_estilo_descricao in (
                    'India Pale Ale (IPA)',
                    'Pilsen',
                    'Witbier',
                    'Stout',
                    'American Pale Ale'
                );

                select setval(pg_get_serial_sequence('cerveja_estilos', 'cerveja_estilo_id'), greatest(coalesce((select max(cerveja_estilo_id) from cerveja_estilos), 1), 1));
                select setval(pg_get_serial_sequence('tanques', 'tanque_id'), greatest(coalesce((select max(tanque_id) from tanques), 1), 1));
                select setval(pg_get_serial_sequence('cervejas', 'cerveja_id'), greatest(coalesce((select max(cerveja_id) from cervejas), 1), 1));
                select setval(pg_get_serial_sequence('cerveja_parametros', 'cerveja_parametro_id'), greatest(coalesce((select max(cerveja_parametro_id) from cerveja_parametros), 1), 1));
                select setval(pg_get_serial_sequence('lotes', 'lote_id'), greatest(coalesce((select max(lote_id) from lotes), 1), 1));
                select setval(pg_get_serial_sequence('fermentacao_historicos', 'historico_id'), greatest(coalesce((select max(historico_id) from fermentacao_historicos), 1), 1));
                """);
        }
    }
}
