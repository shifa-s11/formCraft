const api = process.env.NEXT_PUBLIC_API;

export const routes = {
  // Forms
  createForm: api + 'api/forms',
  getForms: api + 'api/forms',
  getFormById: (id: string) => api + '/forms/' + id,
  updateForm: (id: string) => api + '/forms/' + id,
  deleteForm: (id: string) => api + '/forms/' + id,

  // Questions
  createQuestion: api + 'api/questions',
  getQuestions: api + '/questions',
  getQuestionById: (id: string) => api + '/questions/' + id,
  updateQuestion: (id: string) => api + '/questions/' + id,
  deleteQuestion: (id: string) => api + '/questions/' + id,

  // Responses
  createResponse: api + '/responses',
  getResponses: api + '/responses',
  getResponseById: (id: string) => api + '/responses/' + id,
};