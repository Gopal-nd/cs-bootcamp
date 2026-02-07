import express from "express";
import authRoutes from "./routes/authRoutes";
import servicesRoute from './routes/servicesRoute.ts'
import appointmentsRoute from './routes/appointments.ts'
import providersRoute from './routes/providers.ts'
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use('/services', servicesRoute)
app.use('/appointments', appointmentsRoute)
app.use('/providers', providersRoute)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
