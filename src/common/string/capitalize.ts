const lowercaseWords = new Set([
  'a', 'an', 'the',
  'and', 'but', 'for', 'nor', 'or', 'so', 'yet',
  'about', 'across', 'after', 'along', 'among', 'around', 'as', 'at', 'before', 'between', 'by', 'during', 'in', 'into', 'of', 'on', 'over', 'since', 'through', 'throughout', 'to', 'under', 'with', 'within',
  'away', 'back', 'down', 'far', 'off', 'on', 'out', 'up',
  'he', 'her', 'him', 'his', 'it', 'its', 'me', 'my', 'our', 'she', 'their', 'them', 'they', 'us', 'we', 'you', 'your',
]);

function capitalizeWord(word: string): string {
  return word[0]!.toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * capitalizes a word or a sentence.
 *
 * @category String
 */
function capitalize(sentence: string): string {
  if (sentence.includes(' ')) {
    return sentence.split(' ').map((word, index) => {
      const lowercaseWord = word.toLowerCase();

      if (index > 0 && lowercaseWords.has(lowercaseWord)) {
        return lowercaseWord;
      }

      return capitalizeWord(word);
    }).join(' ');
  }

  return capitalizeWord(sentence);
}

export { capitalize };
