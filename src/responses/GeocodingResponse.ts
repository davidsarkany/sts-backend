import { RegionDescriptionType } from "RegionDescriptionType"
import { ServiceInfoType } from "ServiceInfoType"

export enum StatusEnum {
    SUCCESS  = "SUCCESS",
    ERROR  = "ERROR"
}

export enum MessageEnum {
    NOT_IN_COUNTRY = "NOT_IN_COUNTRY",
    VALIDATION_ERROR = "VALIDATION_ERROR"
}

export type ServiceInfoResponseType = {
    name: string,
    accuracy: string
}

type RegionResponseType = {
    "short_name_en": string,
    "long_name_en": string,
    "long_name_es": string,
    "long_name_hu": string,
    "iso_name": string
}

type GeocodingResponseType = {
    status: StatusEnum,
    region: RegionResponseType|null,
    message: string|null,
    service_info: ServiceInfoResponseType|null
}

export class GeocodingResponse {
    protected readonly status:StatusEnum;
    protected readonly region:RegionDescriptionType|null;
    protected readonly message:MessageEnum|null;
    protected readonly serviceInfo:ServiceInfoType|null;

    protected constructor(status: StatusEnum, region: RegionDescriptionType|null, message: MessageEnum|null, serviceInfo: ServiceInfoType|null) {
        this.status = status;
        this.region = region;
        this.message = message;
        this.serviceInfo = serviceInfo;
    }

    public toJson():GeocodingResponseType {
        return {
            status: this.status,
            region: this.region === null ? null : {
                "short_name_en": this.region.shortName,
                "long_name_en": this.region.longNameEn,
                "long_name_es": this.region.longNameEs,
                "long_name_hu": this.region.longNameHu,
                "iso_name": this.region.isoName
            },
            message: this.message,
            service_info: this.serviceInfo === null ? null : {
                name: this.serviceInfo.name,
                accuracy: this.serviceInfo.accuracy
            }
        }
    }

    static create(status: StatusEnum, region: RegionDescriptionType|null, message: MessageEnum|null, serviceInfo: ServiceInfoType|null):GeocodingResponseType {
        const response = new this(status,region,message,serviceInfo);
        return response.toJson();
    }



}
