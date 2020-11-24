import dotenv from "dotenv";
import TomtomSpainRegionGeocodeService from "../src/services/TomtomSpainRegionGeocodeService";
import { SpainRegionGeocodeProvider } from "../src/interfaces/SpainRegionGeocodeProvider";
import sleep from "../src/utils/Sleep";
import dataset from "./E2EDataset";

jest.setTimeout(600000);
dotenv.config();

const providers: SpainRegionGeocodeProvider[] = [
    new TomtomSpainRegionGeocodeService(process.env.TOMTOM_API_KEY!)
];

describe("E2E test with valid coordinate on geocoding providers",() => {
    providers.forEach((provider) => {
        it(`E2E test with valid coordinate on ${provider.serviceInfo.name}`, async () => {
            for (const data of dataset) {
                await sleep(1000);
                const region = await provider.coordinateToRegion(+data.coordinate.latitude, +data.coordinate.longitude);
                expect(region?.isoName).toEqual(data.iso);
            }
        });
    });
});

describe("E2E test with abroad coordinate on geocoding providers",() => {
    providers.forEach((provider) => {
        it(`E2E test with abroad coordinate on ${provider.serviceInfo.name}`, async () => {
            const region = await provider.coordinateToRegion(50.363155,9.483828);
            expect(region).toBeNull();
        });
    });
});