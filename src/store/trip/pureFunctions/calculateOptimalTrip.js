import GraphVertex from '~/thirdPartyHelpers/js-data-structures/graph/GraphVertex'
import GraphEdge from '~/thirdPartyHelpers/js-data-structures/graph/GraphEdge'
import Graph from '~/thirdPartyHelpers/js-data-structures/graph/Graph'
import dijkstra from '~/thirdPartyHelpers/js-algorithms/dijkstra/dijkstra'

/*
 *  create a vertex for deach destination and the startingLoc, name the
 *  vertex with the stop's unique id for quick accessing and identifying
 */
const createVertices = (formattedResponse) =>
  Object.values(formattedResponse).reduce(
    (acc, loc) => ({
      ...acc,
      [loc.uid || 'startingLoc']: new GraphVertex(loc.uid || 'startingLoc'),
    }),
    {}
  )

/*
 *  Create edges between vertices (V * V)
 */
const createEdges = (vertices, formattedResponse) =>
  Object.values(vertices).reduce((acc, { value: verticiesProp }) => {
    const fromVertex = vertices[verticiesProp]

    const edgesFromVortex = formattedResponse[verticiesProp].results.map((res) => {
      // get vertex for that destination
      const toVertex = vertices[res.toUID]

      /*
       *  calculate the weight, if Google's DistanceMatrix returned ZERO_RESULTS for that element,
       *  then set weight to infinity so it will be picked last
       */

      const weight = res.info !== 'ZERO_RESULTS' ? res.info.distance.value : Infinity

      // set the edge to be from the FROM vertex, to the toVertex
      return new GraphEdge(fromVertex, toVertex, weight)
    })

    // add the edges for this vortex to the total edges arr
    return [...acc, ...edgesFromVortex]
  }, [])

const createGraph = (edges) => {
  // the end vertex, which will be set to starting vertex later on for trip loop
  const endVertex = new GraphVertex('end')

  // create the directed graph, distance is different based on direction
  const graph = new Graph(true)

  // add the end vortex to graph
  graph.addVertex(endVertex)

  // add edges to graph
  edges.forEach((edge) => graph.addEdge(edge))

  return graph
}

const getOrderedTrip = (orderedVertices, formattedResponse) => {
  // verticies have loc uid as value! uid points to dest obj in formattedResponse obj
  const uidLocs = Object.keys(orderedVertices)

  // costs, lowest to highest for optimal path, with Infinity being the last point to reach
  const costs = Object.values(orderedVertices)

  // sort from lowest to highest cost ASC
  costs.sort((a, b) => a - b)

  // keep track of default order for indexes to be the same with locs arr
  const defaultOrder = Object.values(orderedVertices)

  const orderedTrip = costs.map((cost) => {
    // get index of ordered cost inside of the default order costs
    const costIndex = defaultOrder.indexOf(cost)

    // replace formattedResponse['end'] with startingLoc, so it loops back to start point
    const locRelatedToCost = {
      ...(formattedResponse[uidLocs[costIndex]] || formattedResponse.startingLoc),
    }

    /*
     * since currently calcualting otpimal trip only on distance, the cost will be the distance.
     * Let's keep track of this since it can be useful for user display info
     */
    locRelatedToCost.costToHere = cost

    // also keep track of the uid for orderedTripWithMoreInfo
    locRelatedToCost.uid = uidLocs[costIndex] === 'end' ? 'startingLoc' : uidLocs[costIndex]

    return locRelatedToCost
  })

  return orderedTrip
}

/*
 * each stop has a results array containing info { duration, distance } from it to all other stops
 * take the next stop in the ordered trip, and based on its UID find which element in the results array
 * refers to the next optimal stop, and take its info and add to the current stop
 */
const addTripInfoToOrderedTrip = (orderedTrip) =>
  orderedTrip.map((stop, index) => {
    const stopWithInfo = {
      ...stop,
    }

    // if not last item of array
    if (index < orderedTrip.length - 1) {
      const nextStopID = orderedTrip[index + 1].uid

      // get the info obj in regards to next stop from the current stops' results arr
      stopWithInfo.infoTripTillNextStop = stop.results.filter(
        ({ toUID }) => toUID === nextStopID
      )[0].info
    }

    return stopWithInfo
  })

const calculateOptimalTrip = (formattedResponse) => {
  // verticies => { [uid]: loc, .. }
  const vertices = createVertices(formattedResponse)
  console.log('vertices', vertices)

  // create the edges between the verticies
  const edges = createEdges(vertices, formattedResponse)
  console.log('edges', edges)

  // create a directed Graph by giving it all possible edges
  const graph = createGraph(edges)
  console.log('grpah', graph)

  // distances => object containing vertices name and cumulative cost to that vertex
  const { distances } = dijkstra(graph, vertices.startingLoc)
  console.log('orderedVertices', distances)

  // based on the ordered vertices, order the formatted response
  const orderedTrip = getOrderedTrip(distances, formattedResponse)
  console.log('orderedTrip', orderedTrip)

  // add distance and duration properties for each stop
  const orderedTripWithMoreInfo = addTripInfoToOrderedTrip(orderedTrip)

  console.log('orderedTripWithMoreInfo', orderedTripWithMoreInfo)
  return orderedTripWithMoreInfo
}

export default calculateOptimalTrip
