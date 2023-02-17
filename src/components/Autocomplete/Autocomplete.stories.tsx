import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { Autocomplete, AutocompleteProps } from './Autocomplete';
import { Suggestion } from '@/types/Suggestion';

export default {
  title: 'Input/Autocomplete',
  component: Autocomplete,
  argTypes: {
    placeholder: {
      defaultValue: 'Search anywhere',
      control: {
        type: 'text',
      }
    }
  }
} as Meta;

export const AutocompleteStory: Story<AutocompleteProps> = ({...args}) =>
  // @ts-ignore
  <Autocomplete
    {...args}
    onChooseSuggestion={(suggestion: Suggestion) => {}}
    searchSuggestions={(term: string) => Promise.resolve([
      { word: 'Suggestion 1' }, { word: 'Suggestion 2' }, { word: 'Suggestion 3' }
    ])}
  />
