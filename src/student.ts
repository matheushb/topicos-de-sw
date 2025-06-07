import { randomUUID } from "crypto";

export class Student {
  constructor(
    // public name: string,
    public age: number
  ) {}
}

export class Cluster {
  private centroide: object | null = null;
  public objects: object[] = [];

  constructor(public readonly name: string, centroide: object) {
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
    if (!this.centroide) {
      this.centroide = object;
    }

    this.objects.push(Object.assign({}, object));
    this.updateCentroide();
  }

  private updateCentroide() {
    Object.keys(this.centroide).forEach((key) => {
      const newCentroidColumnValue =
        this.objects.reduce((acc, curr) => {
          acc += curr[key];
          return acc;
        }, 0) / this.objects.length;

      this.centroide[key] = newCentroidColumnValue;
    });
  }

  public calculateCoeficiente(object: object) {
    const total = Object.keys(object).reduce((acc, curr) => {
      const value = Math.pow(object[curr] - this.centroide[curr], 2);
      return acc + value;
    }, 0);

    return Math.sqrt(total);
  }
}

export class ClusterManager {
  constructor(
    public readonly clusters: Cluster[],
    private readonly maxLimiar: number = 10
  ) {}

  reorganizeClusters(newCluster: Cluster) {
    for (const cluster of this.clusters) {
      for (const object of cluster.objects) {
        const x = cluster.calculateCoeficiente(object);
        const y = newCluster.calculateCoeficiente(object);

        if (y > x && cluster.objects.length > 1) {
          newCluster.add(object);
          cluster.remove(object);
        }
      }
    }
  }

  add(object: object) {
    const menorLimiar = {
      clusterLimiarValue: this.clusters[0].calculateCoeficiente(object),
      currentIndex: 0,
    };

    for (let i = 1; i < this.clusters.length; i++) {
      const limiarAtual = this.clusters[i].calculateCoeficiente(object);

      if (limiarAtual < menorLimiar.clusterLimiarValue) {
        menorLimiar.clusterLimiarValue = limiarAtual;
        menorLimiar.currentIndex = i;
      }
    }
    if (menorLimiar.clusterLimiarValue > this.maxLimiar) {
      const newCluster = new Cluster(randomUUID(), object);
      this.clusters.push(newCluster);
      return this.reorganizeClusters(newCluster);
    }

    console.dir(this.clusters, { depth: null });
    this.clusters[menorLimiar.currentIndex].add(object);
  }
}
