/**
 * First element is default
 * @type {[*]}
 */
var LANGUAGES = ['en', 'it', 'de', 'fr'];

var LABELS = {
    "__rare__": {
        "en": "Rare<br/>&lt;0.1%",
        "it": "Rara<br/>&lt;0,1%",
        "de": "selten<br/>&lt;0.1%",
        "fr": "Rare<br/>&lt;0.1%"
    },
    "__very_low__": {
        "en": "Very&nbsp;low<br/>0.1% to 1%",
        "it": "Molto&nbsp;bassa<br/>Tra lo 0,1% e l’1%",
        "de": "sehr&nbsp;niedrig<br/>0,1% bis 1%",
        "fr": "Très&nbsp;faible<br/>0,1% à 1%"
    },
    "__low__": {
        "en": "Low<br/>&gt;1% to 10%",
        "it": "Bassa<br/>&gt;1% fino al 10%",
        "de": "niedrig<br/>&gt;1% bis 10%",
        "fr": "Faible<br/>&gt;1% à 10%"
    },
    "__moderate__": {
        "en": "Moderate<br/>&gt;10% to 20%",
        "it": "Moderata<br/>&gt;10% fino al 20%",
        "de": "mäßig<br/>&gt;10% bis 20%",
        "fr": "Modérée<br/>&gt;10% à 20%"
    },
    "__high__": {
        "en": "High<br/>&gt;20% to 50%",
        "it": "Alta<br/>&gt;20% fino al 50%",
        "de": "hoch<br/>&gt;20% bis 50%",
        "fr": "Elevée<br/>&gt;20% à 50%"
    },
    "__very_high__": {
        "en": "Very&nbsp;high<br/>&gt;50% to 70%",
        "it": "Molto&nbsp;alta<br/>&gt;50% fino al 70%",
        "de": "sehr&nbsp;hoch<br/>&gt;50% bis 70%",
        "fr": "Très&nbsp;élevée<br/>&gt;50% à 70%"
    },
    "__extremely_high__": {
        "en": "Extremely&nbsp;high<br/>&gt;70%",
        "it": "Estremamente&nbsp;alta<br/>&gt;70%",
        "de": "extrem&nbsp;hoch<br/>&gt;70%",
        "fr": "Extrêmement&nbsp;élevée<br/>&gt;70%"
    },
    "__copyright_title__": {
        "en": "Copyright notice",
        "it": "Avviso sul diritto d’autore",
        "de": "Copyright",
        "fr": "Copyright notice"
    },
    "__copyright_row1__": {
        "en": "&copy; 2018 - European Food Safety Authority – EFSA.",
        "it": "&copy; Autorità europea per la sicurezza alimentare (EFSA), 2018.",
        "de": "&copy; 2018 – Europäische Behörde für Lebensmittelsicherheit – EFSA.",
        "fr": "&copy; 2018 – Autorité européenne de sécurité des aliments – EFSA."
    },
    "__copyright_row2__": {
        "en": "Re-use is authorised, provided that EFSA is acknowledged as the source of the material.",
        "it": "L’EFSA autorizza il riutilizzo del proprio materiale con citazione della fonte.",
        "de": "Die Weiterverwendung ist gestattet, sofern die EFSA als Quelle des betreffenden Materials angegeben wird.",
        "fr": "La réutilisation est autorisée à condition que l’EFSA soit reconnue comme étant la  source de l’information."
    },
    "__info_title__": {
        "en": "Antimicrobial resistance in Europe",
        "it": "Antibioticoresistenza in Europa",
        "de": "Antibiotikaresistenz in Europa",
        "fr": "Résistance aux antimicrobiens en Europe"
    },
    "__info_row1__": {
        "en": "Resistance of <em>Salmonella</em>, <em>E. coli</em> and <em>Campylobacter</em> in food, animals and humans, country by country.",
        "it": "Resistenza di <em>Salmonella</em>, <em>Escherichia coli</em> e <em>Campylobacter</em> in cibi, animali e uomo per singolo Paese.",
        "de": "Resistenzen von <em>Salmonella</em>, <em>E. coli</em> und <em>Campylobacter</em> in Lebensmitteln, bei Tieren und Menschen, nach Ländern.",
        "fr": "Résistance de <em>Salmonella</em>, <em>E. coli</em> et <em>Campylobacter</em> dans les aliments, chez l’animal et chez l’homme, par pays."
    },
    "__info_row2__": {
        "en": "If no data are presented for single countries, it means that none were reported.<br>It does not mean absence of resistance.",
        "it": "L’assenza di dati per un Paese è da attribuire a mancata segnalazione, non ad assenza di antibioticoresistenza.<br>Non significa “assenza di resistenza”.",
        "de": "Wenn für einzelne Länder keine Daten angezeigt werden, heißt dies, dass keine übermittelt wurden.<br>Es bedeutet nicht das Fehlen von Resistenzen.",
        "fr": "L’absence de données affichées pour un pays signifie qu’aucune donnée n’a été notifiée.<br>Cela n’implique pas une absence de résistance."
    },
    "__info_row3__": {
        "en": "Full report: <a href='https://www.efsa.europa.eu/en/efsajournal/pub/5182' target='_blank'>The European Union summary report on antimicrobial resistance in zoonotic and indicator bacteria from humans, animals and food in 2016</a>.",
        "it": "Versione integrale del: <a href='https://www.efsa.europa.eu/it/efsajournal/pub/5182' target='_blank'>Rapporto sintetico dell'Unione europea sulla resistenza agli antimicrobici nei batteri zoonotici e nei batteri indicatori di origine umana, animale e alimentare nel 2016</a>.",
        "de": "Kompletter Bericht: <a href='https://www.efsa.europa.eu/de/efsajournal/pub/5182' target='_blank'>The European Union summary report on antimicrobial resistance in zoonotic and indicator bacteria from humans, animals and food in 2016</a>.",
        "fr": "Rapport complet: <a href='https://www.efsa.europa.eu/fr/efsajournal/pub/5182' target='_blank'>Rapport de synthèse de l’Union européenne sur la résistance aux antimicrobiens dans les bactéries zoonotiques et les bactéries indicatrices humaines, animales et alimentaires en 2016</a>."
    },
    "__info_row4__": {
        "en": "Watch the tutorial: <a href='https://www.youtube.com/watch?v=Hb4EVOpM3DY' target='_blank'>How does it work?</a>",
        "it": "Guardate la guida: <a href='https://www.youtube.com/watch?v=Hb4EVOpM3DY' target='_blank'>Come funziona?</a>",
        "de": "Erfahren Sie mehr im Tutorial: <a href='https://www.youtube.com/watch?v=Hb4EVOpM3DY' target='_blank'>Wie funktioniert‘s?</a>",
        "fr": "Regarder le tutoriel: <a href='https://www.youtube.com/watch?v=Hb4EVOpM3DY' target='_blank'>Comment utiliser cet outil?</a>"
    },
    "__info_row5__": {
      "en": "Open access data: <a href='https://doi.org/10.5281/zenodo.1183248' target='_blank'>EFSA’s Knowledge Junction on Zenodo</a>",
      "it": "Dati ad accesso libero: <a href='https://doi.org/10.5281/zenodo.1183248' target='_blank'>EFSA’s Knowledge Junction on Zenodo</a>",
      "de": "Frei zugängliche Daten: <a href='https://doi.org/10.5281/zenodo.1183248' target='_blank'>EFSA’s Knowledge Junction on Zenodo</a>",
      "fr": "Données en libre accès: <a href='https://doi.org/10.5281/zenodo.1183248' target='_blank'>EFSA’s Knowledge Junction on Zenodo</a>"
	  },
    "__info_row6__": {
      "en": "More info: <a href='https://www.efsa.europa.eu/en/topics/topic/antimicrobial-resistance' target='_blank'>Antimicrobial resistance</a>",
      "it": "Maggiori informazioni: <a href='https://www.efsa.europa.eu/it/topics/topic/antimicrobial-resistance' target='_blank'>Resistenza agli antimicrobici</a>",
      "de": "Mehr Informationen: <a href='https://www.efsa.europa.eu/de/topics/topic/antimicrobial-resistance' target='_blank'>Antibiotikaresistenz</a>",
      "fr": "Plus d'informations: <a href='https://www.efsa.europa.eu/fr/topics/topic/antimicrobial-resistance' target='_blank'>La résistance aux antimicrobiens</a>"
	  },
	  "__info_percentage_label__": {
	    "en": "Level of resistance",
	    "it": "Percentuale di resistenza",
	    "de": "Resistenzniveau",
	    "fr": "Niveau de résistance"
	}
};

