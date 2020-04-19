import GraphVertex from '~/thirdPartyHelpers/js-data-structures/graph/GraphVertex'
import GraphEdge from '~/thirdPartyHelpers/js-data-structures/graph/GraphEdge'
import Graph from '~/thirdPartyHelpers/js-data-structures/graph/Graph'
import dijkstra from '~/thirdPartyHelpers/js-algorithms/dijkstra/dijkstra'

describe('dijkstra', () => {
  it('should find minimum paths to all vertices for undirected graph', () => {
    const vertexA = new GraphVertex('A')
    const vertexB = new GraphVertex('B')
    const vertexC = new GraphVertex('C')
    const vertexD = new GraphVertex('D')
    const vertexE = new GraphVertex('E')
    const vertexF = new GraphVertex('F')
    const vertexG = new GraphVertex('G')
    const vertexH = new GraphVertex('H')

    const edgeAB = new GraphEdge(vertexA, vertexB, 4)
    const edgeAE = new GraphEdge(vertexA, vertexE, 7)
    const edgeAC = new GraphEdge(vertexA, vertexC, 3)
    const edgeBC = new GraphEdge(vertexB, vertexC, 6)
    const edgeBD = new GraphEdge(vertexB, vertexD, 5)
    const edgeEC = new GraphEdge(vertexE, vertexC, 8)
    const edgeED = new GraphEdge(vertexE, vertexD, 2)
    const edgeDC = new GraphEdge(vertexD, vertexC, 11)
    const edgeDG = new GraphEdge(vertexD, vertexG, 10)
    const edgeDF = new GraphEdge(vertexD, vertexF, 2)
    const edgeFG = new GraphEdge(vertexF, vertexG, 3)
    const edgeEG = new GraphEdge(vertexE, vertexG, 5)

    const graph = new Graph()

    graph
      .addVertex(vertexH)
      .addEdge(edgeAB)
      .addEdge(edgeAE)
      .addEdge(edgeAC)
      .addEdge(edgeBC)
      .addEdge(edgeBD)
      .addEdge(edgeEC)
      .addEdge(edgeED)
      .addEdge(edgeDC)
      .addEdge(edgeDG)
      .addEdge(edgeDF)
      .addEdge(edgeFG)
      .addEdge(edgeEG)

    const { distances, previousVertices } = dijkstra(graph, vertexA)

    expect(distances).toEqual({
      H: Infinity,
      A: 0,
      B: 4,
      E: 7,
      C: 3,
      D: 9,
      G: 12,
      F: 11,
    })

    expect(previousVertices.F.getKey()).toBe('D')
    expect(previousVertices.D.getKey()).toBe('B')
    expect(previousVertices.B.getKey()).toBe('A')
    expect(previousVertices.G.getKey()).toBe('E')
    expect(previousVertices.C.getKey()).toBe('A')
    expect(previousVertices.A).toBeNull()
    expect(previousVertices.H).toBeNull()
  })

  it('should find minimum paths to all vertices for directed graph with negative edge weights', () => {
    const vertexS = new GraphVertex('S')
    const vertexE = new GraphVertex('E')
    const vertexA = new GraphVertex('A')
    const vertexD = new GraphVertex('D')
    const vertexB = new GraphVertex('B')
    const vertexC = new GraphVertex('C')
    const vertexH = new GraphVertex('H')

    const edgeSE = new GraphEdge(vertexS, vertexE, 8)
    const edgeSA = new GraphEdge(vertexS, vertexA, 10)
    const edgeED = new GraphEdge(vertexE, vertexD, 1)
    const edgeDA = new GraphEdge(vertexD, vertexA, -4)
    const edgeDC = new GraphEdge(vertexD, vertexC, -1)
    const edgeAC = new GraphEdge(vertexA, vertexC, 2)
    const edgeCB = new GraphEdge(vertexC, vertexB, -2)
    const edgeBA = new GraphEdge(vertexB, vertexA, 1)

    const graph = new Graph(true)

    graph
      .addVertex(vertexH)
      .addEdge(edgeSE)
      .addEdge(edgeSA)
      .addEdge(edgeED)
      .addEdge(edgeDA)
      .addEdge(edgeDC)
      .addEdge(edgeAC)
      .addEdge(edgeCB)
      .addEdge(edgeBA)

    const { distances, previousVertices } = dijkstra(graph, vertexS)

    expect(distances).toEqual({
      H: Infinity,
      S: 0,
      A: 5,
      B: 5,
      C: 7,
      D: 9,
      E: 8,
    })

    expect(previousVertices.H).toBeNull()
    expect(previousVertices.S).toBeNull()
    expect(previousVertices.B.getKey()).toBe('C')
    expect(previousVertices.C.getKey()).toBe('A')
    expect(previousVertices.A.getKey()).toBe('D')
    expect(previousVertices.D.getKey()).toBe('E')
  })

  it('should work with distances on a directed graph', () => {
    const vertexBergamo = new GraphVertex('Bergamo')
    const vertexVarna = new GraphVertex('Varna')
    const vertexSofia = new GraphVertex('Sofia')
    const vertexPlovdiv = new GraphVertex('Plovdiv')

    const edgeBergamoVarna = new GraphEdge(vertexBergamo, vertexVarna, 1809)
    const edgeBergamoSofia = new GraphEdge(vertexBergamo, vertexSofia, 1368)
    const edgeBergamoPlovdiv = new GraphEdge(vertexBergamo, vertexPlovdiv, 1521)
    const edgeBergamoBergamo = new GraphEdge(vertexBergamo, vertexBergamo, 0.001)

    const edgeVarnaBergamo = new GraphEdge(vertexVarna, vertexBergamo, 1809)
    const edgeVarnaSofia = new GraphEdge(vertexVarna, vertexSofia, 440)
    const edgeVarnaPlovdiv = new GraphEdge(vertexVarna, vertexPlovdiv, 374)
    const edgeVarnaVarna = new GraphEdge(vertexVarna, vertexVarna, 0.001)

    const edgePlovdivBergamo = new GraphEdge(vertexPlovdiv, vertexBergamo, 1633)
    const edgePlovdivSofia = new GraphEdge(vertexPlovdiv, vertexSofia, 144)
    const edgePlovdivVarna = new GraphEdge(vertexPlovdiv, vertexVarna, 375)
    const edgePlovdivPlovdiv = new GraphEdge(vertexPlovdiv, vertexPlovdiv, 0.001)

    const edgeSofiaBergamo = new GraphEdge(vertexSofia, vertexBergamo, 1467)
    const edgeSofiaPlovdiv = new GraphEdge(vertexSofia, vertexPlovdiv, 146)
    const edgeSofiaVarna = new GraphEdge(vertexSofia, vertexVarna, 441)
    const edgeSofiaSofia = new GraphEdge(vertexSofia, vertexSofia, 0.001)

    const vertexEnd = new GraphVertex('end')

    const graph = new Graph(true)

    graph
      .addVertex(vertexEnd)
      .addEdge(edgeBergamoVarna)
      .addEdge(edgeBergamoSofia)
      .addEdge(edgeBergamoPlovdiv)
      .addEdge(edgeVarnaBergamo)
      .addEdge(edgeVarnaSofia)
      .addEdge(edgeVarnaPlovdiv)
      .addEdge(edgePlovdivBergamo)
      .addEdge(edgePlovdivSofia)
      .addEdge(edgePlovdivVarna)
      .addEdge(edgeSofiaBergamo)
      .addEdge(edgeSofiaPlovdiv)
      .addEdge(edgeSofiaVarna)
      .addEdge(edgeBergamoBergamo)
      .addEdge(edgeVarnaVarna)
      .addEdge(edgePlovdivPlovdiv)
      .addEdge(edgeSofiaSofia)

    // starting from sofia!
    const { distances, previousVertices } = dijkstra(graph, vertexSofia)

    // results ordered by weight lowest to highest
    expect(distances).toEqual({
      Bergamo: 1467,
      Plovdiv: 146,
      Sofia: 0,
      Varna: 441,
      end: Infinity,
    })

    expect(previousVertices.end).toBeNull()
    expect(previousVertices.Sofia).toBeNull()
    expect(previousVertices.Varna.getKey()).toBe('Sofia')
    expect(previousVertices.Plovdiv.getKey()).toBe('Sofia')
    expect(previousVertices.Bergamo.getKey()).toBe('Sofia')
  })
})
