# Modelagem do Banco de Dados

## Modelagem banco de dados relacional seguindo o desafio proposto:

```sql
create table cerveja_estilo (
   cervejaestilo_id         serial       not null,
   cervejaestilo_descricao  varchar(200) not null,
   cervejaestilo_observacao text,
   cervejaestilo_inclusao   timestamp    not null default clock_timestamp(),
   cervejaestilo_exclusao   timestamp,

   constraint cervejaestilo_pkey primary key ( cervejaestilo_id )
);

create table tanque (
   tanque_id         serial        not null,
   tanque_descricao  varchar(200)  not null,
   tanque_capacidade numeric(10,2) not null,
   tanque_observacao text,
   tanque_inclusao   timestamp     not null default clock_timestamp(),
   tanque_exclusao   timestamp,

   constraint tanque_pkey primary key ( tanque_id )
);

create table cerveja (
   cerveja_id         serial       not null,
   cerveja_nome       varchar(200) not null,
   cervejaestilo_id   int          not null,
   cerveja_observacao text,
   cerveja_inclusao   timestamp    not null default clock_timestamp(),
   cerveja_exclusao   timestamp,

   constraint cerveja_pkey             primary key ( cerveja_id       ),
   constraint cerveja_cervejaestilo_fk foreign key ( cervejaestilo_id ) references cerveja_estilo( cervejaestilo_id )
);

create table lote (
   lote_id          serial        not null,
   lote_descricao   varchar(200)  not null,
   lote_quantidade  numeric(10,2) not null,
   lote_observacao  text,
   tanque_id        int           not null,
   cerveja_id       int           not null,
   lote_inicio      timestamp     not null,
   lote_finalizacao timestamp,
   lote_exclusao    timestamp,

   constraint lote_pkey          primary key ( lote_id    ),
   constraint lote_cerveja_id_fk foreign key ( cerveja_id ) references cerveja( cerveja_id ),
   constraint lote_tanque_id_fk  foreign key ( tanque_id  ) references tanque ( tanque_id  )
);

create table cerveja_parametros (
   parametro_id              serial        not null,
   cerveja_id                int           not null,
   parametro_temperatura_min numeric(5,2)  not null,
   parametro_temperatura_max numeric(5,2)  not null,
   parametro_ph_min          numeric(5,3)  not null,
   parametro_ph_max          numeric(5,3)  not null,
   parametro_extrato_min     numeric(5,2)  not null,
   parametro_extrato_max     numeric(5,2)  not null,
   parametro_observacao      text,
   parametro_inclusao        timestamp     not null default clock_timestamp(),
   parametro_exclusao        timestamp,

   constraint cerveja_parametros_pkey          primary key ( parametro_id ),
   constraint cerveja_parametros_cerveja_id_fk foreign key ( cerveja_id   ) references cerveja( cerveja_id )
);

create table fermentacao_historico (
   historico_id          serial        not null,
   lote_id               int           not null,
   historico_ph          numeric(5,3)  not null,
   historico_temperatura numeric(5,2)  not null,
   historico_extrato     numeric(5,2)  not null,
   historico_observacao  text,
   historico_responsavel varchar(200)  not null,
   historico_data_coleta timestamp     not null,

   constraint fermentacao_historico_pk primary key ( historico_id ),
   constraint fermentacao_lote_id_fk   foreign key ( lote_id      ) references lote( lote_id )
);
```
