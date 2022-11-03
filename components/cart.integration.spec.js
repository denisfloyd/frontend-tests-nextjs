import { renderHook, act } from '@testing-library/react-hooks';
import { screen, render } from '@testing-library/react';
import { useCartStore } from '../store/cart';
import { makeServer } from '../miragejs/server';
import userEvent from '@testing-library/user-event';
import Cart from './cart';

describe('Cart', () => {
  let server;
  let result;
  let spy;
  let add;
  let toggle;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    const render = renderHook(() => useCartStore());
    result = render.result;
    wait = render.waitForNextUpdate;
    add = result.current.actions.add;
    toggle = result.current.actions.toggle;
    spy = jest.spyOn(result.current.actions, 'toggle');
  });

  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });

  it('should add css class "hidden" in the component', () => {
    render(<Cart />);

    expect(screen.getByTestId('cart')).toHaveClass('hidden');
  });

  it('should add css class "hidden" in the component', () => {
    act(() => {
      toggle();
    });

    render(<Cart />);

    expect(screen.getByTestId('cart')).not.toHaveClass('hidden');
  });

  it('should call store toggle() twice', () => {
    render(<Cart />);

    const button = screen.getByTestId('close-button');

    actRenderer(() => {
      userEvent.click(button);
      userEvent.click(button);
    });

    wait();

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should display 2 products cards', () => {
    const products = server.createList('product', 2);

    act(() => {
      for (const product of products) {
        add(product);
      }
    });

    render(<Cart />);

    expect(screen.getAllByTestId('cart-item')).toHaveLength(2);
  });
});