# 1. Estrutura de dados inicial e manipulação

Desenvolver uma estrutura de dados capaz de armazenar registros (elementos),
com as seguintes funcionalidades:

- o Inserção de novos registros.
- o Remoção e alteração de registros.
- o Indicação, para cada elemento, se ele é ou não o centróide de um cluster.
- Inicialmente, cada estrutura de dados deve conter apenas um elemento,
- formando assim dois clusters distintos (cada um com um único
  elemento). A estrutura deve permitir a inclusão de novos registros, que
  representarão a formação e o crescimento de cada cluster.

# 2. Atribuição de elementos e cálculo de distâncias

Sempre que um novo elemento for incluído, deve ser realizada:

- A verificação de qual cluster está mais próximo desse novo elemento,
  por meio do cálculo da distância euclidiana.
- A atribuição do novo elemento ao cluster mais próximo.
- A atualização da informação que identifica o centróide de cada cluster,
  mesmo que seja um centróide virtual (calculado em tempo real). (não testado)

# 3. Recalculo do centróide e reorganização

Após a atribuição do novo elemento a um cluster, deve ser:

- Feito o recálculo do centróide desse cluster.
- Atualizada a marcação do centróide na estrutura de dados.
- Realizada a reorganização dos elementos de cada cluster, considerando o
  novo equilíbrio e a dispersão dos dados. (não testado)

# 4. Análise de dispersão e criação de novos clusters

Avaliar os elementos de cada cluster para identificar se estão se tornando muito
distantes de seus centróides originais. Para isso, deve-se:

- Definir um limiar que indique o que significa "estar distante" do
  centróide.
- Localizar os "k" elementos mais distantes de seus centróides e mais
  próximos do outro cluster.
- Caso sejam encontrados elementos que se encaixem nesses critérios, eles
  devem ser removidos de seus clusters originais e formar um novo cluster. (não testado)
- Reorganizar todos os clusters (inclusive o novo, se criado), garantindo a
  consistência dos centróides. (não testado)

# 5. Adequação de dados para uso futuro com KNN

A base de dados para uma futura implementação do algoritmo KNN. Para isso, deve-se:

- Alterar ou estender a estrutura de dados existente para suportar
  elementos categóricos (strings).
- Implementar um mecanismo para converter esses elementos categóricos
  em valores quantitativos, durante a execução do código, sem alteração
  direta dos dados primários.
  Essa transformação permitirá que a base de dados seja utilizada em
  algoritmos que exigem dados numéricos.

# Instruções de Uso

## Componentes do Sistema

### 1. Cluster
O `Cluster` é a classe fundamental que representa um grupo de elementos similares. Cada cluster possui:
- Um nome único (UUID)
- Um centróide (elemento central)
- Uma lista de objetos
- Pesos personalizados para diferentes tipos de dados
- Um coeficiente de cluster para cálculos de distância

### 2. KNearestNeighbors
A classe `KNearestNeighbors` gerencia todos os clusters do sistema. Ela é responsável por:
- Adicionar novos elementos ao cluster mais apropriado
- Criar novos clusters quando necessário
- Reorganizar elementos entre clusters
- Manter a consistência dos dados

### 3. ClusterCoeficiente
Esta classe calcula as distâncias entre elementos e centróides, considerando diferentes tipos de dados:
- Números
- Strings
- Booleanos
- Datas

## Sistema de Pesos (Weights)

O sistema utiliza pesos para ajustar a importância de cada tipo de dado no cálculo de distâncias. Os pesos são definidos através de um objeto com a seguinte estrutura:

```typescript
{
    string: number;  // Peso para comparação de strings
    number: number;  // Peso para comparação de números
    boolean: number; // Peso para comparação de booleanos
    date: number;    // Peso para comparação de datas
}
```

### Exemplo de Pesos
```typescript
const clusterWeights = {
    boolean: 4,      // Booleanos têm alta importância
    date: 0.0001,    // Datas têm baixa importância
    number: 0.7,     // Números têm importância média
    string: 4        // Strings têm alta importância
}
```

### Como os Pesos Afetam o Sistema

1. **Strings e Booleanos (peso: 4)**
   - Alta importância na comparação
   - Diferenças nestes campos têm grande impacto na distância
   - Útil para dados categóricos importantes

2. **Números (peso: 0.7)**
   - Importância média
   - Permite variações numéricas sem grande impacto
   - Ideal para dados contínuos

3. **Datas (peso: 0.0001)**
   - Baixa importância
   - Permite maior flexibilidade na comparação temporal
   - Útil quando a data não é um fator decisivo

## Limiar (Threshold)

O sistema utiliza um limiar máximo (`maxLimiar`) para determinar quando criar um novo cluster:
- Se a distância do elemento mais próximo for maior que o limiar, um novo cluster é criado
- Isso ajuda a controlar a dispersão dos dados
- Valores menores criam clusters mais compactos
- Valores maiores permitem clusters mais dispersos

## Uso Prático

1. **Criação de Clusters Iniciais**
   ```typescript
   const cluster1 = new Cluster(uuid, elementoInicial, pesos);
   const cluster2 = new Cluster(uuid, elementoInicial, pesos);
   const gerenciador = new KNearestNeighbors([cluster1, cluster2], limiar, pesos);
   ```

2. **Adição de Novos Elementos**
   ```typescript
   gerenciador.add(novoElemento);
   ```

3. **Ajuste de Pesos**
   - Ajuste os pesos conforme a importância de cada tipo de dado no seu caso de uso
   - Valores maiores = maior importância na comparação
   - Valores menores = menor importância na comparação
