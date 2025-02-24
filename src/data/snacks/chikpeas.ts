import chikpeasImg from '@/assets/chikpeas.webp'

// CHICKPEAS
export default {
  unit: 'gram',
  value: 'chickpeas',
  label: '🥙 Chickpeas',
  portionWeight: 100,
  priority: null,
  foodBoxType: 'daily',
  icon: '🧆',
  // NUTRIENT_FACTS
  nutrientFacts: {
    calories: 164,
    protein: 8.9,
    carbs: 27.4,
    fat: 2.6
  },

  image: chikpeasImg,

  // Serving Size
  servingSize: 150, // 1 serving of chickpeas in grams (approx. 1 cup)
  servingSizeNutrientFacts: {
    calories: 246, // (164 calories/100g) * 150g
    protein: 13.35, // (8.9g protein/100g) * 150g
    carbs: 41.1, // (27.4g carbs/100g) * 150g
    fat: 3.9 // (2.6g fat/100g) * 150g
  },

  macroType: 'carb',
  isRaw: true,
  isCount: true,
  countLabel: 'cup',
  countWeight: 150
}
