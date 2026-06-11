/**
 * Banco de preguntas del test de nivel (client-side).
 * 10 preguntas de dificultad creciente. Cada pregunta vale 1 punto.
 * El puntaje total (0–10) se mapea a un nivel estimado A1–C2.
 * ⚠️ Es una estimación orientativa, no una certificación oficial.
 */
export const quizQuestions = [
  {
    prompt: 'Choose the correct option: "She ___ a student."',
    options: ['is', 'are', 'am', 'be'],
    answer: 0,
    level: 'A1',
  },
  {
    prompt: 'Complete: "They ___ to the cinema yesterday."',
    options: ['go', 'goes', 'went', 'going'],
    answer: 2,
    level: 'A1',
  },
  {
    prompt: 'Choose the correct question: "___ do you live?"',
    options: ['What', 'Where', 'Who', 'When'],
    answer: 1,
    level: 'A2',
  },
  {
    prompt: 'Complete: "I have ___ apples than you."',
    options: ['more', 'most', 'much', 'many'],
    answer: 0,
    level: 'A2',
  },
  {
    prompt: 'Choose: "If it rains, we ___ at home."',
    options: ['stay', 'will stay', 'stayed', 'have stayed'],
    answer: 1,
    level: 'B1',
  },
  {
    prompt: 'Complete: "I have lived here ___ 2015."',
    options: ['for', 'since', 'ago', 'during'],
    answer: 1,
    level: 'B1',
  },
  {
    prompt: 'Choose: "The report ___ by the team last week."',
    options: ['was finished', 'finished', 'has finished', 'is finishing'],
    answer: 0,
    level: 'B2',
  },
  {
    prompt: 'Complete: "She suggested ___ a break."',
    options: ['to take', 'taking', 'take', 'took'],
    answer: 1,
    level: 'B2',
  },
  {
    prompt: 'Choose: "___ harder, he would have passed the exam."',
    options: ['Had he studied', 'If he studies', 'Should he study', 'Were he study'],
    answer: 0,
    level: 'C1',
  },
  {
    prompt: 'Choose the most natural option: "Her argument was utterly ___."',
    options: ['convince', 'convincing', 'convinced', 'convincingly'],
    answer: 1,
    level: 'C2',
  },
]

// Mapeo de puntaje (aciertos) a nivel estimado y mensaje
export function scoreToLevel(score) {
  if (score <= 1) return { code: 'A1', name: 'Principiante' }
  if (score <= 3) return { code: 'A2', name: 'Básico' }
  if (score <= 5) return { code: 'B1', name: 'Intermedio' }
  if (score <= 7) return { code: 'B2', name: 'Intermedio alto' }
  if (score <= 9) return { code: 'C1', name: 'Avanzado' }
  return { code: 'C2', name: 'Maestría' }
}
