import CarbsBank from '@/data/carbs'
import FruitsBank from '@/data/fruits'
import ProteinsBank from '@/data/proteins'
import regularOil from '@/data/fats/regularOil'
import { mealPriorityListCarbs, mealPriorityListProteins } from './priorityList'
import eggWhite from '@/data/proteins/eggWhite'
import eggs from '@/data/proteins/eggs'

interface MealPlan {
  [key: string]: {
    data: any[]
  }
}

export const populateMealPlanStructure = (
  structure,
  userCarbsList,
  userFruitsList,
  userProteinsList
) => {
  const mealPlan = { ...structure }
  const carbsItems = userCarbsList.map((carb) => CarbsBank[carb])
  const fruitsItems = userFruitsList.map((fruit) => FruitsBank[fruit])
  const proteinsItems = userProteinsList.map((protein) => ProteinsBank[protein])

  const addCarb = (meal, mealNumber) => {
    if (meal.type === 'meal') {
      addMealFood(meal, mealNumber, carbsItems, mealPriorityListCarbs, CarbsBank, 'carb')
    } else {
      // snack
      const selectedSnack = fruitsItems[Math.floor(Math.random() * fruitsItems.length)]
      meal.items = [...meal.items, selectedSnack]
      calculateCarbMacro(selectedSnack, meal.macrosLimit, meal.macrosFilled)
    }
  }

  const isAddedProtenWhey = {}

  const addProtein = (meal, mealNumber, key) => {
    if (meal.type === 'meal') {
      addMealFood(
        meal,
        mealNumber,
        proteinsItems,
        mealPriorityListProteins,
        ProteinsBank,
        'portion'
      )
    } else {
      const isProteinWhey = proteinsItems.find((pro) => pro.value === 'proteinWhey')
      if (isProteinWhey && !isAddedProtenWhey[key]) {
        isAddedProtenWhey[key] = true
        meal.items = [...meal.items, ProteinsBank.proteinWhey]
        calculateProteinMacro(ProteinsBank.proteinWhey, meal.macrosLimit, meal.macrosFilled)
      }
    }
  }

  const addFatAndVegis = (meal) => {
    // not every meal would have vegis and fats
    if (meal.type === 'meal') {
      meal.items = [
        ...meal.items,
        { ...regularOil },
        {
          value: 'mixedVegis',
          icon: '🥒🍅🥬',
          weight: 'eat as you wish',
          calculatedItemMacros: { pro: 0, carb: 0, fat: 0 }
        }
      ]
    }
    calculateFatMacro(regularOil, meal.macrosLimit, meal.macrosFilled)
  }

  const addMealFood = (
    meal,
    mealNumber,
    categoryItems,
    categoryPriorityList,
    categoryBank,
    type
  ) => {
    const priorityList = categoryPriorityList[mealNumber]

    // Step 1: Filter the priorityList
    const filteredList = priorityList.filter((item) =>
      categoryItems.some((carb) => carb.value === item)
    )

    // Step 2: Choose randomly from filteredList or categoryItems if filteredList is empty
    const selectedItem =
      filteredList.length > 0
        ? filteredList[Math.floor(Math.random() * filteredList.length)]
        : categoryItems[Math.floor(Math.random() * categoryItems.length)]

    const itemToAdd = selectedItem instanceof Object ? selectedItem : categoryBank[selectedItem]
    const isEggs = itemToAdd.value === 'eggs'

    meal.items = [...meal.items, ...(isEggs ? eggsToAdd(meal) : [itemToAdd])]

    if (isEggs) return
    type === 'carb'
      ? calculateCarbMacro(itemToAdd, meal.macrosLimit, meal.macrosFilled)
      : calculateProteinMacro(itemToAdd, meal.macrosLimit, meal.macrosFilled)
  }

  const eggsToAdd = (meal) => {
    const eggsLimit = {
      ...meal.macrosLimit,
      pro: meal.macrosLimit.pro * 0.4
    }
    const eggWhiteLimit = {
      ...meal.macrosLimit,
      pro: meal.macrosLimit.pro * 0.6
    }
    const filled = {
      ...meal.macrosFilled,
      pro: meal.macrosFilled.pro * 0.5
    }
    calculateProteinMacro(eggWhite, eggWhiteLimit, filled)
    calculateProteinMacro(eggs, eggsLimit, filled)
    return [eggWhite, eggs]
  }

  const calculateCarbMacro = (item, macrosLimit, macrosFilled) => {
    const { carbs, protein, fat } = item.nutrientFacts
    const portionWeight = item.portionWeight

    // Calculate how much weight of the specific item we need to reach the macros.carb value
    const foodWeight = (macrosLimit.carb / carbs) * portionWeight

    // Assign calculated values to the item
    item.weight = Math.round(foodWeight) + 'g'
    item.calculatedItemMacros = {
      carb: macrosLimit.carb,
      pro: Math.round((protein / portionWeight) * foodWeight),
      fat: Math.round((fat / portionWeight) * foodWeight)
    }

    // Update macrosFilled with the calculated amounts
    macrosFilled.carb = macrosLimit.carb
    macrosFilled.pro = item.calculatedItemMacros.pro
    macrosFilled.fat = item.calculatedItemMacros.fat
  }

  const calculateProteinMacro = (item, macrosLimit, macrosFilled) => {
    const { protein, fat } = item.nutrientFacts
    const portionWeight = item.portionWeight

    // this available protein should be refactored
    const availableProtein = macrosLimit.pro - macrosFilled.pro
    const foodWeight = (availableProtein / protein) * portionWeight

    // Assign calculated values to the item
    item.weight = Math.round(foodWeight) + 'g'
    item.calculatedItemMacros = {
      carb: 0,
      pro: availableProtein,
      fat: Math.round((fat / item.portionWeight) * foodWeight)
    }

    // Update macrosFilled with the calculated amounts
    macrosFilled.fat = item.calculatedItemMacros.fat
  }

  const calculateFatMacro = (item, macrosLimit, macrosFilled) => {
    const { fat } = item.nutrientFacts
    const portionWeight = item.portionWeight

    const availableFat = macrosLimit.fat - macrosFilled.fat
    if (availableFat < 0) {
      item.calculatedItemMacros.fat = 0
      return 0
    }
    const foodWeight = (availableFat / fat) * portionWeight

    item.weight = Math.round(foodWeight) + 'g'
    item.calculatedItemMacros.fat = Math.round((fat / portionWeight) * foodWeight)
    macrosFilled.fat = item.calculatedItemMacros.fat
  }

  // Function to populate meals for a day
  const populateMeals = (key, day) => {
    day.forEach((meal, index) => {
      addCarb(meal, index)
      addProtein(meal, index, key)
      addFatAndVegis(meal)
    })
  }

  // Assuming mealPlan is of type MealPlan
  for (const [key, value] of Object.entries<MealPlan>(mealPlan)) {
    populateMeals(key, value.data)
  }

  console.log(mealPlan)

  // Return the populated meal plan
  return mealPlan
}
