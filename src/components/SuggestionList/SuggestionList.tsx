import React, { FC } from 'react';
import { Suggestion } from '@/types/Suggestion';
import { SuggestionItem } from '@/components/SuggestionItem';

type SuggestionListProps = {
  suggestions: Suggestion[];
  term: string,
  setTerm: (value: string) => void;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  onChooseSuggestion: (suggestion: Suggestion) => void;
}
export const SuggestionList: FC<SuggestionListProps> = ({
  suggestions,
  term,
  setTerm,
  showDropdown,
  setShowDropdown,
  onChooseSuggestion,
}) => {
  return (
    <div className={`suggestion-container ${showDropdown && suggestions.length > 0 ? 'open' : ''}`}>
      {suggestions.map((suggestion: Suggestion) => (
        <SuggestionItem
          key={suggestion.word}
          suggestion={suggestion}
          term={term}
          setTerm={setTerm}
          setShowDropdown={setShowDropdown}
          onChooseSuggestion={onChooseSuggestion}
        />
      ))}
    </div>
  );
};
