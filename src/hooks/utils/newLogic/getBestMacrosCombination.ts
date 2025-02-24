export const getBestMacrosCombination = (carbsOptions, proOptions, fatOptions, defaultCalorie) => {
  let bestMacrosCombination = null
  let closestDifference = Infinity

  console.log(carbsOptions)
  console.log(proOptions)
  console.log(fatOptions)

  // Helper function to calculate the total macros and calories for a given combination
  const calculateCombinedMacros = (carbOption, proOption, fatOption) => {
    return {
      carb: carbOption.macros.carb + proOption.macros.carb + fatOption.macros.carb,
      pro: carbOption.macros.pro + proOption.macros.pro + fatOption.macros.pro,
      fat: carbOption.macros.fat + proOption.macros.fat + fatOption.macros.fat,
      calories: carbOption.macros.calories + proOption.macros.calories + fatOption.macros.calories
    }
  }

  // Iterate over each combination of carb, protein, and fat options
  carbsOptions.forEach((carbOption) => {
    proOptions.forEach((proOption) => {
      fatOptions.forEach((fatOption) => {
        const combinedMacros = calculateCombinedMacros(carbOption, proOption, fatOption)
        const calorieDifference = Math.abs(combinedMacros.calories - defaultCalorie)
        if (calorieDifference < closestDifference) {
          closestDifference = calorieDifference
          bestMacrosCombination = {
            items: [...carbOption.items, ...proOption.items, ...fatOption.items],
            macros: combinedMacros,
            calorieDifference
          }

          // Break early if the combination is very close to the default calories
          if (calorieDifference <= 1) {
            return bestMacrosCombination
          }
        }
      })
    })
  })

  console.log(bestMacrosCombination)

  return bestMacrosCombination
}
