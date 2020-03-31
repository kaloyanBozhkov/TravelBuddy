import { useRef, createRef } from 'react'

// used to create persistant obj that keeps track of input refs and their configs, for uncontrolled from components

/**
 * @param  {array of objects defining inputs} inputDefinitions
 * @param  {object with properties: label, icon, type + optional props to pass}
 */
const usePersistantFields = (inputDefinitions) =>
  useRef(
    inputDefinitions.reduce(
      (acc, field) => {
        acc[field.name] = {
          ...field,
          ref: createRef(null),
          fields: acc, // circular ref
        }
        return acc
      },
      {
        // return array of fields
        getFields() {
          return Object.values(this).filter(
            (field) => field !== this.getFormatted && field !== this.getFields
          )
        },
        // return only necessary props to pass down to Input component
        getFormatted() {
          return this.getFields().map(({ name, label, icon, type, ref }) => ({
            name,
            label,
            icon,
            type,
            ref,
          }))
        },
      }
    )
  )

export default usePersistantFields
