export const useValidateBooleanArray = () => {
  const castAllValuesBoolean = (list: any[]): boolean[] => (
    list.map(v => Boolean(v))
  )

  const areAllValuesTrue = (list: boolean[]): boolean => {
    if (!list.length) return false

    for (let i = 0; i < list.length; i++) {
      if (!list[i]) return false
    }

    return true
  }

  const hasTrueValue = (list: boolean[]): boolean => {
    if (!list.length) return false

    for (let i = 0; i < list.length; i++) {
      if (list[i]) return true
    }

    return false
  }

  return {
    castAllValuesBoolean,
    areAllValuesTrue,
    hasTrueValue
  } as const
}
