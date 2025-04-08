import axios from "axios";

const translateMultipleFields = async (fieldsObject, targetLang) => {
  const keys = Object.keys(fieldsObject);
  const texts = keys.map((key) => fieldsObject[key]);

  try {
    // Send text in chunks to avoid large payload
    const chunkSize = 5; // Adjust this size as needed
    const translatedFields = {};

    for (let i = 0; i < texts.length; i += chunkSize) {
      const chunk = texts.slice(i, i + chunkSize);

      const res = await axios.post(
        `https://api-free.deepl.com/v2/translate`,
        null,
        {
          params: {
            auth_key: "724bbf29-50b2-46dd-a5e8-8fbf51813f6d:fx", // Replace with your actual API key
            text: chunk,
            target_lang: targetLang.toUpperCase(),
          },
        }
      );

      res.data.translations.forEach((t, index) => {
        translatedFields[keys[i + index]] = t.text;
      });
    }

    return translatedFields;
  } catch (error) {
    console.error(
      "Translation API Error:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to translate fields");
  }
};

export default translateMultipleFields;
