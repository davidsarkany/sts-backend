import { FastifyRequest, FastifyReply } from "fastify";
import { GeocodingResponse, MessageEnum, StatusEnum } from "../responses/GeocodingResponse";
import { isNumeric } from "../services/ValidatorService";
import * as geocodeService from "../services/GeocodeService";

export const geocodeSpainRegion = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try{
        const body = request.body as any;
        if(!(isNumeric(body.longitude) && isNumeric(body.latitude))){
            reply.send(GeocodingResponse.create(StatusEnum.ERROR,null,MessageEnum.VALIDATION_ERROR, null));
            return;
        }

        const geocodeResult = await geocodeService.geocodeSpainRegion(body.latitude,body.longitude);

        let geocodingResponse = undefined;
        if(geocodeResult.region === null)
            geocodingResponse = GeocodingResponse.create(StatusEnum.ERROR, geocodeResult.region,MessageEnum.NOT_IN_COUNTRY, geocodeResult.serviceInfo);
        else
            geocodingResponse = GeocodingResponse.create(StatusEnum.SUCCESS, geocodeResult.region, null, geocodeResult.serviceInfo);

        reply.code(200).send(geocodingResponse);
    } catch(ex) {
        request.log.warn(ex.message);
        reply.code(500).send();
    }

}