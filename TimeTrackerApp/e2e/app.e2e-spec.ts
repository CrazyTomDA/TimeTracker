import { TimeTrackerAppPage } from './app.po';

describe('time-tracker-app App', () => {
  let page: TimeTrackerAppPage;

  beforeEach(() => {
    page = new TimeTrackerAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
