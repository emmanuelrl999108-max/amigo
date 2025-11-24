const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// --- DATOS EN MEMORIA GLOBAL (no persistente) ---
const nombresOriginales = ['Emma', 'Chino', 'Jared', 'Mela', 'Wes'];
let nombres = [...nombresOriginales];

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Endpoint para obtener la lista de nombres
app.get('/nombres', (req, res) => {
  res.json(nombres);
});

// Endpoint para "aceptar" y quitar un nombre
app.post('/aceptar', (req, res) => {
  const { nombre } = req.body;
  nombres = nombres.filter(n => n !== nombre);
  res.json({ success: true, nombres });
});

// Endpoint para reload (puedes usar /nombres también)
app.get('/reload', (req, res) => {
  res.json(nombres);
});

// Para todas las rutas no API servir el HTML
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/restaurar', (req, res) => {
  nombres = [...nombresOriginales];
  res.json({ success: true, nombres });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
