export const useValidateBooleanArray = () => {
  const castAllValuesBoolean = (list: any[]): boolean[] => (
    list.map(v => Boolean(v))
  )

  const allValuesTrue = (list: boolean[]): boolean => {
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
    allValuesTrue,
    hasTrueValue
  } as const
}
