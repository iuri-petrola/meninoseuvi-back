import express from "express";
import cors from "cors";
import { mediaRouter } from "./routes/media";

const app = express();

app.use(cors());
app.use(express.json({ limit: "25mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/media", mediaRouter);

const port = process.env.PORT ? Number(process.env.PORT) : 8080;
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
