import GraphVertex from '~/thirdPartyHelpers/js-data-structures/graph/GraphVertex'
import GraphEdge from '~/thirdPartyHelpers/js-data-structures/graph/GraphEdge'
import Graph from '~/thirdPartyHelpers/js-data-structures/graph/Graph'
import dijkstra from '~/thirdPartyHelpers/js-algorithms/dijkstra/dijkstra'

const calculateOptimalTrip = (formattedResponse) => {
  // create a vertex for deach destination and the startingLoc, store the destination/startingLoc info inside the vertex instead of just naming it
  const vertices = Object.values(formattedResponse).reduce(
    (acc, loc) => ({
      ...acc,
      [loc.uid || 'startingLoc']: new GraphVertex(loc.uid || 'startingLoc'),
    }),
    {}
  )

  // verticies => { [uid]: loc, .. }

  // create the edges between the verticies
  const edges = Object.values(vertices).reduce((acc, { value: verticiesProp }) => {
    const fromVertex = vertices[verticiesProp]

    const edgesFromVortex = formattedResponse[verticiesProp].results.map((res) => {
      // get vertex for that destination
      const toVertex = vertices[res.toUID]

      // @TODO res.distance.value for using distance, we could use res.duration.value for checking based on time instead? Though driving distance will always be proportional to time taken to drive it, unless other opts are added?

      // calculate the weight, if Google's DistanceMatrix returned ZERO_RESULTS for that element, then set weight to infinity so it will be picked last
      const weight = res.info !== 'ZERO_RESULTS' ? res.info.distance.value : Infinity

      // set the edge to be from the FROM vertex, to the toVertex
      return new GraphEdge(fromVertex, toVertex, weight)
    })

    // add the edges for this vortex to the total edges arr
    return [...acc, ...edgesFromVortex]
  }, [])

  // the end vertex, no edges pointing here
  const endVertex = new GraphVertex('end')

  // create the directed graph, distance is different based on direction
  const graph = new Graph(true)

  // add the end vortex to graph
  graph.addVertex(endVertex)

  // add edges to graph
  edges.forEach((edge) => graph.addEdge(edge))

  const { distances } = dijkstra(graph, vertices.startingLoc)

  // verticies have loc uid as value! uid points to dest obj in formattedResponse obj
  const uidLocs = Object.keys(distances)

  // costs, lowest to highest for optimal path, with Infinity being the last point to reach
  const costs = Object.values(distances)

  // sort from lowest to highest cost ASC
  costs.sort((a, b) => a - b)

  // keep track of default order for indexes to be the same with locs arr
  const defaultOrder = Object.values(distances)

  const orderedTrip = costs.map((cost) => {
    // get index of ordered cost inside of the default order costs
    const costIndex = defaultOrder.indexOf(cost)

    // replace formattedResponse['end'] with startingLoc, so it loops back to start point
    const locRelatedToCost = {
      ...(formattedResponse[uidLocs[costIndex]] || formattedResponse.startingLoc),
    }

    // since currently calcualting otpimal trip only on distance, the cost will be the distance. Let's keep track of this since it can be useful for user display info
    locRelatedToCost.costToHere = cost

    // also keep track of the uid for orderedTripWithMoreInfo
    locRelatedToCost.uid = uidLocs[costIndex] === 'end' ? 'startingLoc' : uidLocs[costIndex]

    return locRelatedToCost
  })

  const orderedTripWithMoreInfo = orderedTrip.map((stop, index) => {
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

  return orderedTripWithMoreInfo
}

export default calculateOptimalTrip
