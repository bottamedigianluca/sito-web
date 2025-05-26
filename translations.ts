export type Locale = 'it' | 'de';

export interface Translations {
  [key: string]: string | Translations;
}

export const translations: Record<Locale, Translations> = {
  it: {
    // Global
    global: {
      viewOnMap: "Visualizza su Google Maps",
    },
    // Header
    header: {
      logoAlt: "Logo Bottamedi Frutta e Verdura"
    },
    // Navigation
    nav: {
      storia: "La Nostra Storia",
      banchetto: "Al Banchetto",
      ingrosso: "Servizi Ingrosso",
      percheNoi: "Perché Noi",
      contatti: "Contatti",
      home: "Home",
      menu: "Menu",
      call: "Chiama",
      maps: "Mappe",
      banchettoContact: "Banchetto",
      ingrossoContact: "Ingrosso",
      banchettoMap: "Mappa Banchetto",
      ingrossoMap: "Mappa Ingrosso",
    },
    // Preloader
    preloader: {
      loading: "Esplosione di freschezza in arrivo...",
    },
    // Hero Section
    hero: {
      title: "BOTTAMEDI",
      subtitle: "Frutta e Verdura",
      tagline: "L'essenza del Trentino, dal 1950. Freschezza che ispira, qualità che conquista.",
      cta: {
        banchetto: "Scopri il Banchetto",
        ingrosso: "Servizi HORECA",
        storia: "La Nostra Storia" 
      }
    },
    // Intro Section
    intro: {
      title: "Bottamedi: Dove la Natura Incontra la Passione da Tre Generazioni.",
      annoNonno: "1950", 
      nomeNonno: "Luigi", 
      paragraph1: "Un viaggio iniziato nel cuore del Trentino nel {{annoNonno}}, quando nonno {{nomeNonno}} piantò il primo seme di una visione: portare sulla vostra tavola non solo frutta e verdura, ma l'essenza stessa della nostra terra. ",
      paragraph2: "Oggi, quella visione fiorisce nel nostro vivace Banchetto a Mezzolombardo e nel servizio HORECA dedicato, testimoni di una freschezza che si tocca e di una qualità che si assapora, giorno dopo giorno."
    },
    // Story Section
    story: {
      mainTitle: "La Saga dei Sapori: Tre Generazioni, Un'Unica Passione.",
      event1: {
        period: "Anni '50", 
        title: "Le Radici del Sapore: L'Inizio di un Sogno",
        description: "Tutto ebbe inizio con nonno Luigi. Con mani sapienti e un cuore colmo di dedizione per la terra trentina, piantò il seme di un'attività destinata a fiorire, fondata su qualità autentica e fiducia incrollabile.",
        imageAlt: "Nonno Bottamedi con le prime mele Golden, simbolo di tradizione e inizio attività"
      },
      event2: {
        period: "Anni '80", 
        title: "L'Orizzonte si Allarga: Crescita e Innovazione",
        description: "L'eredità sbocciò ulteriormente con papà Giovanni. Le albe trascorse ai mercati, la ricerca instancabile delle primizie più prelibate e il consolidamento dei rapporti trasformarono la passione in un servizio ortofrutticolo strutturato e apprezzato in tutto il Trentino.",
        imageAlt: "Papà Bottamedi tra cassette di pomodori cuore di bue, simbolo di espansione"
      },
      event3: {
        period: "Oggi",
        title: "Il Futuro nelle Nostre Mani: Passione che Continua",
        description: "Oggi, Pierluigi e tutta la famiglia Bottamedi custodiscono questa fiamma. Freschezza assoluta, genuinità incontaminata e un rapporto diretto e trasparente, sia al dettaglio nel nostro Banchetto che all'ingrosso per il settore HORECA, proiettano la nostra storia nel futuro.",
        imageAlt: "La famiglia Bottamedi oggi, con un cuore di kiwi freschi a simboleggiare la passione continua"
      },
      closingThought: "Bottamedi: una sinfonia di famiglia, coltivata con la melodia della natura, per orchestrare ogni giorno il capolavoro del gusto sulla vostra tavola."
    },
    // Retail Section
    retail: {
      mainImageAlt: "Il colorato ed accogliente banchetto di Bottamedi Frutta e Verdura a Mezzolombardo",
      title: "L'Eden del Gusto Quotidiano: Il Nostro Banchetto",
      description: "Immergiti in un'esplosione di colori e profumi al nostro storico Banchetto in Via Cavalleggeri Udine, Mezzolombardo. Ogni giorno, selezioniamo per te solo il meglio: frutta succosa, verdure croccanti e specialità locali, presentate con la passione e la cura che ci definiscono da generazioni.",
      cta: "Orari e Contatti del Banchetto",
    },
    gallery: { 
      alt: {
        stagione: "Arcobaleno di frutta fresca di stagione al banchetto Bottamedi",
        pomodori: "Pomodori cuore di bue rossi, maturi e profumati",
        melinda: "Mele Golden Melinda DOC del Trentino, croccanti e succose",
        angurie: "Fette di anguria rossa e dissetante, perfetta per l'estate",
        meloni: "Meloni Sattin 'Dolce Passione', profumati e dolcissimi",
        disidratata: "Assortimento colorato di frutta disidratata e frutta secca",
      },
      caption: {
        stagione: "Un arcobaleno di freschezza: frutta di stagione, verdure locali e delizie tipiche ti aspettano al nostro Banchetto.",
        pomodori: "Il vero sapore dell'orto: pomodori cuore di bue coltivati con passione, per sughi e insalate indimenticabili.",
        melinda: "L'oro del Trentino: le inconfondibili Mele Golden Melinda, un classico di dolcezza e croccantezza.",
        angurie: "Un'esplosione di freschezza estiva: le nostre angurie, dolci e dissetanti, perfette per ogni momento.",
        meloni: "Meloni Sattin 'Dolce Passione': un profumo avvolgente e una dolcezza che conquista, coltivati con amore.",
        disidratata: "Oltre il fresco: scopri un mondo di sapori concentrati nella nostra selezione di frutta disidratata e specialità secche.",
      },
      title: {
        stagione: "Tesori di Stagione",
        pomodori: "Rosso Passione",
        melinda: "Golden Melinda DOC",
        angurie: "Regine dell'Estate",
        meloni: "Meloni Sublimi",
        disidratata: "Gioielli Essiccati",
      }
    },
    // Wholesale Section
    wholesale: {
      title: "Partner d'Eccellenza per la Tua Cucina Professionale",
      subtitle: "Servizio HORECA: Freschezza Insuperabile, Affidabilità Totale.",
      description: "Professionisti della ristorazione, hotel, catering e negozi alimentari del Trentino: elevate la vostra offerta con la qualità Bottamedi. Tre generazioni di esperienza per forniture ortofrutticole impeccabili, prodotti freschissimi e un servizio di consegna personalizzato che rispetta i vostri tempi e le vostre esigenze.",
      feature1: "Approvvigionamento d'eccellenza: solo produttori fidati e mercati selezionati per garantire qualità superiore e freschezza impareggiabile.",
      feature2: "Logistica su misura: consegne flessibili e puntuali, 6 giorni su 7, in aree concordate. La tua attività non rimarrà mai senza il meglio.",
      feature3: "Controllo qualità maniacale: ogni prodotto è ispezionato per assicurare sapore intenso, aspetto invitante e presentazione impeccabile.",
      feature4: "Consulenza personalizzata HORECA: Pierluigi è il tuo referente diretto per prezzi competitivi, consigli esperti e un rapporto di fiducia solido e duraturo.",
      contactPierluigi: "Per listini su misura e consulenza diretta, contatta",
      cta: "Richiedi Info Ingrosso",
      imageAlt: "Casse di albicocche fresche e ordinate, pronte per la fornitura ingrosso HORECA da Bottamedi"
    },
    // Why Us Section
    whyus: {
      title: "Il Segreto della Nostra Unicità",
      subtitle: "Scegliere Bottamedi non è solo acquistare frutta e verdura. È abbracciare una filosofia di freschezza impareggiabile, qualità certificata e un'attenzione al cliente che solo una famiglia appassionata può offrirti.",
      feature1: {
        title: "Freschezza Assoluta: Il Nostro Credo",
        description: "Ogni mattina, selezioniamo personalmente solo il meglio. Collaborazioni dirette con produttori di fiducia per garantirti un prodotto che profuma ancora di campo, vibrante di sapore e nutrimento.",
        alt: "Pattern ipnotico di kiwi gialli freschi, simbolo di freschezza assoluta"
      },
      feature2: {
        title: "Qualità d'Eccellenza: L'Arte della Scelta",
        description: "L'esperienza di tre generazioni si traduce in un occhio infallibile per l'eccellenza. Solo i prodotti che superano i nostri rigorosi standard arrivano sulla tua tavola o nella tua attività.",
        alt: "Splendide mele di montagna in cassetta, simbolo di qualità d'eccellenza"
      },
      feature3: {
        title: "Cuore di Famiglia: Passione Contagiosa",
        description: "Non siamo solo fornitori, siamo una famiglia che condivide una passione. Ti accogliamo con un sorriso, ti consigliamo con sincerità, perché la tua soddisfazione è la nostra più grande ricompensa.",
        alt: "Kiwi di varie tonalità disposti a formare un cuore, simbolo della passione familiare"
      },
      feature4: {
        title: "Radici Trentine: Autenticità Garantita",
        description: "Amiamo profondamente il nostro Trentino. Valorizziamo i suoi produttori e ti offriamo l'autenticità dei sapori locali, per un'esperienza di gusto genuina e indimenticabile.",
        alt: "Logo luminoso di Bottamedi Frutta e Verdura, che simboleggia le radici nel territorio trentino"
      },
    },
    // Contact Section
    contact: {
      title: "Restiamo in Contatto: Trovaci, Chiamaci, Scrivici!",
      subtitle: "Il sapore autentico del Trentino è più vicino di quanto pensi. Vieni a scoprire la qualità Bottamedi al nostro Banchetto, o contatta Pierluigi per le esigenze HORECA. La nostra famiglia è pronta ad accoglierti!",
      banchettoTitle: "Banchetto: Il Cuore della Freschezza",
      banchettoAddress: "Via Cavalleggeri Udine, 38017 Mezzolombardo (TN)",
      banchettoPhone: "Banchetto: 351 577 6198",
      banchettoHours: "Orari: Lunedì - Sabato: 07:00 – 19:30",
      ingrossoTitle: "Ingrosso HORECA: Qualità per Professionisti",
      ingrossoAddress: "Magazzino: Via Alcide de Gasperi, 47, 38017 Mezzolombardo (TN)",
      ingrossoPhone: "Ingrosso HORECA: 0461 602534",
      ingrossoEmail: "bottamedipierluigi@virgilio.it",
      mapTitle: "Le Nostre Radici, a Portata di Click",
      mapBanchettoCta: "Mappa Banchetto",
      mapIngrossoCta: "Mappa Ingrosso",
    },
    // Footer
    footer: {
      proprietor: "Frutta e Verdura di Pierluigi Bottamedi.",
      rights: "Tutti i diritti riservati.",
      banchettoTitle: "Banchetto (Dettaglio)",
      banchettoAddress: "Via Cavalleggeri Udine, Mezzolombardo (TN)",
      banchettoPhone: "Tel: 351 577 6198",
      ingrossoTitle: "Ingrosso (HORECA)",
      ingrossoAddress: "Via A. de Gasperi, 47, Mezzolombardo (TN)",
      ingrossoPhone: "Tel: 0461 602534",
      contactUs: "Contattaci",
      credits: "Sito web realizzato con passione.",
    },
    // Language & Cookie Modal
    langCookieModal: {
      title: "Benvenuto! / Willkommen!",
      languageSelectLabel: "Seleziona la tua lingua / Bitte wählen Sie Ihre Sprache:",
      italian: "Italiano",
      german: "Deutsch",
      cookieMessage: "Utilizziamo i cookie per assicurarti la migliore esperienza sul nostro sito e per ricordare la tua preferenza linguistica. Cliccando 'Accetta', acconsenti al loro utilizzo.",
      cookieMessageDE: "Wir verwenden Cookies, um Ihnen das beste Erlebnis auf unserer Website zu gewährleisten und Ihre Sprachpräferenz zu speichern. Indem Sie auf 'Akzeptieren' klicken, stimmen Sie deren Verwendung zu.", // This should be the German message for German selection.
      acceptButton: "Accetta / Akzeptieren",
    }
  },
  de: {
    // Global
    global: {
      viewOnMap: "Auf Google Maps ansehen",
    },
    // Header
    header: {
      logoAlt: "Bottamedi Obst & Gemüse Logo"
    },
    // Navigation
    nav: {
      storia: "Unsere Geschichte",
      banchetto: "Am Marktstand",
      ingrosso: "Großhandel Service",
      percheNoi: "Warum Wir",
      contatti: "Kontakt",
      home: "Startseite",
      menu: "Menü",
      call: "Anrufen",
      maps: "Karten",
      banchettoContact: "Marktstand",
      ingrossoContact: "Großhandel",
      banchettoMap: "Karte Marktstand",
      ingrossoMap: "Karte Großhandel",
    },
    // Preloader
    preloader: {
      loading: "Frische-Explosion im Anflug...",
    },
    // Hero Section
    hero: {
      title: "BOTTAMEDI",
      subtitle: "Obst & Gemüse",
      tagline: "Die Essenz des Trentino, seit 1950. Frische, die inspiriert, Qualität, die überzeugt.",
      cta: {
        banchetto: "Marktstand Entdecken",
        ingrosso: "HORECA Service",
        storia: "Unsere Geschichte"
      }
    },
    // Intro Section
    intro: {
      title: "Bottamedi: Wo Natur auf Leidenschaft trifft – seit drei Generationen.",
      annoNonno: "1950", 
      nomeNonno: "Luigi", 
      paragraph1: "Eine Reise, die {{annoNonno}} im Herzen des Trentino begann, als Opa {{nomeNonno}} den ersten Samen einer Vision pflanzte: nicht nur Obst und Gemüse auf Ihren Tisch zu bringen, sondern die Seele unseres Landes.",
      paragraph2: "Heute blüht diese Vision in unserem lebhaften Marktstand in Mezzolombardo und im engagierten HORECA-Service auf – Zeugen einer Frische, die man spürt, und einer Qualität, die man schmeckt, Tag für Tag."
    },
    story: {
      mainTitle: "Die Saga des Geschmacks: Drei Generationen, Eine Leidenschaft.",
      event1: {
        period: "50er Jahre", 
        title: "Die Wurzeln des Geschmacks: Der Beginn eines Traums",
        description: "Alles begann mit Großvater Luigi. Mit geschickten Händen und einem Herzen voller Hingabe für das Trentiner Land säte er den Samen für ein blühendes Geschäft, gegründet auf authentischer Qualität und unerschütterlichem Vertrauen.",
        imageAlt: "Opa Bottamedi mit den ersten Golden Delicious Äpfeln, Symbol für Tradition und Geschäftsbeginn"
      },
      event2: {
        period: "80er Jahre", 
        title: "Der Horizont erweitert sich: Wachstum und Innovation",
        description: "Das Erbe erblühte weiter mit Vater Giovanni. Die auf den Märkten verbrachten Morgenstunden, die unermüdliche Suche nach den erlesensten Frühprodukten und die Festigung der Beziehungen verwandelten die Leidenschaft in einen strukturierten und in ganz Trentino geschätzten Obst- und Gemüseservice.",
        imageAlt: "Vater Bottamedi zwischen Kisten mit Ochsenherztomaten, Symbol der Expansion"
      },
      event3: {
        period: "Heute",
        title: "Die Zukunft in unseren Händen: Fortwährende Leidenschaft",
        description: "Heute hüten Pierluigi und die ganze Familie Bottamedi diese Flamme. Absolute Frische, unverfälschte Echtheit und eine direkte, transparente Beziehung, sowohl im Detail an unserem Marktstand als auch im Großhandel für den HORECA-Sektor, tragen unsere Geschichte in die Zukunft.",
        imageAlt: "Die Familie Bottamedi heute, mit einem Herz aus frischen Kiwis als Symbol für die fortwährende Leidenschaft"
      },
      closingThought: "Bottamedi: eine Familiensymphonie, kultiviert mit der Melodie der Natur, um täglich das Meisterwerk des Geschmacks auf Ihrem Tisch zu orchestrieren."
    },
    retail: {
      mainImageAlt: "Der farbenfrohe und einladende Marktstand von Bottamedi Obst und Gemüse in Mezzolombardo",
      title: "Der Garten Eden des täglichen Geschmacks: Unser Marktstand",
      description: "Tauchen Sie ein in eine Explosion von Farben und Düften an unserem historischen Marktstand in der Via Cavalleggeri Udine, Mezzolombardo. Jeden Tag wählen wir für Sie nur das Beste aus: saftiges Obst, knackiges Gemüse und lokale Spezialitäten, präsentiert mit der Leidenschaft und Sorgfalt, die uns seit Generationen auszeichnen.",
      cta: "Öffnungszeiten & Kontakt Marktstand",
    },
    gallery: {
      alt: {
        stagione: "Regenbogen aus frischem saisonalem Obst am Bottamedi Marktstand",
        pomodori: "Rote, reife und duftende Ochsenherztomaten",
        melinda: "Golden Delicious Äpfel DOC aus dem Trentino, knackig und saftig",
        angurie: "Scheiben roter, durstlöschender Wassermelone, perfekt für den Sommer",
        meloni: "Sattin Melonen 'Dolce Passione', duftend und sehr süß",
        disidratata: "Bunte Auswahl an Trockenfrüchten und Nüssen",
      },
      caption: {
        stagione: "Ein Regenbogen der Frische: saisonales Obst, lokales Gemüse und typische Köstlichkeiten erwarten Sie an unserem Marktstand.",
        pomodori: "Der wahre Geschmack des Gartens: mit Leidenschaft angebaute Ochsenherztomaten für unvergessliche Saucen und Salate.",
        melinda: "Das Gold des Trentino: die unverwechselbaren Golden Delicious Äpfel, ein Klassiker an Süße und Knackigkeit.",
        angurie: "Eine Explosion sommerlicher Frische: unsere Wassermelonen, süß und durstlöschend, perfekt für jeden Moment.",
        meloni: "Sattin Melonen 'Dolce Passione': ein umhüllender Duft und eine Süße, die erobert, mit Liebe angebaut.",
        disidratata: "Mehr als nur frisch: Entdecken Sie eine Welt konzentrierter Aromen in unserer Auswahl an Trockenfrüchten und Nussspezialitäten.",
      },
      title: {
        stagione: "Saisonale Schätze",
        pomodori: "Rote Leidenschaft",
        melinda: "Golden Melinda DOC",
        angurie: "Königinnen des Sommers",
        meloni: "Erhabene Melonen",
        disidratata: "Getrocknete Juwelen",
      }
    },
    wholesale: {
      title: "Exzellenzpartner für Ihre professionelle Küche",
      subtitle: "HORECA Service: Unübertroffene Frische, absolute Zuverlässigkeit.",
      description: "Profis aus Gastronomie, Hotellerie, Catering und Lebensmittelhandel im Trentino: Steigern Sie Ihr Angebot mit der Qualität von Bottamedi. Drei Generationen Erfahrung für tadellose Obst- und Gemüselieferungen, frischeste Produkte und einen personalisierten Lieferservice, der Ihre Zeiten und Bedürfnisse respektiert.",
      feature1: "Exzellente Beschaffung: Nur vertrauenswürdige Produzenten und ausgewählte Märkte, um höchste Qualität und unvergleichliche Frische zu garantieren.",
      feature2: "Maßgeschneiderte Logistik: Flexible und pünktliche Lieferungen, 6 Tage die Woche, in vereinbarten Gebieten. Ihr Betrieb wird nie ohne das Beste sein.",
      feature3: "Penible Qualitätskontrolle: Jedes Produkt wird geprüft, um intensiven Geschmack, einladendes Aussehen und eine makellose Präsentation zu gewährleisten.",
      feature4: "Persönliche HORECA-Beratung: Pierluigi ist Ihr direkter Ansprechpartner für wettbewerbsfähige Preise, fachkundige Ratschläge und eine solide, dauerhafte Vertrauensbeziehung.",
      contactPierluigi: "Für maßgeschneiderte Preislisten und direkte Beratung kontaktieren Sie",
      cta: "Großhandelsinfos Anfragen",
      imageAlt: "Kisten mit frischen, sortierten Aprikosen, bereit für die HORECA-Großhandelslieferung von Bottamedi"
    },
    whyus: {
      title: "Das Geheimnis unserer Einzigartigkeit",
      subtitle: "Bottamedi zu wählen bedeutet nicht nur Obst und Gemüse zu kaufen. Es bedeutet, eine Philosophie unvergleichlicher Frische, zertifizierter Qualität und einer Kundenbetreuung anzunehmen, die Ihnen nur eine leidenschaftliche Familie bieten kann.",
      feature1: {
        title: "Absolute Frische: Unser Credo",
        description: "Jeden Morgen wählen wir persönlich nur das Beste aus. Direkte Zusammenarbeit mit Vertrauensproduzenten, um Ihnen ein Produkt zu garantieren, das noch nach Feld duftet, lebendig an Geschmack und Nährstoffen.",
        alt: "Hypnotisches Muster aus frischen gelben Kiwis, Symbol absoluter Frische"
      },
      feature2: {
        title: "Exzellente Qualität: Die Kunst der Wahl",
        description: "Die Erfahrung von drei Generationen führt zu einem unfehlbaren Auge für Exzellenz. Nur Produkte, die unsere strengen Standards erfüllen, gelangen auf Ihren Tisch oder in Ihr Geschäft.",
        alt: "Prächtige Bergäpfel in einer Kiste, Symbol für exzellente Qualität"
      },
      feature3: {
        title: "Familienherz: Ansteckende Leidenschaft",
        description: "Wir sind nicht nur Lieferanten, wir sind eine Familie, die eine Leidenschaft teilt. Wir empfangen Sie mit einem Lächeln, beraten Sie aufrichtig, denn Ihre Zufriedenheit ist unsere größte Belohnung.",
        alt: "Kiwis verschiedener Farbtöne in Herzform angeordnet, Symbol familiärer Leidenschaft"
      },
      feature4: {
        title: "Trentiner Wurzeln: Garantierte Authentizität",
        description: "Wir lieben unser Trentino zutiefst. Wir schätzen seine Produzenten und bieten Ihnen die Authentizität lokaler Aromen für ein echtes und unvergessliches Geschmackserlebnis.",
        alt: "Leuchtendes Logo von Bottamedi Obst und Gemüse, das die Wurzeln im Trentiner Gebiet symbolisiert"
      },
    },
    contact: {
      title: "Bleiben wir in Kontakt: Finden, Anrufen, Schreiben Sie uns!",
      subtitle: "Der authentische Geschmack des Trentino ist näher als Sie denken. Entdecken Sie die Bottamedi-Qualität an unserem Marktstand oder kontaktieren Sie Pierluigi für HORECA-Anforderungen. Unsere Familie freut sich auf Sie!",
      banchettoTitle: "Marktstand: Das Herz der Frische",
      banchettoAddress: "Via Cavalleggeri Udine, 38017 Mezzolombardo (TN)",
      banchettoPhone: "Marktstand: 351 577 6198",
      banchettoHours: "Öffnungszeiten: Montag - Samstag: 07:00 – 19:30",
      ingrossoTitle: "Großhandel HORECA: Qualität für Profis",
      ingrossoAddress: "Lager: Via Alcide de Gasperi, 47, 38017 Mezzolombardo (TN)",
      ingrossoPhone: "Großhandel HORECA: 0461 602534",
      ingrossoEmail: "bottamedipierluigi@virgilio.it",
      mapTitle: "Unsere Wurzeln, nur einen Klick entfernt",
      mapBanchettoCta: "Karte Marktstand",
      mapIngrossoCta: "Karte Großhandel",
    },
    footer: {
      proprietor: "Obst und Gemüse von Pierluigi Bottamedi.",
      rights: "Alle Rechte vorbehalten.",
      banchettoTitle: "Marktstand (Detail)",
      banchettoAddress: "Via Cavalleggeri Udine, Mezzolombardo (TN)",
      banchettoPhone: "Tel: 351 577 6198",
      ingrossoTitle: "Großhandel (HORECA)",
      ingrossoAddress: "Via A. de Gasperi, 47, Mezzolombardo (TN)",
      ingrossoPhone: "Tel: 0461 602534",
      contactUs: "Kontaktieren Sie uns",
      credits: "Webseite mit Leidenschaft erstellt.",
    },
     langCookieModal: {
      title: "Willkommen! / Benvenuto!",
      languageSelectLabel: "Bitte wählen Sie Ihre Sprache / Seleziona la tua lingua:",
      italian: "Italiano",
      german: "Deutsch",
      cookieMessage: "Wir verwenden Cookies, um Ihnen das beste Erlebnis auf unserer Website zu gewährleisten und Ihre Sprachpräferenz zu speichern. Indem Sie auf 'Akzeptieren' klicken, stimmen Sie deren Verwendung zu.",
      cookieMessageDE: "Utilizziamo i cookie per assicurarti la migliore esperienza sul nostro sito e per ricordare la tua preferenza linguistica. Cliccando 'Accetta', acconsenti al loro utilizzo.",
      acceptButton: "Akzeptieren / Accetta",
    }
  },
};