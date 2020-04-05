create database if not exists dbpollitos;
use dbpollitos;

create table if not exists tproducto(
	id_prod integer not null auto_increment primary key,
    producto varchar(50) not null,
    costo decimal(5,2) not null
);

create table if not exists tcomanda(
	id_coma integer not null auto_increment primary key,
    fecha datetime default current_timestamp,
    comensal varchar(50),
    suma integer
);

create table if not exists tcoma_prod(
	id_coma_prod integer not null auto_increment primary key,
    id_coma integer not null,
    suma integer,
    fecha datetime,
    comensal varchar(50), 
    id_prod integer not null,
    producto varchar(50) not null,
    costo decimal(5,2) not null,
    cant integer not null,
    total decimal(5,2) not null,
    foreign key (id_coma) references tcomanda(id_coma), 
    foreign key (id_prod) references tproducto(id_prod)
);
