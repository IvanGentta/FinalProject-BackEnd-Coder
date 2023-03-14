import express from "express";
import apiRouter from "./routes/appRoutes.js";

const app = express();

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`escuchando ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRouter);

export default app;
