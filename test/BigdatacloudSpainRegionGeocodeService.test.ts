import axios from "axios";
import dotenv from "dotenv";
import BigDataCloudSpainRegionGeocodeService from "../src/services/BigdatacloudSpainRegionGeocodeService";

dotenv.config();
jest.mock("axios");

afterEach(() => {
    jest.resetAllMocks();
});

const bigDataCloud = new BigDataCloudSpainRegionGeocodeService(process.env.BIGDATACLOUD_API_KEY!);

test("Check with exist county", async () => {
    const requestData = {"countryCode": "ES", "principalSubdivision": "Andalusia"};
    const request = {data: requestData};
    axios.get = jest.fn().mockResolvedValue(request);
    const result = await bigDataCloud.coordinateToRegion(37.392529,-5.994072)
    expect(result!.isoName).toEqual("AN");
});

test("Check with response without countrySubdivision", async () => {
    const requestData = {"countryCode": "ES"};
    const request = {data: requestData};
    axios.get = jest.fn().mockResolvedValue(request);

    await expect(async () => {
        await bigDataCloud.coordinateToRegion(37.392529, -5.994072);
    }).rejects.toThrowError("Undefined principalSubdivision");
});

test("Check with unknown spain location", async () => {
    const requestData = {"countryCode": "ES", "principalSubdivision": "Not Exist"};
    const request = {data: requestData};
    axios.get = jest.fn().mockResolvedValue(request);
    await expect(async () => {
        await bigDataCloud.coordinateToRegion(37.392529, -5.994072);
    }).rejects.toThrowError("Unknown region");
});

test("Check network error", async () => {
    axios.get = jest.fn().mockImplementation(() => {throw new Error()});
    await expect(async () => {
        await bigDataCloud.coordinateToRegion(37.392529, -5.994072);
    }).rejects.toThrow();
});


test("Check unexcepted BigDataCloud response", async () => {
    const request = {data: "UNEXCEPTED"};
    axios.get = jest.fn().mockResolvedValue(request);
    await expect(async () => {
        await bigDataCloud.coordinateToRegion(37.392529, -5.994072);
    }).rejects.toThrowError("Unexcepted BigDataCloud response");
});
