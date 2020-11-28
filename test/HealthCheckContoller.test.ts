import app from "../src/app";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

afterEach(() => { jest.resetAllMocks(); });

describe("Check GET /api/health-check", () => {

    it("TomTom provider return invalid data", async () => {
        const axiosResponse = {data: {"INVALID": true}};
        axios.get = jest.fn().mockResolvedValue(axiosResponse);
        const response = await app.inject({
            method: "GET",
            url: `/api/health-check?token=${process.env.HEALTH_CHECK_TOKEN}`,
        });
        expect(response.statusCode).toEqual(500);
    });

    it("TomTom provider return null region", async () => {
        const axiosResponse = {data: {"summary":{"queryTime":6,"numResults":1},"addresses":[{"address":{"countryCode":"HU","countrySubdivision":"País Vasco","countrySecondarySubdivision":"Sevilla","municipality":"Sevilla","postalCode":"41004","country":"España","countryCodeISO3":"ESP","freeformAddress":"Calle Vargas Campos 7, 41004 Sevilla","boundingBox":{"northEast":"37.392553,-5.993897","southWest":"37.392485,-5.994735","entity":"position"},"localName":"Sevilla"},"position":"37.392540,-5.994091"}]}};
        axios.get = jest.fn().mockResolvedValue(axiosResponse);
        const response = await app.inject({
            method: "GET",
            url: `/api/health-check?token=${process.env.HEALTH_CHECK_TOKEN}`,
        });
        expect(response.statusCode).toEqual(500);
    });

    it("TomTom provider return wrong region", async () => {
        const axiosResponse = {data: {"summary":{"queryTime":6,"numResults":1},"addresses":[{"address":{"buildingNumber":"3","streetNumber":"3","routeNumbers":[],"street":"Calle de la Catedral","streetName":"Calle de la Catedral","streetNameAndNumber":"Calle de la Catedral 3","countryCode":"ES","countrySubdivision":"Castilla y León","countrySecondarySubdivision":"Valladolid","municipality":"Valladolid","postalCode":"47002","country":"España","countryCodeISO3":"ESP","freeformAddress":"Calle de la Catedral 3, 47002 Valladolid","boundingBox":{"northEast":"41.652492,-4.724270","southWest":"41.652096,-4.724329","entity":"position"},"localName":"Valladolid"},"position":"41.652233,-4.724323"}]}};
        axios.get = jest.fn().mockResolvedValue(axiosResponse);
        const response = await app.inject({
            method: "GET",
            url: `/api/health-check?token=${process.env.HEALTH_CHECK_TOKEN}`,
        });
        expect(response.statusCode).toEqual(500);
    });

    it("TomTom works well", async () => {
        const axiosResponse = {data: {"summary":{"queryTime":6,"numResults":1},"addresses":[{"address":{"buildingNumber":"7","streetNumber":"7","routeNumbers":[],"street":"Calle Vargas Campos","streetName":"Calle Vargas Campos","streetNameAndNumber":"Calle Vargas Campos 7","countryCode":"ES","countrySubdivision":"Andalucía","countrySecondarySubdivision":"Sevilla","municipality":"Sevilla","postalCode":"41004","country":"España","countryCodeISO3":"ESP","freeformAddress":"Calle Vargas Campos 7, 41004 Sevilla","boundingBox":{"northEast":"37.392553,-5.993897","southWest":"37.392485,-5.994735","entity":"position"},"localName":"Sevilla"},"position":"37.392540,-5.994091"}]}};
        axios.get = jest.fn().mockResolvedValue(axiosResponse);
        const response = await app.inject({
            method: "GET",
            url: `/api/health-check?token=${process.env.HEALTH_CHECK_TOKEN}`,
        });
        expect(response.statusCode).toEqual(200);
    });

    it("Invalid health check token", async () => {
        const axiosResponse = {data: {"summary":{"queryTime":6,"numResults":1},"addresses":[{"address":{"buildingNumber":"7","streetNumber":"7","routeNumbers":[],"street":"Calle Vargas Campos","streetName":"Calle Vargas Campos","streetNameAndNumber":"Calle Vargas Campos 7","countryCode":"ES","countrySubdivision":"Andalucía","countrySecondarySubdivision":"Sevilla","municipality":"Sevilla","postalCode":"41004","country":"España","countryCodeISO3":"ESP","freeformAddress":"Calle Vargas Campos 7, 41004 Sevilla","boundingBox":{"northEast":"37.392553,-5.993897","southWest":"37.392485,-5.994735","entity":"position"},"localName":"Sevilla"},"position":"37.392540,-5.994091"}]}};
        axios.get = jest.fn().mockResolvedValue(axiosResponse);
        const response = await app.inject({
            method: "GET",
            url: "/api/health-check?token=invalid",
        });
        expect(response.statusCode).toEqual(401);
    });

    it("Invalid health check without token", async () => {
        const axiosResponse = {data: {"summary":{"queryTime":6,"numResults":1},"addresses":[{"address":{"buildingNumber":"7","streetNumber":"7","routeNumbers":[],"street":"Calle Vargas Campos","streetName":"Calle Vargas Campos","streetNameAndNumber":"Calle Vargas Campos 7","countryCode":"ES","countrySubdivision":"Andalucía","countrySecondarySubdivision":"Sevilla","municipality":"Sevilla","postalCode":"41004","country":"España","countryCodeISO3":"ESP","freeformAddress":"Calle Vargas Campos 7, 41004 Sevilla","boundingBox":{"northEast":"37.392553,-5.993897","southWest":"37.392485,-5.994735","entity":"position"},"localName":"Sevilla"},"position":"37.392540,-5.994091"}]}};
        axios.get = jest.fn().mockResolvedValue(axiosResponse);
        const response = await app.inject({
            method: "GET",
            url: "/api/health-check",
        });
        expect(response.statusCode).toEqual(401);
    });

});