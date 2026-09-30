import { Router, Request, Response } from "express";
import { ALL_SUMMARIES, ALL_TYPES, getDetail } from "../data";

export const pokemonRouter = Router();

// GET /api/pokemon?q=char&type=fire&page=1&limit=24
pokemonRouter.get("/", (req: Request, res: Response) => {
  const q = String(req.query.q ?? "")
    .trim()
    .toLowerCase();
  const type = String(req.query.type ?? "")
    .trim()
    .toLowerCase();
  const page = Math.max(1, parseInt(String(req.query.page ?? "1"), 10) || 1);
  const limit = Math.min(
    100,
    Math.max(1, parseInt(String(req.query.limit ?? "24"), 10) || 24),
  );

  let results = ALL_SUMMARIES;
  if (q) {
    results = results.filter((p) => p.name.toLowerCase().includes(q));
  }
  if (type) {
    results = results.filter((p) =>
      p.type.some((t) => t.toLowerCase() === type),
    );
  }

  const total = results.length;
  const start = (page - 1) * limit;
  const data = results.slice(start, start + limit);

  res.json({ data, page, limit, total, totalPages: Math.ceil(total / limit) });
});

// GET /api/pokemon/types — for building a filter dropdown on the frontend
pokemonRouter.get("/types", (_req: Request, res: Response) => {
  res.json({ data: ALL_TYPES });
});

// GET /api/pokemon/:id
pokemonRouter.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "id must be a number" });
  }
  const detail = getDetail(id);
  if (!detail) {
    return res.status(404).json({ error: `Pokemon ${id} not found` });
  }
  res.json(detail);
});
