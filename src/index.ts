import { randomUUID } from "crypto";
import { Weight } from "./types/weight.js";
import { Cluster } from "./knn/cluster.js";
import { KNearestNeighbors } from "./knn/KNearestNeighbors.js";

export enum LabelEnum {
    Royalty = "Royalty",
    Foods = "Foods",
    SciFi = "SciFi",
    Fantasy = "Fantasy",
    Ocean = "Ocean",
    Cowboys = "Cowboys",
}

const clusterWeights = {
    boolean: 4,
    date: 0.0001,
    number: 0.7,
    string: 4,
} satisfies Weight;

const cluster1 = new Cluster(
    randomUUID(),
    {
        age: 23,
        createdAt: new Date("20025-01-01"),
        active: true,
        label: LabelEnum.Royalty,
    },
    clusterWeights
);
const cluster2 = new Cluster(
    randomUUID(),
    {
        age: 29,
        createdAt: new Date("2025-02-02"),
        active: false,
        label: LabelEnum.Foods,
    },
    clusterWeights
);

const clusterManager = new KNearestNeighbors([cluster1, cluster2], 10, clusterWeights);

const testes = [
    { age: 59, createdAt: new Date("2026-03-01"), active: true, label: LabelEnum.Royalty },
    { age: 44, createdAt: new Date("2026-01-01"), active: false, label: LabelEnum.Royalty },
    { age: 56, createdAt: new Date("2026-01-01"), active: false, label: LabelEnum.Royalty },
    { age: 90, createdAt: new Date("2026-01-01"), active: false, label: LabelEnum.Royalty },
    { age: 59, createdAt: new Date("2026-03-01"), active: false, label: LabelEnum.Royalty },
    { age: 33, createdAt: new Date("2026-03-01"), active: false, label: LabelEnum.Foods },
    { age: 83, createdAt: new Date("2026-03-01"), active: false, label: LabelEnum.Foods },
    { age: 20, createdAt: new Date("2026-03-01"), active: true, label: LabelEnum.Foods },
    { age: 59, createdAt: new Date("2026-03-01"), active: true, label: LabelEnum.Foods },
    { age: 38, createdAt: new Date("2026-03-01"), active: true, label: LabelEnum.Foods },
    { age: 96, createdAt: new Date("2026-03-01"), active: true, label: LabelEnum.SciFi },
    { age: 78, createdAt: new Date("2026-03-01"), active: true, label: LabelEnum.SciFi },
    { age: 61, createdAt: new Date("2026-03-01"), active: true, label: LabelEnum.SciFi },
    { age: 76, createdAt: new Date("2026-03-01"), active: false, label: LabelEnum.SciFi },
    { age: 72, createdAt: new Date("2026-03-01"), active: false, label: LabelEnum.SciFi },
    { age: 33, createdAt: new Date("2026-03-01"), active: true, label: LabelEnum.Fantasy },
    { age: 56, createdAt: new Date("2025-03-01"), active: true, label: LabelEnum.Fantasy },
    { age: 19, createdAt: new Date("2025-03-01"), active: true, label: LabelEnum.Fantasy },
    { age: 92, createdAt: new Date("2025-03-01"), active: true, label: LabelEnum.Fantasy },
    { age: 25, createdAt: new Date("2025-03-01"), active: true, label: LabelEnum.Fantasy },
    { age: 96, createdAt: new Date("2025-06-01"), active: true, label: LabelEnum.Ocean },
    { age: 84, createdAt: new Date("2025-06-01"), active: true, label: LabelEnum.Ocean },
    { age: 78, createdAt: new Date("2025-06-01"), active: true, label: LabelEnum.Ocean },
    { age: 67, createdAt: new Date("2025-06-01"), active: false, label: LabelEnum.Ocean },
    { age: 24, createdAt: new Date("2025-06-01"), active: true, label: LabelEnum.Ocean },
    { age: 95, createdAt: new Date("2025-01-01"), active: false, label: LabelEnum.Cowboys },
    { age: 49, createdAt: new Date("2025-01-01"), active: true, label: LabelEnum.Cowboys },
    { age: 35, createdAt: new Date("2025-02-01"), active: false, label: LabelEnum.Cowboys },
    { age: 100, createdAt: new Date("2025-02-01"), active: false, label: LabelEnum.Cowboys },
    { age: 91, createdAt: new Date("2025-02-01"), active: false, label: LabelEnum.Cowboys },
    { age: 88, createdAt: new Date("2025-02-01"), active: false, label: LabelEnum.Cowboys },
    { age: 45, createdAt: new Date("2025-02-01"), active: false, label: LabelEnum.Cowboys },
    { age: 60, createdAt: new Date("2025-02-01"), active: false, label: LabelEnum.Cowboys },
    { age: 70, createdAt: new Date("2025-02-01"), active: false, label: LabelEnum.Cowboys },
    { age: 80, createdAt: new Date("2025-01-01"), active: false, label: LabelEnum.Cowboys },
    { age: 55, createdAt: new Date("2025-01-01"), active: false, label: LabelEnum.Cowboys },
];

for (const item of testes) {
    clusterManager.add(item);
}

console.dir(clusterManager.clusters, { depth: null });
