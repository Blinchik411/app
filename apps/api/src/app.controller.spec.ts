import { AppController } from './app.controller';

describe('AppController', () => {
  it('returns ok', () => {
    expect(new AppController().health()).toEqual({ status: 'ok' });
  });
});
