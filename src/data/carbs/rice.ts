// RICE
export default {
  unit: 'gram',
  value: 'rice',
  label: '🍚 Rice',
  portionWeight: 100,
  priority: null,
  foodBoxType: 'daily',
  icon: '🍚',

  //COOKED NUTRIENT_FACTS
  nutrientFacts: {
    calories: 130,
    protein: 2,
    carbs: 28,
    fat: 0.3
  },

  //RAW NUTRIENT_FACTS
  nutrientFactsRaw: {
    calories: 358,
    protein: 6.5,
    carbs: 79,
    fat: 0.5
  },

  // To decide whether to calculate raw weight or not
  isRaw: true,

  // To show equivalent count of weight
  isCount: true,
  countLabel: 'cup',
  countWeight: 185
}
