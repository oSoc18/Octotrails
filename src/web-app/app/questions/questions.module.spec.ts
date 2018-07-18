import { QuestionsModule } from './questions.module';

describe('QuestionsModule', () => {
  let questionsModule: QuestionsModule;

  beforeEach(() => {
    questionsModule = new QuestionsModule();
  });

  it('should create an instance', () => {
    expect(questionsModule).toBeTruthy();
  });
});
