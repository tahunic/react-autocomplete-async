import { FC } from 'react';

type WordHighlightProps = {
  word: string;
  term: string;
}
export const WordHighlight: FC<WordHighlightProps> = ({
  word,
  term,
}) => {
  const regex = new RegExp(term, 'gi');
  return (
    <span dangerouslySetInnerHTML={{ __html:word.replace(regex, `<b>$&</b>`)}} />
  );
};
