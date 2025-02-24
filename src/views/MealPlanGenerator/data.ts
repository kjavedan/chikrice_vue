import { useLocaleStoreWithOut } from '@/store/modules/locale'
import { getFooterContentByLocale, getHeaderContentByLocale } from '@/utils/locale'
import { StepDataType } from './types'

// STORE
const { currentLocale } = useLocaleStoreWithOut()

export const stepsConfig: StepDataType[] = [
  {
    step: 1,
    question: 'whatIsYourGoal',
    questionContent: {},
    questionLink: '',
    footerLink: 'mealPlansDifference',
    footerContent: getFooterContentByLocale(currentLocale.lang, 1),
    videoUrl: ''
  },
  {
    step: 2,
    question: 'howFastAchieveGoal',
    questionContent: {},
    questionLink: '',
    footerLink: 'mealPlanSpeedDifference',
    footerContent: getFooterContentByLocale(currentLocale.lang, 2),
    videoUrl: ''
  },
  {
    step: 3,
    question: 'calculateYourMaintenanceCalories',
    questionContent: {},
    questionLink: '',
    footerLink: 'howWeUseCalories',
    footerContent: getFooterContentByLocale(currentLocale.lang, 3),
    videoUrl: ''
  },
  {
    step: 4,
    question: 'confirmYourMacros',
    questionContent: getHeaderContentByLocale(currentLocale.lang, 4),
    questionLink: 'whatAreMacros',
    footerLink: 'whyMacrosImportant',
    footerContent: getFooterContentByLocale(currentLocale.lang, 4),
    videoUrl: ''
  },
  {
    step: 5,
    question: 'selectProteins',
    questionContent: getHeaderContentByLocale(currentLocale.lang, 5),
    questionLink: 'considerWhenSelect',
    footerLink: 'proteinRole',
    footerContent: getFooterContentByLocale(currentLocale.lang, 5),
    videoUrl: ''
  },
  {
    step: 6,
    question: 'selectCarbs',
    questionContent: getHeaderContentByLocale(currentLocale.lang, 6),
    questionLink: 'considerWhenSelect',
    footerLink: 'carbsRole',
    footerContent: getFooterContentByLocale(currentLocale.lang, 6),
    videoUrl: ''
  },
  {
    step: 7,
    question: 'selectFruits',
    questionContent: getHeaderContentByLocale(currentLocale.lang, 7),
    questionLink: 'considerWhenSelect',
    footerLink: 'fruitsRole',
    footerContent: getFooterContentByLocale(currentLocale.lang, 7),
    videoUrl: ''
  },
  {
    step: 8,
    question: 'selectVegtables',
    questionContent: getHeaderContentByLocale(currentLocale.lang, 8),
    questionLink: 'considerWhenSelect',
    footerLink: 'vegetablesRole',
    footerContent: getFooterContentByLocale(currentLocale.lang, 8),
    videoUrl: ''
  },
  {
    step: 9,
    question: 'howManyMeals',
    questionContent: getHeaderContentByLocale(currentLocale.lang, 9),
    questionLink: 'weRecommendMealNumber',
    footerLink: 'fatsRole',
    footerContent: getFooterContentByLocale(currentLocale.lang, 9),
    videoUrl: ''
  },
  {
    step: 10,
    question: 'includeSweet',
    questionContent: getHeaderContentByLocale(currentLocale.lang, 10),
    questionLink: 'whenToIncludeSweet',
    footerLink: 'sanckSweetRole',
    footerContent: getFooterContentByLocale(currentLocale.lang, 10),
    videoUrl: ''
  }
]

export const budgetData = {
  enough: {
    loseWeight: {
      proteins: 40,
      carbs: 40,
      fats: 20
    },
    gainWeight: {
      proteins: 30,
      carbs: 50,
      fats: 20
    },
    optimizePerformance: {
      proteins: 35,
      carbs: 45,
      fats: 20
    }
  },

  low: {
    loseWeight: {
      proteins: 35,
      carbs: 45,
      fats: 20
    },
    gainWeight: {
      proteins: 25,
      carbs: 50,
      fats: 25
    },
    optimizePerformance: {
      proteins: 30,
      carbs: 45,
      fats: 25
    }
  }
}

const goalsOptions = [
  {
    value: 'loseWeight',
    icon: '🏃‍♂️🍓🥝'
  },
  {
    value: 'gainWeight',
    icon: '🤸‍♂️🏋️🍚'
  },
  {
    value: 'optimizePerformance',
    icon: '⚡💡☕'
  }
]

const proteinsOptions = [
  { icon: '🥜', value: 'nuts' },
  { icon: '🧈', value: 'tofu' },
  { icon: '🐟', value: 'fish' },
  { icon: '🥚', value: 'eggs' },
  { icon: '🦃', value: 'turkey' },
  { icon: '🐔', value: 'chicken' },
  { icon: '🥩', value: 'flankSteak' },
  { icon: '🧋', value: 'proteinWhey' },
  { icon: '🥛', value: 'greekYogurt' },
  { icon: '🍔', value: 'groundBeef' }
]

const carbsOptions = [
  { icon: '🍚', value: 'rice' },
  { icon: '🌽', value: 'corn' },
  { icon: '🌾', value: 'oats' },
  { icon: '🍝', value: 'pasta' },
  { icon: '🥖', value: 'bread' },
  { icon: '🥔', value: 'potato' },
  { icon: '🍠', value: 'sweetPotato' },
  { icon: '🫘', value: 'beansLentils' }
]

const fruitsOptions = [
  { icon: '🍏', value: 'apple' },
  { icon: '🍌', value: 'banana' },
  { icon: '🍇', value: 'grapes' },
  { icon: '🍊', value: 'orange' },
  { icon: '🍍', value: 'pineapple' },
  { icon: '🍓', value: 'strawberry' }
]

const vegetablesOptions = [
  { icon: '🧅', value: 'onion' },
  { icon: '🍅', value: 'tomato' },
  { icon: '🥕', value: 'carrots' },
  { icon: '🥬', value: 'lettuce' },
  { icon: '🥑', value: 'avocado' },
  { icon: '🍃', value: 'spinach' },
  { icon: '🥦', value: 'broccoli' },
  { icon: '🍠', value: 'zucchini' },
  { icon: '🍆', value: 'eggplant' },
  { icon: '🥒', value: 'cucumber' },
  { icon: '🫛', value: 'greenBeans' },
  { icon: '🫑', value: 'billPepper' }
]

const fatsOptions = [{ icon: '🌻', value: 'oil' }]

const speedOptions = [
  { icon: '🐌', value: 'slow' },
  { icon: '🚶', value: 'moderate' },
  { icon: '🏃‍♂️', value: 'fast' }
]

export const optionsConfig = {
  fats: fatsOptions,
  goals: goalsOptions,
  carbs: carbsOptions,
  fruits: fruitsOptions,
  proteins: proteinsOptions,
  vegetables: vegetablesOptions,
  goalAchievementSpeed: speedOptions
}
