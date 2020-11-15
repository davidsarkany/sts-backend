import axios from "axios";
import { SpainRegionGeocodeProvider } from "../interfaces/SpainRegionGeocodeProvider";
import { ServiceInfoType, AccuracyEnum } from "../types/ServiceInfoType";
import { RegionDescriptionType } from "RegionDescriptionType";
import GeocodeException from "../exceptions/GeocodeException";
import * as regionInfoService from "./RegionInfoService";

export default class TomtomSpainRegionGeocodeService implements SpainRegionGeocodeProvider {
    protected apiKey:string;
    protected readonly radius = 1000;

    readonly serviceInfo: ServiceInfoType = {
        name: "TomTom",
        accuracy: AccuracyEnum.HIGH
    };

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async coordinateToRegion(latitude:number,longitude: number): Promise<RegionDescriptionType | null> {
        const url = this.requestUrlGenerator(latitude,longitude,this.radius);
        const response = await axios.get(url,{timeout: 5000});
        const responseData = response.data as unknown | any;
        if(typeof responseData !== "object")
            throw new GeocodeException(`Unexcepted TomTom response ${latitude},${longitude}`);

        if(responseData["addresses"][0]["address"]["countryCode"] !== "ES") {
            return null;
        }

        if(responseData["addresses"][0]["address"]["countrySubdivision"] === undefined)
            throw new GeocodeException(`Undefined countrySubdivision ${latitude},${longitude}`);

        const regionLongnameEs = responseData["addresses"][0]["address"]["countrySubdivision"];
        const region = regionInfoService.findRegionByLongNameEs(regionLongnameEs);
        if(region === undefined)
            throw new GeocodeException(`Unknown region ${regionLongnameEs}`);

        return region;
    }

    protected requestUrlGenerator(latitude:number,longitude: number,radius: number): string{
        return `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=${this.apiKey}&radius=${radius}`;
    }

}