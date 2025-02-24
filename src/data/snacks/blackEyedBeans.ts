import blackEyedImg from '@/assets/black-eye-beans.jpg'

// BLACK-EYED BEANS
export default {
  unit: 'gram',
  value: 'blackEyeBeans',
  label: '🍲 Black-Eyed Beans',
  portionWeight: 100,
  priority: null,
  foodBoxType: 'daily',
  icon: '🥣',
  // NUTRIENT_FACTS
  nutrientFacts: {
    calories: 150,
    protein: 13,
    carbs: 24,
    fat: 0.5
  },
  image: blackEyedImg,
  // Serving Size
  servingSize: 170, // 1 serving of black-eyed beans in grams (approx. 1 cup)
  servingSizeNutrientFacts: {
    calories: 255, // (150 calories/100g) * 170g
    protein: 22.1, // (13g protein/100g) * 170g
    carbs: 40.8, // (24g carbs/100g) * 170g
    fat: 0.85 // (0.5g fat/100g) * 170g
  },

  macroType: 'carb',
  isRaw: true,
  isCount: true,
  countLabel: 'cup',
  countWeight: 170
}
