"use client"

import { useEffect } from 'react';
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

export const CookieConsentComponent = () => {
  useEffect(() => {
    CookieConsent.run({
      language: {
        default: 'pt-BR',
        translations: {
          'pt-BR': {
            consentModal: {
              title: "Sua privacidade é importante para nós!",
              description: "Utilizamos cookies e outras tecnologias para personalizar sua experiência e entender como você e outros visitantes usam nosso site. Ao continuar navegando, você concorda com isso. Para mais informações, consulte nossa <a href='/politica-de-privacidade' target='_blank'>Política de Privacidade</a>.",
              acceptAllBtn: "Aceitar todos",
              acceptNecessaryBtn: "Rejeitar todos",
            //   showPreferencesBtn: "Gerenciar preferências",
            },
            preferencesModal: {
              title: "Preferências de cookies",
              acceptAllBtn: "Aceitar todos",
              acceptNecessaryBtn: "Rejeitar todos",
              savePreferencesBtn: "Salvar preferências",
              closeIconLabel: "Fechar",
              sections: [
                {
                  title: "Uso de cookies",
                  description: "Nós usamos cookies para garantir as funcionalidades básicas do site e para melhorar sua experiência online."
                },
                {
                  title: "Cookies estritamente necessários",
                  description: "Esses cookies são essenciais para o funcionamento adequado do meu site. Sem esses cookies, o site não funcionaria corretamente.",
                  linkedCategory: "necessários"
                },
                {
                  title: "Cookies de desempenho e análise",
                  description: "Esses cookies permitem que o site lembre das escolhas que você fez no passado.",
                  linkedCategory: "análise",
                  cookieTable: {
                    headers: {
                      name: "Nome",
                      domain: "Serviço",
                      description: "Descrição",
                      expiration: "Expiração"
                    },
                    body: [
                      {
                        name: "_ga",
                        domain: "Google Analytics",
                        description: "Cookie definido pelo <a href=\"#das\">Google Analytics</a>",
                        expiration: "Expira após 12 dias"
                      },
                      {
                        name: "_gid",
                        domain: "Google Analytics",
                        description: "Cookie definido pelo <a href=\"#das\">Google Analytics</a>",
                        expiration: "Sessão"
                      }
                    ]
                  }
                },
                {
                  title: "Mais informações",
                  description: "Para dúvidas relacionadas à nossa política de cookies e suas escolhas, por favor leia nossa<a class=\"cc-link\" href=\"#/politica-de-privacidade\"> política de privacidade</a>."
                }
              ]
            }
          }
        }
      },
      categories: {},
      guiOptions: {
        consentModal: {
          layout: 'box',
          position: 'bottom left',
          flipButtons: false,
          equalWeightButtons: true,
        },
        preferencesModal: {
          layout: 'box',
          position: 'left',
          flipButtons: false,
          equalWeightButtons: true
        }
      }
    });
  }, []);

  return null;
}; 