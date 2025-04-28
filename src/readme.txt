# Tienda Backend - Express + SQLite

Backend básico para tienda de productos, con login de usuarios, tienda online y pagos usando Addi, Nequi y PSE en entorno sandbox.

## Estructura del proyecto

- `/src/controllers` → Lógica de cada recurso (auth, productos, pagos).
- `/src/routes` → Definición de endpoints API.
- `/src/models` → Acceso a base de datos SQLite.
- `/src/services` → Integraciones API externas.
- `/src/database` → Base de datos y migraciones.

## Instalación

```bash
npm install
cp .env.example .env
npm start