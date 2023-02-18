import React, { FC } from 'react';
import { Suggestion } from '@/types/Suggestion';
import { WordHighlight } from '@/components/WordHighlight';

type SuggestionProps = {
  suggestion: Suggestion;
  term: string,
  setTerm: (value: string) => void;
  setShowDropdown: (show: boolean) => void;
  onChooseSuggestion: (suggestion: Suggestion) => void;
}
export const SuggestionItem: FC<SuggestionProps> = ({
  suggestion,
  term,
  setTerm,
  onChooseSuggestion,
  setShowDropdown
}) => {
  return (
    <div
      key={suggestion.word}
      className="suggestion-item"
      onClick={() => {
        setTerm(suggestion.word);
        onChooseSuggestion(suggestion);
        setShowDropdown(false);
      }}
      onMouseDown={e => e.preventDefault()}
    >
      <WordHighlight
        word={suggestion.word}
        term={term}
      />
    </div>
  );
};
