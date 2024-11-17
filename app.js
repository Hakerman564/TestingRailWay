const express = require('express');
const mysql = require('mysql2'); // Cambia 'mysql' por 'mysql2'

const app = express();
const port = 3000;

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost', // O la IP de tu servidor MySQL
  user: 'root', // Tu usuario de MySQL
  password: 'adserver', // Tu contraseña de MySQL
  database: 'principal' // El nombre de tu base de datos
});

// Conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

// Middleware para procesar datos JSON
app.use(express.json());

// Ruta de ejemplo para obtener datos de la base de datos
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      res.status(500).send('Error al consultar la base de datos');
    } else {
      res.json(results);
    }
  });
});

// Ruta para agregar un nuevo usuario
app.post('/usuarios', (req, res) => {
  const { nombre, email } = req.body;
  const query = 'INSERT INTO usuarios (nombre, email) VALUES (?, ?)';

  db.query(query, [nombre, email], (err, result) => {
    if (err) {
      res.status(500).send('Error al insertar el usuario');
    } else {
      res.status(201).json({ id: result.insertId, nombre, email });
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
