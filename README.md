# controle_fermentacao

Modelagem banco de dados relacional:
create table cerveja_estilo (
   cervejaE_id         serial       not null,
   cervejaE_descricao  varchar(200) not null,
   cervejaE_observacao text,
   cervejaE_inclusao   timestamp    not null default clock_timestamp(),
   cervejaE_Exclusao   timestamp
   
   constraint cervejaEstilo_pkey primary key ( cervejaE_id )
);

create table tanque (
   tanque_id          serial        not null,
   tanque_descricao   varchar(200)  not null,
   tanque_capacidade  numeric(5, 2) not null,
   tanque_observacao  text,
   tanque_inclusao    timestamp     not null default clock_timestamp(),
   tanque_exclusao    timestamp
   
   constraint tanque_pkey primary key ( tanque_id )
);

create table cerveja (
   cerveja_id         serial       not null,
   cerveja_nome       varchar(200) not null,
   cervejaE_id        int          not null,
   cerveja_observacao text,
   cerveja_inclusao   timestamp    not null default clock_timestamp(),
   cerveja_exclusao   timestamp   
   
   constraint cerveja_pkey           primary key ( cerveja_id )
   constraint cerveja_cervejaE_id_fk foreign key ( cervejaE_id ) references cervejaEstilo( cervejaE_id )
);

create table lote(
   lote_id          serial       not null,
   lote_descricao   varchar(200)
   tanque_id        int          not null,   
   cerveja_id       int          not null
   lote_observacao  text,
   lote_inicio      timestamp    not null 
   lote_finalizacao timestamp
   
   constraint lote_pkey          primary key ( lote_id    )
   constraint lote_cerveja_id_fk foreign key ( cerveja_id ) references cerveja( cerveja_id )
   constraint lote_tanque_id_fk  foreign key ( tanque_id  ) references tanque ( tanque_id  )
   
);

create table cerveja_parametros (
   parametro_id             serial          not null,
   cerveja_id               int             not null,
   parametro_descricao      varchar(200),
   parametro_temperaturaMin numeric( 5, 2 ) not null,
   parametro_temperaturaMax numeric( 5, 2 ) not null,
   parametro_phMin          numeric( 5, 3 ) not null,
   parametro_phMax          numeric( 5, 3 ) not null,
   parametro_extratoMin     numeric( 5, 2 ) not null,
   parametro_extratoMax     numeric( 5, 2 ) not null,
   parametro_observacao     text,
   parametro_inclusao       timestamp       not null default clock_timestamp(),
   parametro_exclusao       timestamp,

   constraint cerveja_parametros_pkey          primary key ( parametro_id ),
   constraint cerveja_parametros_cerveja_id_fk foreign key ( cerveja_id   ) refereces cerveja(cerveja_id) 
);

create table fermentacao_historico(
   historico_id          serial         not null,
   lote_id               int            not null,
   historico_ph          numeric(5,3)   not null,
   historico_temperatura numeric(5,2)   not null,
   historico_extrato     numeric(5,2)   not null,
   historico_observacao  text,
   historico_responsavel varchar( 200 ) not null,
   historico_dataColeta  date           not null,
   historico_horaColeta  time           not null,
   
   constraint fermentacao_historico_pk primary key ( historico_id )
   constraint fermentacao_lote_id_fk   foreign key ( lote_id      ) references lote( lote_id )
)
