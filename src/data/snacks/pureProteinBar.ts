import pureProteinBar from '@/assets/pure-protein-bar.webp'
// PURE PROTEIN BAR
export default {
  unit: 'gram',
  value: 'pureProteinBar',
  label: '🍫 Pure Protein Bar',
  portionWeight: 50, // Typical weight of a pure protein bar
  priority: null,
  foodBoxType: 'snack',
  icon: '🍫',
  // NUTRIENT_FACTS
  nutrientFacts: {
    calories: 200,
    protein: 20,
    carbs: 17,
    fat: 6
  },

  image: pureProteinBar,

  // Serving Size
  servingSize: 50, // 1 serving of pure protein bar in grams
  servingSizeNutrientFacts: {
    calories: 200, // (200 calories/50g) * 50g
    protein: 20, // (20g protein/50g) * 50g
    carbs: 17, // (17g carbs/50g) * 50g
    fat: 6 // (6g fat/50g) * 50g
  },

  macroType: 'protein',
  isRaw: false,
  isCount: true,
  countLabel: 'bar',
  countWeight: 50
}
