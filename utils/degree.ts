/**
 *
 *
 * @param {number} celsius
 * @return {*} number
 */
export const celsiusToFahrenheit = (celsius: number) => {
  const fahrenheit = ((celsius * 9) + (32 * 5)) / 5

  return Math.round(fahrenheit * 10) / 10
}
