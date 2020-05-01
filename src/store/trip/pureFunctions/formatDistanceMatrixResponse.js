/*
 *  format Google DistanceMatrix's response to be more human friendly & understandable
 *  + to contain the destinations preferences and labels based on travelBuddy's needs
 */
const formatDistanceMatrixResponse = (response, destinations, startingLocation) =>
  response.rows.reduce(
    (acc, { elements: rowArr }, index) => ({
      ...acc,
      // if on last row of rows, means it is for startingLoc (since it was pushed last into nodes arr)
      [index === response.rows.length - 1 ? 'startingLoc' : destinations[index].uid]: {
        // copy over config of each destination (lat, lng, label, preferences (if not startingLoc) )
        ...(index === response.rows.length - 1
          ? startingLocation // will be { label, lat, lng }
          : {
              // format the object to be { label, lat, lng, preference: { stays, beHereOn, weatherPRef }, uid }
              ...destinations[index].location,
              preferences: (({ location, uid, ...preferences }) => ({
                ...preferences,
              }))(destinations[index]),
              uid: destinations[index].uid,
            }),

        // add a results property which is the formated results for each one of destinations and the startingLoc
        results: rowArr.map((row, index) => ({
          to:
            // if on last row of rows, means it is for startingLoc (since it was pushed last into nodes arr)
            rowArr.length - 1 === index
              ? startingLocation.label
              : destinations[index].location.label,
          // also keep track of the property in formattedResponse that the label points to (the uid!), for quick property referencing in obj
          toUID: rowArr.length - 1 === index ? 'startingLoc' : destinations[index].uid,

          // check if no data returned for thic city to that city e.g. USA city to European city by car.. good luck!
          info:
            row.status === 'ZERO_RESULTS'
              ? 'ZERO_RESULTS'
              : {
                  duration: row.duration,
                  distance: row.distance,
                },
        })),
      },
    }),
    {}
  )

export default formatDistanceMatrixResponse
