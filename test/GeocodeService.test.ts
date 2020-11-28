import dotenv from "dotenv";
import * as geocodeService from "../src/services/GeocodeService";
import * as GeocodeProviderServicesListService from "../src/services/GeocodeProviderServicesListService";
import MockRegionGeocodeService from "./mock/MockRegionGeocodeService";
import { SpainRegionGeocodeProvider } from "../src/interfaces/SpainRegionGeocodeProvider";

dotenv.config();

const workingProvider = new MockRegionGeocodeService("workingProvider");
const workingProvider2 = new MockRegionGeocodeService("workingProvider2");
const faultyProvider = new MockRegionGeocodeService("faultyProvider",true);


describe("Test geocodeService failover", () => {
    it("Happy scenario", async () => {
        const providers:Array<SpainRegionGeocodeProvider> = [workingProvider,workingProvider2];
        // @ts-ignore
        GeocodeProviderServicesListService.getGeocodeProviderServicesList = jest.fn().mockReturnValue(providers);
        const result = await geocodeService.geocodeSpainRegion(10,10);
        expect(result.serviceInfo).toEqual(providers[0].serviceInfo);
    });

    it("Failover when first provider fail", async () => {
        const providers:Array<SpainRegionGeocodeProvider> = [faultyProvider,workingProvider];
        // @ts-ignore
        GeocodeProviderServicesListService.getGeocodeProviderServicesList = jest.fn().mockReturnValue(providers);
        const result = await geocodeService.geocodeSpainRegion(10,10);
        expect(result.serviceInfo).toEqual(workingProvider.serviceInfo);
    });

    it("Failover when all provider fail", async () => {
        const providers:Array<SpainRegionGeocodeProvider> = [faultyProvider,faultyProvider];
        // @ts-ignore
        GeocodeProviderServicesListService.getGeocodeProviderServicesList = jest.fn().mockReturnValue(providers);

        await expect(async () => {
            await geocodeService.geocodeSpainRegion(10,10)
        }).rejects.toThrowError("Every geocode provider failed");
    });

});
