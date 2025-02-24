// EGG WHITE
export default {
  limit: null,
  unit: 'gram',
  value: 'eggWhite',
  icon: '🍳',
  portionWeight: 100,
  priority: { loseWeight: 4, gainWeight: 2, optimizePerformance: 3 },
  foodBoxType: 'single',

  // NUTRIENT_FACTS
  nutrientFacts: {
    calories: 52,
    protein: 11,
    carbs: 1,
    fat: 0
  },

  // NUTRIENT_FACTS RAW
  nutrientFactsRaw: {
    calories: 52,
    protein: 11,
    carbs: 1,
    fat: 0
  },

  // To determine its percentage in the meal plan
  type: 'static',

  // To decide whether to calculate raw weight or not
  isRaw: true,

  // To show equivalent count of weight
  isCount: true,
  countLabel: 'egg',
  countWeight: 50
}
