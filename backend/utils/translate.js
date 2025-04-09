import axios from "axios";
// 📦 Our translation memory - To stores translations we've already done
const translationCache = new Map();
// ⏳ How long to keep translations in memory (1 hour)
const CACHE_TTL_MS = 60 * 60 * 1000;

const translateText = async (text, targetLang) => {
  // 🔑 Create unique ID for this translation (language + text)
  const cacheKey = `${targetLang}:${text}`;

  // 1️⃣ CHECK CACHE FIRST - Did we translate this already?
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey); // Return saved translation
  }
  // 2️⃣ IF NOT IN CACHE: Ask DeepL API to translate
  const res = await axios.post(
    `https://api-free.deepl.com/v2/translate`,
    null,
    {
      params: {
        auth_key: process.env.DEEPL_API_KEY,
        text: text, // Text to translate
        target_lang: targetLang.toUpperCase(),
      },
    }
  );
  // 🎯 Get the translated text from API response
  const translatedText = res.data.translations[0].text;
  // 3️⃣ SAVE TO CACHE for next time
  translationCache.set(cacheKey, translatedText);
  // 🧹 Set timer to delete this from cache after 1 hour
  setTimeout(() => translationCache.delete(cacheKey), CACHE_TTL_MS);

  return translatedText;
};

// Enhanced translator with retry logic
const cachedTranslate = async (text, lang, options = {}) => {
  // Default settings: Try max 3 times, wait 0.5s between tries
  const { retries = 3, delayMs = 500 } = options;

  try {
    // 1️⃣ TRY to translate (using cache)
    return await translateText(text, lang);
  } catch (error) {
    //  IF FAILED: Check if it's a "Too Many Requests" error
    if (error.response?.status === 429 && retries > 0) {
      // ⏸️ WAIT a bit before retrying
      await new Promise((resolve) => setTimeout(resolve, delayMs));

      // 🔄 TRY AGAIN (with one less retry remaining)
      return cachedTranslate(text, lang, {
        retries: retries - 1,
        delayMs: delayMs * 2, // Wait longer next time
      });
    }
    // 🚨 IF STILL FAILING: Throw the error
    throw error;
  }
};

export { translateText, cachedTranslate };
