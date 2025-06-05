import { LanguageDescriptor, useLanguageSwitcher } from "@/src/hooks/useLanguageSwitcher";
import { NextPageContext } from "next";
import { twMerge } from "tailwind-merge";

export const LanguageSwitcher = ({ context, isGradient }: { context?: NextPageContext; isGradient?: boolean } = {}) => {
  const { currentLanguage, switchLanguage, languageConfig } = useLanguageSwitcher({ context });

  if (!languageConfig) {
    return null;
  }

  return (
    <div className={twMerge(
      "flex items-center gap-2 mr-4 font-medium text-sm",
      isGradient ? "text-white" : "text-gray-900"
    )}>
      {languageConfig.languages.map((ld: LanguageDescriptor) => (
        <span key={`l_s_${ld.name}`}>
          {currentLanguage === ld.name ? (
            <span className={twMerge(
              "px-3 py-1.5 rounded-full transition-all duration-200",
              isGradient 
                ? "bg-white/20 text-white" 
                : "bg-gray-900 text-white"
            )}>
              {ld.name.toUpperCase()}
            </span>
          ) : (
            <button
              onClick={switchLanguage(ld.name)}
              className={twMerge(
                "px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-opacity-10",
                isGradient
                  ? "text-white/70 hover:bg-white/20 hover:text-white"
                  : "text-gray-600 hover:bg-gray-900/10 hover:text-gray-900"
              )}
            >
              {ld.name.toUpperCase()}
            </button>
          )}
        </span>
      ))}
    </div>
  );
};

export default LanguageSwitcher; 