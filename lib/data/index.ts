// ============================================
// LYMFAFLOW - DATA INDEX
// Centralizovaný export všech dat
// ============================================

// Topics & Levels
export {
  TOPICS,
  LEVELS,
  getTopicBySlug,
  getTopicById,
  getUnlockedTopics,
  getLevelByXP,
  getNextLevel,
  getProgressToNextLevel,
} from './topics';

// Lessons
export {
  LESSONS,
  getLessonsByTopicId,
  getLessonById,
  getLessonBySlug,
  getAllLessons,
  getTotalLessonsCount,
  getLessonsCountByTopic,
} from './lessons';

// Questions
export {
  QUIZ_QUESTIONS,
  getQuestionsByTopicId,
  getQuestionById,
  getAllQuestions,
  getRandomQuestions,
  getQuestionsByDifficulty,
  getTotalQuestionsCount,
  getQuestionsCountByTopic,
} from './questions';

// Knowledge Base
export {
  KNOWLEDGE_CATEGORIES,
  KNOWLEDGE_ITEMS,
  getCategoryBySlug,
  getCategoryById,
  getItemsByCategoryId,
  getItemsByCategorySlug,
  getItemById,
  searchKnowledge,
  getItemsWithBRProducts,
  getItemsCountByCategory,
} from './knowledge';

// Professors (Polymath Academy)
export {
  PROFESSORS,
  getProfessorById,
  getProfessorsByField,
  getDefaultProfessor,
} from './professors';
