import { FastifyRequest, FastifyReply } from "fastify";
import TomtomSpainRegionGeocodeService from "../services/TomtomSpainRegionGeocodeService";

export const healthCheck = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const queryParam = request.query as any;
    if(queryParam.token !== process.env.HEALTH_CHECK_TOKEN){
        reply.status(401).send();
        return;
    }

    try{
        const tomtomSpainRegionGeocodeService = new TomtomSpainRegionGeocodeService(process.env.TOMTOM_API_KEY!);
        const tomtomResult = await tomtomSpainRegionGeocodeService.coordinateToRegion(37.392529,-5.994072);
        if(tomtomResult === null || tomtomResult.isoName !== "AN")
            throw new Error("TomTom error");
        reply.status(200).send({tomtom: true});
    } catch(ex) {
        request.log.warn(ex.message);
        reply.status(500).send({tomtom: false});
    }

}
