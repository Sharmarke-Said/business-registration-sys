// Core modules
const path = require("path");

// Third-party packages
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");

// Local modules
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/userRoutes");
const businessTypeRouter = require("./routes/businessTypeRoute");
const businessRouter = require("./routes/businessRoutes");
const dashboardRouter = require("./routes/dashbaordRoutes");
const reportRouter = require("./routes/reportRoutes");

// Express app instance
const app = express();

// 1️⃣ GLOBAL MIDDLEWARES

// Set security HTTP headers
// This is the key change: disable Content-Security-Policy (CSP)
// to prevent the browser from blocking the image from a different port.
// For a production environment, you should configure a proper CSP
// to allow images from trusted sources.
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow cross-origin requests for resources
  })
);

// Enable CORS with specific settings for credentials (MOVED TO THE TOP)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Rate limiting middleware (limits each IP to 100 requests per hour)
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message:
    "Too many requests from this IP, please try again in an hour.",
});
app.use("/api", limiter);

// Body parser – reading data from body into `req.body`
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
// Cookie parser – populates `req.cookies`
app.use(cookieParser());

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Compress response bodies
app.use(compression());

// Logging middleware (only in development mode)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Custom middleware – adds request timestamp
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2️⃣ ROUTES
// Handle root route ("/")

app.use("/api/v1/users", userRouter);
app.use("/api/v1/business-types", businessTypeRouter);
app.use("/api/v1/businesses", businessRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/reports", reportRouter);

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// 3️⃣ HANDLE UNHANDLED ROUTES
app.all("*", (req, res, next) => {
  next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

// 4️⃣ GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

// Export app for server startup
module.exports = app;
