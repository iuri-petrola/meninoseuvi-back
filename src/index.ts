import express from "express";
import cors from "cors";
import "dotenv/config";
import { mediaRouter } from "./routes/media";

const app = express();

app.use(cors());
app.use(express.json({ limit: "25mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const uploadsDir = process.env.UPLOADS_DIR || "/mnt/files-mev";
const uploadsPublicPath = process.env.UPLOADS_PUBLIC_PATH || "/files";
app.use(uploadsPublicPath, express.static(uploadsDir));

app.use("/api/media", mediaRouter);

const port = process.env.PORT ? Number(process.env.PORT) : 8080;
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
