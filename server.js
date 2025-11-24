const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// --- DATOS EN MEMORIA GLOBAL (no persistente) ---
const nombresOriginales = ['Emma', 'Chino', 'Jared', 'Mela', 'Wes'];
let nombres = [...nombresOriginales];
let ronda = 1;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Endpoint para obtener la lista de nombres y la ronda
app.get('/nombres', (req, res) => {
  res.json({ nombres, ronda });
});

// Endpoint para "aceptar" y quitar un nombre (y devolver ronda)
app.post('/aceptar', (req, res) => {
  const { nombre } = req.body;
  nombres = nombres.filter(n => n !== nombre);
  res.json({ success: true, nombres, ronda });
});

// Endpoint para restaurar la lista (nueva ronda)
app.post('/restaurar', (req, res) => {
  nombres = [...nombresOriginales];
  ronda += 1;
  res.json({ success: true, nombres, ronda });
});

// Para todas las rutas no API servir el HTML principal (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
