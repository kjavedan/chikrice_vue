import { carbsHandler } from './carbsHandler'
import { fillCarbsMacros } from './fillCarbsMacros'
import { fillProteinsMacros } from './fillProteinsMacros'
import { getBestProteinPortions } from './getBestProteinPortions'

export const calculateSnackMacros = (defaultCalorie, macrosRange, item, totalPlanMacros) => {
  let filledMacros = { calories: 0, pro: 0, carb: 0, fat: 0 }

  /**
   * ! What is the problem now?
   *    - some time the calories passes
   *    - some time the calories doesn't fill
   *        ! Why?p
   *          - when we add more dense food like beef we pass
   *          - when we add less dense food like protein shakes and fruits we don't meet the limit
   *        ? How to fix
   *          - refine the app best potions logic
   *             ! How?
   *                - we need to influence best portions base on the totalPlanMacros
   *                    ! How?
   *                        - we need to find way to do 2 things
   *                            1. to know if we are far or behind in the daily macros
   *                            2. if we are far ahead we need to take it easy on the meal in other word choose the smallest possible portion
   *                            3. if we are behind we need to choose the biggest possible portion
   *                                ? we basically havent calculated fats and add on macros yet
   *
   *
   * ? What if I add the items randomly at first then I consider all of them then I assign their portions and
   * ? macros?
   */

  if (item.macroType === 'carb') {
    const bestCarbPortions = carbsHandler(item, macrosRange)
    fillCarbsMacros(item, bestCarbPortions, macrosRange, filledMacros, defaultCalorie)
  } else if (item.macroType === 'protein') {
    const bestProteinPortions = getBestProteinPortions(item, macrosRange)

    fillProteinsMacros(item, bestProteinPortions, macrosRange, filledMacros, defaultCalorie)
  } else if (item.macroType === 'fat') {
    console.log(macrosRange)
  }

  return {
    calculatedMacros: filledMacros,
    processedItem: item
  }
}
