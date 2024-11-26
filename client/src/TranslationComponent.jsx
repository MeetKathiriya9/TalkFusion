// src/TranslationComponent.js
import React, { useState } from 'react';
import axios from 'axios';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'hi', name: 'Hindi' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'mr', name: 'Marathi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'sa', name: 'Sanskrit' },
  // Add more languages as needed
];

const TranslationComponent = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en');

  const handleTranslate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/translate', {
        text,
        targetLanguage,
      });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  return (
    <div className=' pt-20'>
      {/* <h1>Translate Text</h1> */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <br />
      <select className=' bg-slate-200' value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      <br />
      <button className=' btn bg-blue-400 p-2 border-2'  onClick={handleTranslate}>Translate</button>
      <h2 className=' mt-3'>Translated Text :</h2>
      <p>{translatedText}</p>
    </div>
  );
};

export default TranslationComponent;
