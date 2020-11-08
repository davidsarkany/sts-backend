import { RegionDescriptionType } from "RegionDescriptionType";
import { ServiceInfoType } from "../types/ServiceInfoType";
import TomtomSpainRegionGeocodeService from "./TomtomSpainRegionGeocodeService";

export const geocodeSpainRegion = async (latitude: number, longitude: number): Promise<{ region: RegionDescriptionType | null, serviceInfo: ServiceInfoType }> => {
    const tomtomSpainRegionGeocodeService = new TomtomSpainRegionGeocodeService(process.env.TOMTOM_API_KEY!);
    const region = await tomtomSpainRegionGeocodeService.coordinateToRegion(latitude,longitude);
    return({
        region: region,
        serviceInfo: tomtomSpainRegionGeocodeService.serviceInfo
    });
}