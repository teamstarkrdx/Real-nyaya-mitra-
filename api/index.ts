import express, { type Request, type Response, type NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic, log } from "./vite"; // Make sure vite.ts exists or remove if not used

// ✅ Create Express app
const app = express();

// ✅ Middleware setup
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ Simple request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const originalJson = res.json;

  res.json = function (body: any) {
    const duration = Date.now() - start;
    log?.(`${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
    return originalJson.call(this, body);
  };

  next();
});

// ✅ Register all routes
registerRoutes(app);

// ✅ Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  console.error("Error:", err);
  res.status(status).json({ error: err.message || "Internal Server Error" });
});

// ✅ Optional static file serving (if needed)
try {
  serveStatic?.(app);
} catch {
  console.warn("⚠️ Static serve skipped — no vite.ts found or not needed in prod.");
}

// ✅ Export as Vercel handler
import { createServer } from "http";
const server = createServer(app);

export default (req: any, res: any) => {
  server.emit("request", req, res);
};
