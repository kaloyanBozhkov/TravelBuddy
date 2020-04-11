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
