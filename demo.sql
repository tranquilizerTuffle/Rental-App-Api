create table check_table(id varchar2(40) not null, password varchar2(40) not null);

insert into check_table values ('Tushaar', 'titu');
insert into check_table	values ('Neelaksh', 'neelu');
insert into check_table	values ('Dhruv', 'beti');

-- create or replace procedure create_user(id_in check_table.id%type,
-- 										pass_in check_table.password%type) is
-- begin
-- insert into check_table values (id_in,pass_in);
-- end;
-- /