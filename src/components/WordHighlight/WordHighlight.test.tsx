import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { WordHighlight } from './WordHighlight';

describe('WordHighlight', () => {
  it('should highlight the search term in the word', () => {
    const { container } = render(<WordHighlight word="Hello World" term="hello" />);
    const highlightedWord = container.querySelector('span');
    expect(highlightedWord?.innerHTML).toBe('<b>Hello</b> World');
  });

  it('should not highlight the search term if it is not present in the word', () => {
    const { container } = render(<WordHighlight word="Hello World" term="apple" />);
    const highlightedWord = container.querySelector('span');
    expect(highlightedWord?.innerHTML).toBe('Hello World');
  });
});