$(function () {

    var translate = function(lang) {
        /** Translate our texts here */
        $.each(LABELS, function(label, translations) {
            if(translations[lang]) {
                $('#' + label).html(
                    translations[lang]
                );
            }
        });

        var trigger;
        if((trigger = $('.language-trigger'))) {
            trigger.css('background-image', "url('img/lang-" + lang + ".png')")
        }
    };

    var extractGet = window.extractGet = function(parameter) {
        var page = decodeURIComponent(window.location.search.substring(1)),
            variables = page.split('&'),
            parameterName,
            i;

        for (i = 0; i < variables.length; i++) {
            parameterName = variables[i].split('=');

            if (parameterName[0] === parameter) {
                return parameterName[1] === undefined ? true : parameterName[1];
            }
        }
    };

    /**
     * Extract browser's language, from Quantitas library
     * @param searchLanguage
     * @param surrounding
     * @returns {*}
     */
    var extractLanguage = window.extractLanguage = function(searchLanguage, surrounding) {
        searchLanguage = searchLanguage || "";
        surrounding = surrounding || "";

        for(var i = 0; i < LANGUAGES.length; i++) {
            var language = LANGUAGES[i];
            if(searchLanguage.indexOf(surrounding + language + surrounding) > -1) {
                return language;
            }
        }

        return null;
    };

    /**
     * Search for language on various sources
     * @returns {*}
     */
    var getLanguage = function() {
        var language;

        var fromUser = extractLanguage(navigator.language || navigator.userLanguage);
        var fromUrl  = extractLanguage(window.location.href, "/");
        var fromGet  = extractLanguage(extractGet('lang'));

        /**
         * Order of parameters
         */
        language = fromGet || fromUrl || fromUser;

        /**
         * Return
         */
        return language || LANGUAGES[0];
    };

    var language = getLanguage();

    translate(language);
});
