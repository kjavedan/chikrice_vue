export const getBestProteinsOptions = (proItems, macrosRange, userGoal) => {
  const bestProteinsOptions = []

  const totalMinPro = macrosRange.min.proteins
  const totalMaxPro = macrosRange.max.proteins

  let itemsOptions = {}

  // we need to check if the item is eggs then we need to handle the eggs
  proItems.forEach((item) => {
    const itemMinPro = totalMinPro * item.portionPercentage
    const itemMaxPro = totalMaxPro * item.portionPercentage
    const servingFraction = item.details.servingFraction
    const nutrientFacts = item.details.servingSizeNutrientFacts

    // Initialize options for the current item
    itemsOptions[item.details.value] = []

    let closestOption = null
    let closestDiff = Infinity

    // calcualte max fraction basaed on the max protein and serving size
    const maxFraction = Math.ceil(itemMaxPro / nutrientFacts.protein)

    // generate all possible serving within the pro range
    for (let fraction = servingFraction; fraction <= maxFraction; fraction += servingFraction) {
      const fractionProtein = nutrientFacts.protein * fraction
      const diff = Math.abs(fractionProtein - itemMinPro)

      if (fractionProtein >= itemMinPro && fractionProtein <= itemMaxPro) {
        itemsOptions[item.details.value].push({
          name: item.details.value,
          servingSize: fraction,
          carbs: nutrientFacts.carbs * fraction,
          pro: fractionProtein,
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
          carbs: nutrientFacts.carbs * fraction,
          pro: fractionProtein,
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
      // Validate and add current combination
      if ((currentCombo.macros.pro >= totalMinPro, currentCombo.macros.pro <= totalMaxPro)) {
        bestProteinsOptions.push(currentCombo)
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

  return bestProteinsOptions
}
