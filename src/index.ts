import express from "express";
import cors from "cors";
import { pokemonRouter } from "./routes/pokemon";
import { count } from "./data";

const app = express();
const PORT = parseInt(process.env.PORT ?? "3000", 10);

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", pokemonLoaded: count() });
});

app.use("/api/pokemon", pokemonRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "not found" });
});

app.listen(PORT, () => {
  console.log(`pokedex-backend listening on :${PORT} (${count()} pokemon loaded)`);
});
