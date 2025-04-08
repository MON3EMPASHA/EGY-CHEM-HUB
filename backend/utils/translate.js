import axios from "axios";

const translateText = async (text, targetLang) => {
  const res = await axios.post(
    `https://api-free.deepl.com/v2/translate`,
    null,
    {
      params: {
        auth_key: process.env.DEEPL_API_KEY,
        text,
        target_lang: targetLang.toUpperCase(),
      },
    }
  );

  return res.data.translations[0].text;
};

export default translateText;
