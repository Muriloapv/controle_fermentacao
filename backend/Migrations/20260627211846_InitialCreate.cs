using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace arBrain.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "cerveja_estilos",
                columns: table => new
                {
                    cerveja_estilo_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    cerveja_estilo_descricao = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    cerveja_estilo_observacao = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    cerveja_estilo_inclusao = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    cerveja_estilo_exclusao = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_cerveja_estilos", x => x.cerveja_estilo_id);
                });

            migrationBuilder.CreateTable(
                name: "tanques",
                columns: table => new
                {
                    tanque_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    tanque_descricao = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    tanque_capacidade = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: false),
                    tanque_observacao = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    tanque_inclusao = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    tanque_exclusao = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_tanques", x => x.tanque_id);
                });

            migrationBuilder.CreateTable(
                name: "cervejas",
                columns: table => new
                {
                    cerveja_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    cerveja_nome = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    cerveja_observacao = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    cerveja_estilo_id = table.Column<int>(type: "integer", nullable: false),
                    cerveja_inclusao = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    cerveja_exclusao = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_cervejas", x => x.cerveja_id);
                    table.ForeignKey(
                        name: "fk_cervejas_cerveja_estilos_cerveja_estilo_id",
                        column: x => x.cerveja_estilo_id,
                        principalTable: "cerveja_estilos",
                        principalColumn: "cerveja_estilo_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "cerveja_parametros",
                columns: table => new
                {
                    cerveja_parametro_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    cerveja_id = table.Column<int>(type: "integer", nullable: false),
                    cerveja_parametro_temperatura_min = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    cerveja_parametro_temperatura_max = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    cerveja_parametro_ph_min = table.Column<decimal>(type: "numeric(5,3)", precision: 5, scale: 3, nullable: false),
                    cerveja_parametro_ph_max = table.Column<decimal>(type: "numeric(5,3)", precision: 5, scale: 3, nullable: false),
                    cerveja_parametro_extrato_min = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    cerveja_parametro_extrato_max = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    cerveja_parametro_observacao = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    cerveja_parametro_inclusao = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    cerveja_parametro_exclusao = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_cerveja_parametros", x => x.cerveja_parametro_id);
                    table.ForeignKey(
                        name: "fk_cerveja_parametros_cervejas_cerveja_id",
                        column: x => x.cerveja_id,
                        principalTable: "cervejas",
                        principalColumn: "cerveja_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "lotes",
                columns: table => new
                {
                    lote_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    lote_descricao = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    lote_quantidade = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: false),
                    lote_observacao = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    tanque_id = table.Column<int>(type: "integer", nullable: false),
                    cerveja_id = table.Column<int>(type: "integer", nullable: false),
                    lote_inicio = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    lote_finalizacao = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    lote_exclusao = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_lotes", x => x.lote_id);
                    table.ForeignKey(
                        name: "fk_lotes_cervejas_cerveja_id",
                        column: x => x.cerveja_id,
                        principalTable: "cervejas",
                        principalColumn: "cerveja_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_lotes_tanques_tanque_id",
                        column: x => x.tanque_id,
                        principalTable: "tanques",
                        principalColumn: "tanque_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "fermentacao_historicos",
                columns: table => new
                {
                    historico_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    lote_id = table.Column<int>(type: "integer", nullable: false),
                    historico_ph = table.Column<decimal>(type: "numeric(5,3)", precision: 5, scale: 3, nullable: false),
                    historico_temperatura = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    historico_extrato = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    historico_observacao = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    historico_responsavel = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    historico_data_coleta = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_fermentacao_historicos", x => x.historico_id);
                    table.ForeignKey(
                        name: "fk_fermentacao_historicos_lotes_lote_id",
                        column: x => x.lote_id,
                        principalTable: "lotes",
                        principalColumn: "lote_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_cerveja_parametros_cerveja_id",
                table: "cerveja_parametros",
                column: "cerveja_id");

            migrationBuilder.CreateIndex(
                name: "ix_cervejas_cerveja_estilo_id",
                table: "cervejas",
                column: "cerveja_estilo_id");

            migrationBuilder.CreateIndex(
                name: "ix_fermentacao_historicos_lote_id",
                table: "fermentacao_historicos",
                column: "lote_id");

            migrationBuilder.CreateIndex(
                name: "ix_lotes_cerveja_id",
                table: "lotes",
                column: "cerveja_id");

            migrationBuilder.CreateIndex(
                name: "ix_lotes_tanque_id",
                table: "lotes",
                column: "tanque_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "cerveja_parametros");

            migrationBuilder.DropTable(
                name: "fermentacao_historicos");

            migrationBuilder.DropTable(
                name: "lotes");

            migrationBuilder.DropTable(
                name: "cervejas");

            migrationBuilder.DropTable(
                name: "tanques");

            migrationBuilder.DropTable(
                name: "cerveja_estilos");
        }
    }
}
