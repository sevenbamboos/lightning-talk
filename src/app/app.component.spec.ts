import { AppComponent } from "./app.component";

describe('AppComponent', () => {
  let comp: AppComponent

  beforeEach(() => { 
    comp = new AppComponent(); 
  });  

  it('state has default value', () => {
    expect(comp.title).toEqual('lightning-talk-exercise');
  });
});