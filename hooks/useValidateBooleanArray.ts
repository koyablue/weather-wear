export const useValidateBooleanArray = () => {
  /**
   * Check if all items in an array are true
   * usage:
   * const isLoading = areAllValuesTrue([isDataLoading, isUserDataLoading])
   * const isError = areAllValuesTrue([isUserDataError, isOtherDataError])
   *
   * @param {boolean[]} list
   * @return {*}  {boolean}
   */
  // const areAllValuesTrue = (list: boolean[]): boolean => {
  //   if (!list.length) return false

  //   for (let i = 0; i < list.length; i++) {
  //     if (!list[i]) return false
  //   }

  //   return true
  // }

  const hasTrueValue = (list: boolean[]): boolean => {
    if (!list.length) return false

    for (let i = 0; i < list.length; i++) {
      if (list[i]) return true
    }

    return false
  }

  return {
    hasTrueValue
  } as const
}
