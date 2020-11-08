export enum AccuracyEnum {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}

export type ServiceInfoType = {
    name: string,
    accuracy: AccuracyEnum
}
