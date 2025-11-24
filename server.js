const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Lista global compartida (en memoria, se reinicia si el servidor cae)
let nombres = ['Juan', 'Ana', 'Luis', 'María', 'Pedro'];

app.use(cors());
app.use(express.json());

// Obtener la lista actual
app.get('/nombres', (req, res) => {
  res.json(nombres);
});

// Aceptar nombre y eliminar
app.post('/aceptar', (req, res) => {
  const { nombre } = req.body;
  nombres = nombres.filter(n => n !== nombre);
  res.json({ success: true, nombres });
});

// Recargar la lista (solo devuelve la actual)
app.get('/reload', (req, res) => {
  res.json(nombres);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
