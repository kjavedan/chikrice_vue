import grenadeProteinBar from '@/assets/protein-bar.jpeg'

// GRENADE PROTEIN BAR
export default {
  unit: 'gram',
  value: 'grenadeProteinBar',
  label: '🍫 Grenade Protein Bar',
  portionWeight: 60, // Typical weight of a Grenade protein bar
  priority: null,
  foodBoxType: 'snack',
  icon: '🍫',
  // NUTRIENT_FACTS
  nutrientFacts: {
    calories: 220,
    protein: 20,
    carbs: 16,
    fat: 9
  },

  image: grenadeProteinBar,

  // Serving Size
  servingSize: 60, // 1 serving of Grenade protein bar in grams
  servingSizeNutrientFacts: {
    calories: 220, // (220 calories/60g) * 60g
    protein: 20, // (20g protein/60g) * 60g
    carbs: 16, // (16g carbs/60g) * 60g
    fat: 9 // (9g fat/60g) * 60g
  },

  macroType: 'protein',
  isRaw: false,
  isCount: true,
  countLabel: 'bar',
  countWeight: 60
}
