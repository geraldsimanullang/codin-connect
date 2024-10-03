import { useState } from "react";
import { LANGUAGE_VERSIONS } from "./constans";

interface LanguageSelectorProps {
  language: string;
  onSelect: (language: string) => void;
}

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "text-blue-400";

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="ml-2 mb-4">
      <p className="mb-2 text-lg">Language:</p>
      <div className="relative">
        <button
          className="bg-gray-800 text-white py-2 px-4 rounded-md focus:outline-none"
          onClick={toggleDropdown}
        >
          {language}
        </button>
        {isOpen && (
          <div className="absolute mt-1 w-full bg-gray-900 rounded-md shadow-lg z-10">
            {languages.map(([lang, version]) => (
              <button
                key={lang}
                className={`flex justify-between w-full px-4 py-2 text-left text-sm ${
                  lang === language
                    ? `${ACTIVE_COLOR} bg-gray-900`
                    : "text-white"
                } hover:bg-gray-700`}
                onClick={() => {
                  onSelect(lang);
                  setIsOpen(false); // Close dropdown after selection
                }}
              >
                <span>{lang}</span>
                <span className="text-gray-600">({version})</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
