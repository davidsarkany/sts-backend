import { RegionDescriptionType } from "RegionDescriptionType";


const database: RegionDescriptionType[] = [
    {
        shortName: "AN",
        longNameEn: "Andalusia",
        longNameEs: "Andalucía",
        longNameHu: "Andalúzia",
        isoName: "AN"
    },
    {
        shortName: "AR",
        longNameEn: "Aragon",
        longNameEs: "Aragón",
        longNameHu: "Aragónia",
        isoName: "AR"
    },
    {
        shortName: "CB / C",
        longNameEn: "Cantabria",
        longNameEs: "Cantabria",
        longNameHu: "Kantábria",
        isoName: "CB"
    },
    {
        shortName: "CM",
        longNameEn: "Castile-La Mancha",
        longNameEs: "Castilla-La Mancha",
        longNameHu: "Kasztília-La Mancha",
        isoName: "CM"
    },
    {
        shortName: "CL",
        longNameEn: "Castile and León",
        longNameEs: "Castilla y León",
        longNameHu: "Kasztília és León",
        isoName: "CL"
    },
    {
        shortName: "CT / CAT",
        longNameEn: "Catalonia",
        longNameEs: "Cataluña",
        longNameHu: "Katalónia",
        isoName: "CT"
    },
    {
        shortName: "ML",
        longNameEn: "Ceuta",
        longNameEs: "Ciudad de Ceuta",
        longNameHu: "Ceuta",
        isoName: "ML"
    },
    {
        shortName: "MD / M",
        longNameEn: "Community of Madrid",
        longNameEs: "Comunidad de Madrid",
        longNameHu: "Madrid",
        isoName: "MD"
    },
    {
        shortName: "NA",
        longNameEn: "Navarre",
        longNameEs: "Comunidad Foral de Navarra",
        longNameHu: "Navarra",
        isoName: "NA"
    },
    {
        shortName: "VC / CV",
        longNameEn: "Community of Valencia",
        longNameEs: "Comunidad Valenciana",
        longNameHu: "Valencia",
        isoName: "VC"
    },
    {
        shortName: "EX / EXT",
        longNameEn: "Extremadura",
        longNameEs: "Extremadura",
        longNameHu: "Extremadura",
        isoName: "EX"
    },
    {
        shortName: "GA / G",
        longNameEn: "Galicia",
        longNameEs: "Galicia",
        longNameHu: "Galícia",
        isoName: "GA"
    },
    {
        shortName: "PM / IB",
        longNameEn: "Balearic Islands",
        longNameEs: "Islas Baleares",
        longNameHu: "Baleár-szigetek",
        isoName: "PM"
    },
    {
        shortName: "CN / IC",
        longNameEn: "Canary Islands",
        longNameEs: "Islas Canarias",
        longNameHu: "Kanári-szigetek",
        isoName: "CN"
    },
    {
        shortName: "LO / LR",
        longNameEn: "La Rioja",
        longNameEs: "la Rioja",
        longNameHu: "La Rioja",
        isoName: "LO"
    },
    {
        shortName: "PV",
        longNameEn: "Basque Autonomous Community",
        longNameEs: "País Vasco",
        longNameHu: "Baszkföld",
        isoName: "PV"
    },
    {
        shortName: "AS / AST",
        longNameEn: "Asturias",
        longNameEs: "Principado de Asturias",
        longNameHu: "Asztúria",
        isoName: "AS"
    },
    {
        shortName: "MU",
        longNameEn: "Region of Murcia",
        longNameEs: "Región de Murcia",
        longNameHu: "Murcia",
        isoName: "MU"
    },
];

export function findRegionByLongNameEs(longName: string):RegionDescriptionType|undefined {
    return database.find(region => region.longNameEs == longName);
}

export function findRegionByLongNameEn(longName: string):RegionDescriptionType|undefined {
    return database.find(region => region.longNameEn == longName);
}

export function findRegionByIsoName(isoName: string):RegionDescriptionType|undefined{
    return database.find(region => region.isoName == isoName);
}
