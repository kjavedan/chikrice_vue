import CARBS_BANK from '@/data/carbs'
import FRUITS_BANK from '@/data/fruits'
import PROTEINS_BANK from '@/data/proteins'
import VEGETABLE_BANK from '@/data/vegetables'

const mapItems = (itemList: string[], itemBank: any) => {
  return itemList.map((item) => {
    const { value, icon } = itemBank[item]
    return { value, icon }
  })
}

export const generateGroceryList = (
  carbsList: string[],
  fruitsList: string[],
  proteinsList: string[],
  vegetablesList: string[]
) => {
  const carbsGrocery = mapItems(carbsList, CARBS_BANK)
  const fruitsGrocery = mapItems(fruitsList, FRUITS_BANK)
  const proteinsGrocery = mapItems(proteinsList, PROTEINS_BANK)
  const vegetablesGrocery = mapItems(vegetablesList, VEGETABLE_BANK)

  return { carbsGrocery, fruitsGrocery, proteinsGrocery, vegetablesGrocery }
}
