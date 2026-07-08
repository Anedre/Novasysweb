import { useState, useEffect, useCallback } from 'react';

/**
 * useTextRotation — cycles through an array of strings at a given interval.
 *
 * @param {string[]} words     Array of strings to cycle through
 * @param {number}   interval  Milliseconds between word changes (default 3000)
 * @returns {{ currentWord, currentIndex }}
 */
export default function useTextRotation(words = [], interval = 3000) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const advance = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % words.length);
  }, [words.length]);

  useEffect(() => {
    if (words.length <= 1) return;

    const timer = setInterval(advance, interval);
    return () => clearInterval(timer);
  }, [advance, interval, words.length]);

  return {
    currentWord: words[currentIndex] || '',
    currentIndex,
  };
}
