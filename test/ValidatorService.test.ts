import { isNumeric } from "../src/services/ValidatorService";

describe("Test isNumeric in ValidatorService",() => {
    it("Check with string", () => {
        expect(isNumeric("string")).toBeFalsy();
    });

    it("Check with int", () => {
        expect(isNumeric(42)).toBeTruthy();
    });

    it("Check with float", () => {
        expect(isNumeric(42.42)).toBeTruthy();
    });

    it("Check with int in string", () => {
        expect(isNumeric("42")).toBeTruthy();
    });

    it("Check with float in string", () => {
        expect(isNumeric("42.42")).toBeTruthy();
    });

    it("Check with Infinity", () => {
        expect(isNumeric(Infinity)).toBeFalsy();
    });

    it("Check with Nan", () => {
        expect(isNumeric(NaN)).toBeFalsy();
    });

});
