import { useEffect, useState } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { NextPageContext } from "next";

export const COOKIE_NAME = "googtrans";

export interface LanguageDescriptor {
  name: string;
  title: string;
  flag: string;
}

export interface LanguageConfig {
  languages: LanguageDescriptor[];
  defaultLanguage: string;
}

export const getLanguageConfig = (): LanguageConfig | undefined => {
  let cfg: LanguageConfig | undefined;

  if (process.env.GOOGLE_TRANSLATION_CONFIG) {
    try {
      cfg = JSON.parse(process.env.GOOGLE_TRANSLATION_CONFIG ?? "{}");
    } catch (e) {
      console.error("Erro ao parsear a configuração de tradução:", e);
    }
  }

  return cfg;
};

export const useLanguageSwitcher = ({ context }: { context?: NextPageContext } = {}) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>("");

  useEffect(() => {
    const cfg = getLanguageConfig();
    const cookies = parseCookies(context);
    const existingLanguageCookieValue = cookies[COOKIE_NAME];

    let languageValue = "";
    if (existingLanguageCookieValue) {
      const sp = existingLanguageCookieValue.split("/");
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }
    if (cfg && !languageValue) {
      languageValue = cfg.defaultLanguage;
    }
    setCurrentLanguage(languageValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchLanguage = (lang: string) => () => {
    try {
      const hostname = window.location.hostname;
      const isLocalhost = hostname === 'localhost';
      
      // Se for português, remove todos os cookies de tradução
      if (lang === 'pt') {
        // Remove cookie do domínio principal
        destroyCookie(context, COOKIE_NAME, { 
          path: '/',
          domain: isLocalhost ? undefined : '.' + hostname,
        });

        // Remove cookie do domínio específico
        destroyCookie(context, COOKIE_NAME, { 
          path: '/',
          domain: hostname,
        });

        // Remove cookie sem domínio específico
        destroyCookie(context, COOKIE_NAME, { 
          path: '/',
        });

        window.location.reload();
        return;
      }

      // Para outros idiomas, configura os cookies corretamente
      // Primeiro remove quaisquer cookies existentes
      destroyCookie(context, COOKIE_NAME, { path: '/' });
      
      // Configura o cookie sem domínio específico (para localhost)
      setCookie(context, COOKIE_NAME, "/auto/" + lang, {
        path: '/',
        sameSite: 'lax',
        secure: window.location.protocol === 'https:'
      });
      
      // Se não for localhost, configura também para o domínio completo
      if (!isLocalhost) {
        // Configura o cookie para o domínio principal (com ponto na frente)
        setCookie(context, COOKIE_NAME, "/auto/" + lang, {
          path: '/',
          domain: '.' + hostname,
          sameSite: 'lax',
          secure: true
        });
        
        // Configura o cookie para o domínio específico (sem ponto)
        setCookie(context, COOKIE_NAME, "/auto/" + lang, {
          path: '/',
          domain: hostname,
          sameSite: 'lax',
          secure: true
        });
      }
      
      window.location.reload();
    } catch (error) {
      console.error("Erro ao trocar idioma:", error);
    }
  };

  return {
    currentLanguage,
    switchLanguage,
    languageConfig: getLanguageConfig(),
  };
}; 