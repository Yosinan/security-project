import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import status from "./routes/status.routes";
import errorHandler from "./middlewares/errorHandler";
import setupSwagger from "./swagger/swagger";
import { authenticate } from "./middlewares/authenticate";
import { verifyToken } from "./utils/jwt";
// import { requestLogger } from "./middlewares/requestLogger";

import auth from "./routes/auth.routes";
import role from "./routes/role.routes";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
// app.use(requestLogger);

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.use("/", status);
app.use("/api/auth/", auth);
app.use("/api/users", authenticate, userRoutes);
app.use("/api/roles/", role);

setupSwagger(app);

app.use(errorHandler);

export default app;
