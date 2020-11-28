import app from "../src/app";
import dotenv from "dotenv";
import MockRegionGeocodeService from "./mock/MockRegionGeocodeService";
import * as GeocodeProviderServicesListService from "../src/services/GeocodeProviderServicesListService";
import { SpainRegionGeocodeProvider } from "../src/interfaces/SpainRegionGeocodeProvider";
dotenv.config();

afterEach(() => { jest.resetAllMocks(); });

const workingProvider = new MockRegionGeocodeService("workingProvider");
const workingProvider2 = new MockRegionGeocodeService("workingProvider2");
const workingProviderWithWrongData = new MockRegionGeocodeService("workingProviderWithWrongData").setCustomRegion("PV");
const faultyProvider = new MockRegionGeocodeService("faultyProvider",true);

describe("Check GET /api/health-check", () => {
    it("Wrong token", async () => {
        const response = await app.inject({
            method: "GET",
            url: `/api/health-check?token=WRONG${process.env.HEALTH_CHECK_TOKEN}`,
        });
        expect(response.statusCode).toEqual(401);
    });

    it("All provider healthy", async () => {
        const providers:Array<SpainRegionGeocodeProvider> = [workingProvider,workingProvider2];
        // @ts-ignore
        GeocodeProviderServicesListService.getGeocodeProviderServicesList = jest.fn().mockReturnValue(providers);
        const response = await app.inject({
            method: "GET",
            url: `/api/health-check?token=${process.env.HEALTH_CHECK_TOKEN}`,
        });
        expect(response.statusCode).toEqual(200);
        expect(response.json().pass).toContain(workingProvider.serviceInfo.name);
        expect(response.json().pass).toContain(workingProvider2.serviceInfo.name);
    });

    it("Some provider fail", async () => {
        const providers:Array<SpainRegionGeocodeProvider> = [workingProvider,faultyProvider];
        // @ts-ignore
        GeocodeProviderServicesListService.getGeocodeProviderServicesList = jest.fn().mockReturnValue(providers);
        const response = await app.inject({
            method: "GET",
            url: `/api/health-check?token=${process.env.HEALTH_CHECK_TOKEN}`,
        });
        expect(response.statusCode).toEqual(500);
        expect(response.json().pass).toContain(workingProvider.serviceInfo.name);
        expect(response.json().fail).toContain(faultyProvider.serviceInfo.name);
    });

    it("Primary povider send wrong data", async () => {
        const providers:Array<SpainRegionGeocodeProvider> = [workingProviderWithWrongData,workingProvider];
        // @ts-ignore
        GeocodeProviderServicesListService.getGeocodeProviderServicesList = jest.fn().mockReturnValue(providers);
        const response = await app.inject({
            method: "GET",
            url: `/api/health-check?token=${process.env.HEALTH_CHECK_TOKEN}`,
        });
        expect(response.statusCode).toEqual(500);
        expect(response.json().pass).toContain(workingProvider.serviceInfo.name);
        expect(response.json().fail).toContain(workingProviderWithWrongData.serviceInfo.name);
    });

});