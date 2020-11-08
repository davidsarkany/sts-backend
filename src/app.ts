import fastify, { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import fastifyFormBody from "fastify-formbody";
import fastifyRateLimit from "fastify-rate-limit";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();
if(process.env.TOMTOM_API_KEY === undefined)
    throw Error("TOMTOM_API_KEY key missing in environment.");

if(process.env.RATE_LIMIT_MAX === undefined)
    throw Error("RATE_LIMIT_MAX key missing in environment.");

if(process.env.RATE_LIMIT_TIME_WINDOW === undefined)
    throw Error("RATE_LIMIT_TIME_WINDOW key missing in environment.");

if(process.env.HEALTH_CHECK_TOKEN === undefined)
    throw Error("HEALTH_CHECK_TOKEN key missing in environment.");


const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({logger: {level: "warn"}});
app.register(fastifyFormBody);

app.register(fastifyRateLimit as any, {
    max: +process.env.RATE_LIMIT_MAX,
    timeWindow: process.env.RATE_LIMIT_TIME_WINDOW,
    keyGenerator: (req:any) =>{
        if(process.env.REVERSE_PROXY === "enabled")
            return req.headers['x-real-ip'] || req.headers['x-client-ip'] || req.headers['x-forwarded-for'] || req.raw.ip;
        else
            return req.raw.ip;
    }
});

app.register(routes);
export default app;
