import React, { HTMLProps, useEffect, useState } from 'react';
import { Suggestion } from '@/types/Suggestion';
import { useDebounce } from '@/hooks/useDebounce';
import './Autocomplete.scss';

type AutocompleteProps = HTMLProps<HTMLInputElement> & {
  onChooseSuggestion: (suggestion: Suggestion) => void;
  searchSuggestions: (term: string) => Promise<Suggestion[]>;
  debounceTime?: number;
  defaultValue?: string;
}
export const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(({
  onChooseSuggestion,
  searchSuggestions,
  debounceTime = 0,
  defaultValue,
  ...props
}, ref) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [value, setValue] = useState<string>(defaultValue ?? '');

  const debouncedValue = useDebounce(value, debounceTime);

  useEffect(() => {
    const getSuggestions = async () => {
      if (!debouncedValue || debouncedValue.length === 0) {
        setSuggestions([]);
        return;
      }

      const data = await searchSuggestions(debouncedValue);
      setSuggestions(data);
    }

    getSuggestions();
  }, [debouncedValue]);

  return (
    <div className="autocomplete">
      <input
        ref={ref}
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setShowDropdown(false)}
        {...props}
      />
      <div className={`suggestion-container ${showDropdown && suggestions.length > 0 ? 'open' : ''}`}>
        {suggestions.map((suggestion: Suggestion) => (
          <div
            key={suggestion.word}
            className="suggestion-item"
            onClick={() => {
              setValue(suggestion.word);
              onChooseSuggestion(suggestion);
              setShowDropdown(false);
            }}
            onMouseDown={e => e.preventDefault()}
          >
            {suggestion.word}
          </div>
        ))}
      </div>
    </div>
  );
});
