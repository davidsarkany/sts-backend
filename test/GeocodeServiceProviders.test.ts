import dotenv from "dotenv";
dotenv.config();
import { getGeocodeProviderServicesList } from "../src/services/GeocodeProviderServicesListService";
import sleep from "../src/utils/Sleep";
import dataset from "./dataset/E2EDataset"

jest.setTimeout(600000);
dotenv.config();

const providers = getGeocodeProviderServicesList();

describe("E2E test with valid coordinate on geocoding providers",() => {
    for(const provider of providers) {
        for (const data of dataset) {
            if(process.env.CI == "true" && provider.serviceInfo.name == "Big Data Cloud")
                continue; //Big Data Cloud throw random timeout on GitHub CI

            it(`E2E test with ${data.iso} on ${provider.serviceInfo.name}`, async () => {
                    await sleep(1000);
                    const region = await provider.coordinateToRegion(+data.coordinate.latitude, +data.coordinate.longitude);
                    expect(region?.isoName).toEqual(data.iso);
            });
        }
    }
});

describe("E2E test with abroad coordinate on geocoding providers",() => {
    for(const provider of providers) {
        it(`E2E test with abroad coordinate on ${provider.serviceInfo.name}`, async () => {
            const region = await provider.coordinateToRegion(50.363155,9.483828);
            expect(region).toBeNull();
        });
    }
});