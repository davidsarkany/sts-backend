import axios from 'axios';
import dotenv from "dotenv";
import TomtomSpainRegionGeocodeService from "../src/services/TomtomSpainRegionGeocodeService";

dotenv.config();
jest.mock('axios');

test('Check with exist county', async () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    const tomtom = new TomtomSpainRegionGeocodeService(process.env.TOMTOM_API_KEY!);
    const requestData = {"summary":{"queryTime":5,"numResults":1},"addresses":[{"address":{"buildingNumber":"7","streetNumber":"7","routeNumbers":[],"street":"Calle Vargas Campos","streetName":"Calle Vargas Campos","streetNameAndNumber":"Calle Vargas Campos 7","countryCode":"ES","countrySubdivision":"Andalucía","countrySecondarySubdivision":"Sevilla","municipality":"Sevilla","postalCode":"41004","country":"España","countryCodeISO3":"ESP","freeformAddress":"Calle Vargas Campos 7, 41004 Sevilla","boundingBox":{"northEast":"37.392553,-5.993897","southWest":"37.392485,-5.994735","entity":"position"},"localName":"Sevilla"},"position":"37.392540,-5.994091"}]};
    const request = {data: requestData};
    axios.get = jest.fn().mockResolvedValue(request);
    const result = await tomtom.coordinateToRegion(37.392529,-5.994072)
    expect(result!.isoName).toEqual("AN");
});

test('Check with response without countrySubdivision', async () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    const tomtom = new TomtomSpainRegionGeocodeService(process.env.TOMTOM_API_KEY!);
    const requestData = {"summary":{"queryTime":5,"numResults":1},"addresses":[{"address":{"buildingNumber":"7","streetNumber":"7","routeNumbers":[],"street":"Calle Vargas Campos","streetName":"Calle Vargas Campos","streetNameAndNumber":"Calle Vargas Campos 7","countryCode":"ES","countrySecondarySubdivision":"Sevilla","municipality":"Sevilla","postalCode":"41004","country":"España","countryCodeISO3":"ESP","freeformAddress":"Calle Vargas Campos 7, 41004 Sevilla","boundingBox":{"northEast":"37.392553,-5.993897","southWest":"37.392485,-5.994735","entity":"position"},"localName":"Sevilla"},"position":"37.392540,-5.994091"}]};
    const request = {data: requestData};
    axios.get = jest.fn().mockResolvedValue(request);

    await expect(async () => {
        await tomtom.coordinateToRegion(37.392529, -5.994072);
    }).rejects.toThrowError('Undefined countrySubdivision');
});

test('Check with non spain location', async () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    const tomtom = new TomtomSpainRegionGeocodeService(process.env.TOMTOM_API_KEY!);
    const requestData = {"summary":{"queryTime":33,"numResults":1},"addresses":[{"address":{"buildingNumber":"105","streetNumber":"105","routeNumbers":[],"street":"Oranienstraße","streetName":"Oranienstraße","streetNameAndNumber":"Oranienstraße 105","countryCode":"DE","countrySubdivision":"Berlin","countrySecondarySubdivision":"Berlin","municipality":"Berlin","postalCode":"10969","municipalitySubdivision":"Kreuzberg","country":"Deutschland","countryCodeISO3":"DEU","freeformAddress":"Oranienstraße 105, 10969 Berlin","boundingBox":{"northEast":"52.506721,13.401160","southWest":"52.506277,13.399544","entity":"position"},"localName":"Berlin"},"position":"52.506573,13.400068"}]};
    const request = {data: requestData};
    axios.get = jest.fn().mockResolvedValue(request);
    const result = await tomtom.coordinateToRegion(37.392529,-5.994072)
    expect(result).toBeNull();
});

test('Check with unknown spain location', async () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    const tomtom = new TomtomSpainRegionGeocodeService(process.env.TOMTOM_API_KEY!);
    const requestData = {"summary":{"queryTime":5,"numResults":1},"addresses":[{"address":{"countryCode":"ES","countrySubdivision":"NONONONO"},"position":"37.392540,-5.994091"}]};
    const request = {data: requestData};
    axios.get = jest.fn().mockResolvedValue(request);
    await expect(async () => {
        await tomtom.coordinateToRegion(37.392529, -5.994072);
    }).rejects.toThrowError("Unknown region");
});

test('Check network error', async () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    const tomtom = new TomtomSpainRegionGeocodeService(process.env.TOMTOM_API_KEY!);
    axios.get = jest.fn().mockImplementation(() => {throw new Error()});
    await expect(async () => {
        await tomtom.coordinateToRegion(37.392529, -5.994072);
    }).rejects.toThrow();
});

test('Check unexcepted TomTom response', async () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    const tomtom = new TomtomSpainRegionGeocodeService(process.env.TOMTOM_API_KEY!);
    const request = {data: "UNEXCEPTED"};
    axios.get = jest.fn().mockResolvedValue(request);
    await expect(async () => {
        await tomtom.coordinateToRegion(37.392529, -5.994072);
    }).rejects.toThrowError('Unexcepted TomTom response');
});