import { RegionDescriptionType } from "RegionDescriptionType";
import { ServiceInfoType } from "ServiceInfoType";
import { getGeocodeProviderServicesList } from "./GeocodeProviderServicesListService";

export const geocodeSpainRegion = async (latitude: number, longitude: number): Promise<{ region: RegionDescriptionType | null, serviceInfo: ServiceInfoType }> => {
    const providers = getGeocodeProviderServicesList();
    for(const provider of providers) {
        try {
            const region = await provider.coordinateToRegion(latitude,longitude);
            return({
                region: region,
                serviceInfo: provider.serviceInfo
            });
        } catch (e) {
            console.info(`[${provider.serviceInfo.name}] ${e.message}`)
        }
    }
    throw Error("Every geocode provider failed");
}