import { randomUUID } from "crypto";

function isValidDate(date: string) {
  const data = new Date(date);
  return !isNaN(data.getTime());
}

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
      let newCentroidColumnValue = 0;

      if (typeof this.centroide[key] === "number") {
        newCentroidColumnValue += this.calculateNumberColumn(key);
      } else if (typeof this.centroide[key] === "string") {
        newCentroidColumnValue += this.calculateStringColumn(key);
      } else if (typeof this.centroide[key] === "boolean") {
        newCentroidColumnValue += this.calculateBooleanColumn(key);
      } else if (isValidDate(this.centroide[key])) {
        this.centroide[key] = this.calculateDate(key);
      }
    });
  }

  private calculateBooleanColumn(key: string): number {
    return (
      this.objects.reduce((acc, curr) => {
        if (curr[key] !== this.centroide[key]) acc += 1;
        return acc;
      }, 0) / this.objects.length
    );
  }

  private calculateStringColumn(key: string): number {
    return (
      this.objects.reduce((acc, curr) => {
        if (normalizarString(curr[key]) !== this.centroide[key]) acc += 1;
        return acc;
      }, 0) / this.objects.length
    );

    function normalizarString(str: string) {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();
    }
  }

  private calculateNumberColumn(key: string) {
    return (
      this.objects.reduce((acc, curr) => {
        acc += curr[key];
        return acc;
      }, 0) / this.objects.length
    );
  }

  private calculateDate(key: string) {
    //#TODO: arrumar essa porra pra ser chamad em cima
    // (new Date().getTime() - new Date("2024-01").getTime()) / 1_000_000_000
    return (
      this.objects.reduce((acc, curr) => {
        const dateValue = new Date(curr[key]).getTime();
        acc += dateValue;
        return acc;
      }, 0) / this.objects.length
    );
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
        const currentClusterCoeficiente = cluster.calculateCoeficiente(object);
        const newClusterCoeficiente = newCluster.calculateCoeficiente(object);

        if (newClusterCoeficiente < currentClusterCoeficiente) {
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

    this.clusters[menorLimiar.currentIndex].add(object);
  }
}
