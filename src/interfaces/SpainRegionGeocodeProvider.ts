import { ServiceInfoType } from "ServiceInfoType";
import { RegionDescriptionType } from "RegionDescriptionType";

export interface SpainRegionGeocodeProvider {
    readonly serviceInfo: ServiceInfoType,
    coordinateToRegion(latitude:number,longitude: number): Promise<RegionDescriptionType | null>
}
