// helpers to hanlde different input type (like date picker), to work with the useInputHandler hook
export const handleDateChange = (onDateInputChangeHandler, value, name) =>
  onDateInputChangeHandler({
    target: {
      getAttribute() {
        return name
      },
      value,
    },
  })

export const handleGoogleAutocompleteChange = (
  onInputChangeHandler,
  value,
  name,
  lat = null,
  lng = null
) =>
  onInputChangeHandler({
    target: {
      value: {
        label: value,
        lat,
        lng,
      },
      getAttribute() {
        return name
      },
    },
  })
