import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic, log } from "./vite"; // Removed setupVite import as it's dev-only

const app = express();
app.use(express.json({ limit: '10mb' })); // Increased limit for file uploads if needed
app.use(express.urlencoded({ extended: true })); // Changed to true for better form handling

// Request logging middleware (kept, but simplified for serverless)
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson: any, ...args: any[]) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Register routes (now returns void, no server creation)
registerRoutes(app);

// Error handling middleware (place after routes)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(err); // Log full error for debugging in Vercel
  res.status(status).json({ error: message }); // Return JSON error
});

// Production static serving (Vercel handles static files from /public, but this for custom)
serveStatic(app);

// Vercel serverless export: Export the app as the default handler
// Vercel will call this as (req, res) => app(req, res)
export default app;
