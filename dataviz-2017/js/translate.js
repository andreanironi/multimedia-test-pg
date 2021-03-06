/**
 * First element is default
 * @type {[*]}
 */
var LANGUAGES = ['en', 'it', 'de', 'fr'];

var LABELS = {
    "__legend_title__": {
        "en": "Level of resistance",
        "it": "Livello di resistenza",
        "de": "Resistenzniveau",
        "fr": "Niveau de résistance"
    },
    "__rare__": {
        "en": "Rare<br/>&lt;0.1%",
        "it": "Raro<br/>&lt;0,1%",
        "de": "selten<br/>&lt;0.1%",
        "fr": "Rare<br/>&lt;0.1%"
    },
    "__very_low__": {
        "en": "Very&nbsp;low<br/>0.1% to 1%",
        "it": "Molto&nbsp;basso<br/>Tra lo 0,1% e l’1%",
        "de": "sehr&nbsp;niedrig<br/>0,1% bis 1%",
        "fr": "Très&nbsp;faible<br/>0,1% à 1%"
    },
    "__low__": {
        "en": "Low<br/>&gt;1% to 10%",
        "it": "Basso<br/>&gt;1% fino al 10%",
        "de": "niedrig<br/>&gt;1% bis 10%",
        "fr": "Faible<br/>&gt;1% à 10%"
    },
    "__moderate__": {
        "en": "Moderate<br/>&gt;10% to 20%",
        "it": "Moderato<br/>&gt;10% fino al 20%",
        "de": "mäßig<br/>&gt;10% bis 20%",
        "fr": "Modérée<br/>&gt;10% à 20%"
    },
    "__high__": {
        "en": "High<br/>&gt;20% to 50%",
        "it": "Alto<br/>&gt;20% fino al 50%",
        "de": "hoch<br/>&gt;20% bis 50%",
        "fr": "Elevée<br/>&gt;20% à 50%"
    },
    "__very_high__": {
        "en": "Very&nbsp;high<br/>&gt;50% to 70%",
        "it": "Molto&nbsp;alto<br/>&gt;50% fino al 70%",
        "de": "sehr&nbsp;hoch<br/>&gt;50% bis 70%",
        "fr": "Très&nbsp;élevée<br/>&gt;50% à 70%"
    },
    "__extremely_high__": {
        "en": "Extremely&nbsp;high<br/>&gt;70%",
        "it": "Estremamente&nbsp;alto<br/>&gt;70%",
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
        "en": "&copy; 2019 - European Food Safety Authority – EFSA.",
        "it": "&copy; 2019 - Autorità Europea per la Sicurezza Alimentare (EFSA).",
        "de": "&copy; 2019 – Europäische Behörde für Lebensmittelsicherheit – EFSA.",
        "fr": "&copy; 2019 – Autorité Européenne de Sécurité des Aliments – EFSA."
    },
    "__copyright_row2__": {
        "en": "Re-use is authorised, provided that EFSA is acknowledged as the source of the material.",
        "it": "L’EFSA autorizza il riutilizzo del proprio materiale con citazione della fonte.",
        "de": "Die Weiterverwendung ist gestattet, sofern die EFSA als Quelle des betreffenden Materials angegeben wird.",
        "fr": "La réutilisation est autorisée à condition que l’EFSA soit reconnue comme étant la  source de l’information."
    },
    "__info_title__": {
        "en": "Antimicrobial resistance in Europe",
        "it": "L’Antibioticoresistenza in Europa",
        "de": "Antibiotikaresistenz in Europa",
        "fr": "Résistance aux antimicrobiens en Europe"
    },
    "__info_row1__": {
        "en": "The visualised data show the resistance of <em>Salmonella</em>, <em>E. Coli</em> and <em>Campylobacter</em> in food, animals and humans, country by country from 2017.",
        "it": "I dati visualizzati mostrano la resistenza di <em>Salmonella</em>, <em>E. Coli</em> e <em>Campylobacter</em> nel cibo, negli animali e nell'uomo, Paese per Paese dal 2017.",
        "de": "Die visualisierten Daten veranschaulichen Resistenzen von <em>Salmonella</em>, <em>E. coli</em> und <em>Campylobacter</em> in Lebensmitteln, bei Tieren und Menschen, nach Ländern für 2017.",
        "fr": "Les données affichées indiquent la résistance de <em>Salmonella</em>, <em>E. Coli</em> et <em>Campylobacter</em> dans l'alimentation, chez l’homme et chez l’animal, par pays, à partir de 2017."
    },
    "__info_row2__": {
        "en": "If no data are presented for single countries, it means that none or fewer than 10 resistant bacteria were reported. It does not mean absence of resistance.",
        "it": "Se per determinati Paesi non figurano dati, vuol dire che non vi è stata segnalazione di batteri resistenti oppure vi è stata in numero inferiore a 10. Non significa assenza di resistenza.",
        "de": "Wenn für einzelne Länder keine Daten angezeigt werden, heißt dies, dass keine oder weniger als zehn resistente Bakterien berichtet wurden. Es bedeutet nicht das Fehlen von Resistenzen.",
        "fr": "Lorsqu’aucune donnée ne s’affiche pour un pays, cela signifie qu'aucune ou que moins de 10 bactéries résistantes ont été signalées. Cela n’implique pas une absence de résistance."
    },
    "__info_row3__": {
        "en": "The countries monitoring and reporting are the EU Member States, Iceland, Norway and Switzerland.",
        "it": "I Paesi che eseguono attività di monitoraggio e segnalazione sono gli Stati membri dell'UE nonché Islanda, Norvegia e Svizzera.",
        "de": "Monitoring und Berichterstattung erfolgten durch die EU-Mitgliedstaaten, Island, Norwegen und die Schweiz.",
        "fr": "Les pays déclarants sont les États membres de l'UE, l'Islande, la Norvège et la Suisse."
    },
    "__info_row4__": {
        "en": "Monitoring for calves is only mandatory for certain Member States. <br><br> The monitoring of AMR in <em>Salmonella</em> from pigs and calves under one year of age, as well as in <em>Campylobacter coli</em> from fattening pigs is performed voluntarily by MSs.",
        "it": "Il monitoraggio dei vitelli è obbligatorio solo per alcuni Stati membri. <br><br> Il monitoraggio dell’AMR in <em>Salmonella</em> da suini e vitelli di età inferiore a un anno, come anche nel <em>Campylobacter coli</em> da suini da ingrasso viene effettuato volontariamente dagli SM.",
        "de": "Das Monitoring von Kälbern ist nur in bestimmten Mitgliedstaaten verpflichtend. <br><br> Das Monitoring von Antibiotikaresistenzen bei <em>Salmonella</em> von Schweinen und Kälbern unter einem Jahr sowie bei <em>Campylobacter coli</em> von Mastschweinen wird von den Mitgliedstaaten auf freiwilliger Basis durchgeführt.",
        "fr": "La surveillance des veaux n’est obligatoire que dans certains États membres. <br><br> La surveillance de la résistance aux antibiotiques des bactéries <em>Salmonella</em> issues des porcs et des veaux de moins d’un an, et des bactéries <em>Campylobacter coli</em> issues des porcs d’engraissement est exercée sur base volontaire par les États membres."
    },
    "__info_row5__": {
        "en": "See more detailed explanations in the full report:",
        "it": "Vedere le spiegazioni più dettagliate nella versione integrale del rapporto:",
        "de": "Ausführlichere Erklärungen finden Sie im vollständigen Bericht:",
        "fr": "&nbsp;"
    },
    "__info_row6__": {
        "en": "<a href='https://www.efsa.europa.eu/en/efsajournal/pub/5598' target='_blank'>The European Union summary report on antimicrobial resistance in zoonotic and indicator bacteria from humans, animals and food in 2017</a>",
        "it": "<a href='https://www.efsa.europa.eu/en/efsajournal/pub/5598' target='_blank'>Rapporto sintetico dell'Unione europea sulla resistenza agli antimicrobici nei batteri zoonotici e nei batteri indicatori di origine umana, animale e alimentare nel 2017</a>.",
        "de": "<a href='https://www.efsa.europa.eu/en/efsajournal/pub/5598' target='_blank'>The European Union summary report on antimicrobial resistance in zoonotic and indicator bacteria from humans, animals and food in 2017</a>.",
        "fr": "<a href='https://www.efsa.europa.eu/en/efsajournal/pub/5598' target='_blank'>Rapport de synthèse de l’Union européenne sur la résistance aux antimicrobiens dans les bactéries zoonotiques et les bactéries indicatrices humaines, animales et alimentaires en 2017</a>."
    },
    "__info_row7__": {
        "en": "The data is open access and can be found here: <a href='https://doi.org/10.5281/zenodo.2562858' target='_blank'>EFSA’s Knowledge Junction on Zenodo</a>",
        "it": "I dati sono di libero accesso e si trovano in : <a href='https://doi.org/10.5281/zenodo.2562858' target='_blank'>EFSA’s Knowledge Junction on Zenodo</a>",
        "de": "Die Daten sind frei zugänglich und hier zu finden: <a href='https://doi.org/10.5281/zenodo.2562858' target='_blank'>EFSA Knowledge Junction auf Zenodo</a>",
        "fr": "Les données sont librement accessibles sur le lien suivant: <a href='https://doi.org/10.5281/zenodo.2562858' target='_blank'>Knowledge Junction de l’EFSA sur Zenodo</a>"
    },
    "__info_row8__": {
        "en": "Unsure of any scientific terms? Consult EFSA’s <a href='https://www.efsa.europa.eu/en/glossary-taxonomy-terms' target='_blank'>glossary</a>",
        "it": "Perplessità su un termine scientifico? Consultate il <a href='https://www.efsa.europa.eu/it/glossary-taxonomy-terms' target='_blank'>glossario</a> EFSA",
        "de": "Fragen zu wissenschaftlichen Fachbegriffen? Schlagen Sie nach im <a href='https://www.efsa.europa.eu/de/glossary-taxonomy-terms' target='_blank'>EFSA-Glossar</a>",
        "fr": "Indécis sur la signification d’un terme scientifique ? Consultez le <a href='https://www.efsa.europa.eu/fr/glossary-taxonomy-terms' target='_blank'>glossaire de l’EFSA</a>"
    },
    "__survey_title__": {
        "en": "Are you a(n)...",
        "it": "Sei...",
        "de": "Sind Sie...",
        "fr": "Vous êtes..."
    },
    "__survey_value_1__": {
        "en": "Citizen",
        "it": "Un privato cittadino",
        "de": "ein/e interessierte/r Bürger/in",
        "fr": "Un∙e citoyen·ne"
    },
    "__survey_value_2__": {
        "en": "Farmer",
        "it": "Un agricoltore",
        "de": "in der Lebensmittelerzeugung tätig",
        "fr": "Un∙e agriculteur∙trice"
    },
    "__survey_value_3__": {
        "en": "Health professional",
        "it": "Un professionista della salute",
        "de": "im Gesundheitswesen tätig",
        "fr": "Un∙e professional∙le de la santé"
    },
    "__survey_value_4__": {
        "en": "Industry representative",
        "it": "Un rappresentante dell’industria",
        "de": "in der Industrie tätig",
        "fr": "Un∙e représentant∙e de l’industrie"
    },
    "__survey_value_5__": {
        "en": "NGO",
        "it": "Una ONG",
        "de": "im NGO-Bereich tätig",
        "fr": "Une ONG"
    },
    "__survey_value_6__": {
        "en": "Policy maker",
        "it": "Un soggetto politico",
        "de": "im politischen Bereich tätig",
        "fr": "Un∙e décideur∙euse politique"
    },
    "__survey_value_7__": {
        "en": "Risk manager",
        "it": "Un gestore del rischio",
        "de": "im Risikomanagement tätig",
        "fr": "Un∙e gestionnaire du risque"
    },
    "__survey_value_8__": {
        "en": "Scientist/Academia",
        "it": "Uno scienziato o rappresentante del mondo accademico",
        "de": "in der Wissenschaft tätig",
        "fr": "Un∙e scientifique/universitaire"
    },
    "__survey_value_9__": {
        "en": "Other",
        "it": "Altro",
        "de": "Sonstiges",
        "fr": "Autre"
    },
    "__surveyBox_title__": {
        "en": "Feedback",
        "it": "Dateci un feedback",
        "de": "Feedback",
        "fr": "Feedback"
    },
    "__surveyBox_row1__": {
        "en": "Please give us a <a href='https://ec.europa.eu/eusurvey/runner/AMR_dataviz_2019' target='_blank'>feedback</a> about the tool.",
        "it": "Fateci sapere <a href='https://ec.europa.eu/eusurvey/runner/AMR_dataviz_2019' target='_blank'>cosa pensate</a> di questo prodotto interattivo compilando il relativo questionario.",
        "de": "Bitte geben Sie uns Ihr <a href='https://ec.europa.eu/eusurvey/runner/AMR_dataviz_2019' target='_blank'>Feedback</a> zum Tool.",
        "fr": "Donnez-nous votre <a href='https://ec.europa.eu/eusurvey/runner/AMR_dataviz_2019' target='_blank'>avis</a> sur cet outil."
    },
    "__antibiotics_title__": {
        "en": "Unsure of any classes of antibiotics?",
        "it": "Dubbi su una classe di antibiotici?",
        "de": "Fragen zu Antibiotika-Klassen?",
        "fr": "Indécis sur la famille d’antibiotiques?"
    },
    "__tutorial_iframe__": {
        "en": "<iframe class='video' id='tutorial_video' src='https://www.youtube-nocookie.com/embed/ai3E1sJCmlA?rel=0&enablejsapi=1&modestbranding=1' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>",
        "it": "<iframe class='video' id='tutorial_video' src='https://www.youtube-nocookie.com/embed/ai3E1sJCmlA?rel=0&enablejsapi=1&modestbranding=1&cc_load_policy=1&cc_lang_pref=it' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>",
        "de": "<iframe class='video' id='tutorial_video' src='https://www.youtube-nocookie.com/embed/ai3E1sJCmlA?rel=0&enablejsapi=1&modestbranding=1&cc_load_policy=1&cc_lang_pref=de' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>",
        "fr": "<iframe class='video' id='tutorial_video' src='https://www.youtube-nocookie.com/embed/ai3E1sJCmlA?rel=0&enablejsapi=1&modestbranding=1&cc_load_policy=1&cc_lang_pref=fr' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
    },
    "__antibiotics_row1__": {
        "en": "Check below the list of antibiotics listed in the tool, which belong to the following classes:",
        "it": "Verificate in basso la lista degli antibiotici elencati nel programma, con relativa classe di appartenenza:",
        "de": "In der folgenden Liste finden Sie die im Tool aufgeführten Antibiotika sowie die Klassen, zu denen sie jeweils gehören:",
        "fr": "Consultez ci-dessous la liste d’antibiotiques repris dans l’outil et verifiez à quelle famille ils appartiennent:"
    },
    "__antibiotics_row2__": {
        "en": "<table style=\"width:100%;text-align: left;\">\n" +
            "                <tr>\n" +
            "                    <th>Antimicrobial</th>\n" +
            "                    <th>Class of antimicrobial</th>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Gentamicin</td>\n" +
            "                    <td>Aminoglycosides</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Chloramphenicol</td>\n" +
            "                    <td>Amphenicols</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Ampicillin</td>\n" +
            "                    <td>Penicillins</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Cefotaxim</td>\n" +
            "                    <td>Cephalosporins (3rd generation cephalosporins)</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Ceftazidim</td>\n" +
            "                    <td>Cephalosporins (3rd generation cephalosporins)</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Meropenem</td>\n" +
            "                    <td>Carbapenems</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Tigecycline</td>\n" +
            "                    <td>Glycylcyclines (derived from tetracycline)</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Ciprofloxacin</td>\n" +
            "                    <td>Fluoroquinolones (subgroup of Quinolones)</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Nalidixic acid</td>\n" +
            "                    <td>Quinolones</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Colistin</td>\n" +
            "                    <td>Polymyxins</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Sulfamethoxazole</td>\n" +
            "                    <td>Sulfonamides</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Trimethoprim</td>\n" +
            "                    <td>Sulfonamides and folic acid inhibitors</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Tetracycline</td>\n" +
            "                    <td>Tetracyclines</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Streptomycin</td>\n" +
            "                    <td>Aminoglycosides</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Erythromycin</td>\n" +
            "                    <td>Macrolides</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Azithromycin</td>\n" +
            "                    <td>Macrolides</td>\n" +
            "                </tr>\n" +
            "            </table>",
        "it": "<table style=\"width:100%;text-align: left;\">\n" +
            "                <tr>\n" +
            "                    <th>Antimicrobico</th>\n" +
            "                    <th>Classe di antimicrobici</th>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Gentamicina</td>\n" +
            "                    <td>Aminoglicosidi</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Cloramfenicolo</td>\n" +
            "                    <td>Amfenicoli</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Ampicillina</td>\n" +
            "                    <td>Penicilline </td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Cefotaxima</td>\n" +
            "                    <td>Cefalosporine (cefalosporine di terza generazione)</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Ceftazidima</td>\n" +
            "                    <td>Cefalosporine (cefalosporine di terza generazione)</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Meropenem</td>\n" +
            "                    <td>Carbapenemi</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Tigeciclina</td>\n" +
            "                    <td>Glicilcline (derivati della tetraciclina)</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Ciprofloxacina</td>\n" +
            "                    <td>Fluorochinoloni (sottogruppo dei chinoloni)</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Acido nalidixico</td>\n" +
            "                    <td>Chinoloni</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Colistina</td>\n" +
            "                    <td>Polimixine</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Sulfametossazolo</td>\n" +
            "                    <td>Sulfamidici</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Trimetoprim</td>\n" +
            "                    <td>Sulfamidici e inibitori dell'acido folico</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Tetraciclina</td>\n" +
            "                    <td>Tetracicline</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Streptomicina</td>\n" +
            "                    <td>Aminoglicosidi</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Eritromicina</td>\n" +
            "                    <td>Macrolidi</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Azitromicina</td>\n" +
            "                    <td>Macrolidi</td>\n" +
            "                </tr>\n" +
            "            </table>",
        "de": "<table style=\"width:100%;text-align: left;\">\n" +
            "                <tr>\n" +
            "                    <th>Antimikrobieller Wirkstoff</th>\n" +
            "                    <th>Antibiotika-Klasse</th>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Gentamicin</td>\n" +
            "                    <td>Aminoglykoside</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Chloramphenicol</td>\n" +
            "                    <td>Amphenicole</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Ampicillin</td>\n" +
            "                    <td>Penicilline</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Cefotaxim</td>\n" +
            "                    <td>Cephalosporine (der 3. Generation)</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Ceftazidim</td>\n" +
            "                    <td>Cephalosporine (der 3. Generation)</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Meropenem</td>\n" +
            "                    <td>Carbapeneme</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Tigecyclin</td>\n" +
            "                    <td>Glycylcycline (Tetracyclin-Derivate)</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Ciprofloxacin</td>\n" +
            "                    <td>Fluorchinolone (Untergruppe der Chinolone)</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Nalidixinsäure</td>\n" +
            "                    <td>Chinolone</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Colistin</td>\n" +
            "                    <td>Polymyxine</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Sulfamethoxazol</td>\n" +
            "                    <td>Sulfonamide</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Trimethoprim</td>\n" +
            "                    <td>Sulfonamide und Folsäure-Antagonisten</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Tetracyclin</td>\n" +
            "                    <td>Tetracycline</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Streptomycin</td>\n" +
            "                    <td>Aminoglykoside</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Erythromycin</td>\n" +
            "                    <td>Makrolide</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Azithromycin</td>\n" +
            "                    <td>Makrolide</td>\n" +
            "                </tr>\n" +
            "            </table>",
        "fr": "<table style=\"width:100%;text-align: left;\">\n" +
            "                <tr>\n" +
            "                    <th>Antimicrobien</th>\n" +
            "                    <th>Classe d'antimicrobien</th>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Gentamicine</td>\n" +
            "                    <td>Aminosides</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Chloramphénicol</td>\n" +
            "                    <td>Phénicolés</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Ampicilline</td>\n" +
            "                    <td>Pénicillines </td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Céfotaxime</td>\n" +
            "                    <td>Céphalosporines de 3ème génération</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Ceftazidime</td>\n" +
            "                    <td>Céphalosporines de 3ème génération</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Méropénème</td>\n" +
            "                    <td>Carbapénèmes</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Tigécycline</td>\n" +
            "                    <td>Glycylcyclines (dérivés  des tétracyclines)</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Ciprofloxacine</td>\n" +
            "                    <td>Fluoroquinolones (sous-groupe des quinolones)</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Acide nalidixique</td>\n" +
            "                    <td>Quinolones</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Colistine</td>\n" +
            "                    <td>Polymyxines</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Sulfaméthoxazole</td>\n" +
            "                    <td>Sulfamides</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Triméthoprime</td>\n" +
            "                    <td>Sulfamides et diaminopyrimidines</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Tétracycline</td>\n" +
            "                    <td>Tétracyclines</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Streptomycine</td>\n" +
            "                    <td>Aminosides</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Érythromycine </td>\n" +
            "                    <td>Macrolides</td>\n" +
            "                </tr>\n" +
            "                <tr>\n" +
            "                    <td>Azithromycine</td>\n" +
            "                    <td>Macrolides</td>\n" +
            "                </tr>\n" +
            "            </table>"
    }
};

$(function () {

    var translate = function (lang) {
        /** Translate our texts here */
        $.each(LABELS, function (label, translations) {
            if (translations[lang]) {
                $('#' + label).html(
                    translations[lang]
                );
            }
        });

        var trigger;
        if ((trigger = $('.language-trigger'))) {
            trigger.css('background-image', "url('img/lang-" + lang + ".png')")
        }
    };

    var extractGet = window.extractGet = function (parameter) {
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
    var extractLanguage = window.extractLanguage = function (searchLanguage, surrounding) {
        searchLanguage = searchLanguage || "";
        surrounding = surrounding || "";

        for (var i = 0; i < LANGUAGES.length; i++) {
            var language = LANGUAGES[i];
            if (searchLanguage.indexOf(surrounding + language + surrounding) > -1) {
                return language;
            }
        }

        return null;
    };

    /**
     * Search for language on various sources
     * @returns {*}
     */
    var getLanguage = function () {
        var language;

        var fromUser = extractLanguage(navigator.language || navigator.userLanguage);
        var fromUrl = extractLanguage(window.location.href, "/");
        var fromGet = extractLanguage(extractGet('lang'));

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
