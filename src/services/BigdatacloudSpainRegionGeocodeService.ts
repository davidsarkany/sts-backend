import axios from "axios";
import { SpainRegionGeocodeProvider } from "../interfaces/SpainRegionGeocodeProvider";
import { ServiceInfoType, AccuracyEnum } from "../types/ServiceInfoType";
import { RegionDescriptionType } from "RegionDescriptionType";
import GeocodeException from "../exceptions/GeocodeException";
import * as regionInfoService from "./RegionInfoService";

export default class BigdatacloudSpainRegionGeocodeService implements SpainRegionGeocodeProvider {
    protected apiKey: string;

    readonly serviceInfo: ServiceInfoType = {
        name: "Big Data Cloud",
        accuracy: AccuracyEnum.MEDIUM
    };

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async coordinateToRegion(latitude:number,longitude: number): Promise<RegionDescriptionType | null> {
        const url = this.requestUrlGenerator(latitude,longitude);
        const response = await axios.get(url,{timeout: 5000});

        const responseData = response.data as unknown | any;
        if(typeof responseData !== "object")
            throw new GeocodeException(`Unexcepted BigDataCloud response ${latitude},${longitude}`);

        if(responseData["countryCode"] !== "ES") {
            return null;
        }

        if(responseData["principalSubdivision"] === undefined)
            throw new GeocodeException(`Undefined principalSubdivision ${latitude},${longitude}`);

        const principalSubdivision = responseData["principalSubdivision"];
        const region = regionInfoService.findRegionByLongNameEn(principalSubdivision);
        if(region === undefined){
            throw new GeocodeException(`Unknown region ${principalSubdivision}`);
        }

        return region;
    }

    protected requestUrlGenerator(latitude:number,longitude: number): string {
        return `https://api.bigdatacloud.net/data/reverse-geocode-with-timezone?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${this.apiKey}`;
    }

}