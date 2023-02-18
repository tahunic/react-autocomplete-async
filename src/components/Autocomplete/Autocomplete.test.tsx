import { describe, beforeEach, expect, it, vi } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Autocomplete } from './Autocomplete';
import { Suggestion } from '@/types/Suggestion';

describe('Autocomplete component', () => {
  let renderContainer: HTMLElement;
  const suggestions: Suggestion[] = [
    { word: 'apple' },
    { word: 'banana' },
    { word: 'houseboat' },
    { word: 'housekeeper' },
    { word: 'houseplant' },
  ];

  const searchSuggestions = vi.fn().mockImplementation(async (term: string): Promise<Suggestion[]> => {
    if (term.length === 0) return [];
    return suggestions.filter(suggestion => suggestion.word.startsWith(term));
  });
  const onChooseSuggestion = vi.fn().mockImplementation((suggestion: Suggestion): Suggestion => suggestion);

  beforeEach(() => {
    const { container } = render(<Autocomplete
      searchSuggestions={searchSuggestions}
      onChooseSuggestion={onChooseSuggestion}
      debounceTime={100}
    />);
    renderContainer = container;
  })

  it('should render correctly', () => {
    expect(screen.getByTestId('autocomplete')).toBeDefined();
  });

  it('should display filtered suggestions when typing in the input', async () => {
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'house' } });
    await waitFor(() => {
      expect(searchSuggestions).toHaveBeenCalledWith('house')
      expect(screen.getByText(/boat/)).toBeDefined();
      expect(screen.getByText(/keeper/)).toBeDefined();
      expect(screen.getByText(/plant/)).toBeDefined();
      expect(screen.queryByText(/apple/)).toBeNull();
      expect(screen.queryByText(/orange/)).toBeNull();
    });
  });

  it('should choose suggestion when clicked', async () => {
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'house' } });

    await waitFor(() => {
      const suggestion = screen.getByText(/boat/);
      fireEvent.click(suggestion);
      expect(onChooseSuggestion).toHaveBeenCalledWith(suggestions.find(s => s.word === 'houseboat'));
      expect(input.getAttribute('value')).to.eq('houseboat');
    })
  });

  it('should close the suggestions dropdown when clicking outside the input', async () => {
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'apple' } });
    fireEvent.focus(input);
    await waitFor(() => expect(renderContainer.getElementsByClassName('open')).toHaveLength(1));
    fireEvent.blur(input);
    await waitFor(() => expect(renderContainer.getElementsByClassName('open')).toHaveLength(0));
  });
});