import { MealPlanSummaryTypes } from '../types'

export const generateMealPlanStructure = (
  carbsList: string[],
  proteinsList: string[],
  mealsNumber: string,
  snacksNumber: string,
  mealPlanSummary: MealPlanSummaryTypes
) => {
  const splitMacrosEqually = (numberOfMealsOrSnacks: number, type: 'meal' | 'snack') => {
    const { macros, calories } = mealPlanSummary

    const isMeal = type === 'meal'
    const isTwoItems = numberOfMealsOrSnacks === 2

    const macroPercentage = isTwoItems ? (isMeal ? 0.75 : 0.25) : isMeal ? 0.875 : 0.125

    const unitMacros = {
      pro: Math.round((macros.pro.amount * macroPercentage) / numberOfMealsOrSnacks),
      carb: Math.round((macros.carb.amount * macroPercentage) / numberOfMealsOrSnacks),
      fat: Math.round((macros.fat.amount * macroPercentage) / numberOfMealsOrSnacks)
    }

    const unitCalories = (calories * macroPercentage) / numberOfMealsOrSnacks

    return { calories: unitCalories, macrosLimit: unitMacros }
  }

  const mealTemplate = {
    type: 'meal',
    ...splitMacrosEqually(+mealsNumber, 'meal'),
    macrosFilled: { pro: 0, carb: 0, fat: 0 },
    items: []
  }

  const snackTemplate = {
    type: 'snack',
    ...splitMacrosEqually(+snacksNumber, 'snack'),
    macrosFilled: { pro: 0, carb: 0, fat: 0 },
    items: []
  }

  const carbsVeriety = Math.ceil(carbsList.length / +mealsNumber)
  const proteinsVeriety = Math.ceil(proteinsList.length / +mealsNumber)

  const numberOfDays = Math.max(proteinsVeriety, carbsVeriety)

  const populateDailyMeals = () => {
    const mealsData: any = []

    for (let i = 0; i < +mealsNumber; i++) {
      mealsData.push({ ...mealTemplate }) // Copy mealTemplate to avoid reference sharing
    }

    return mealsData
  }

  const populateDailySnacks = () => {
    const snacksData: any = []

    for (let i = 0; i < +snacksNumber; i++) {
      snacksData.push({ ...snackTemplate }) // Copy snackTemplate to avoid reference sharing
    }

    return snacksData
  }

  const generatePlanStructure = () => {
    const data: any = {} // Initialize data with an empty object

    for (let i = 1; i <= numberOfDays; i++) {
      data[i] = { id: i, data: [...populateDailyMeals(), ...populateDailySnacks()] }
    }

    return data
  }

  const structure = generatePlanStructure()

  return structure
}
