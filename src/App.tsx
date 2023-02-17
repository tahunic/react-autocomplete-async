import { useState } from 'react';
import { Autocomplete } from '@/components/Autocomplete';
import { API_BASE_URI } from '@/utils/constants';
import { Suggestion } from '@/types/Suggestion';

const App = () => {
  const [form, setForm] = useState({ movie: '' });
  const limit = 10;

  async function searchSuggestions(term: string): Promise<Suggestion[]> {
    const response = await fetch(`${API_BASE_URI}/words?sp=${term}*&max=${limit}`);
    return await response.json() as Suggestion[];
  }

  return (
    <Autocomplete
      searchSuggestions={searchSuggestions}
      onChooseSuggestion={(suggestion: Suggestion) => setForm({ ...form, movie: suggestion.word })}
      debounceTime={300}
      placeholder="Search for anything"
    />
  );
}

export default App
