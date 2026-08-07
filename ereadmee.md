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


POST http://localhost:3000/auth/register working

POST http://localhost:3000/auth/login working 

POST http://localhost:3000/auth/refresh          NOT working

POST http://localhost:3000/users/users-list working

POST http://localhost:3000/users/set-role        NOT working

POST http://localhost:3000/users/find-by-id working 

POST http://localhost:3000/users/change-my-password working

POST http://localhost:3000/users/update/{id} working

POST http://localhost:3000/users/remove/{id} working

