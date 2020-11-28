import app from "../src/app";

jest.mock("../src/services/GeocodeService", () => {
    return jest.fn().mockImplementation(() => {
        return {
            geocodeSpainRegion: 5
        }
    })
})

describe("GeocodeService", () => {
    it("Test geocodeService fail", async () => {
        const response = await app.inject({
            method: "POST",
            url: "/api/geocode-spain-region",
            payload: {
                longitude: "47.5011151657",
                latitude: "19.0531965145"
            }
        });
        expect(response.statusCode).toEqual(500);
    });

});