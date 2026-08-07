-- linter
-- trx



-- USER CRUD
    -- login     ->  token
    -- register  -> user create -> token
    -- user list -> all users
    -- get by id user -> {} user
    -- update -> user update

-- ROLE
    -- set-role -> role berish imkonyati
    -- user delete -> user ochirish

-- LOG
    -- user update -> user changes create


POST http://localhost:3000/auth/register ishlavatti

POST http://localhost:3000/auth/login ishlavatti 

POST http://localhost:3000/users/users-list ishlavatti

POST http://localhost:3000/users/set-role not working

POST http://localhost:3000/users/find-by-id ishlavatti 

POST http://localhost:3000/users/change-my-password ishlavatti

POST http://localhost:3000/users/update/{id} ishlavatti

POST http://localhost:3000/users/remove/{id} ishlavatti


UPDATE: NEW OLD VALUE ozgarganini korsiitish kere r
ROLE ENUM type bolish kere va sqlda 1 va 2 korinishida saqlanisihi kere
