import { Cluster, isValidDate } from "./cluster.js";

export class ClusterCoefiente {
    constructor(public readonly cluster: Cluster) {}

    public calculateCoeficiente(object: object) {
        const total = Object.keys(object).reduce((acc, curr) => {
            let temp = 0;

            if (typeof object[curr] === "number") {
                temp = this.calculateNumberCoeficiente(curr, object);
            } else if (typeof object[curr] === "string") {
                temp = this.calculateStringCoeficiente(curr, object);
            } else if (typeof object[curr] === "boolean") {
                temp = this.calculateBooleanCoeficiente(curr, object);
            } else if (isValidDate(object[curr])) {
                temp = this.calculateDateCoeficiente(curr, object);
            }

            const value = Math.pow(temp, 2);
            return acc + value;
        }, 0);
        return Math.sqrt(total);
    }

    private calculateStringCoeficiente(key: string, object: object): number {
        if (object[key] !== this.cluster.centroide[key]) return 2 * this.cluster.weights.string;
        return 0;
    }

    private calculateNumberCoeficiente(key: string, object: object): number {
        if (object[key] !== this.cluster.centroide[key]) return Math.abs(object[key] - this.cluster.centroide[key]) * this.cluster.weights.number;
        return 0;
    }

    private calculateBooleanCoeficiente(key: string, object: object): number {
        if (object[key] !== this.cluster.centroide[key]) return 2 * this.cluster.weights.boolean;
        return 0;
    }

    private calculateDateCoeficiente(key: string, object: object) {
        if (object[key] !== this.cluster.centroide[key]) {
            const date1 = this.turnDateIntoDays(new Date(object[key]));
            const date2 = this.turnDateIntoDays(new Date(this.cluster.centroide[key]));
            return Math.floor(Math.abs(date1 - date2) * this.cluster.weights.date);
        }
    }

    private turnDateIntoDays(date: Date): number {
        return Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
    }
}
