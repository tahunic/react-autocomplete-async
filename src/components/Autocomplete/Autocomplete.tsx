import { forwardRef, HTMLProps, useEffect, useState } from 'react';
import { Suggestion } from '@/types/Suggestion';
import { useDebounce } from '@/hooks/useDebounce';
import './Autocomplete.scss';
import { SuggestionList } from '@/components/SuggestionList';

export type AutocompleteProps = HTMLProps<HTMLInputElement> & {
  onChooseSuggestion: (suggestion: Suggestion) => void;
  searchSuggestions: (term: string) => Promise<Suggestion[]>;
  debounceTime?: number;
  defaultValue?: string;
}
export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(({
  onChooseSuggestion,
  searchSuggestions,
  debounceTime = 0,
  defaultValue,
  ...props
}, ref) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [term, setTerm] = useState<string>(defaultValue ?? '');

  const debouncedValue = useDebounce(term, debounceTime);

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
    <div className="autocomplete" data-testid="autocomplete">
      <input
        id="autocomplete-input"
        ref={ref}
        value={term}
        onChange={e => setTerm(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setShowDropdown(false)}
        {...props}
      />
      <SuggestionList
        suggestions={suggestions}
        term={term}
        setTerm={setTerm}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        onChooseSuggestion={onChooseSuggestion}
      />
    </div>
  );
});
