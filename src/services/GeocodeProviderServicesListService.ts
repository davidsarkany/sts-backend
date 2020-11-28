import { SpainRegionGeocodeProvider } from "../interfaces/SpainRegionGeocodeProvider";
import TomtomSpainRegionGeocodeService from "./TomtomSpainRegionGeocodeService";
import BigdatacloudSpainRegionGeocodeService from "./BigdatacloudSpainRegionGeocodeService";

const geocodeProviderServicesList: Array<SpainRegionGeocodeProvider> = [
    new TomtomSpainRegionGeocodeService(process.env.TOMTOM_API_KEY!),
    new BigdatacloudSpainRegionGeocodeService(process.env.BIGDATACLOUD_API_KEY!),
];

export const getGeocodeProviderServicesList = (): Array<SpainRegionGeocodeProvider> => {
    return geocodeProviderServicesList;
}