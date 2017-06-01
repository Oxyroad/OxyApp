import { OxyRoadPage } from './app.po';

describe('oxy-road App', function() {
  let page: OxyRoadPage;

  beforeEach(() => {
    page = new OxyRoadPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
