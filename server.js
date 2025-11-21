// =========================
// Servidor Básico em Module
// =========================

import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Necessário para usar __dirname em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

// =========================
// Public (arquivos estáticos)
// =========================
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// Rota para ver arquivos presentes na pasta public
app.get("/public/list", (req, res) => {
    fs.readdir(publicPath, (err, files) => {
        if (err) return res.status(500).json({ erro: "Erro ao ler pasta public" });
        res.json({ arquivos: files });
    });
});

// =========================
// Contador de Views
// =========================
let views = 0;

app.get("/views", (req, res) => {
    views++;
    res.json({ views });
});


// =========================
// Inicialização
// =========================
app.listen(PORT, () => {
    console.log(`Htp: http://localhost:${PORT}`);
});
