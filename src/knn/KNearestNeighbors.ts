import { Weight } from "../types/weight.js";
import { Cluster } from "./cluster.js";
import { randomUUID } from "crypto";

export class KNearestNeighbors {
    constructor(public readonly clusters: Cluster[], private readonly maxLimiar: number, private readonly weights?: Weight) {}

    public reorganizeClusters(newCluster: Cluster) {
        for (const cluster of this.clusters) {
            for (const object of cluster.objects) {
                const currentClusterCoeficiente = cluster.clusterCoeficiente.calculateCoeficiente(object);
                const newClusterCoeficiente = newCluster.clusterCoeficiente.calculateCoeficiente(object);

                if (newClusterCoeficiente < currentClusterCoeficiente) {
                    newCluster.add(object);
                    cluster.remove(object);
                }
            }
        }
    }

    private getLesserLimiar(object: object) {
        const menorLimiar = {
            clusterLimiarValue: this.clusters[0].clusterCoeficiente.calculateCoeficiente(object),
            currentIndex: 0,
        };

        for (let i = 1; i < this.clusters.length; i++) {
            const limiarAtual = this.clusters[i].clusterCoeficiente.calculateCoeficiente(object);

            if (limiarAtual < menorLimiar.clusterLimiarValue) {
                menorLimiar.clusterLimiarValue = limiarAtual;
                menorLimiar.currentIndex = i;
            }
        }
        if (menorLimiar.clusterLimiarValue > this.maxLimiar && !this.weights.isKNN) {
            const newCluster = new Cluster(randomUUID(), object, this.weights);
            this.clusters.push(newCluster);
            return this.reorganizeClusters(newCluster);
        }

        return menorLimiar;
    }

    public add(object: object) {
        const menorLimiar = this.getLesserLimiar(object);

        if (!menorLimiar) return;

        this.clusters[menorLimiar.currentIndex].add(object);
    }

    public classify(object: object) {
        const menorLimiar = this.getLesserLimiar(object);

        if (!menorLimiar) return;

        return this.clusters[menorLimiar.currentIndex].name;
    }
}
