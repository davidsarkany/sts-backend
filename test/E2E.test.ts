import app from "../src/app";
import dataset from "./E2EDataset"
import sleep from "../src/utils/Sleep"

jest.setTimeout(600000);

describe("POST /api/geocode-spain-region - with invalid post data", () => {
    it("Test invalid POST data", async () => {
        const response = await app.inject({
            method: "POST",
            url: "/api/geocode-spain-region",
            payload: {
                longitude: 'invalid',
                latitude: 'invalid'
            }
        });
        expect(response.statusCode).toEqual(200);
        expect(JSON.parse(response.body)).toEqual({"status":"ERROR","region":null,"message":"VALIDATION_ERROR","service_info":null});
    });

    it("Test without POST data", async () => {
        const response = await app.inject({
            method: "POST",
            url: "/api/geocode-spain-region",
            payload: {}
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(JSON.stringify({"status":"ERROR","region":null,"message":"VALIDATION_ERROR","service_info":null}));
    });

    it("Test with abroad coordinates", async () => {
        const response = await app.inject({
            method: "POST",
            url: "/api/geocode-spain-region",
            payload: {
                longitude: '47.5011151657',
                latitude: '19.0531965145'
            }
        });
        expect(response.statusCode).toEqual(200);
        expect(JSON.parse(response.body).status).toEqual("ERROR");
        expect(JSON.parse(response.body).message).toEqual("NOT_IN_COUNTRY");
    });

    it('Test with valid coordinates', async () => {
        for (const testData of dataset) {
            const response = await app.inject({
                method: "POST",
                url: "/api/geocode-spain-region",
                payload: {
                    longitude: testData.coordinate.longitude,
                    latitude: testData.coordinate.latitude,
                }
            });
            await sleep(1000);
            expect(response.statusCode).toEqual(200);
            expect(JSON.parse(response.body).region.iso_name).toEqual(testData.iso);
        }
    });
});