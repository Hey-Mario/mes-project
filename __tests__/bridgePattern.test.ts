import { FirstImplementation, SecondImplementation } from '../src/patterns/BridgeImplementations';

describe('Bridge Pattern Implementation', () => {
  it('should perform operation correctly using the first implementation', () => {
    const impl = new FirstImplementation();
    expect(impl.operation()).toBe('Expected Result');
  });

  it('should perform operation correctly using the second implementation', () => {
    const impl = new SecondImplementation();
    expect(impl.operation()).toBe('Expected Result');
  });
});