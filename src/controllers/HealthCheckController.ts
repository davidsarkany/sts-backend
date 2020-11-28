import { FastifyRequest, FastifyReply } from "fastify";
import { getGeocodeProviderServicesList } from "../services/GeocodeProviderServicesListService";

export const healthCheck = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const queryParam = request.query as any;
    if(queryParam.token !== process.env.HEALTH_CHECK_TOKEN){
        reply.status(401).send();
        return;
    }

    const response:{pass:Array<string>, fail:Array<string>} = {pass: [], fail: []};

    await Promise.all(
        getGeocodeProviderServicesList().map((provider) => {
            return provider.coordinateToRegion(37.392529,-5.994072)
                .then(result => {
                    if(result === null || result.isoName !== "AN")
                        throw new Error(`Invalid response incorrect result`);
                    response.pass.push(provider.serviceInfo.name);
                })
                .catch(error => {
                    response.fail.push(provider.serviceInfo.name);
                    console.error(`[${provider.serviceInfo.name}] ${error.message}`)
                });
        })
    );

    reply.status(response.fail.length == 0 ? 200 : 500).send(response);
}
