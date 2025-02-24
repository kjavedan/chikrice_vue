import lentilsImg from '@/assets/lentils.jpg'

// LENTILS
export default {
  unit: 'gram',
  value: 'lentils',
  label: '🍛 Lentils',
  portionWeight: 100,
  priority: null,
  foodBoxType: 'daily',
  icon: '🍲',
  // NUTRIENT_FACTS
  nutrientFacts: {
    calories: 116,
    protein: 9.02,
    carbs: 20.13,
    fat: 0.38
  },
  image: lentilsImg,

  // Serving Size
  servingSize: 198, // 1 serving of lentils in grams (approx. 1 cup cooked)
  servingSizeNutrientFacts: {
    calories: 229.68, // (116 calories/100g) * 198g
    protein: 17.86, // (9.02g protein/100g) * 198g
    carbs: 39.86, // (20.13g carbs/100g) * 198g
    fat: 0.75 // (0.38g fat/100g) * 198g
  },

  macroType: 'carb',
  isRaw: true,
  isCount: true,
  countLabel: 'cup',
  countWeight: 198
}
