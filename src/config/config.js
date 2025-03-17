let ESCAPP_LOCALES = {
};

// AfterOpen can be "NOTHING", "SHOW_URL", "SHOW_MESSAGE" or "SHOW_MESSAGE_AND_CONTINUE"

export let GLOBAL_CONFIG = {
  availableLocales: ["es", "en", "it"],
  locale: undefined,
  defaultLocale: "es",
  message: "¡Has abierto la puerta! \n Pulsa 'Continuar' para entrar a la nueva sala.",
  url: "https://vishub.org/pictures/20203.png",
  escapp: {
    endpoint: "https://escape.dit.upm.es/api/escapeRooms/369",
    localStorageKey: "ESCAPP_SAFE_20223a",
    restoreState: "AUTO",
    imagesPath: "/images/",
    I18n: {
      availableLocales: ["es", "en"],
      defaultLocale: "en",
      locales: ESCAPP_LOCALES,
    },
  },
};

export const MODULOS_CONFIG = {
  modulos: {
    solucion: "roj-azu-ama-ver",
    name: "cables",
    roj: 1,
    azu: 2,
    ama: 3,
    ver: 4,
  },
  /* modulos: {
     name: "cables",
     "cables":{
       cableroj: { color: "roj", orden: 1 },
       cableazu: { color: "azu", orden: 2 },
       cableama: { color: "ama", orden: 3 },
       cablever: { color: "ver", orden: 4 },
     },
   },*/
}                                
