import { Cluster } from "./knn/cluster.js";
import { KNearestNeighbors } from "./knn/KNearestNeighbors.js";
import { Weight } from "./types/weight.js";
import fs from "fs";

const clusterWeights = {
    boolean: 4,
    date: 0.0001,
    number: 1,
    string: 0,
    isKNN: true,
} satisfies Weight;

const data = fs.readFileSync("archive/Iris.csv", "utf-8");

const parsedData = [];
for (const line of data.split("\n")) {
    const temp = line.split(",");

    parsedData.push({
        SepalLengthCm: Number(temp[1]),
        SepalWidthCm: Number(temp[2]),
        PetalLengthCm: Number(temp[3]),
        PetalWidthCm: Number(temp[4]),
        name: temp[5],
    });
}
console.log(parsedData);

const irisSetosa = new Cluster("IrisSetosa", parsedData[0], clusterWeights);
for (let i = 1; i < 50; i++) {
    const element = parsedData[i];
    irisSetosa.add(element);
}
const irisVersicolor = new Cluster("irisVersicolor", parsedData[51], clusterWeights);
for (let i = 52; i < 100; i++) {
    const element = parsedData[i];
    irisVersicolor.add(element);
}

const irisVirginica = new Cluster("irisVirginica", parsedData[101], clusterWeights);
for (let i = 102; i < 150; i++) {
    const element = parsedData[i];
    irisVirginica.add(element);
}

const knn = new KNearestNeighbors([irisSetosa, irisVersicolor, irisVirginica], 10, clusterWeights);
console.dir(knn, { depth: null });
console.log(
    knn.classify({
        SepalLengthCm: 5.7,
        SepalWidthCm: 2.8,
        PetalLengthCm: 4.1,
        PetalWidthCm: 1.3,
    })
);

console.log(
    knn.classify({
        SepalLengthCm: 5.6,
        SepalWidthCm: 3,
        PetalLengthCm: 4,
        PetalWidthCm: 1.1,
    })
);

console.log(
    knn.classify({
        SepalLengthCm: 5,
        SepalWidthCm: 3.6,
        PetalLengthCm: 1.4,
        PetalWidthCm: 0.2,
    })
);

console.log(
    knn.classify({
        SepalLengthCm: 5.2,
        SepalWidthCm: 3.2,
        PetalLengthCm: 1.8,
        PetalWidthCm: 0.4,
    })
);

console.log(
    knn.classify({
        SepalLengthCm: 6,
        SepalWidthCm: 2.5,
        PetalLengthCm: 5.5,
        PetalWidthCm: 1.7,
    })
);
