import { Cluster } from "./cluster.js";

export class ClusterCoefiente {
    constructor(public readonly cluster: Cluster) { }

    public calculateCoeficiente(object: object) {
        const total = Object.keys(object).reduce((acc, curr) => {
            if(typeof object[curr] === "string")

            if (typeof object[curr] === "number") {
                object[curr] = this.calculateCentroidNumberColumn(key);
            } else if (typeof object[curr] === "string") {
                object[curr] = this.calculateNumberCoeficiente(curr);
            } else if (typeof object[curr] === "boolean") {
                object[curr] = this.calculateCentroidBooleanColumn(key);
            } else if (isValidDate(object[curr])) {
                object[curr] = this.calculateCentroidDateColumn(key);
            }
            const value = Math.pow(object[curr] - this.cluster.centroide[curr], 2);
            return acc + value;
        }, 0);
        return Math.sqrt(total);
    }

    private calculateStringCoeficiente(key: string): number {
        return (
            this.cluster.objects.reduce((acc, curr) => {
                if (curr[key] !== this.cluster.centroide[key]) acc += 1;
                return acc;
            }, 0)
        );
    }

    private calculateNumberCoeficiente(key: string): number {
        return (
            this.cluster.objects.reduce((acc, curr) => {
                if (curr[key] !== this.cluster.centroide[key]) acc += 1;
                return acc;
            }, 0)
        );
    }

    private calculateBooleanCoeficiente(key: string): number {
        return (
            this.cluster.objects.reduce((acc, curr) => {
                if (curr[key] !== this.cluster.centroide[key]) acc += 1;
                return acc;
            }, 0)
        );
    }
}