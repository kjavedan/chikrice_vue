export const getBestCarbsOptions = (carbItems, macrosRange, userGoal) => {
  const bestCarbsOptions = []

  const totalMinCarbs = macrosRange.min.carbs
  const totalMaxCarbs = macrosRange.max.carbs

  let itemsOptions = {}

  // Calculate the carb range for each item
  carbItems.forEach((item) => {
    const itemMinCarb = totalMinCarbs * item.portionPercentage
    const itemMaxCarb = totalMaxCarbs * item.portionPercentage
    const servingFraction = item.details.servingFraction
    const nutrientFacts = item.details.servingSizeNutrientFacts

    // Initialize options for the current item
    itemsOptions[item.details.value] = []

    let closestOption = null
    let closestDiff = Infinity

    // Calculate the maximum fraction based on the max carbs and serving size
    const maxFraction = Math.ceil(itemMaxCarb / nutrientFacts.carbs)

    // Generate all possible serving sizes within the carb range
    for (let fraction = servingFraction; fraction <= maxFraction; fraction += servingFraction) {
      const fractionCarbs = nutrientFacts.carbs * fraction
      const diff = Math.abs(fractionCarbs - itemMinCarb)

      if (fractionCarbs >= itemMinCarb && fractionCarbs <= itemMaxCarb) {
        itemsOptions[item.details.value].push({
          name: item.details.value,
          servingSize: fraction,
          carbs: fractionCarbs,
          pro: nutrientFacts.protein * fraction,
          fat: nutrientFacts.fat * fraction,
          calories: nutrientFacts.calories * fraction
        })
      }

      // Find the closest option if no valid option is found
      if (diff < closestDiff) {
        closestDiff = diff
        closestOption = {
          name: item.details.value,
          servingSize: fraction,
          carbs: fractionCarbs,
          pro: nutrientFacts.protein * fraction,
          fat: nutrientFacts.fat * fraction,
          calories: nutrientFacts.calories * fraction
        }
      }
    }

    // Add the closest option if no exact match is found
    if (itemsOptions[item.details.value].length === 0 && closestOption) {
      itemsOptions[item.details.value].push(closestOption)
    }
  })

  // Combine all options into possible combinations
  const combineOptions = (
    options,
    index = 0,
    currentCombo = { items: [], macros: { carb: 0, pro: 0, fat: 0, calories: 0 } }
  ) => {
    const keys = Object.keys(options)
    if (index === keys.length) {
      // Validate and add the current combination
      if (currentCombo.macros.carb >= totalMinCarbs && currentCombo.macros.carb <= totalMaxCarbs) {
        bestCarbsOptions.push(currentCombo)
      }
      return
    }

    const key = keys[index]
    options[key].forEach((option) => {
      const newCombo = {
        items: [...currentCombo.items, option],
        macros: {
          carb: currentCombo.macros.carb + option.carbs,
          pro: currentCombo.macros.pro + option.pro,
          fat: currentCombo.macros.fat + option.fat,
          calories: currentCombo.macros.calories + option.calories
        }
      }
      combineOptions(options, index + 1, newCombo)
    })
  }

  combineOptions(itemsOptions)

  return bestCarbsOptions
}
