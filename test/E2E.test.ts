import app from "../src/app";

jest.setTimeout(600000);
function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

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
        const dataset = [{"coordinate":{"latitude":"37.392529","longitude":"-5.994072"},"iso":"AN"},{"coordinate":{"latitude":"41.663194","longitude":"-0.8988737"},"iso":"AR"},{"coordinate":{"latitude":"43.3602900","longitude":"-5.8447600"},"iso":"AS"},{"coordinate":{"latitude":"43.46472","longitude":"-3.80444"},"iso":"CB"},{"coordinate":{"latitude":"41.652251","longitude":"-4.7245321"},"iso":"CL"},{"coordinate":{"latitude":"39.857113","longitude":"-4.024432"},"iso":"CM"},{"coordinate":{"latitude":"28.291565","longitude":"-16.629129"},"iso":"CN"},{"coordinate":{"latitude":"41.390205","longitude":"2.154007"},"iso":"CT"},{"coordinate":{"latitude":"38.919144","longitude":"-6.340805"},"iso":"EX"},{"coordinate":{"latitude":"42.878212","longitude":"-8.544844"},"iso":"GA"},{"coordinate":{"latitude":"42.4671213","longitude":"-2.4454133"},"iso":"LO"},{"coordinate":{"latitude":"40.416775","longitude":"-3.703790"},"iso":"MD"},{"coordinate":{"latitude":"35.88933","longitude":"-5.31979"},"iso":"ML"},{"coordinate":{"latitude":"37.984047","longitude":"-1.128575"},"iso":"MU"},{"coordinate":{"latitude":"42.5566327735","longitude":"-2.15816770066"},"iso":"NA"},{"coordinate":{"latitude":"39.587547","longitude":"2.7437533"},"iso":"PM"},{"coordinate":{"latitude":"43.262985","longitude":"-2.935013"},"iso":"PV"},{"coordinate":{"latitude":"39.46975","longitude":"-0.37739"},"iso":"VC"}];
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