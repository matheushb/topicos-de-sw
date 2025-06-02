import { Student, Cluster, ClusterManager } from "./student.js";

const cluster1 = new Cluster("Jones Manuel", {
  age: 18,
  abscencePercentage: 0.3,
  gradeAverage: 8.7,
});
const cluster2 = new Cluster("Wilker Leao", {
  age: 27,
  abscencePercentage: 0.1,
  gradeAverage: 6.2,
});

const clusterManager = new ClusterManager([cluster1, cluster2]);

const unicesumarStudent3: Student = {
  age: 23,
  abscencePercentage: 0.4,
  gradeAverage: 4.7,
};

const unicesumarStudent4: Student = {
  age: 100,
  abscencePercentage: 0.0,
  gradeAverage: 10.0,
};

const unicesumarStudent5: Student = {
  age: 1,
  abscencePercentage: 100.0,
  gradeAverage: 0.0,
};

const unicesumarStudent6: Student = {
  age: 27,
  abscencePercentage: 0.1,
  gradeAverage: 6.2,
};

clusterManager.add(unicesumarStudent3);
clusterManager.add(unicesumarStudent4);
clusterManager.add(unicesumarStudent5);
clusterManager.add(unicesumarStudent5);
clusterManager.add(unicesumarStudent6);
