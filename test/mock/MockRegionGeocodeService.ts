import { SpainRegionGeocodeProvider } from "../../src/interfaces/SpainRegionGeocodeProvider";
import { ServiceInfoType, AccuracyEnum } from "../../src/types/ServiceInfoType";
import { RegionDescriptionType } from "RegionDescriptionType";
import GeocodeException from "../../src/exceptions/GeocodeException";
import * as regionInfoService from "../../src/services/RegionInfoService";

export default class MockRegionGeocodeService implements SpainRegionGeocodeProvider {

    serviceInfo: ServiceInfoType = {
        name: "",
        accuracy: AccuracyEnum.HIGH
    };

    protected customRegion:RegionDescriptionType|undefined;
    protected throwError = false;

    constructor(name: string, throwError = false) {
        this.serviceInfo.name = name;
        this.throwError = throwError;
    }

    setCustomRegion(regionIsoName:string):SpainRegionGeocodeProvider {
        const region = regionInfoService.findRegionByIsoName(regionIsoName);
        if(region === undefined)
            throw Error("Unknown region");

        this.customRegion = region;
        return this;
    }

    async coordinateToRegion(latitude:number,longitude: number): Promise<RegionDescriptionType | null> {
        if(this.throwError)
            throw new GeocodeException("Test error");

        if(this.customRegion !== undefined)
            return this.customRegion;
        else
            return regionInfoService.findRegionByIsoName("AN")!;
    }

}