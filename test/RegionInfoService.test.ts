import * as regionInfoService from "../src/services/RegionInfoService";

describe("Test RegionInfoService",() => {
    it("Search non exist region return with LongNameEs", () => {
        const result = regionInfoService.findRegionByLongNameEs("NOT EXIST");
        expect(result).toBeUndefined();
    });

    it("Search exist region return with LongNameEs", () => {
        const regionName = "Región de Murcia";
        const result = regionInfoService.findRegionByLongNameEs(regionName);
        expect(result!.longNameEs).toBe(regionName)
    });

    it("Search non exist region return with ISOName", () => {
        const isoName = "MU";
        const result = regionInfoService.findRegionByIsoName(isoName);
        expect(result!.isoName).toBe(isoName)
    });

    it("Search exist region return with ISOName", () => {
        const isoName = "MU";
        const result = regionInfoService.findRegionByIsoName(isoName);
        expect(result!.isoName).toBe(isoName)
    });

    it("Search non exist region return with LongNameEs", () => {
        const result = regionInfoService.findRegionByIsoName("NOT EXIST");
        expect(result).toBeUndefined();
    });

});
