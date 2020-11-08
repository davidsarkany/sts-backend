import { FastifyInstance } from "fastify";
import * as geocodeController from "./controllers/GeocodeController";
import * as healthCheckController from "./controllers/HealthCheckController";

const routes = async (fastify: FastifyInstance): Promise<void> => {
    fastify.post("/api/geocode-spain-region", {}, geocodeController.geocodeSpainRegion);
    fastify.get("/api/health-check", {}, healthCheckController.healthCheck);
}

export default routes;
