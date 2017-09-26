import { SchedulerAngularPage } from './app.po';

describe('scheduler-angular App', () => {
  let page: SchedulerAngularPage;

  beforeEach(() => {
    page = new SchedulerAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
