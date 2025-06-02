export class Student {
  constructor(
    // public name: string,
    public age: number,
    public abscencePercentage: number,
    public gradeAverage: number
  ) {}
}

export class Cluster {
  private centroide: object | null = null;
  private objects: object[] = [];

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
  constructor(private readonly clusters: Cluster[]) {}

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

    console.log(menorLimiar);

    this.clusters[menorLimiar.currentIndex].add(object);
    console.dir(this.clusters, { depth: null });
  }
}
