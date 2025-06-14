import { Weight } from "../types/weight.js";
import { ClusterCoefiente } from "./clusterCoefiente.js";

export function isValidDate(date: string) {
    const data = new Date(date);
    return !isNaN(data.getTime());
}

export class Cluster {
    public readonly clusterCoeficiente: ClusterCoefiente = new ClusterCoefiente(this);

    public centroide: object | null = null;
    public objects: object[] = [];

    constructor(public readonly name: string, centroide: object, public readonly weights: Weight) {
        this.add(centroide);
    }

    public update(object: object, update: object) {
        this.remove(object);
        this.add(update);
    }

    public remove(object: object) {
        const objectIndex = this.objects.findIndex((obj) => Object.is(obj, object));
        this.objects.splice(objectIndex, 1);
        this.updateCentroide();
    }

    public add(object: object) {
        Object.keys(object).forEach((key) => {
            if (typeof object[key] === "string") object[key] = this.normalizarString(object[key]);
        });

        if (!this.centroide) {
            this.centroide = object;
        }

        this.objects.push(Object.assign({}, object));
        this.updateCentroide();
    }

    private updateCentroide() {
        Object.keys(this.centroide).forEach((key) => {
            if (typeof this.centroide[key] === "number") {
                this.centroide[key] = this.calculateCentroidNumberColumn(key);
            } else if (typeof this.centroide[key] === "string") {
                this.centroide[key] = this.calculateCentroidStringColumn(key);
            } else if (typeof this.centroide[key] === "boolean") {
                this.centroide[key] = this.calculateCentroidBooleanColumn(key);
            } else if (isValidDate(this.centroide[key])) {
                this.centroide[key] = this.calculateCentroidDateColumn(key);
            }
        });
    }

    private calculateCentroidBooleanColumn(key: string): boolean | null {
        const booleanValue = this.objects.reduce((acc, curr) => {
            return acc + (curr[key] === true ? 1 : -1);
        }, 0);

        return booleanValue > 0;
    }

    private calculateCentroidStringColumn(key: string): string {
        const stringMap = new Map<string, number>();

        this.objects.forEach((curr) => {
            if (!stringMap.has(curr[key])) stringMap.set(curr[key], 1);

            stringMap.set(curr[key], stringMap.get(curr[key]) + 1);
        });

        const maxValue = Math.max(...stringMap.values());

        return Array.from(stringMap.entries()).find((p) => p[1] === maxValue)[0];
    }

    private normalizarString(str: string) {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9\s]/g, "")
            .replace(/\s+/g, " ")
            .trim();
    }

    private calculateCentroidNumberColumn(key: string) {
        return (
            this.objects.reduce((acc, curr) => {
                acc += curr[key];
                return acc;
            }, 0) / this.objects.length
        );
    }

    private calculateCentroidDateColumn(key: string) {
        return new Date(
            this.objects.reduce((acc, curr) => {
                const dateValue = new Date(curr[key]).getTime();
                acc += dateValue;
                return acc;
            }, 0) / this.objects.length
        );
    }
}
