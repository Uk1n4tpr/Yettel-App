# Yettel Task API

Ovo je REST API za upravljanje korisnicima i zadacima. API omogućava registraciju, login, kreiranje i listanje zadataka, kao i update korisnika.  

---

## Tehnologije

- Node.js
- Express
- Sequelize (ORM)
- PostgreSQL
- JSON Web Tokens (JWT) za autentikaciju
- Postman za testiranje API-ja

---

## Instalacija

1. **Klonirajte repozitorijum:**

```bash
git clone <link_do_repo>
cd yettel-task

## Instalirajte zavisnosti 

npm install

## Kreirajte .env fajl u root folderu i dodajte sledece variable

DB_HOST=localhost
DB_USER=<tvoj_db_user>
DB_PASSWORD=<tvoja_lozinka>
DB_NAME=<ime_baze>
DB_PORT=5432
JWT_SECRET=<tajni_kljuc>
PORT=3000

## Pokrenite PostgreSQL i kreirajte bazu sa istim imenom kao u .env (DB_NAME).

## Pokretanje API-a

npm start

//// API DOKUMENTACIJA ///

Yettel Task API Dokumentacija

Baza: PostgreSQL
Autentikacija: JWT token (Bearer)
Port: 3000

1. Registracija korisnika

Endpoint: POST /auth/register
Opis: Registruje novog korisnika.
Body (JSON):
{
  "firstName": "Petar",
  "lastName": "Petrovic",
  "username": "petar123",
  "email": "petar@example.com",
  "password": "123456"
}

Odgovor 201:

{
  "message": "Korisnik uspešno registrovan",
  "user": {
    "id": 1,
    "firstName": "Petar",
    "lastName": "Petrovic",
    "username": "petar123",
    "email": "petar@example.com",
    "role": "basic",
    "createdAt": "2025-11-21T15:00:00.000Z",
    "updatedAt": "2025-11-21T15:00:00.000Z"
  }
}

2. Login korisnika

Endpoint: POST /auth/login
Opis: Prijava korisnika i dobijanje JWT tokena.
Body (JSON):
{
  "email": "petar@example.com",
  "password": "123456"
}

Odgovor 200:
{
  "message": "Uspesno prijavljen",
  "token": "<JWT_TOKEN>"
}

3. Autentikacija korisnika

Endpoint: GET /auth/auth
Opis: Provera JWT tokena i dobijanje podataka korisnika.
Header:

Authorization: Bearer <JWT_TOKEN>

Odgovor 200:
{
  "id": 1,
  "firstName": "Petar",
  "lastName": "Petrovic",
  "username": "petar123",
  "email": "petar@example.com",
  "role": "basic",
  "createdAt": "2025-11-21T15:00:00.000Z",
  "updatedAt": "2025-11-21T15:00:00.000Z"
}

4. Kreiranje zadatka

Endpoint: POST /auth/create-task
Opis: Kreira novi zadatak. Samo korisnici sa rolom basic mogu kreirati zadatke.
Header:
Authorization: Bearer <JWT_TOKEN>

Body (JSON):

{
  "body": "Novi zadatak"
}

Odgovor 201:
{
  "message": "Zadatak uspesno kreiran",
  "task": {
    "id": 1,
    "body": "Novi zadatak",
    "UserId": 1,
    "createdAt": "2025-11-21T15:05:00.000Z",
    "updatedAt": "2025-11-21T15:05:00.000Z"
  }
}

5. Lista zadataka

Endpoint: GET /auth/tasks
Opis: Dohvata sve zadatke.
Header:
Authorization: Bearer <JWT_TOKEN>

Odgovor 200:	
{
  "tasks": [
    {
      "id": 1,
      "body": "Novi zadatak",
      "UserId": 1,
      "createdAt": "2025-11-21T15:05:00.000Z",
      "updatedAt": "2025-11-21T15:05:00.000Z"
    }
  ]
}

6. Update zadatka

Endpoint: PUT /auth/update-task/:id
Opis: Ažurira sadržaj zadatka. Samo korisnik koji je kreirao zadatak može menjati svoj zadatak.
Header:

Authorization: Bearer <JWT_TOKEN>

Body (JSON):
{
  "body": "Azurirani zadatak"
}

Odgovor 200:
{
  "message": "Zadatak azuriran",
  "task": {
    "id": 1,
    "body": "Azurirani zadatak",
    "UserId": 1,
    "createdAt": "2025-11-21T15:05:00.000Z",
    "updatedAt": "2025-11-21T15:10:00.000Z"
  }
}

Odgovor 403 (nije vlasnik):
{
  "message": "Nemate pristup za menjanje ovog taska"
}

7. Update korisnika

Endpoint: PUT /auth/update-user/:id
Opis: basic korisnik može menjati samo svoje podatke. admin korisnik može menjati podatke bilo kog korisnika.
Header:
Authorization: Bearer <JWT_TOKEN>

Body (JSON):
{
  "firstName": "Petar",
  "lastName": "Petrovic",
  "username": "petar123",
  "email": "petar@example.com",
  "role": "basic" // opcionalno, samo admin može menjati
}

Odgovor 200:
{
  "message": "Korisnik azuriran",
  "user": {
    "id": 1,
    "firstName": "Petar",
    "lastName": "Petrovic",
    "username": "petar123",
    "email": "petar@example.com",
    "role": "basic",
    "createdAt": "2025-11-21T15:00:00.000Z",
    "updatedAt": "2025-11-21T15:20:00.000Z"
  }
}

Odgovor 403 (basic pokušava menjati tuđi profil):
{
  "message": "Nemate pristup za menjanje ovog korisnika"
}

