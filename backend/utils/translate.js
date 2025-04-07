import axios from "axios";

const translateText = async (text, targetLang) => {
  const res = await axios.post(
    `https://api-free.deepl.com/v2/translate`,
    null,
    {
      params: {
        auth_key: "724bbf29-50b2-46dd-a5e8-8fbf51813f6d:fx",
        text,
        target_lang: targetLang.toUpperCase(),
      },
    }
  );

  return res.data.translations[0].text;
};

export default translateText;
