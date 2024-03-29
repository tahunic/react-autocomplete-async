import { FC } from 'react';
import { Suggestion } from '@/types/Suggestion';
import { SuggestionItem } from '@/components/SuggestionItem';
import './SuggestionList.scss';

type SuggestionListProps = {
  suggestions: Suggestion[];
  loading: boolean;
  term: string,
  setTerm: (value: string) => void;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  onChooseSuggestion: (suggestion: Suggestion) => void;
}
export const SuggestionList: FC<SuggestionListProps> = ({
  suggestions = [],
  loading,
  term,
  setTerm,
  showDropdown,
  setShowDropdown,
  onChooseSuggestion,
}) => {
  return (
    <ul className={`suggestion-container ${showDropdown ? 'open' : ''}`}>
      {loading ? <li className="suggestion-item">Loading...</li> : (
        <>
          {term?.length > 0 && suggestions.length === 0 && <li className="suggestion-item">No matches for "{term}"</li>}
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
        </>
      )}
    </ul>
  );
};
