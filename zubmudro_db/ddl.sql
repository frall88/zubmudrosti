usr = zubmudro_db
pwd = 8FjBpFPz

DROP TABLE IF EXISTS clients;

create table clients(
clientid int auto_increment primary key,
fio varchar(100) not null,
birthdate date null,
gender varchar(1) not null,
phonenum varchar(20) null,
email varchar(50) null,
registerdt timestamp default now(),
constraint ch_gender check(gender in('m', 'f'))
)ENGINE=MyISAM
CHARACTER SET utf8 COLLATE utf8_unicode_ci;

insert into clients (fio, birthdate, gender, phonenum, email)
values ('Фролов Павел Васильевич', '1988-12-19', 'm', '+380667082659', 'frall712@gmail.com');

DROP TABLE IF EXISTS visits;
create table visits(
id int auto_increment primary key,
clientid int not null,
visitdate datetime default CURRENT_TIMESTAMP,
opertype varchar(100) not null,
toothcode varchar(3) null,
conclusion varchar(1000) null,
constraint fk_cl_visits foreign key(clientid)
references clients(clientid))
CHARACTER SET utf8 COLLATE utf8_unicode_ci;

insert into visits(clientid, visitdate, opertype, toothcode, conclusion)
values(1, curdate(), 'Осмотр', 'ВП6', 'Назначена установка коронки на зуб');

create index idx_visits_clid
on visits(clientid);

create index idx_clients_fio
on clients(fio);

