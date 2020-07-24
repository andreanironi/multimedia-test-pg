/* global d3, _ */

/**
 * 
 * Quantitas 2016, updated 02.2018
 * 
 * EFSA Data Visualization
 *
 * Main js file
 * 
 *
 */

/**
 * When ready, do all
 */
$(document).ready(function () { 
    
    var LANGUAGES = ['en', 'it', 'de', 'fr'];
    var dataChangingTransition = false; // true when dataviz is strongly updating (data change, i.e. change of bacteria, species, antimicrobial)
    var macroareasAreMoving = false; // true when external arcs are moving
    var comparisonView = false; // true if watching pigs&calves
    var COMPARISON_VIEW_1A = 1; // the index of the first species in the first comparison
    var COMPARISON_VIEW_1B = 3; // the index of the second species in the first comparison
    var COMPARISON_VIEW_2A = 4; // the index of the first species in the first comparison
    var COMPARISON_VIEW_2B = 5; // the index of the second species in the second comparison
    var COMPARISON_VIEW_1_MENU_INDEX = 4; // index of first comparison voice
    var COMPARISON_VIEW_2_MENU_INDEX = 7; // index of second comparison voice
    var comparisonViewA = -1; // index of first species in comparison
    var comparisonViewB = -1; // index of second species in comparison
    var svg = null, gnations = null, gnationsText = null, centralGroup = null, centralGroupText = null, bacteriaGroup = null, bacteriaGroupContainer = null, bacteriaGroupContainerClone = null; // svg elements (containers)
    var centralTextLinesTop = null, centralTextLinesBottom = null; // svg elements (containers)
    var datavizStarted = false; // true when the user clicks on a home page bacteria
    var startingSelection = -1; // the id of the bacteria clicked at the beginning
    var ECDC_LINK = "https://ecdc.europa.eu/";
    var EFSA_LINK = "https://www.efsa.europa.eu";
    var MAX_NATION_RADIUS = 20; // maximum allowed nation radius for normal view
    var MAX_NATION_RADIUS_CMP = 45; // maximum allowed nation radius for comparison view
    var MAX_NATION_RADIUS_INV = 30; // maximum allowed nation radius for inv view
    var RADIUS_HOVER_PLUS = 60; // maximum allowed nation radius when hovering
    var RADIUS_NATIONS = 320; // radius of the nations orbit
    var RADIUS_NATIONS_CMP = 335; // radius of the external nations orbit when comparing
    var RADIUS_NATIONS_CMP_INTERNAL = 220; // radius of the internal nations orbit when comparing
    var CENTRAL_COMPARISON_BAR_LENGTH = 200; // length of the two central bars when comparing pigs and calves
    var MENU_ITEM_HEIGHT = 40; // height of the menu items
    var MINIBARS = 30; // number of bars into the comparison view (central area)
    var width = 950 // svg's width
            , height = 940 // svg's height
            , radius_glass = 220 // radius of the initial intro circle
            , radius_center = 120 // radius of the internal area
            , radius_nations = RADIUS_NATIONS // radius of nations orbit
            , radius_macronations = 400 // radius of macro-area arcs
            , stroke_glass = 10 // general stroke width
            , max_nation_radius = MAX_NATION_RADIUS // the maximum radius of a nation (min_nation_size excluded)
            , min_nation_size = 15 // the minimum radius of a nation
            , radius_hover_plus = RADIUS_HOVER_PLUS // the radius of a hovered nation
            ;
    var theme_color = "#333";
    var theme_green_light = "#bad405", theme_green_dark = "#0099ab";
    var theme_gray = "#e8ebed";
    var nations_circle_color = theme_gray; // color of the green-big-internal circle
    var max_nation, nation_radius_ratio; // computed at every selection
    var FULL_CIRCLE = Math.PI * 2; // utils
    var FREE_SPACE = .47; // free space on top of the circle
    var central_selector_radius = 22; // unused in this version
    var countries = null; // array of countries
    var antimicrobials = null; // array of antimicrobials
    var bacteria = null; // array of bacteria
    var species = null; // array of species
    var selectedLev2 = 0; // the currently selected antimicrobial/country
    var selectedBact = 0; // the currently selected bacteria
    var selectedSpecies = 0; // the currently selected species
    var menu_selectedSpecies = 0; // the currently selected species menu item
    var SWITCH_BUTTON_TEXT = "All antimicrobials"; // switch button text for normal view
    var SWITCH_BUTTON_TEXT_REVERSE = "All countries"; // switch button text for reverse view
    var DATA_NOT_AVAILABLE = "DATA NOT REPORTED"; // data not available message
    var SWITCH_DEFAULT_COUNTRY = "European Union"; // the country to show on switch button click
    var SWITCH_DEFAULT_ANTIMICROBIAL = "Ampicillin"; // the country to show on switch button click (from reverse view)
    var keys = ["E", "S", "W", "N"]; // macro area keys
    var macronationsNames = ["EASTERN EUROPE", "SOUTHERN EUROPE", "WESTERN EUROPE", "NORTHERN EUROPE"]; // macro area names
    var macroareasSize = {"E": 0, "S": 0, "W": 0, "N": 0}; // number of elements into each area
    var FROM = 0, TO = 0; // when a macro area view is selected, use data only from FROM to TO
    var isChrome = navigator.userAgent.indexOf("hrome") > 1; // check if chrome
    var isOldChrome = false;
    if (isChrome) {
        var ch1 = navigator.userAgent.indexOf("hrome")+6;
        var ch2 = navigator.userAgent.indexOf(".", ch1);
        var chromeVersion = Number(navigator.userAgent.substring(ch1, ch2));
        if (chromeVersion < 53) {
            isOldChrome = true;
        }
    }
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent); // check if safari
    var isIE = navigator.userAgent.indexOf("Trident") > 0;
    var isLittleScreen = $(window).outerWidth() < 700;
    var odata = null; // the original data
    var data = []; // the data
    var clicked, hovered, clickedName; // the index of the clicked bubble, of the hovered bubble and the name of the clicked bubble
    var LEFT = -1; // const
    var RIGHT = 1; // const
    var BACTERIA = 1; // const
    var COUNTRIES = 0; // const
    var focusOn = BACTERIA; // BACTERIA if showing nations on the external circle, COUNTRIES otherwise
    var clickedMacronation = null; // valorized when a macro area is clicked
    var oclickedMacronation = null; // clicked macronation before eventual switch
    var dictionary = null; // dictionary for lang translation 2017.06.30
    var dims_dictionary = null; // adaptive text size
    var palette_custom = function (value) { // palette text colors
        if (value < 0.1) {
            return "#d3ecfb";
        } else if (value < 1) {
            return "#aedef8";
        } else if (value < 10) {
            return "#71caf3";
        } else if (value < 20) {
            return "#04baee";
        } else if (value < 50) {
            return "#00abe8";
        } else if (value < 70) {
            return "#0099df";
        } else {
            return "#0069b3";
        }
    };
    var palette_text = function (value) { // palette text
        if (value < 0.1) {
            return "#0069b3";
        } else if (value < 1) {
            return "#0069b3";
        } else if (value < 10) {
            return "#0069b3";
        } else if (value < 20) {
            return "#ffffff";
        } else if (value < 50) {
            return "#ffffff";
        } else if (value < 70) {
            return "#ffffff";
        } else {
            return "#ffffff";
        }
    };


    /**
     * Read data from external json
     * @param {boolean} isFirst true if it's the first call
     * @param {function} callback the function to call at the end
     */
    function readData(isFirst, callback) {
        var url = focusOn === BACTERIA ? "data/data-countries.json" : "data/data-bacteria.json";
        $.ajax({
            "url": url,
            "method": "GET",
			"dataType": "json",
            "success": function (res) {
                antimicrobials = res.antimicrobials;
                countries = res.countries;
                bacteria = res.bacteria;
                species = res.species;
                odata = res.data;
                if (isFirst) {
                    initSVG(); // initialize environment
                }
                FROM = 0; // read all data, from 0...
                TO = odata.length; // ... to len-1
                if (isFirst) {
                    selectedLev2 = _.size(antimicrobials)-1;
                }
                refresh(false);
                if (isFirst) {
                    init(data); // initialize components
                }
                callback();
            }
        });
    }
    
    /**
     * Load i18n file
     * @param {string} lang the language
     * @param {function} callback the callback function
     */
    function load_i18n(lang, callback) {
        $.ajax({
            "url": "i18n/"+lang+".json",
            "method": "GET",
			"dataType": "json",
            "success": function (res) {
                loadTextsDims(res, callback);
            }
        });
    }
    
    /**
     * Load adaptive text size
     * @param {string} res the loaded file
     * @param {function} callback the callback function
     */
    function loadTextsDims(res, callback) {
        $.ajax({
            "url": "i18n/_dims.json",
            "method": "GET",
			"dataType": "json",
            "success": function (_dims) {
                dims_dictionary = _dims;
                callback(res);
            }
        });
    }
    
    var extractURLLanguage = function(searchLanguage, surrounding) {
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
    
    // first call
    var DEFAULT_LANG = LANGUAGES[0]; // default language is english
    var lang = null;
    var browserLang = extractBrowserLanguage(navigator.language); // see browser's language
    lang = browserLang ? browserLang : DEFAULT_LANG; // if browser's language is set, take it, elsewhere consider default
    var urlLang = extractURLLanguage(window.location.href, "/");
    lang = urlLang ? urlLang : lang;
    var getSearch = window.location.search; // see url params
    var getLang = null;
    if (getSearch !== "") {
        getLang = getSearch.split("=")[1];
        if (getLang) { // if language is set on url, overwrite previous choice
            lang = getLang;
        }
    }   
    load_i18n(lang, function (i18n) {
        dictionary = i18n;
        immediateLangAssign(dictionary);
        readData(true, function () {});
    });
    // end of first call
    
    /**
     * Extract browser's language
     * @param {string} browserLanguage the browser's language code
     * @returns {string} the language code
     */
    function extractBrowserLanguage(browserLanguage) {
        if (browserLanguage.indexOf("it") > -1) return "it";
        if (browserLanguage.indexOf("en") > -1) return "en";
        if (browserLanguage.indexOf("fr") > -1) return "fr";
        if (browserLanguage.indexOf("de") > -1) return "de";
        return null;
    }
    
    /**
     * Assign translation to global variables
     * @param {json} dictionary the dictionary
     */
    function immediateLangAssign(dictionary) {
        macronationsNames = [dictionary.macroregions.eastern_europe, dictionary.macroregions.southern_europe, dictionary.macroregions.western_europe, dictionary.macroregions.northern_europe]; // macro area names
        SWITCH_BUTTON_TEXT = dictionary.other_labels.all_antimicrobials; // switch button text for normal view
        SWITCH_BUTTON_TEXT_REVERSE = dictionary.other_labels.all_countries; // switch button text for reverse view
        DATA_NOT_AVAILABLE = dictionary.other_labels.data_not_available; // data not available message
        SWITCH_DEFAULT_COUNTRY = dictionary.other_labels.default_country; // the country to show on switch button click
        SWITCH_DEFAULT_ANTIMICROBIAL = dictionary.other_labels.default_antimicrobial; // the country to show on switch button click (from reverse view)
    }
    
    /**
     * Listen to translate
     * @param {event} e the event
     * @param {string} lang the language code
     */
    $(document).on("translate", function(e, lang) {
        translate(lang);
    });
    
    /**
     * Tranlate all the text
     * @param {string} newLang the new dictionary
     */
    function translate(newLang) {
        if (true || isIE || isSafari) { // patch 2017.07.25
            var url = window.location.href;
            url = url.replace(window.location.search, "");
            window.location = url+"?lang="+newLang;
            return ;
        }  
        if (clicked) {
            var bk = clicked;
            $($(".gooey-nationed")[clicked]).d3Trigger("click");
            $($(".gooey-nationed")[bk]).d3Trigger("mouseout");
            clicked = null;
            setTimeout(function() {
                $($(".gooey-nationed")[bk]).d3Trigger("click");
            }, 1500);
        }
        load_i18n(newLang, function(new_i18n) {
            $("textPath").each(function(index, item) {
                var text = $(item).html();
                if (text !== "") {
                    for (var i in dictionary) {
                        var lev0 = dictionary[i];
                        for (var j in lev0) {
                            var lev1 = lev0[j];
                            if (typeof lev1 === "string") {
                                if (lev1.toLowerCase() === text.toLowerCase()) {
                                    var newText = new_i18n[i][j];
                                    if (text === text.toUpperCase()) {
                                        newText = newText.toUpperCase();
                                    }
                                    $(item).html(newText);
                                }
                            } else {
                                for (var k in lev1) {
                                    var lev2 = lev1[k];
                                    if (lev2 === text) { // was .toLowerCase()
                                        var newText = new_i18n[i][j][k];
                                        if (text === text.toUpperCase()) {
                                            newText = newText.toUpperCase();
                                        }
                                        $(item).html(newText);
                                    }
                                }
                            }
                        }
                    }
                }
            });
            dictionary = new_i18n;
            immediateLangAssign(dictionary);
            lang = newLang;
            // particular case
            var sentence = "";
            sentence = dictionary.home.text_part_1 + "<tspan style='font-style:italic'>"+dictionary.home.text_part_2+"</tspan> "+dictionary.home.text_part_3+"<tspan style='font-style:italic'>"+dictionary.home.text_part_4+"</tspan>";
            $("#intro-text-0").html(sentence);
            // adapt text size
            d3.selectAll(".intro-title").transition().duration(500).attr("font-size", dims_dictionary.home.title[lang]);
            d3.selectAll(".intro-text-content").transition().duration(500).attr("font-size", dims_dictionary.home.text[lang]);
            d3.select("#switch-button-text").transition().duration(500).attr("font-size", dims_dictionary.other_labels.switch_button[lang]);
            d3.select("#central-text-5b").attr("font-size", dims_dictionary.other_labels.switch_comparison_button[lang]);
        });
    }

    /**
     * Change data source indicator from bacteria based to nations based or vice-versa
     * Hides the central circle if needed
     * Calls the procedure to read data
     */
    function switchData() {
        focusOn = 1 - focusOn;
        $("#central-text-5b").html(focusOn === BACTERIA ? dictionary.other_labels.compare_antimicrobials : dictionary.other_labels.compare_countries);
        d3.selectAll(".macronation-all").style("display", function() {
            return focusOn === BACTERIA ? "block" : "none";
        });
        d3.selectAll(".macronation-all-text").style("display", function() {
            return focusOn === BACTERIA ? "block" : "none";
        });
        setMaxRadius();
        hideCentralCircle();
        clicked = null;
        clickedMacronation = null;
        hovered = null;
        readData(false, function () {
            if (focusOn === COUNTRIES) {
                FROM = 0;
                TO = _.size(antimicrobials);
                _.each(countries, function (item, index) {
                    if (item.toLowerCase() === clickedName.toLowerCase()) {
                        selectedLev2 = index;
                    }
                });
                if (selectedLev2 > _.size(countries) - 1) {
                    selectedLev2 = _.size(countries) - 1;
                }
            } else {
                FROM = 0;
                TO = _.size(countries);
                _.each(antimicrobials, function (item, index) {
                    if (item.toLowerCase() === clickedName.toLowerCase()) {
                        selectedLev2 = index;
                    }
                });
                if (selectedLev2 > _.size(antimicrobials) - 1) {
                    selectedLev2 = _.size(antimicrobials) - 1;
                }
            }
            refresh(false);
            setSelectedLev2(false, null);
            setupSelection();
            d3.select("#central-text").attr("opacity", 1);
            d3.select("#central-text-pre").attr("opacity", 1);
            d3.select("#central-text-post").attr("opacity", 1);
            initializeNationTexts();
            window.setTimeout(function () {
                initializeExternalMacroareas();
                d3.selectAll(".macronations-line").attr("opacity", 1);
                d3.selectAll(".macronations-line-text").attr("opacity", 1);
                doTopMenus();
                setSwitchButton();
                updateNationsPercentage();
            }, 500);
        });
    }

    /**
     * Initializes the environment
     */
    function initSVG() {
        // bind the svg to a variable
        svg = d3.select("#bacteria-div");
        // append defs attribute to svg
        var defs = svg.append("defs");
        // prepare some filters and clip
        var filter;
        filter = defs.append("filter").attr("id", "filterGlass");
        filter.append("feGaussianBlur").attr("in", "SourceGraphic").attr("stdDeviation", 12).attr("color-interpolation-filters", "sRGB").attr("result", "blur");
        filter.append("feColorMatrix").attr("in", "blur").attr("mode", "matrix").attr("values", "1 0 0 0 0  0 1 0 0.05 0  0 0 1 0.1 0  0 0 0 18 -7").attr("result", "gooey");
        filter = defs.append("filter").attr("id", "filterS2");
        filter.append("feGaussianBlur").attr("in", "SourceGraphic").attr("stdDeviation", 8).attr("color-interpolation-filters", "sRGB").attr("result", "blur").attr("id", "blurf");
        filter.append("feColorMatrix").attr("in", "blur").attr("mode", "matrix").attr("values", getFilterValues(20)).attr("result", "gooey");
        defs.append("clipPath").attr("id", "clipper").append("circle").attr("cx", width / 2).attr("cy", height / 2).attr("r", radius_glass - stroke_glass);
        defs.append("clipPath").attr("id", "clipper2").append("circle").attr("cx", width / 2).attr("cy", height / 2).attr("r", radius_center + 5);
        defs.append("clipPath").attr("id", "clipper3").append("circle").attr("cx", width / 2).attr("cy", height / 2).attr("r", 165);
        defs.append("clipPath").attr("id", "clipper4").append("rect").attr("x",175).attr("y",330).attr("width",600).attr("height",437);
    }

    /**
     * Util function to centralize the values param of a filter
     * @param {int} param matrix changing value
     * @returns {String} the values of the matrix
     */
    function getFilterValues(param) {
        return "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 " + param + " -5";
    }

    /**
     * Set the selected antimicrobial
     * @param {boolean} fromCentralArrows true if the click is performed by using the central arrows
     * @param {int} dir the direction
     */
    function setSelectedLev2(fromCentralArrows, dir) {
        if (dataIsChanging()) {
            return false;
        }
        var pxdir = !dir ? 0 : dir === RIGHT ? -300 : +300;
        d3.select("#central-text").transition().duration(100).attr("x", width / 2 + pxdir);
        d3.select("#central-text-pre").transition().duration(100).attr("x", width / 2 + pxdir);
        d3.select("#central-text-post").transition().duration(100).attr("x", width / 2 + pxdir);
        window.setTimeout(function () {
            var name = "";
            switch (focusOn) {
                case BACTERIA:
                    name = dictionary.generic.antimicrobials[antimicrobials[selectedLev2].trim()];
                    break;
                case COUNTRIES:
                    name = dictionary.generic.countries[countries[selectedLev2]];
                    break;
            }
            var p1 = name.indexOf(" ");
            var p2 = name.indexOf(" ", p1+1);
            if (p1 > 0 && p2 > 0) { // name composed by multiple names
                var subname1 = name.substring(0, p1);
                d3.select("#central-text-pre").text(subname1.capitalizeFirstLetter());
                var subname2 = name.substring(p1 + 1, name.length);
                p1 = subname2.indexOf(" "); // try again to split the string
                if (p1 > 0) { // name composed by multiple names
                    var subname1 = subname2.substring(0, p1);
                    d3.select("#central-text").text(subname1.capitalizeFirstLetter());
                    var subname2 = subname2.substring(p1 + 1, subname2.length);
                    d3.select("#central-text-post").text(subname2.capitalizeFirstLetter());
                } else { // unique name
                    d3.select("#central-text").text(subname2.capitalizeFirstLetter());
                    d3.select("#central-text-post").text("");
                }
                
                // These two lines:
                // centralTextLinesTop.attr("transform", "translate(0, -15px)");
                // centralTextLinesBottom.attr("transform", "translate(0, 15px)");
                // don't work in IE. No way out, need to explode all the stuff on the lines below:
                d3.selectAll("#central-text-lines-top line").each(function(d) {
                    if (!d3.select(this).attr("position")) {
                        d3.select(this).attr("position", "low");
                    }
                    if (d3.select(this).attr("position") && d3.select(this).attr("position") !== "high") {
                        d3.select(this).attr("y1", (Number(d3.select(this).attr("y1"))-15));
                        d3.select(this).attr("y2", (Number(d3.select(this).attr("y2"))-15));
                    }
                    d3.select(this).attr("position", "high");
                });
                d3.selectAll("#central-text-lines-top circle").each(function(d) {
                    if (!d3.select(this).attr("position")) {
                        d3.select(this).attr("position", "low");
                    }
                    if (d3.select(this).attr("position") && d3.select(this).attr("position") !== "high") {
                        d3.select(this).attr("cy", (Number(d3.select(this).attr("cy"))-15));
                    }
                    d3.select(this).attr("position", "high");
                });
                d3.selectAll("#central-text-lines-bottom line").each(function(d) {
                    if (!d3.select(this).attr("position")) {
                        d3.select(this).attr("position", "low");
                    }
                    if (d3.select(this).attr("position") && d3.select(this).attr("position") !== "high") {
                        d3.select(this).attr("y1", (Number(d3.select(this).attr("y1"))+15));
                        d3.select(this).attr("y2", (Number(d3.select(this).attr("y2"))+15));
                    }
                    d3.select(this).attr("position", "high");
                });
                d3.selectAll("#central-text-lines-bottom circle").each(function(d) {
                    if (!d3.select(this).attr("position")) {
                        d3.select(this).attr("position", "low");
                    }
                    if (d3.select(this).attr("position") && d3.select(this).attr("position") !== "high") {
                        d3.select(this).attr("cy", (Number(d3.select(this).attr("cy"))+15));
                    }
                    d3.select(this).attr("position", "high");
                });
                // end of all the IE-friendly-stuff
                
            } else { // unique name
                d3.select("#central-text-pre").text("");
                d3.select("#central-text").text(name.capitalizeFirstLetter());
                d3.select("#central-text-post").text("");
                
                // These two lines:
                // centralTextLinesTop.attr("transform", "translate(0, 0)");
                // centralTextLinesBottom.attr("transform", "translate(0, 0)");
                // don't work in IE. No way out, need to explode all the stuff on the lines below:
                d3.selectAll("#central-text-lines-top line").each(function(d) {
                    if (d3.select(this).attr("position") && d3.select(this).attr("position") !== "low") {
                        d3.select(this).attr("y1", (Number(d3.select(this).attr("y1"))+15));
                        d3.select(this).attr("y2", (Number(d3.select(this).attr("y2"))+15));
                    }
                    d3.select(this).attr("position", "low");
                });
                d3.selectAll("#central-text-lines-top circle").each(function(d) {
                    if (d3.select(this).attr("position") && d3.select(this).attr("position") !== "low") {
                        d3.select(this).attr("cy", (Number(d3.select(this).attr("cy"))+15));
                    }
                    d3.select(this).attr("position", "low");
                });
                d3.selectAll("#central-text-lines-bottom line").each(function(d) {
                    if (d3.select(this).attr("position") && d3.select(this).attr("position") !== "low") {
                        d3.select(this).attr("y1", (Number(d3.select(this).attr("y1"))-15));
                        d3.select(this).attr("y2", (Number(d3.select(this).attr("y2"))-15));
                    }
                    d3.select(this).attr("position", "low");
                });
                d3.selectAll("#central-text-lines-bottom circle").each(function(d) {
                    if (d3.select(this).attr("position") && d3.select(this).attr("position") !== "low") {
                        d3.select(this).attr("cy", (Number(d3.select(this).attr("cy"))-15));
                    }
                    d3.select(this).attr("position", "low");
                });
                // end of all the IE-friendly-stuff
                
            }
            if (fromCentralArrows) { // trigger event on central circular selectors
                switch (focusOn) {
                    case BACTERIA:
                        $("#circular-selector-" + selectedLev2).d3Trigger("click");
                    case COUNTRIES:
                        $("#circular-selector-" + selectedLev2).d3Trigger("click");
                }
            }
            d3.select("#central-text").attr("x", width / 2 - pxdir);
            d3.select("#central-text-pre").attr("x", width / 2 - pxdir);
            d3.select("#central-text-post").attr("x", width / 2 - pxdir);
            window.setTimeout(function () {
                d3.select("#central-text").transition().duration(200).attr("x", width / 2);
                d3.select("#central-text-pre").transition().duration(200).attr("x", width / 2);
                d3.select("#central-text-post").transition().duration(200).attr("x", width / 2);
            }, 100);
        }, 130);
        setupSelection();
        dataChange();
    }

    /**
     * Prepares the central background
     */
    function initializeCentralBackground() {
        svg.append("circle").attr("id", "nations-line")
                .attr("r", 0)
                .attr("fill", nations_circle_color)
                .attr("cx", width / 2)
                .attr("cy", height / 2);
        svg.append("circle").attr("id", "central-border").attr("fill", theme_green_light).attr("cx", width / 2).attr("cy", height / 2).attr("r", 0);
        svg.append("circle").attr("class", "comparison-circle-guide").attr("fill", "transparent").attr("stroke", "#f0f0f0").attr("stroke-width", 26).attr("cx", width / 2).attr("cy", height / 2).attr("r", RADIUS_NATIONS_CMP-11).attr("opacity", 0);
        svg.append("circle").attr("class", "comparison-circle-guide").attr("fill", "transparent").attr("stroke", "#e6e6e6").attr("stroke-width", 10).attr("cx", width / 2).attr("cy", height / 2).attr("r", RADIUS_NATIONS_CMP-11).attr("opacity", 0);
        svg.append("circle").attr("class", "comparison-circle-guide").attr("fill", "transparent").attr("stroke", "#f0f0f0").attr("stroke-width", 26).attr("cx", width / 2).attr("cy", height / 2).attr("r", RADIUS_NATIONS_CMP_INTERNAL).attr("opacity", 0);
        svg.append("circle").attr("class", "comparison-circle-guide").attr("fill", "transparent").attr("stroke", "#e6e6e6").attr("stroke-width", 10).attr("cx", width / 2).attr("cy", height / 2).attr("r", RADIUS_NATIONS_CMP_INTERNAL).attr("opacity", 0);
        svg.append("path").attr("id", "comparison-circle-guide-text-1").attr("class", "comparison-circle-guide").attr("d", "M"+(width/2-85)+" "+(height/2-RADIUS_NATIONS_CMP+20)+" C "+(width/2-30)+" "+(height/2-RADIUS_NATIONS_CMP+5)+", "+(width/2+30)+" "+(height/2-RADIUS_NATIONS_CMP+5)+", "+(width/2+85)+" "+(height/2-RADIUS_NATIONS_CMP+20)).attr("fill", "transparent");
        svg.append("text").attr("class", "comparison-circle-guide").attr("text-anchor", "middle").attr("fill",theme_green_dark).attr("font-size", "15px").attr("font-weight", "bold").attr("opacity", 0)
                        .append("textPath").attr("id", "comparison-circle-guide-text-1-text").attr("startOffset", "50%").attr("xlink:href", "#comparison-circle-guide-text-1");
        svg.append("path").attr("id", "comparison-circle-guide-text-2").attr("class", "comparison-circle-guide").attr("d", "M"+(width/2-90)+" "+(height/2-RADIUS_NATIONS_CMP_INTERNAL+15)+" C "+(width/2-60)+" "+(height/2-RADIUS_NATIONS_CMP_INTERNAL-5)+", "+(width/2+60)+" "+(height/2-RADIUS_NATIONS_CMP_INTERNAL-5)+", "+(width/2+90)+" "+(height/2-RADIUS_NATIONS_CMP_INTERNAL+15)).attr("fill", "transparent");
        svg.append("text").attr("class", "comparison-circle-guide").attr("text-anchor", "middle").attr("fill", theme_green_dark).attr("font-size", "15px").attr("font-weight", "bold").attr("opacity", 0)
                        .append("textPath").attr("id", "comparison-circle-guide-text-2-text").attr("startOffset", "50%").attr("xlink:href", "#comparison-circle-guide-text-2");
        for (var i = 0; i < 15; i++) { // assume 15 is big enough
            svg.append("line").attr("class", "comparison-circle-guide comparison-circle-guide-line").attr("stroke", theme_green_light).attr("stroke-dasharray", "5,8").attr("stroke-width", 2);
        }
    }

    /**
     * Prepares the central foreground
     */
    function initializeCentralForeground() {
        var t = svg.append("g");
        centralTextLinesTop = t.append("g").attr("id", "central-text-lines-top").attr("opacity", 0).style("display", "none");
        centralTextLinesBottom = t.append("g").attr("id", "central-text-lines-bottom").attr("opacity", 0).style("display", "none");
        centralTextLinesTop.append("line").attr("x1", width/2-radius_center*.9).attr("y1", height/2-20).attr("x2", width/2+radius_center*.9).attr("y2", height/2-20).attr("stroke", "#fff").attr("stroke-width", 1.5);
        
        centralTextLinesTop.append("circle").attr("cx", width/2).attr("cy", height/2-20).attr("r", 4).attr("fill", "#fff");
        centralTextLinesTop.append("line").attr("class", "central-text-lines-top-arrow-component").attr("x1", width/2-2).attr("y1", height/2-43).attr("x2", width/2+8).attr("y2", height/2-33).attr("stroke", "#fff").attr("stroke-width", "6px").attr("pointer-events", "none");
        centralTextLinesTop.append("line").attr("class", "central-text-lines-top-arrow-component").attr("x1", width/2+2).attr("y1", height/2-43).attr("x2", width/2-8).attr("y2", height/2-33).attr("stroke", "#fff").attr("stroke-width", "6px").attr("pointer-events", "none");
        centralTextLinesTop.append("rect").attr("x", width/2-20).attr("y", height/2-70).attr("width", 40).attr("height", 40).attr("fill", "transparent").attr("cursor", "pointer")
        .on("mouseover", function() {
            d3.selectAll(".central-text-lines-top-arrow-component").attr("stroke", "#ddd");
        })
        .on("mouseout", function() {
            d3.selectAll(".central-text-lines-top-arrow-component").attr("stroke", "#fff");
        })
        .on("click", function (d, i) {
            selectedLev2--;
            var arr = focusOn === BACTERIA ? antimicrobials : countries;
            if (selectedLev2 < 0) {
                selectedLev2 = _.size(arr) - 1;
            }
            setSelectedLev2(true, LEFT);
        });
        centralTextLinesBottom.append("line").attr("x1", width/2-radius_center*.9).attr("y1", height/2+25).attr("x2", width/2+radius_center*.9).attr("y2", height/2+25).attr("stroke", "#fff").attr("stroke-width", 1.5);
        centralTextLinesBottom.append("circle").attr("cx", width/2).attr("cy", height/2+25).attr("r", 4).attr("fill", "#fff");
        centralTextLinesBottom.append("line").attr("class", "central-text-lines-bottom-arrow-component").attr("x1", width/2-2).attr("y1", height/2+48).attr("x2", width/2+8).attr("y2", height/2+38).attr("stroke", "#fff").attr("stroke-width", "6px").attr("pointer-events", "none");
        centralTextLinesBottom.append("line").attr("class", "central-text-lines-bottom-arrow-component").attr("x1", width/2+2).attr("y1", height/2+48).attr("x2", width/2-8).attr("y2", height/2+38).attr("stroke", "#fff").attr("stroke-width", "6px").attr("pointer-events", "none");
        centralTextLinesBottom.append("rect").attr("x", width/2-20).attr("y", height/2+35).attr("width", 40).attr("height", 40).attr("fill", "transparent").attr("cursor", "pointer")
        .on("mouseover", function() {
            d3.selectAll(".central-text-lines-bottom-arrow-component").attr("stroke", "#ddd");
        })
        .on("mouseout", function() {
            d3.selectAll(".central-text-lines-bottom-arrow-component").attr("stroke", "#fff");
        })
        .on("click", function (d, i) {
            selectedLev2++;
            var arr = focusOn === BACTERIA ? antimicrobials : countries;
            if (selectedLev2 > _.size(arr) - 1) {
                selectedLev2 = 0;
            }
            setSelectedLev2(true, RIGHT);
        });
        t.append("text").attr("class", "central-text").attr("id", "central-text").attr("x", width / 2).attr("y", height / 2 + 10).attr("text-anchor", "middle").attr("font-size", "22px").text(dictionary.generic.antimicrobials[antimicrobials[selectedLev2].trim()].capitalizeFirstLetter()).attr("opacity", 0).attr("font-weight", "400").attr("fill", "#fff").attr("clip-path", "url(#clipper2)").style("display", "none");
        t.append("text").attr("class", "central-text").attr("id", "central-text-pre").attr("x", width / 2).attr("y", height / 2 - 10).attr("text-anchor", "middle").attr("font-size", "22px").text("").attr("opacity", 0).attr("font-weight", "400").attr("fill", "#fff").attr("clip-path", "url(#clipper2)").style("display", "none");
        t.append("text").attr("class", "central-text").attr("id", "central-text-post").attr("x", width / 2).attr("y", height / 2 + 30).attr("text-anchor", "middle").attr("font-size", "22px").text("").attr("opacity", 0).attr("font-weight", "400").attr("fill", "#fff").attr("clip-path", "url(#clipper2)").style("display", "none");
        
        centralGroup = bacteriaGroup.append("g").attr("text-anchor", "middle").attr("opacity", 0);
        centralGroup.append("circle").attr("id", "central").attr("cx", width / 2).attr("cy", height / 2).attr("r", 0).attr("fill", theme_green_dark).attr("stroke", theme_color).attr("stroke-width", 0);
        svg.append("circle").attr("id", "central-dotted").attr("cx", width / 2).attr("cy", height / 2).attr("r", 0).attr("fill", "transparent").attr("stroke", theme_green_light).attr("stroke-dasharray", "3,3").attr("stroke-width", "4");
        
        svg.append("path").attr("id", "central-dotted-arced").attr("fill", "transparent").attr("stroke", theme_green_light).attr("stroke-dasharray", "2,2").attr("stroke-width", "10");
        svg.append("rect").attr("id", "central-dotted-arced-mask").attr("x", width / 2 - 120).attr("width", 0).attr("y", height / 2 + 55).attr("height", 120).attr("fill", theme_green_dark).attr("opacity", 0);
        svg.append("rect").attr("id", "comparison-top-mask").attr("x", width/2-180).attr("width",360).attr("y", height/2-radius_center*2.2).attr("height", radius_center*1.8).attr("fill", theme_green_light).attr("rx", 110).attr("clip-path", "url(#clipper3)").style("display", "none");
        centralGroupText = svg.append("g");
        centralGroupText.attr("text-anchor", "middle").attr("opacity", 0).style("display", "none").attr("id", "central-group-text");
        centralGroupText.append("text").attr("id", "central-text-1").attr("x", width / 2).attr("y", height / 2 - (radius_nations - 145)).attr("fill", "white").attr("font-size", dims_dictionary.other_labels.central_area_name[lang]).attr("font-weight", "700").style("display", "none");//.style("text-transform", "capitalize");
        centralGroupText.append("text").attr("id", "central-text-2").attr("x", width / 2).attr("y", height / 2 - (radius_nations - 175)).attr("fill", "white").attr("font-size", dims_dictionary.other_labels.central_area_composite_text[lang]).attr("font-weight", "400").style("display", "none");
        centralGroupText.append("text").attr("id", "central-text-3").attr("x", width / 2).attr("y", height / 2 - (radius_nations - 195)).attr("fill", "white").attr("font-size", dims_dictionary.other_labels.central_area_composite_text[lang]).attr("font-weight", "400").style("display", "none");
        centralGroupText.append("text").attr("id", "central-text-4").attr("x", width / 2).attr("y", height / 2 - 40).attr("fill", "white").attr("font-size", "18px").style("display", "none"); // "resistance" text
        centralGroupText.append("text").attr("id", "central-text-6").attr("x", width / 2).attr("y", height / 2 + 110).attr("fill", "white").attr("font-size", "24px").attr("font-weight", "700").style("display", "none");
        centralGroupText.append("text").attr("id", "central-text-perc").attr("x", width / 2).attr("y", height / 2 + 45).attr("fill", "white").attr("font-size", "56px").attr("font-weight", "700").style("display", "none");
        centralGroupText.append("rect").attr("id", "central-text-5-rect").attr("x", width/2 - 120).attr("y", height/2 + 130).attr("width", 240).attr("height", 40).attr("fill", "#d0d0d0").style("cursor", "pointer").attr("rx", 7).attr("ry", 7).style("display", "none")
                .on("mouseover", function () {
                    d3.select(this).attr("fill", "#f0f0f0");
                })
                .on("mouseout", function () {
                    d3.select(this).attr("fill", "#d0d0d0");
                })
                .on("click", switchData);
        
        centralGroupText.append("text").attr("id", "central-text-5b").attr("x", width / 2).attr("y", height / 2 + 157).attr("fill", "#555").text(dictionary.other_labels.compare_antimicrobials).attr("font-size", dims_dictionary.other_labels.switch_comparison_button[lang]).attr("pointer-events", "none").style("display", "none");
        var cgtcmp = centralGroupText.append("g");
        cgtcmp.attr("id", "central-comparison-texts");
        
        var singleBarWidth = (CENTRAL_COMPARISON_BAR_LENGTH-MINIBARS-10)/MINIBARS;
        for (var i = 0; i < MINIBARS; i++) {
            cgtcmp.append("rect").attr("x", width/2-15-CENTRAL_COMPARISON_BAR_LENGTH/2 + i*(singleBarWidth+1)).attr("width", singleBarWidth).attr("y", height/2+01).attr("height", 17).attr("fill", "white").attr("opacity", .5);
            cgtcmp.append("rect").attr("x", width/2-15-CENTRAL_COMPARISON_BAR_LENGTH/2 + i*(singleBarWidth+1)).attr("width", singleBarWidth).attr("y", height/2+01).attr("height", 0).attr("fill", "white").attr("class", "central-comparison-bar-1-part");
            cgtcmp.append("rect").attr("x", width/2-15-CENTRAL_COMPARISON_BAR_LENGTH/2 + i*(singleBarWidth+1)).attr("width", singleBarWidth).attr("y", height/2+51).attr("height", 17).attr("fill", "white").attr("opacity", .5);
            cgtcmp.append("rect").attr("x", width/2-15-CENTRAL_COMPARISON_BAR_LENGTH/2 + i*(singleBarWidth+1)).attr("width", singleBarWidth).attr("y", height/2+51).attr("height", 0).attr("fill", "white").attr("class", "central-comparison-bar-2-part");
        }
        cgtcmp.append("text").attr("id", "comparison-text-bar-text-1").attr("x", width/2-CENTRAL_COMPARISON_BAR_LENGTH/2-10).attr("y", height/2-5).attr("fill", "white").attr("text-anchor", "start").attr("font-size", 17).text(dictionary.generic.species[comparisonView === COMPARISON_VIEW_1_MENU_INDEX ? "Broilers" : "Meat from broilers"]);
        cgtcmp.append("circle").attr("cx", width/2+CENTRAL_COMPARISON_BAR_LENGTH/2).attr("cy", height/2+10).attr("r", 23).attr("fill", "#00abe8");
        cgtcmp.append("text").attr("x", width/2+CENTRAL_COMPARISON_BAR_LENGTH/2-1).attr("y", height/2+16).attr("fill", "white").attr("text-anchor", "middle").attr("font-size", 20).attr("font-weight", "bold").text("60%").attr("id", "central-comparison-value-1");
        cgtcmp.append("text").attr("id", "comparison-text-bar-text-2").attr("x", width/2-CENTRAL_COMPARISON_BAR_LENGTH/2-10).attr("y", height/2+45).attr("fill", "white").attr("text-anchor", "start").attr("font-size", 17).text(dictionary.generic.species[comparisonView === COMPARISON_VIEW_1_MENU_INDEX ? "Fattening turkeys" : "Meat from turkeys"]);
        cgtcmp.append("circle").attr("cx", width/2+CENTRAL_COMPARISON_BAR_LENGTH/2).attr("cy", height/2+60).attr("r", 23).attr("fill", "#00abe8");
        cgtcmp.append("text").attr("x", width/2+CENTRAL_COMPARISON_BAR_LENGTH/2-1).attr("y", height/2+66).attr("fill", "white").attr("text-anchor", "middle").attr("font-size", 20).attr("font-weight", "bold").text("30%").attr("id", "central-comparison-value-2");
    }

    /**
     * Creates the external arcs (eastern europe, southern europe...)
     */
    function initializeExternalMacroareas() {

        if (clickedMacronation !== null) {
            return;
        }

        svg.selectAll("#macronations-line-text-zoomed").remove();
        svg.selectAll(".macronations-line").remove();
        svg.selectAll(".macronations-line-text").remove();
        svg.selectAll(".macronation-all").remove();
        svg.selectAll(".macronation-all-text").remove();
        svg.selectAll(".macronation-all-guide").remove();
        
        var arc = d3.arc().innerRadius(radius_macronations-3).outerRadius(radius_macronations-8).startAngle(.5).endAngle(5.83);
        svg.append("path").attr("class", "macronation-all-guide").attr("d", arc).attr("fill", "#f0f0f0").attr("transform", "translate("+width/2+", "+(height/2)+")").attr("opacity", 0);

        if (focusOn === BACTERIA) {

            macroareasSize["E"] = macroareasSize["S"] = macroareasSize["W"] = macroareasSize["N"] = 0;

            var xys = getXYSPositions(FREE_SPACE, radius_nations);
            var key = 0;
            var dividersPosition = [.5, 0, 0, 0, 0];
            _.each(xys, function (item, index) {
                if (item && xys[index - 1] && item.region !== keys[key]) {
                    macroareasSize[keys[key]]++;
                    dividersPosition[key + 1] = (item.radiant + xys[index - 1].radiant) / 2;
                    key++;
                } else {
                    macroareasSize[keys[key]]++;
                }
            });
            dividersPosition[4] = FULL_CIRCLE - .5;
            macroareasSize["E"]--;
            macroareasSize["S"] += macroareasSize["E"];
            macroareasSize["W"] += macroareasSize["S"];
            macroareasSize["N"] += macroareasSize["W"] + 1;
            
            
            for (var i = 0; i < 4; i++) { 
                var macronationsArcAll = d3.arc().innerRadius(radius_macronations).outerRadius(radius_macronations + 40)
                            .startAngle(dividersPosition[0] + .03 + .16*i).endAngle(dividersPosition[0] +.17 + .16*i);
                svg.append("path").attr("id", "macronation-all-"+i).attr("class", "macronation-all").attr("d", macronationsArcAll)
                        .attr("fill", theme_gray)
                        .style("display", "none")
                        .attr("cursor", "pointer")
                        .attr("transform", "translate(" + width / 2 + ", " + height / 2 + " )")
                        .on("mouseover", function (d, i) {
                            d3.select(this).attr("fill", "#f0f0f0");
                        })
                        .on("mouseout", function (d, i) {
                            d3.select(this).attr("fill", theme_gray);
                        });
                svg.append("text")
                        .attr("id", "macronation-all-text-"+i)
                        .attr("class", "macronation-all-text")
                        .attr("fill", "#888888")
                        .attr("text-anchor", "middle")
                        .attr("dy", 25)
                        .attr("font-size", "18px")
                        .attr("font-weight", 700)
                        .style("display", "none")
                        .attr("pointer-events", "none")
                        .append("textPath")
                        .attr("class", "textpath")
                        .attr("startOffset", "15%")
                        .attr("xlink:href", "#macronation-all-"+i)
                        .text("");
            }
            svg.selectAll(".macronation-all").on("click", function (d, i) {
                if (i === 0) { // back to all
                    clicked = null; hovered = null; hideCentralCircle();
                    switchareaZoom(d, oclickedMacronation, d3.select("#macronation2-"+oclickedMacronation), function() {
                        macroareaZoom(d, clickedMacronation, d3.select("#macronation2-"+clickedMacronation), function() {
                            updateNationsPercentage();
                        });
                    });
                } else {
                    clicked = null; hovered = null; hideCentralCircle();
                    var key = d3.select(this).attr("key");
                    var tkeys = [];
                    for (var k in keys) {
                        tkeys.push(dictionary.macroregions[keys[k].toLowerCase()]);
                    }
                    var j = tkeys.indexOf(key);
                    switchareaZoom(d, j, d3.select("#macronation2-"+j), function() {});
                }
            });
            for (var i = 0; i < 4; i++) {
                var macronationsArc = d3.arc().innerRadius(radius_macronations).outerRadius(radius_macronations + 45)
                        .startAngle(dividersPosition[i] + .03).endAngle(dividersPosition[i + 1] - .03);
                var macronationsArc2 = d3.arc().innerRadius(radius_macronations).outerRadius(radius_macronations + 8)
                        .startAngle(dividersPosition[i] + .03).endAngle(dividersPosition[i + 1] - .03);
                svg.append("path").attr("class", "macronations-line macronation-line-" + i).attr("d", macronationsArc)
                        .attr("id", "macronation2-" + i)
                        .attr("fill", theme_green_dark)
                        .attr("i", i)
                        .attr("opacity", 0)
                        .attr("startAngle", dividersPosition[i] + .03)
                        .attr("endAngle", dividersPosition[i + 1] - .03)
                        .attr("key", function () {
                            return keys[i];
                        })
                        .attr("cursor", "pointer")
                        .attr("transform", "translate(" + width / 2 + ", " + height / 2 + " )")
                        .on("mouseover", function (d, i) {
                            if (clickedMacronation === null) {
                                d3.select(this).attr("fill", theme_green_light);
                            }
                        })
                        .on("mouseout", function (d, i) {
                            if (clickedMacronation === null) {
                                d3.select(this).attr("fill", theme_green_dark);
                            }
                        });
                svg.append("path").attr("class", "macronations-line macronations-line-sec macronation-line-" + i).attr("d", macronationsArc2)
                        .attr("id", "macronation2b-" + i)
                        .attr("stroke", theme_green_light)
                        .attr("fill", theme_green_light)
                        .attr("i", i)
                        .attr("opacity", 0)
                        .attr("startAngle", dividersPosition[i] + .03)
                        .attr("endAngle", dividersPosition[i + 1] - .03)
                        .attr("key", function () {
                            return keys[i];
                        })
                        .attr("transform", "translate(" + width / 2 + ", " + height / 2 + " )");
                var perc = i === 0 || i === 3 ? "23%" : "74%";
                var dy   = i === 0 || i === 3 ?    27 : 32;
                svg.append("text")
                        .attr("class", "macronations-line-text macronation-line-text-" + i)
                        .attr("fill", "#ffffff")
                        .attr("text-anchor", "middle")
                        .attr("dy", dy)
                        .attr("ody", dy)
                        .attr("font-size", "18px")
                        .attr("font-weight", 700)
                        .attr("opacity", 0)
                        .attr("pointer-events", "none")
                        .attr("key", function () {
                            return keys[i];
                        })
                        .append("textPath")
                        .attr("class", "textpath")
                        .attr("startOffset", perc)
                        .attr("ostartOffset", perc)
                        .attr("xlink:href", "#macronation2-" + i)
                        .text(macronationsNames[i]);
            }
            d3.selectAll(".macronations-line")
                    .on("click", function (d) {
                        if (clickedMacronation === null) {
                            var i = parseInt(d3.select(this).attr("i"));
                            d3.select(this).attr("fill", theme_green_dark);
                            oclickedMacronation = i;
                            clicked = null; hovered = null; hideCentralCircle();
                            macroareaZoom(d, i, d3.select(this), function() {
                                updateNationsPercentage();
                            });
                        }
                    });
        }
    }

    /**
     * Creates the texts related to the external nation bubbles
     */
    function initializeNationTexts() {
        if (!gnations) {
            gnations = svg.append("g");
        }
        if (!gnationsText) {
            gnationsText = svg.append("g");
        }
        gnationsText.selectAll(".nation-text").remove();
        gnationsText.selectAll(".nation-text-cmp").remove();
        gnationsText.selectAll(".nation-text").data(data).enter().append("text").attr("class", "nation-text").attr("text-anchor", "middle").attr("x", width / 2).attr("y", height / 2).style("pointer-events", "none").attr("font-size", "14px").attr("font-weight", "bold").attr("opacity", 0)
            .text(function (d) {
                if (focusOn === COUNTRIES) {
                    return dictionary.generic.antimicrobials[d.code.trim()].capitalizeFirstLetter();
                }
                return d.code;
            });
        gnationsText.selectAll(".nation-text-cmp").data(data).enter().append("text").attr("class", "nation-text-cmp").attr("text-anchor", "middle").attr("x", width / 2).attr("y", height / 2).style("pointer-events", "none").attr("font-size", "14px").attr("font-weight", "bold").attr("opacity", 0)
            .text(function (d) {
                return d.code;
            });
        gnationsText.selectAll(".nation-text-perc").remove();
        gnationsText.selectAll(".nation-text-perc-cmp").remove();
        gnationsText.selectAll(".nation-text-perc").data(data).enter().append("text").attr("class", "nation-text-perc").attr("text-anchor", "middle").attr("x", width / 2).attr("y", height / 2).attr("fill", "#fff").style("pointer-events", "none").attr("font-size", "29px").attr("font-weight", "bold").attr("opacity", 0)
            .text(function (d, i) {
                var val = comparisonView ? getValueWithSelectedSpecies(data[i].value, comparisonViewA): getValue(data[i].value);
                if (val < 0) {
                    return "";
                } else if (val <= 100) {
                    return (+val.toFixed(1)).toLocaleString(lang)+"%";
                }
            });
        gnationsText.selectAll(".nation-text-perc-cmp").data(data).enter().append("text").attr("class", "nation-text-perc-cmp").attr("text-anchor", "middle").attr("x", width / 2).attr("y", height / 2).attr("fill", "#fff").style("pointer-events", "none").attr("font-size", "29px").attr("font-weight", "bold").attr("opacity", 0)
            .text(function (d, i) {
                if (comparisonView) {
                    var val = getValueWithSelectedSpecies(data[i].value, comparisonViewB);
                    if (val < 0) {
                        return "";
                    } else if (val <= 100) {
                        return (+val.toFixed(1)).toLocaleString(lang)+"%";
                    }
                } else {
                    return "?%";
                }
            });
    }

    /**
     * Does all the tasks to do the job
     * @param {mixed} data the data
     */
    function init(data) {
        initializeCentralBackground();
        initializeProtobacteriaV2(data, width, height);
        initializeCentralForeground();
        setupSelection();
        initializeNationTexts();
    }

    /**
     * Defines the minimum and the maximum values of the dataset
     * Computes the ratio between the maximum allowed radius of a nation-bubble and the maximum value of the dataset
     */
    function setupSelection() {
        max_nation = 100;
        nation_radius_ratio = max_nation_radius / max_nation;
    }

    /**
     * @param {mixed} d all the values of the selected datum
     * @returns {double} the amount of pixel corresponding to the value d
     */
    function getSizedValue(d) {
        if (getValue(d) < 0) {
            return 0;
        }
        return min_nation_size + getValue(d) * nation_radius_ratio;
    }

    /**
     * @param {mixed} d all the values of the selected datum
     * @param {int} species the species to consider
     * @returns {double} the amount of pixel corresponding to the value d
     */
    function getSizedValueWithSelectedSpecies(d, species) {
        if (getValueWithSelectedSpecies(d, species) < 0) {
            return 0;
        }
        return min_nation_size + getValueWithSelectedSpecies(d, species) * nation_radius_ratio;
    }

    /**
     * @param {mixed} d all the values of the selected datum
     * @returns {double} the value related to the selected bacteria and the selected species
     */
    function getValue(d) {
        return d["lev0_" + selectedBact]["lev1_" + selectedSpecies]["lev2_" + selectedLev2];
    }

    /**
     * @param {mixed} d all the values of the selected datum
     * @param {int} species the species to consider
     * @returns {double} the value related to the selected bacteria and the selected species
     */
    function getValueWithSelectedSpecies(d, species) {
        return d["lev0_" + selectedBact]["lev1_" + species]["lev2_" + selectedLev2];
    }

    /**
     * @param {double} radians the arc
     * @param {double} radius the radius
     * @returns {double} the x coordinate
     */
    function getCircleXPosition(radians, radius) {
        return width / 2 + Math.sin(radians) * radius;
    }

    /**
     * @param {double} radians the arc
     * @param {double} radius the radius
     * @returns {double} the y coordinate
     */
    function getCircleYPosition(radians, radius) {
        return height / 2 - Math.cos(radians) * radius;
    }

    /**
     * @param {double} radians the arc
     * @param {double} radius the radius
     * @returns {double} the x and y coordinates
     */
    function getCirclePosition(radians, radius) {
        return {
            x: getCircleXPosition(radians, radius),
            y: getCircleYPosition(radians, radius)
        };
    }

    /**
     * Redraws the visualization
     * @param {boolean} doDispose true to re-dispose data
     */
    function refresh(doDispose) {
        data = order(FROM, TO);
        setupSelection();
        if (doDispose) {
            disposeNations(getXYSPositions(FREE_SPACE, radius_nations), null);
        }
    }

    /**
     * Picks data in correct order and considers only those between params from and to
     * @param {int} from
     * @param {int} to
     * @returns {Array}
     */
    function order(from, to) {
        var n = 0;
        var len = _.size(odata);
        var mydata = new Array(len);
        var xkeys = keys.concat(["X"]); // accounts for non-included regions
        _.each(xkeys, function (key) {
            for (var i = 0; i < len; i++) {
                if (odata[i].region === key) {
                    mydata[n] = odata[i];
                    n++;
                }
            }
        });
        return mydata;
    }

    /**
     * Returns the x and y coordinates of all the bubbles
     * @param {double} spaceLeftInRadians the amount of space to exclude from the top
     * @param {double} RADIUS the orbit's radius
     * @returns {array} the positions
     */
    function getXYSPositions(spaceLeftInRadians, RADIUS) {
        // dims1 : unique or external orbit
        // dims2 : void or internal orbit
        if (focusOn === BACTERIA) {
            var dims1 = _.map(data, function (item) {
                if (item && item.region !== "X") { // X is used to define EU
                    if (comparisonView) {
                        return getSizedValueWithSelectedSpecies(item.value, comparisonViewA);
                    } else {
                        return getSizedValue(item.value);
                    }
                }
                return 0;
            });
            var dims2 = [];
            var forSum = dims1;
            if (comparisonView) {
                var dims2 = _.map(data, function (item) {
                    if (item && item.region !== "X") { // X is used to define EU
                        return getSizedValueWithSelectedSpecies(item.value, comparisonViewB);
                    }
                    return 0;
                });
                forSum = dims2;
            }
            var sum = _.reduce(forSum, function (memo, radius, index) {
                if (index >= FROM && index <= TO && radius > 0) {
                    return memo + radius * 2 + 8;
                } else {
                    return memo + 4;
                }
            }, 0);
            var len = TO-FROM;
            var ratio = 1 / RADIUS;
            var free = ratio * ((FULL_CIRCLE - spaceLeftInRadians) * RADIUS - sum) / len;
            free += .006;
            if (len < 10) {
                free /= 5;
                free *= 4;
            }
            var fixedRad = (Math.PI*2 - FREE_SPACE*2) / (len+1);
            var xys = [];
            var rad = spaceLeftInRadians, rad1 = 0, rad2 = 0;
            var xysn = 0;
            for (var i = 0; i < FROM; i++) { // add nulls in case of FROM->TO selection
                xys.push({x:width/2, y:-500, radiant:0, region:"X"});
                xysn++;
            }
            _.each(forSum, function (item, i) {
                if (i >= FROM && i < TO && data[i]) {
                    if (comparisonView) {
                        rad += fixedRad;
                    } else {
                        rad1 = i > 0 ? ratio * (forSum[i - 1]) : 0;
                        rad2 = ratio * item;
                        rad += (rad1 + rad2);
                        rad += free;
                    }
                    xys.push(getCirclePosition(rad, RADIUS));
                    xys[xysn].radiant = rad;
                    xys[xysn].region = data[i].region;
                    if (data[i].code === "EU") { // EU bubble, overwrite values //data[i].region === "X"
                        xys[xysn].radiant = 0;
                        xys[xysn].x = width/2;
                        xys[xysn].y = height/2-radius_nations;
                        if (comparisonView) { // avoid in comparison view
                            xys[xysn].y = -3000;
                        }
                    }
                    xysn++;
                }
            });
            for (var i = TO; i < _.size(countries); i++) { // add nulls in case of FROM->TO selection
                if (data[i] && data[i].code === "EU") { // europe
                    if (comparisonView) {
                        xys.push({x:width/2, y:-3000, radiant:0, region:"X"});
                    } else {
                        xys.push({x:width/2, y:height/2-radius_nations, radiant:0, region:"X"});
                    }
                } else {
                    xys.push({x:width/2, y:-500, radiant:0, region:"X"});
                }
                xysn++;
            }
            if (comparisonView) {
                rad = spaceLeftInRadians, rad1 = 0, rad2 = 0;
                for (var i = 0; i < FROM; i++) { // add nulls in case of FROM->TO selection
                    xys.push({x:width/2, y:-500, radiant:0, region:"X"});
                    xysn++;
                }
                _.each(dims2, function (item, i) {
                    if (i >= FROM && i < TO && data[i]) {
                        if (comparisonView) {
                            rad += fixedRad;
                        } else { // ???
                            rad1 = i > 0 ? ratio * (dims2[i - 1]) : 0;
                            rad2 = ratio * item;
                            rad += (rad1 + free + rad2);
                        }
                        xys.push(getCirclePosition(rad, RADIUS_NATIONS_CMP_INTERNAL));
                        xys[xysn].radiant = rad;
                        xys[xysn].region = data[i].region;
                        if (data[i].code === "EU") { // EU bubble, overwrite values // data[i].region === "X"
                            xys[xysn].radiant = 0;
                            xys[xysn].x = width/2;
                            xys[xysn].y = -3000;
                        }
                        xysn++;
                    }
                });
                for (var i = xysn; i < 2*_.size(countries); i++) { // add nulls in case of FROM->TO selection
                    if (data[i] && data[i].code === "EU") { // europe
                        if (comparisonView) {
                            xys.push({x:width/2, y:-3000, radiant:0, region:"X"});
                        } else {
                            xys.push({x:width/2, y:height/2-RADIUS_NATIONS_CMP_INTERNAL, radiant:0, region:"X"});
                        }
                    } else {
                        xys.push({x:width/2, y:-500, radiant:0, region:"X"});
                    }
                    xysn++;
                }
            }
            return xys;
        } else {
            var tot = _.size(antimicrobials);
            var mid = Math.ceil(tot/2);
            var equalSpace = 0.26;
            var xys = [];
            for (var i = 0; i < mid; i++) {
                rad = spaceLeftInRadians + i * equalSpace;
                xys.push(getCirclePosition(rad, RADIUS));
                xys[FROM + i].radiant = rad;
                xys[FROM + i].region = data[i].region;
            }
            for (var i = mid; i < tot; i++) {
                rad = 2 * spaceLeftInRadians + i * equalSpace - equalSpace/2;
                xys.push(getCirclePosition(rad, RADIUS));
                xys[FROM + i].radiant = rad;
                xys[FROM + i].region = data[i].region;
            }
            if (comparisonView) {
                for (var i = 0; i < mid; i++) {
                    rad = spaceLeftInRadians + i * equalSpace;
                    xys.push(getCirclePosition(rad, RADIUS_NATIONS_CMP_INTERNAL));
                    xys[FROM + i + tot].radiant = rad;
                    xys[FROM + i + tot].region = data[i].region;
                }
                for (var i = mid; i < tot; i++) {
                    rad = 2 * spaceLeftInRadians + i * equalSpace - equalSpace/2;
                    xys.push(getCirclePosition(rad, RADIUS_NATIONS_CMP_INTERNAL));
                    xys[FROM + i + tot].radiant = rad;
                    xys[FROM + i + tot].region = data[i].region;
                }
            }
            return xys;
        }
    }
    
    /**
     * Inizializes the bacteria in the first screen (version 2)
     * @param {type} data the data
     * @param {type} width the area width
     * @param {type} height the area height
     */
    function initializeProtobacteriaV2(data, width, height) {
        var pos = [// some random data
            {x: 0, y: 0, color: "transparent"}
        ];
        var pos2 = [];
        _.each(pos, function (item, p) {
            var loop = 2;
            while (loop--) {
                _.each(data, function (datum, i) {
                    pos2.push({
                        ox: item.x,
                        oy: item.y,
                        x: item.x + Math.random() * 40,
                        y: item.y + Math.random() * 40,
                        color: item.color,
                        p: p,
                        value: datum.value,
                        name: datum.name,
                        code: datum.code
                    });
                });
            }
        });
        _.each(pos2, function (item, p) {
            item.ox += width / 2;
            item.oy += height / 2;
            item.x += width / 2;
            item.y += height / 2;
        });
        pos = pos2;
        bacteriaGroupContainer = svg.append("g").attr("id", "internal-area");
        bacteriaGroupContainer.append("circle").attr("class", "glass-int").attr("cx", width / 2).attr("cy", height / 2).attr("r", radius_glass).attr("fill", theme_green_dark).attr("stroke", theme_green_light).attr("stroke-width", stroke_glass); // removed 2017.09.01 --> .style("filter", "url(#filterGlass)");
        
        var html = d3.select("#internal-area").html();
        bacteriaGroup = svg.append("g");
        bacteriaGroupContainerClone = bacteriaGroup.append("g").html(html).style("display", "none");
        
        // switch button
        var arc = d3.arc().innerRadius(radius_center).outerRadius(radius_center-20).startAngle(-.7).endAngle(.7);
        svg.append("path").attr("id", "switch-button-text-arc").attr("class", "switch-button glass-int").attr("d", arc).attr("fill", theme_green_light).attr("transform", "translate("+width/2+", "+(height/2-1)+")").attr("opacity", 1).attr("cursor", "pointer")
            .on("mouseover", function() { // enlight
                d3.select(this).attr("fill", "#f5f7f7");
            })
            .on("mouseout", function() { // delight
                d3.select(this).attr("fill", theme_green_light);
            })
            .on("click", function() { // switch visualization with pre-set data to show
                clickedName = focusOn === BACTERIA ? SWITCH_DEFAULT_COUNTRY : SWITCH_DEFAULT_ANTIMICROBIAL;
                switchData();
            });
        svg.append("text").attr("id", "switch-button-text-container").attr("class", "switch-button").attr("text-anchor", "middle").attr("dy", 15).attr("fill", theme_green_dark).attr("font-size", dims_dictionary.other_labels.switch_button[lang]).attr("letter-spacing", "1.5px").attr("font-weight", "bold").attr("pointer-events", "none")
            .append("textPath").attr("id", "switch-button-text").attr("startOffset", "24.5%").attr("xlink:href", "#switch-button-text-arc");
        d3.selectAll(".switch-button").style("display", "none");
        // end of switch button

        // data not available message
        arc = d3.arc().innerRadius((RADIUS_NATIONS_CMP_INTERNAL+RADIUS_NATIONS_CMP)/2).outerRadius((RADIUS_NATIONS_CMP_INTERNAL+RADIUS_NATIONS_CMP)/2).startAngle(-.8).endAngle(.8);
        svg.append("path").attr("id", "data-not-available-message-arc").attr("class", "data-not-available-message").attr("d", arc).attr("fill", "transparent").attr("transform", "translate("+width/2+", "+(height/2-1)+")");
        svg.append("text").attr("id", "data-not-available-message-container").attr("class", "data-not-available-message").attr("text-anchor", "middle").attr("dy", 15).attr("fill", theme_green_dark).attr("font-size", "28px").attr("letter-spacing", "1.5px").attr("font-weight", "bold").attr("pointer-events", "none")
            .append("textPath").attr("id", "data-not-available-message-text").attr("startOffset", "25%").attr("xlink:href", "#data-not-available-message-arc").text(DATA_NOT_AVAILABLE);
        d3.selectAll(".data-not-available-message").style("display", "none");
        // end of data not available message
        
        bacteriaGroup.style("filter", "url(#filterS2)");
        bacteriaGroup.selectAll(".gooey")
                .data(pos).enter()
                .append("circle").attr("class", "gooey").attr("id", function(d, i) { return "gooey-"+i;})
                .attr("clip-path", "url(#clipper)").style("cursor", "pointer")
                .attr("data-code", function (d, i) { return d.code; })
                .attr("cx", function (d, i) {
                    return pos[i].x;
                })
                .attr("cy", function (d, i) {
                    return pos[i].y;
                })
                .attr("r", function (d, i) {
                    return 4 + Math.random() * 5;
                })
                .attr("fill", function (d, i) {
                    return d.color;
                });
        var centralMenuGroup = svg.append("g").attr("id", "menu-central").attr("opacity", 0);
        var nail = null;
        if (isIE) { // workaround for ie, use arc
            var arc = describeArc(width/2, height/2+radius_center, 20, -90, 90);
            nail = centralMenuGroup.append("path");
            nail.attr("d", arc).attr("fill", theme_green_light).attr("cursor", "pointer");
        } else { // use circle
            nail = centralMenuGroup.append("circle");
            nail.attr("cx", width / 2).attr("cy", height / 2 + radius_center).attr("r", 20).attr("fill", theme_green_light).attr("cursor", "pointer").attr("clip-path", "url(#clipper2)");
        }
        nail.on("click", function (d) {
            d3.event.stopPropagation();
            menuSelection(3);
        }).on("mouseover", function () {
            d3.select(this).attr("fill", "#fff");
        }).on("mouseout", function () {
            d3.select(this).attr("fill", theme_green_light);
        });
        
        centralMenuGroup.append("line").attr("x1", width/2-7).attr("y1", height/2+radius_center-11).attr("x2", width/2+7).attr("y2", height/2+radius_center-11).attr("stroke", theme_green_dark).attr("stroke-width", 3).attr("pointer-events", "none");
        centralMenuGroup.append("line").attr("x1", width/2-7).attr("y1", height/2+radius_center-6).attr("x2", width/2+7).attr("y2", height/2+radius_center-6).attr("stroke", theme_green_dark).attr("stroke-width", 3).attr("pointer-events", "none");
        centralMenuGroup.append("line").attr("x1", width/2-7).attr("y1", height/2+radius_center-1).attr("x2", width/2+7).attr("y2", height/2+radius_center-1).attr("stroke", theme_green_dark).attr("stroke-width", 3).attr("pointer-events", "none");
        // title (two lines)
        svg.append("text").attr("class", "intro-text intro-title").attr("x", width/2).attr("y", height/2-110).text(dictionary.home.title_line_1).attr("font-weight", "400").attr("font-size", dims_dictionary.home.title[lang]).attr("text-anchor", "middle").attr("fill", "#fff").attr("opacity", "1").attr("pointer-events", "none");
        svg.append("text").attr("class", "intro-text intro-title").attr("x", width/2).attr("y", height/2-80).text(dictionary.home.title_line_2).attr("font-weight", "400").attr("font-size", dims_dictionary.home.title[lang]).attr("text-anchor", "middle").attr("fill", "#fff").attr("opacity", "1").attr("pointer-events", "none");
        // text (many lines)
 	
        var sentences = [];
        if (isIE || isSafari) {
            sentences = [
                dictionary.home.text_part_1 + dictionary.home.text_part_2 + dictionary.home.text_part_3 + dictionary.home.text_part_4,
                dictionary.home.text_part_5,
                dictionary.home.text_part_6,
                " ", // empty
                dictionary.home.text_part_7,
                dictionary.home.text_part_8,
                dictionary.home.text_part_9
            ];
        } else {
            sentences = [
                dictionary.home.text_part_1 + "<tspan style='font-style:italic'>"+dictionary.home.text_part_2+"</tspan> "+dictionary.home.text_part_3+"<tspan style='font-style:italic'>"+dictionary.home.text_part_4+"</tspan>",
                dictionary.home.text_part_5,
                dictionary.home.text_part_6,
                " ", // empty
                dictionary.home.text_part_7,
                dictionary.home.text_part_8,
                dictionary.home.text_part_9
            ];
        }
             
        _.each(sentences, function(text, index) {
            if (isIE || isSafari) {
                text = text.replace("<tspan style='font-style:italic'>", "");
                text = text.replace("</tspan>", "");
                svg.append("text").text(text).attr("dy", index + "em").attr("class", "intro-text intro-text-content").attr("id", "intro-text-"+index).attr("x", width/2).attr("y", height/2-40).attr("font-size", dims_dictionary.home.text[lang]).attr("text-anchor", "middle").attr("fill", "#fff").attr("opacity", "1").attr("pointer-events", "none");
            } else {
                svg.append("text").html(text).attr("dy", index + "em").attr("class", "intro-text intro-text-content").attr("id", "intro-text-"+index).attr("x", width/2).attr("y", height/2-40).attr("font-size", dims_dictionary.home.text[lang]).attr("text-anchor", "middle").attr("fill", "#fff").attr("opacity", "1").attr("pointer-events", "none");
            }
        });
        svg.append("rect").attr("id", "starter").attr("x", width/2-90).attr("width", 180).attr("y", height/2+101).attr("height", 53).attr("fill", "#e6e6e6").attr("rx", 8).attr("ry", 8).attr("cursor", "pointer").on("mouseover", function(d){$(this).attr("fill", "#f0f0f0");}).on("mouseout", function(d){$(this).attr("fill", "#e0e0e0");});
        svg.append("text").attr("id", "starter-text").attr("x", width/2).attr("y", height/2+135).attr("text-anchor", "middle").attr("fill", theme_green_dark).text(dictionary.home.start_button).attr("font-size", "22px").attr("font-weight", "700").attr("pointer-events", "none");
        var arc = d3.arc().innerRadius(radius_glass+140).outerRadius(radius_glass+150).startAngle(1).endAngle(5.28);
        svg.append("path").attr("class", "intro-element").attr("d", arc).attr("fill", "#e6e6e6").attr("transform", "translate("+width/2+", "+(height/2-10)+")").attr("opacity", 1);
        svg.append("image").attr("class", "intro-element").attr("xlink:href", "img/ECDC_logo.png").attr("x", width/2+45).attr("y", height/2 -radius_glass-180).attr("width", "245px").attr("height", "118px").attr("opacity", 1).attr("cursor", "pointer")
                .on("mouseover", function() {
                    d3.select(this).attr("opacity", .8);
                })
                .on("mouseout", function() {
                    d3.select(this).attr("opacity", 1);
                })
                .on("click", function() {
                    window.open(ECDC_LINK, '_blank');
                });
        svg.append("image").attr("class", "intro-element").attr("xlink:href", "img/logo efsa.png").attr("x", width/2-260).attr("y", height/2 -radius_glass-180).attr("width", "250px").attr("height", "118px").attr("opacity", 1).attr("cursor", "pointer")
                .on("mouseover", function() {
                    d3.select(this).attr("opacity", .8);
                })
                .on("mouseout", function() {
                    d3.select(this).attr("opacity", 1);
                })
                .on("click", function() {
                    window.open(EFSA_LINK, '_blank');
                });

        // This data visualisation shows
        // resistance levels of two bacteria,
        // Salmonella and E.coli, found in
        // food, animals and humans to antimicrobials.
        // It is based on latest data provided 
        // by EU Member States. 
        // You can compare the situation 
        // for each antimicrobial across 
        // countries or regions.
        
        d3.select("#starter").on("click", function () {
            if (datavizStarted) {
                return;
            }
            if (window.activateBox) {
                window.activateBox();
            }
            d3.selectAll(".intro-text").attr("opacity", 0);
            d3.selectAll(".intro-element").transition().duration(1000).attr("opacity", 0);
            window.setTimeout(function() {
                d3.selectAll(".intro-element").remove();
            }, 2000);
            datavizStarted = true;
            var obj = d3.select("#gooey-0");
            obj.p = 0;
            gooeyClick(obj, 0);
            d3.select("#starter").remove();
            d3.select("#starter-text").remove();
        });
    }

    /**
     * Properly disposes the nations/bubbles
     * @param {int} nextDelay time to wait before continue
     */
    function setupGuys(nextDelay) {
        var xys = getXYSPositions(FREE_SPACE, radius_nations);
        var nxys = _.size(xys);
        svg.selectAll(".gooey").filter(function (d, j) {
            return +d.p === startingSelection;
        }).transition().ease(d3.elasticGooeys).delay(function (d, k) {
            return nextDelay + Math.random() * 700;
        }).duration(function (d, k) {
            return nextDelay + 4000;
        })
        .attr("r", function (d, k) {            
            var r = 0;
            if (comparisonView) {
                if (data[k]) {
                    r = getSizedValueWithSelectedSpecies(data[k].value, comparisonViewA);
                } else {
                    r = getSizedValueWithSelectedSpecies(data[k-nxys/2].value, comparisonViewB);
                }
            } else {
                if (data[k]) {
                    r = getSizedValue(data[k].value);
                }
            }
            d3.select(this).attr("or", r);
            return r;
        })
        .attr("cx", function (d, k) {
            if (!xys[k]) {
                return width / 2;
            }
            if (k < xys.length) {
                return xys[k].x;
            } else {
                return width / 2;
            }
        })
        .attr("cy", function (d, k) {
            if (!xys[k]) {
                return -500;
            }
            if (k < xys.length) {
                return xys[k].y;
            } else {
                return height / 2;
            }
        })
        .attr("fill", function (d, k) {
            var color = "#333";
            if (comparisonView) {
                if (data[k]) {
                    color = palette_custom(getValueWithSelectedSpecies(data[k].value, comparisonViewA));
                } else {
                    color = palette_custom(getValueWithSelectedSpecies(data[k-nxys/2].value, comparisonViewB));
                }
            } else {
                if (data[k]) {
                    color = palette_custom(getValue(data[k].value));
                }
            }
            d3.select(this).attr("ofill", color);
            return color;
        });
    }

    /**
     * Computes the time of the transition
     * @param {mixed} d the object
     * @param {type} i the index of the object
     * @param {type} id the id of the hovered object
     * @returns {int} the time of the transition
     */
    function elasticDisposition(d, i, id) {
        if (comparisonView) {
            return i > id ? 20 + (i - id) * 0 : 20 + (id - i) * 0;
        }
        if (id === null || id < 0) {
            return 20;
        }
        return i > id ? 20 + (i - id) * 20 : 20 + (id - i) * 20;
    }

    /**
     * Custom elasting effect
     * @param {double} a 
     * @param {double} p 
     */
    /* = d3.easeLinear; to avoid elastic effect and console errors*/
    d3.elasticGooeys = (function custom(a, p) {
        var tau = 2 * Math.PI;
        var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
        function elasticOut(t) {
            return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
        }
        elasticOut.amplitude = function (a) {
            return custom(a, p * tau);
        };
        elasticOut.period = function (p) {
            return custom(a, p);
        };
        return elasticOut;
    })(1, .85);

    /**
     * Properly disposes the nations and their texts
     * @param {array} xys the positions
     * @param {int} id the id of the hovered object
     */
    function disposeNations(xys, id) {
        
        var duration = 3000;
        var nxys = _.size(xys);
        var arr = focusOn === BACTERIA ? countries : antimicrobials;
        var arrSize = _.size(arr);
        var antimicrobialsMiddleSize = Math.ceil(_.size(antimicrobials)/2);

        // dispose the bubbles
        d3.selectAll(".gooey-nationed").transition().ease(d3.elasticGooeys).delay(function (d, i) {
            return elasticDisposition(d, i, id);
        }).duration(duration)
        .attr("r", function (d, i) {
            if (comparisonView) {
                if (i === clicked || i === hovered || i+arrSize === clicked || i+arrSize === hovered || i-arrSize === clicked || i-arrSize === hovered) {
                    return radius_hover_plus;
                }
                return d3.select(this).attr("or");
            }
            return i === clicked || i === hovered ? radius_hover_plus : d3.select(this).attr("or");
        }).attr("fill", function (d, i) {
            if (comparisonView) {
                if (i === clicked || i === hovered || i+arrSize === clicked || i+arrSize === hovered || i-arrSize === clicked || i-arrSize === hovered) {
                    return theme_green_dark;
                }
                return d3.select(this).attr("ofill");
            }
            return i === clicked || i === hovered ? theme_green_dark : d3.select(this).attr("ofill");
        }).attr("cx", function (d, i) {
            return xys[i] ? xys[i].x : width / 2;
        }).attr("cy", function (d, i) {
            return xys[i] ? xys[i].y : -500;
        });
        // dispose the borders
        d3.selectAll(".gooey-border").transition().ease(d3.elasticGooeys).delay(function (d, i) {
            return elasticDisposition(d, i, id);
        }).duration(duration).attr("fill", "transparent").attr("stroke", "white")
                .attr("r", function (d, i) {
                    if ((!comparisonView && i === clicked) || (i+arrSize === clicked || (i < arrSize && i === clicked))) {
                        return 40;
                    } else if (i === hovered || !xys[i] || comparisonView && (i+arrSize === clicked || i+arrSize === hovered || i-arrSize === clicked || i-arrSize === hovered)) {
                        return 0;
                    } else {
                        var or = d3.selectAll(".gooey-nationed").filter(function (d, j) {
                            return i === j;
                        }).attr("or");
                        if (isSafari) {
                            or = +or + 1;
                        } else {
                            or = +or - 2;
                        }
                        if (or < 0) {
                            or = 0;
                        }
                        return or;
                    }
                })
                .attr("cx", function (d, i) {
                    return xys[i] ? xys[i].x : width / 2;
                }).attr("cy", function (d, i) {
            return xys[i] ? xys[i].y : -500;
        });
        // dispose the texts
        d3.selectAll(".nation-text").transition().ease(d3.elasticGooeys).delay(function (d, i) {
            return elasticDisposition(d, i, id);
        }).duration(duration)
        .attr("opacity", function (d, i) {
            if (comparisonView) {
                if (getValueWithSelectedSpecies(data[i].value, comparisonViewA) < 0) {
                    return 0;
                }
            } else {
                if (!data[i] || getValue(data[i].value) < 0) {
                    return 0;
                }
            }
            if (focusOn === COUNTRIES) {
                return 1;
            }
            return i === clicked || i === clicked-arrSize || !xys[i] ? 0 : 1;
        }).attr("fill", function (d, i) {
            if (focusOn === COUNTRIES) {
                return "#888";
            } else {
                if (xys[i]) {
                    var fill = i === clicked || i === hovered || i+arrSize === clicked || i+arrSize === hovered ? "white" : comparisonView ? palette_text(getValueWithSelectedSpecies(data[i].value, comparisonViewA)) : palette_text(getValue(data[i].value));
                    return fill;
                } else {
                    return "white";
                }
            }
        }).attr("x", function (d, i) {
            var x = xys[i] ? xys[i].x : d3.select(this).attr("x");
            if (focusOn === COUNTRIES) {
                if (i < antimicrobialsMiddleSize) {
                    x += 70;
                } else {
                    x -= 70;
                }
            }
            return x;
        }).attr("y", function (d, i) {
            if (xys[i]) {
                if (focusOn === COUNTRIES) {
                    var y = xys[i].y + 7;
                    if (i === antimicrobialsMiddleSize || i === antimicrobialsMiddleSize-1) {
                        y += 10;
                    }
                    d3.select(this).attr("oy", y);
                    return y;
                } else {
                    var y = i === clicked || i === hovered || i+arrSize === clicked || i+arrSize === hovered ? xys[i].y - 20 : xys[i].y + 5;
                    d3.select(this).attr("oy", y);
                    return y;
                }
            } else {
                return d3.select(this).attr("y");
            }
        }).attr("font-size", function (d, i) {
            if (focusOn === COUNTRIES) {
                return "18px";
            } else {
                return "14px";
            }
        }).attr("font-weight", function (d, i) {
            if (focusOn === COUNTRIES) {
                return "normal";
            } else {
                return "bold";
            }
        }).attr("text-anchor", function (d, i) {
            if (focusOn === COUNTRIES) {
                if (i < antimicrobialsMiddleSize) {
                    return "start";
                } else {
                    return "end";
                }
            } else {
                return "middle";
            }
        });
        // dispose the texts
        d3.selectAll(".nation-text-cmp").transition().ease(d3.elasticGooeys).delay(function (d, i) {
            return elasticDisposition(d, i+nxys/2, id);
        }).duration(duration)
        .style("display", function() {
            if (comparisonView) {
                return "block";
            } else {
                return "none";
            }
        })
        .attr("opacity", function (d, i) {
            if (comparisonView) {
                if (getValueWithSelectedSpecies(data[i].value, comparisonViewB) < 0) {
                    return 0;
                }
            }
            if (focusOn === COUNTRIES) {
                return 1;
            }
            return i === clicked || i === clicked-arrSize || !xys[i] ? 0 : 1;
        }).attr("fill", function (d, i) {
            if (comparisonView) {
                if (focusOn === COUNTRIES) {
                    return "#fff";
                } else {
                    if (xys[i]) {
                        var fill = i === clicked || i === hovered || i+arrSize === clicked || i+arrSize === hovered ? "white" : palette_text(getValueWithSelectedSpecies(data[i].value, comparisonViewB));
                        return fill;
                    } else {
                        return "white";
                    }
                }
            }
        }).attr("x", function (d, i) {
            var x =  + (xys[i+arrSize] ? xys[i+arrSize].x : d3.select(this).attr("x"));
            if (focusOn === COUNTRIES) {
                if (i < antimicrobialsMiddleSize) {
                    x += 70;
                } else {
                    x -= 70;
                }
            }
            return x;
        }).attr("y", function (d, i) {
            if (xys[i+arrSize]) {
                if (focusOn === COUNTRIES) {
                    var y = xys[i+arrSize].y + 5;
                    d3.select(this).attr("oy", y);
                    return y;
                } else {
                    var y = i === clicked || i === hovered || i+arrSize === clicked || i+arrSize === hovered ? xys[i+arrSize].y - 20 : xys[i+arrSize].y + 5;
                    d3.select(this).attr("oy", y);
                    return y;
                }
            } else {
                return d3.select(this).attr("y");
            }
        }).attr("font-size", function (d, i) {
            if (focusOn === COUNTRIES) {
                return "18px";
            } else {
                return "14px";
            }
        }).attr("font-weight", function (d, i) {
            if (focusOn === COUNTRIES) {
                return "normal";
            } else {
                return "bold";
            }
        }).attr("text-anchor", function (d, i) {
            if (focusOn === COUNTRIES) {
                if (i < antimicrobialsMiddleSize) {
                    return "start";
                } else {
                    return "end";
                }
            } else {
                return "middle";
            }
        });
        // dispose the texts
        d3.selectAll(".nation-text-perc").transition().ease(d3.elasticGooeys).delay(function (d, i) {
            return elasticDisposition(d, i, id);
        }).duration(duration)
        .attr("opacity", function (d, i) {
            return xys[i] ? i === clicked || i === hovered || i+arrSize === clicked || i+arrSize === hovered ? 1 : 0 : 0;
        }).attr("x", function (d, i) {
            return xys[i] ? xys[i].x : d3.select(this).attr("x");
        }).attr("y", function (d, i) {
            if (focusOn === COUNTRIES) {
                if (xys[i]) {
                    return xys[i].y + 15;
                } else {
                    return d3.select(this).attr("y");
                }
            } else {
                if (xys[i]) {
                    if (i === clicked || i+arrSize === clicked) {
                        return xys[i].y + 10;
                    } else {
                        return xys[i].y + 30;
                    }
                } else {
                    return d3.select(this).attr("y");
                }
            }
        });
        // dispose the texts
        d3.selectAll(".nation-text-perc-cmp").transition().ease(d3.elasticGooeys).delay(function (d, i) {
            return elasticDisposition(d, i+nxys/2, id);
        }).duration(duration)
        .attr("opacity", function (d, i) {
            return xys[i+arrSize] ? i === clicked || i === hovered || i+arrSize === clicked || i+arrSize === hovered ? 1 : 0 : 0;
        }).attr("x", function (d, i) {
            return xys[i+arrSize] ? xys[i+arrSize].x : d3.select(this).attr("x");
        }).attr("y", function (d, i) {
            if (focusOn === COUNTRIES) {
                if (xys[i+arrSize]) {
                    return xys[i+arrSize].y + 15;
                } else {
                    return d3.select(this).attr("y");
                }
            } else {
                if (xys[i+arrSize]) {
                    if (i+arrSize === clicked) {
                        return xys[i+arrSize].y + 10;
                    } else {
                        return xys[i+arrSize].y + 30;
                    }
                } else {
                    return d3.select(this).attr("y");
                }
            }
        });
        
        if (comparisonView) {
            var visibileXYS = [];
            _.each(xys, function(item, index) {
                if (item && index >= FROM && index < TO && item.region !== "X") {
                    visibileXYS.push({x:item.x, y:item.y});
                }
            });
            if (comparisonView === 4) {
                d3.select("#comparison-circle-guide-text-1-text").text(dictionary.generic.species["Broilers"].toUpperCase());
                d3.select("#comparison-circle-guide-text-2-text").text(dictionary.generic.species["Fattening turkeys"].toUpperCase());
            } else {
                d3.select("#comparison-circle-guide-text-1-text").text(dictionary.generic.species["Meat from broilers"].toUpperCase());
                d3.select("#comparison-circle-guide-text-2-text").text(dictionary.generic.species["Meat from turkeys"].toUpperCase());
            }
            d3.selectAll(".comparison-circle-guide-line")
                .transition().ease(d3.elasticGooeys).duration(3000)
                .attr("x1", function(d, i) {
                    return visibileXYS[i] && visibileXYS[i] !== null ? visibileXYS[i].x : 0;
                }).attr("x2", function(d, i) {
                    return visibileXYS[i] && visibileXYS[i] !== null ? width/2 : 0;
                }).attr("y1", function(d, i) {
                    return visibileXYS[i] && visibileXYS[i] !== null ? visibileXYS[i].y : 0;
                }).attr("y2", function(d, i) {
                    return visibileXYS[i] && visibileXYS[i] !== null ? height/2 : 0;
                })
                .attr("opacity", .7);
        }
    }

    /**
     * On mouseover, redisposes the bubbles accordingly to the size increment of the hovered bubble
     * @param {array} xys
     * @param {int} w the index of the hovered bubble
     */
    function resizeXYS(xys, w) {
        var oldRadius = d3.selectAll(".gooey-nationed").filter(function (d, i) {
            return i === w;
        }).attr("or");
        var div1 = 1 / radius_nations * (radius_hover_plus - oldRadius);
        var div2 = 1 / radius_nations * (radius_hover_plus - oldRadius);
        var nxys = _.size(xys);
        if (comparisonView && w > nxys/2) {
            w -= nxys/2;
        }
        _.each(xys, function (item, i) {
            if (item && ((i >= FROM && i < TO) || (comparisonView && i >= nxys/2+FROM && i < nxys/2+TO))) {
                if (item.region !== "X") {
                    var radius = comparisonView && i >= TO ? RADIUS_NATIONS_CMP_INTERNAL : radius_nations;
                    var middle = comparisonView && i >= TO ? w+nxys/2 : w;
                    if (i < middle) {
                        item.x = getCircleXPosition(item.radiant - div1, radius);
                        item.y = getCircleYPosition(item.radiant - div1, radius);
                        xys[i].radiant -= div1;
                    } else if (i > middle) {
                        item.x = getCircleXPosition(item.radiant + div2, radius);
                        item.y = getCircleYPosition(item.radiant + div2, radius);
                        xys[i].radiant += div2;
                    }
                }
            }
        });
        return xys;
    }

    /**
     * Hides the central circular area with the detailed information
     * @param {type} that the object
     * @param {type} d the datum
     */
    function hideCentralCircle(that, d) {
        centralGroup.transition().duration(1000).attr("opacity", 0);
        centralGroupText.attr("opacity", 0).style("display", "none");
        centralTextLinesTop.style("display", "block");
        centralTextLinesBottom.style("display", "block");
        d3.select("#central").transition().duration(1000).attr("r", 0);
        d3.select("#central-dotted").transition().duration(1000).attr("r", 0);
        if (isSafari) {
            d3.select("#central-dotted-arced").transition().delay(300).attr("d", "M0,0");
        } else {
            d3.select("#central-dotted-arced").transition().delay(300).attr("d", "");
        }
        d3.select("#central-dotted-arced-mask").transition().duration(300).attr("opacity", 0).attr("width", 0);
        d3.selectAll(".central-text").style("display", "block").attr("opacity", 1);
        d3.selectAll(".central-text-pre").style("display", "block").attr("opacity", 1);
        d3.selectAll(".central-text-post").style("display", "block").attr("opacity", 1);
        d3.select("#central-text-5-rect").style("display", "none");
        d3.select("#central-text-5a").style("display", "none");
        d3.select("#central-text-5b").style("display", "none");
        d3.select("#central-text-1").style("display", "none").attr("fill", "#fff");
        d3.select("#central-text-2").style("display", "none").attr("fill", "#fff");
        d3.select("#central-text-3").style("display", "none").attr("fill", "#fff");
        d3.select("#central-text-4").style("display", "none");
        d3.select("#central-text-6").style("display", "none");
        d3.select("#menu-central").attr("display", "block");
        d3.select("#central-text").style("transform", "none").attr("fill", "#fff");
        d3.select("#central-text").style("display", "block");
        d3.select("#central-text-arrow-right").style("display", "block");
        d3.select("#central-text-arrow-left").style("display", "block");
        d3.select("#central-text-perc").style("display", "none");
        d3.select("#comparison-top-mask").style("display", "none");
        d3.selectAll(".switch-button").style("display", comparisonView ? "none" : "block");
    }

    /**
     * Shows the central circular area with the detailed information
     * @param {type} that the object
     * @param {type} d the datum
     * @param {type} i the index
     */
    function showCentralCircle(that, d, i) {
        var myValue = getValue(data[i].value);
        var normalDuration = 300;
        var longerDuration = 500;
        centralTextLinesTop.style("display", "none");
        centralTextLinesBottom.style("display", "none");
        d3.select(".switch-button").style("display", "none");
        d3.select("#comparison-top-mask").style("display", "none");
        if (isIE || isSafari) {
            centralGroupText.style("-webkit-transform", "translate(0px, 0px)");
            d3.select("#central-comparison-texts").style("-webkit-transform", "translate(0px, 0px)");
            // we need the 4 lines below to account for IE and Safari
            $('#central-group-text').attr("class", "tnone");
            var g = document.querySelector('.tnone');
            var transform= getComputedStyle(g).getPropertyValue('transform');
            g.setAttribute('transform', transform);
            // we need the 4 lines below to account for IE and Safari
            $('#central-comparison-texts').attr("class", "tnone");
            var g = document.querySelector('.tnone');
            var transform= getComputedStyle(g).getPropertyValue('transform');
            g.setAttribute('transform', transform);
        } else {
            centralGroupText.style("transform", "none");
            d3.select("#central-comparison-texts").style("transform", "none");
        }
        d3.select("#menu-central").attr("display", "none");
        d3.select("#central-comparison-texts").attr("display", "none");
        centralGroup.transition().attr("opacity", 1);
        centralGroupText.transition().delay(normalDuration - 100).duration(longerDuration).attr("opacity", 1).style("display", "block");
        d3.select("#central")
                .transition()
                .ease(d3.easeLinear)
                .duration(normalDuration)
                .attr("cx", width / 2)
                .attr("cy", height / 2)
                .attr("r", radius_nations - radius_hover_plus);
        d3.select("#central-dotted").transition().delay(longerDuration - normalDuration).duration(longerDuration).attr("r", radius_nations - radius_hover_plus - 15);
        d3.select("#central-dotted-arced-mask").transition().delay(longerDuration).duration(0).attr("opacity", 1).attr("width", 240);
        d3.selectAll(".central-text").transition().duration(normalDuration).attr("opacity", 0).delay(normalDuration).style("display", "none");
        d3.select("#central-text").style("display", "none");
        /** select the right text between resistance and prevalence, and related exceptions. account for browsers. */
        var text2 = "", html2 = "", text3 = "", html3 = ""; // text is for ie and safari, html is for chrome, firefox and opera
        var text4 = ""; // text4 is for all the browsers
        if (focusOn === BACTERIA) {
            if (antimicrobials[selectedLev2] === "ESBL" || antimicrobials[selectedLev2] === "AmpC") {
                text2 = dictionary.central_area.prevalence_of + dictionary.generic.antimicrobials[antimicrobials[selectedLev2]] + dictionary.central_area.producing+" " + dictionary.generic.bacteria[bacteria[selectedBact]].part_1.text+dictionary.generic.bacteria[bacteria[selectedBact]].part_2.text;
                html2 = dictionary.central_area.prevalence_of + dictionary.generic.antimicrobials[antimicrobials[selectedLev2]] + dictionary.central_area.producing+" <tspan style='font-style:italic'>" + dictionary.generic.bacteria[bacteria[selectedBact]].part_1.text+dictionary.generic.bacteria[bacteria[selectedBact]].part_2.text + "</tspan>";
                text4 = "";
            } else {
                text2 = dictionary.central_area.resistance_of + dictionary.generic.bacteria[bacteria[selectedBact]].part_1.text_case+" "+dictionary.generic.bacteria[bacteria[selectedBact]].part_2.text;
                html2 = dictionary.central_area.resistance_of + "<tspan style='font-style:italic'>" + dictionary.generic.bacteria[bacteria[selectedBact]].part_1.text_case+" "+dictionary.generic.bacteria[bacteria[selectedBact]].part_2.text + "</tspan>";
                text4 = dictionary.central_area.resistance;
            }
            if (antimicrobials[selectedLev2] === "ESBL" || antimicrobials[selectedLev2] === "AmpC") {
                text3 = " "+dictionary.central_area.in[species[menu_selectedSpecies]] + dictionary.generic.species_after_in[species[menu_selectedSpecies]];
                html3 = " "+dictionary.central_area.in[species[menu_selectedSpecies]] + dictionary.generic.species_after_in[species[menu_selectedSpecies]];
            } else {
                text3 = " "+dictionary.central_area.to[antimicrobials[selectedLev2].trim()] + dictionary.generic.antimicrobials[antimicrobials[selectedLev2].trim()] + " "+dictionary.central_area.in[species[menu_selectedSpecies]] + dictionary.generic.species_after_in[species[menu_selectedSpecies]];
                html3 = " "+dictionary.central_area.to[antimicrobials[selectedLev2].trim()] + dictionary.generic.antimicrobials[antimicrobials[selectedLev2].trim()] + " "+dictionary.central_area.in[species[menu_selectedSpecies]] + dictionary.generic.species_after_in[species[menu_selectedSpecies]];
            }
        } else {
            if (data[i].name === "ESBL" || data[i].name === "AmpC") {
                text2 = dictionary.central_area.prevalence_of + dictionary.generic.antimicrobials[data[i].name] + dictionary.central_area.producing+" " + dictionary.generic.bacteria[bacteria[selectedBact]].part_1.text+" "+dictionary.generic.bacteria[bacteria[selectedBact]].part_2.text;
                html2 = dictionary.central_area.prevalence_of + dictionary.generic.antimicrobials[data[i].name] + dictionary.central_area.producing+" <tspan style='font-style:italic'>" + dictionary.generic.bacteria[bacteria[selectedBact]].part_1.text+dictionary.generic.bacteria[bacteria[selectedBact]].part_2.text + "</tspan>";
                text4 = "";
            } else {
                text2 = dictionary.central_area.resistance_of + dictionary.generic.bacteria[bacteria[selectedBact]].part_1.text_case+" "+dictionary.generic.bacteria[bacteria[selectedBact]].part_2.text;
                html2 = dictionary.central_area.resistance_of + "<tspan style='font-style:italic'>" + dictionary.generic.bacteria[bacteria[selectedBact]].part_1.text_case+" "+dictionary.generic.bacteria[bacteria[selectedBact]].part_2.text + "</tspan>";
                text4 = dictionary.central_area.resistance;
            }
            if (data[i].name === "ESBL" || data[i].name === "AmpC") {
                text3 = " "+dictionary.central_area.in[species[menu_selectedSpecies]] + dictionary.generic.species_after_in[species[menu_selectedSpecies]];
                html3 = " "+dictionary.central_area.in[species[menu_selectedSpecies]] + dictionary.generic.species_after_in[species[menu_selectedSpecies]];
            } else {
                text3 = " "+dictionary.central_area.to[data[i].name.trim()] + dictionary.generic.antimicrobials[data[i].name.trim()] + " "+dictionary.central_area.in[species[menu_selectedSpecies]] + dictionary.generic.species_after_in[species[menu_selectedSpecies]];
                html3 = " "+dictionary.central_area.to[data[i].name.trim()] + dictionary.generic.antimicrobials[data[i].name.trim()] + " "+dictionary.central_area.in[species[menu_selectedSpecies]] + dictionary.generic.species_after_in[species[menu_selectedSpecies]];
            }
        }
        if (isSafari || isIE) {
            text3 = text3.replace("+", dictionary.central_area.to["+"]);
            d3.select("#central-text-2").style("display", "block").text(text2).attr("fill", "#fff");
            d3.select("#central-text-3").style("display", "block").text(text3).attr("fill", "#fff");
        } else {
            html3 = html3.replace("+", dictionary.central_area.to["+"]);
            d3.select("#central-text-2").style("display", "block").html(html2).attr("fill", "#fff");
            d3.select("#central-text-3").style("display", "block").html(html3).attr("fill", "#fff");
        }
        d3.select("#central-text-4").style("display", "block").text(text4);
        /** end of: select the right text between resistance and prevalence, and related exceptions. account for browsers. */
        
        d3.select("#central-text-5-rect").style("display", "block");
        d3.select("#central-text-5a").style("display", "block");
        d3.select("#central-text-5b").style("display", "block");
        if (focusOn === BACTERIA) {
            var name6 = dictionary.generic.antimicrobials[antimicrobials[selectedLev2].trim()];
            d3.select("#central-text-6").style("display", "block").text(name6.capitalizeFirstLetter());
            d3.select("#central-text-1").style("display", "block").text(dictionary.generic.countries[data[i].name]).attr("fill", "#fff");
        } else {
            var name1 = dictionary.generic.countries[countries[selectedLev2]];
            d3.select("#central-text-6").style("display", "block").text(dictionary.generic.antimicrobials[data[i].name.trim()].capitalizeFirstLetter());
            d3.select("#central-text-1").style("display", "block").text(name1).attr("fill", "#fff");
        }
        var that = d3.select("#central-text-perc");
        that.style("display", "block");
        var thatArc = d3.select("#central-dotted-arced");
        thatArc.style("display", "block");
        var currentValue = parseInt(d3.select("#central-text-perc").text());
        if (isNaN(currentValue)) {
            currentValue = 0;
        }
        var currentArc = 2.1 * currentValue;
        var expectedValue = parseInt(myValue);
        var expectedArc = 2.1 * expectedValue;
        if (currentValue === expectedValue) {
            that.text(currentValue + "%");
            // decimals if (myValue < 1) {
                that.text((+myValue.toFixed(1)).toLocaleString(lang) + "%");
            // decimals }
            thatArc.attr("d", describeArc(width/2, height/2+20, 110, -105, -105 + currentArc));
        } else {
            var dir = expectedValue - currentValue > 0 ? 1 : -1;
            var delay = 4;
            if (isSafari) {
                delay = 2;
            }
            var chrono = setInterval(function () {
                currentValue += dir;
                that.text((+currentValue.toFixed(1)).toLocaleString(lang) + "%");
                currentArc += (expectedArc - currentArc) / 10;
                thatArc.attr("d", describeArc(width/2, height/2+20, 110, -105, -105 + currentArc));
                if (currentValue === expectedValue) {
                    // decimals if (myValue < 1) {
                        that.text((+myValue.toFixed(1)).toLocaleString(lang) + "%");
                    // decimals }
                    // no var currentArc = 2.1 * currentValue;
                    // no thatArc.attr("d", describeArc(width/2, height/2+20, 110, -105, -105 + currentArc));
                    clearInterval(chrono);
                }
            }, delay);
        }
    }
    
    /**
     * Shows the central circular area with the detailed information [in case of species comparison]
     * @param {type} that the object
     * @param {type} d the datum
     * @param {type} id the id of the clicked element
     * @param {type} i the index of the clicked element
     */
    function showCentralCircleForComparison(that, d, id, i) {
        if (!comparisonView) {
            return ;
        }
        if (i > data.length) {
            i -= data.length;
        }
        var pigsValue = getValueWithSelectedSpecies(data[i].value, comparisonViewA);
        var calvesValue = getValueWithSelectedSpecies(data[i].value, comparisonViewB);
        var pigsValueLength = CENTRAL_COMPARISON_BAR_LENGTH/100*pigsValue;
        if (pigsValueLength > 0 && pigsValueLength < 1) {
            pigsValueLength = 1;
        } else if (pigsValueLength < 0) {
            pigsValueLength = 0;
        }
        var calvesValueLength = CENTRAL_COMPARISON_BAR_LENGTH/100*calvesValue;
        if (calvesValueLength > 0 && calvesValueLength < 1) {
            calvesValueLength = 1;
        } else if (calvesValueLength < 0) {
            calvesValueLength = 0;
        }
        var normalDuration = 300;
        var longerDuration = 500;
        d3.select(".switch-button").style("display", "none");
        centralTextLinesTop.style("display", "none");
        centralTextLinesBottom.style("display", "none");
        
        if (isIE || isSafari) {
            centralGroupText.style("-webkit-transform", "translate(0px, 60px)");
            d3.select("#central-comparison-texts").style("-webkit-transform", "translate(0px, -40px)");
            // we need the 4 lines below to account for IE and Safari
            $('#central-group-text').attr("class", "t60");
            var g = document.querySelector('.t60');
            var transform= getComputedStyle(g).getPropertyValue('transform');
            g.setAttribute('transform', transform);
            // we need the 4 lines below to account for IE and Safari
            $('#central-comparison-texts').attr("class", "t_30");
            var g = document.querySelector('.t_30');
            var transform= getComputedStyle(g).getPropertyValue('transform');
            g.setAttribute('transform', transform);
        } else {
            centralGroupText.style("transform", "translate(0px, 60px)");
            d3.select("#central-comparison-texts").style("transform", "translate(0px, -40px)");
        }
        
        d3.select("#central-comparison-texts").attr("display", "block");
        d3.select("#central-text-4").style("display", "none");
        d3.select("#central-text-6").style("display", "none");
        d3.select("#central-text-perc").style("display", "none");
        d3.select("#central-text").style("transform", "translate(0px, -25px)").attr("fill", "#ffffff");
        d3.select("#central-text-arrow-right").style("display", "none");
        d3.select("#central-text-arrow-left").style("display", "none");
        
        d3.select("#comparison-text-bar-text-1").text(dictionary.generic.species[comparisonView === COMPARISON_VIEW_1_MENU_INDEX ? "Broilers" : "Meat from broilers"]);
        d3.select("#comparison-text-bar-text-2").text(dictionary.generic.species[comparisonView === COMPARISON_VIEW_1_MENU_INDEX ? "Fattening turkeys" : "Meat from turkeys"]);
        
        var bars = MINIBARS;
        var part = 100/bars;
        d3.select("#menu-central").attr("display", "none");
        d3.selectAll(".central-comparison-bar-1-part").attr("height", function(d, i) {
            if (i*part < pigsValue) {
                return 17;
            } else {
                if (pigsValue-i*part > -part) {
                    return 17/part*-(pigsValue-i*part);
                } else {
                    return 0;
                }
            }
        }).attr("transform", function(d, i) {
            if (i*part < pigsValue) {
                return "translate(0,0)";
            } else {
                if (pigsValue-i*part > -part) {
                    return "translate(0,"+(17/part*(part+(pigsValue-i*part)))+")";
                } else {
                    return "translate(0,0)";
                }
            }
        });
        d3.selectAll(".central-comparison-bar-2-part").attr("height", function(d, i) {
            if (i*part < calvesValue) {
                return 17;
            } else {
                return 0;
            }
        });
        
        if (pigsValue < 0) {
            d3.select("#central-comparison-value-1").text(dictionary.other_labels.na);
        } else {
            var currentPigsValue = parseInt(d3.select("#central-comparison-value-1").text());
            if (isNaN(currentPigsValue)) {
                currentPigsValue = 0;
            }
            var setPigsValue = setInterval(function() {
                if (Math.abs(currentPigsValue-pigsValue) < 2) {
                    d3.select("#central-comparison-value-1").text((+pigsValue.toFixed(0)).toLocaleString(lang)+"%");
                    clearInterval(setPigsValue);
                    return ;
                }
                currentPigsValue = (currentPigsValue+pigsValue)/2;
                if (currentPigsValue > 1) {
                    currentPigsValue = Math.round(currentPigsValue);
                } else {
                    currentPigsValue = currentPigsValue.toFixed(1);
                }
                d3.select("#central-comparison-value-1").text((+currentPigsValue.toFixed(0)).toLocaleString(lang)+"%");
            }, 70);
        }
        
        if (calvesValue < 0) {
            d3.select("#central-comparison-value-2").text(dictionary.other_labels.na);
        } else {
            var currentCalvesValue = parseInt(d3.select("#central-comparison-value-2").text());
            if (isNaN(currentCalvesValue)) {
                currentCalvesValue = 0;
            }
            var setCalvesValue = setInterval(function() {
                if (Math.abs(currentCalvesValue-calvesValue) < 2) {
                    d3.select("#central-comparison-value-2").text((+calvesValue.toFixed(0)).toLocaleString(lang)+"%");
                    clearInterval(setCalvesValue);
                    return ;
                }
                currentCalvesValue = (currentCalvesValue+calvesValue)/2;
                if (currentCalvesValue > 1) {
                    currentCalvesValue = Math.round(currentCalvesValue);
                } else {
                    currentCalvesValue = currentCalvesValue.toFixed(1);
                }
                d3.select("#central-comparison-value-2").text((+currentCalvesValue.toFixed(0)).toLocaleString(lang)+"%");
            }, 70);
        }
        
        centralGroup.transition().attr("opacity", 1);
        centralGroupText.transition().delay(normalDuration - 100).duration(longerDuration).attr("opacity", 1).style("display", "block");
        d3.select("#central")
                .transition()
                .ease(d3.easeLinear)
                .duration(normalDuration)
                .attr("cx", width / 2)
                .attr("cy", height / 2)
                .attr("r", radius_nations - radius_hover_plus - 90);
        d3.select("#central-text-1").style("display", "block").text(dictionary.generic.countries[d.name]).attr("fill", "#555");
        
        
        /** select the right text between resistance and prevalence, and related exceptions. account for browsers. */
        var text2 = "", html2 = "", text3 = "", html3 = ""; // text is for ie and safari, html is for chrome, firefox and opera
        if (focusOn === BACTERIA) {
            if (antimicrobials[selectedLev2] === "ESBL" || antimicrobials[selectedLev2] === "AmpC") {
                text2 = dictionary.central_area.prevalence_of + dictionary.generic.antimicrobials[antimicrobials[selectedLev2]] + dictionary.central_area.producing + " " + dictionary.generic.bacteria[bacteria[selectedBact]].part_1.text+" "+dictionary.generic.bacteria[bacteria[selectedBact]].part_2.text;
                html2 = dictionary.central_area.prevalence_of + dictionary.generic.antimicrobials[antimicrobials[selectedLev2]] + dictionary.central_area.producing + " <tspan style='font-style:italic'>" + dictionary.generic.bacteria[bacteria[selectedBact]].part_1.text+dictionary.generic.bacteria[bacteria[selectedBact]].part_2.text + "</tspan>";
            } else {
                text2 = dictionary.central_area.resistance_of + dictionary.generic.bacteria[bacteria[selectedBact]].part_1.text_case+" "+dictionary.generic.bacteria[bacteria[selectedBact]].part_2.text;
                html2 = dictionary.central_area.resistance_of + " <tspan style='font-style:italic'>" + dictionary.generic.bacteria[bacteria[selectedBact]].part_1.text_case+" "+dictionary.generic.bacteria[bacteria[selectedBact]].part_2.text + "</tspan>";
            }
            if (antimicrobials[selectedLev2] === "ESBL" || antimicrobials[selectedLev2] === "AmpC") {
                text3 = " " + dictionary.central_area.in[species[menu_selectedSpecies]] + dictionary.generic.species_after_in[species[menu_selectedSpecies]];
                html3 = " " + dictionary.central_area.in[species[menu_selectedSpecies]] + dictionary.generic.species_after_in[species[menu_selectedSpecies]];
            } else {
                text3 = " " + dictionary.central_area.in[species[menu_selectedSpecies]] + dictionary.generic.species_after_in[species[menu_selectedSpecies]];
                html3 = " " + dictionary.central_area.in[species[menu_selectedSpecies]] + dictionary.generic.species_after_in[species[menu_selectedSpecies]];
            }
        } else {
            if (data[i].name === "ESBL" || data[i].name === "AmpC") {
                text2 = dictionary.central_area.prevalence_of + data[i].name + dictionary.central_area.producing + dictionary.generic.bacteria[bacteria[selectedBact]].part_1.text+" "+dictionary.generic.bacteria[bacteria[selectedBact]].part_2.text;
                html2 = dictionary.central_area.prevalence_of + data[i].name + dictionary.central_area.producing + " <tspan style='font-style:italic'>" + dictionary.generic.bacteria[bacteria[selectedBact]].part_1.text+" "+dictionary.generic.bacteria[bacteria[selectedBact]].part_2.text + "</tspan>";
            } else {
                text2 = dictionary.central_area.resistance_of + dictionary.generic.bacteria[bacteria[selectedBact]].part_1.text_case+" "+dictionary.generic.bacteria[bacteria[selectedBact]].part_2.text;
                html2 = dictionary.central_area.resistance_of + " <tspan style='font-style:italic'>" + dictionary.generic.bacteria[bacteria[selectedBact]].part_1.text_case+" "+dictionary.generic.bacteria[bacteria[selectedBact]].part_2.text + "</tspan>";
            }
            if (data[i].name === "ESBL" || data[i].name === "AmpC") {
                text3 = " " + dictionary.central_area.in[species[menu_selectedSpecies]] + dictionary.generic.species_after_in[species[menu_selectedSpecies]];
                html3 = " " + dictionary.central_area.in[species[menu_selectedSpecies]] + dictionary.generic.species_after_in[species[menu_selectedSpecies]];
            } else {
                text3 = " " + dictionary.central_area.in[species[menu_selectedSpecies]] + dictionary.generic.species_after_in[species[menu_selectedSpecies]];
                html3 = " " + dictionary.central_area.in[species[menu_selectedSpecies]] + dictionary.generic.species_after_in[species[menu_selectedSpecies]];
            }
        }
        if (isSafari || isIE) {
            d3.select("#central-text-2").style("display", "block").text(text2).attr("fill", "#555");
            d3.select("#central-text-3").style("display", "block").text(text3).attr("fill", "#555");
        } else {
            d3.select("#central-text-2").style("display", "block").html(html2).attr("fill", "#555");
            d3.select("#central-text-3").style("display", "block").html(html3).attr("fill", "#555");
        }
        /** end of: select the right text between resistance and prevalence, and related exceptions. account for browsers. */
        window.setTimeout(function() {
            d3.select("#comparison-top-mask").style("display", "block");
        }, 150);
    }

    /**
     * Updates the nations percentage texts based on current selections
     */
    function updateNationsPercentage() {
        if (comparisonView) {
            gnationsText.selectAll(".nation-text-perc")
                .attr("font-weight", "bold")
                .text(function (d, k) {
                    if (data[k]) {
                        var val = getValueWithSelectedSpecies(data[k].value, comparisonViewA);
                        if (val < 0) {
                            return "";
                        } else if (val <= 100) {
                            return (+val.toFixed(1)).toLocaleString(lang)+"%";
                        }
                    }
                    return k+"?";
                });
            gnationsText.selectAll(".nation-text-perc-cmp")
                .attr("font-weight", "bold")
                .text(function (d, k) {
                    if (data[k]) {
                        var val = getValueWithSelectedSpecies(data[k].value, comparisonViewB);
                        if (val < 0) {
                            return "";
                        } else if (val <= 100) {
                            return (+val.toFixed(1)).toLocaleString(lang)+"%";
                        }
                    }
                    return k+"?";
                });
        } else {
            gnationsText.selectAll(".nation-text-perc")
                .attr("font-weight", "bold")
                .text(function (d, k) {
                    if (data[k]) {
                        var val = getValue(data[k].value);
                        if (val < 0) {
                            return "";
                        } else if (val <= 100) {
                            return (+val.toFixed(1)).toLocaleString(lang)+"%";
                        }
                    }
                    return "?";
                });
        }
    }

    /**
     * Calls all the functions to perform a graphic repaint due to data change
     */
    function dataChange() {
        if (dataIsChanging()) {
            return;
        }
        startDataChangingTransition();
        var xys = getXYSPositions(FREE_SPACE, radius_nations);
        var nxys = _.size(xys);
        d3.selectAll(".gooey-nationed").transition().duration(600).attr("r", function (d, i) {
            var limitTO = comparisonView ? 2*TO : TO;
            if (i < FROM || i >= limitTO) {
                return 0;
            }
            return 20;// i < nxys ? 20 : 0;
        }).attr("fill", palette_custom(10));
        d3.selectAll(".gooey-border").transition().duration(600).attr("r", function (d, i) {
            var limitTO = comparisonView ? 2*TO : TO;
            if (i < FROM || i >= limitTO) {
                return 0;
            }
            return 20;// i < nxys ? 20 : 0;
        });
        setupGuys(0);
        window.setTimeout(function () {
            disposeNations(xys, -1);
            updateNationsPercentage();
            stopDataChangingTransition();
            initializeExternalMacroareas();
            d3.selectAll(".macronations-line").attr("opacity", 1);
            d3.selectAll(".macronations-line-text").attr("opacity", 1);
            doTopMenus();
            setSwitchButton();
            d3.selectAll(".switch-button").style("display", comparisonView ? "none" : "block");
            window.setTimeout(checkForAvailableData, 600);
        }, 300);
    }
    
    /**
     * Checks if there are data to show
     * If not, shows a message to the user
     */
    function checkForAvailableData() {
        var dataAvailable = false;
        d3.selectAll(".gooey").each(function(d) {
            if (d3.select(this).attr("r") > 4) { // an arbitrary low value
                dataAvailable = true;
            }
        });
        d3.selectAll(".data-not-available-message").style("display", dataAvailable ? "none" : "block");
    }

    /**
     * Checks if a data change is in progress
     */
    function dataIsChanging() {
        return dataChangingTransition;
    }

    /**
     * Disables user interactions
     */
    function startDataChangingTransition() {
        dataChangingTransition = true;
    }

    /**
     * Enables user interactions
     */
    function stopDataChangingTransition() {
        dataChangingTransition = false;
    }

    /**
     * Closes one of the top menus
     * @param {int} type the type of the menu: 1 == bacteria selection, 2 == species selection, 3 == antimicrobials/countries selection
     */
    function closeMenu(type) {
        var size = 0;
        switch (type) {
            case 1:
                size = _.size(bacteria);
                break;
            case 2:
                size = _.size(species);
                break;
            case 3:
                if (focusOn === BACTERIA) {
                    size = _.size(antimicrobials) + 2;
                    break;
                } else {
                    size = _.size(countries) + 2;
                    break;
                }
        }
        if (type === 1 || type === 2) {
            d3.select(".sel" + type + "-menu").transition().ease(d3.easeLinear).delay(150).duration(200).attr("height", 0);
        } else {
            if (isSafari || isOldChrome) {
                d3.selectAll(".top-menu.sel3-menu").attr("opacity", 0).style("display", "none");
                d3.select("#menu-3-box").attr("opacity", 0).style("transform", "matrix(0.25, 0, 0, 0.08, 357, 435)");
            } else {
                d3.select("#menu-3-box").transition().duration(300).attr("opacity", 1).style("transform", "matrix(1, 0, 0, 0.08, 0, 435)");
                window.setTimeout(function() {
                    d3.select("#menu-3-box").transition().duration(300).attr("opacity", 0).style("transform", "matrix(0.25, 0, 0, 0.08, 357, 435)");
                    window.setTimeout(function() {
                        d3.selectAll(".top-menu.sel3-menu").attr("opacity", 0).style("display", "none");
                    }, 300);
                }, 300);
            }
        }
        if (type === 1 || type === 2) {
            d3.selectAll(".sel" + type + "-menu-item-back").transition().delay(function (d, i) {
                return (size - i - 1) * 8 + 20;
            }).attr("height", "0px");
        }
        if (type === 1 || type === 2) {
            d3.selectAll(".sel" + type + "-menu-item-text").transition().delay(function (d, i) {
                return (size - i - 1) * 20;
            }).attr("opacity", 0).style("display", "none");
        }
    }

    /**
     * Opens one of the top menus
     * @param {int} type the type of the menu: 1 == bacteria selection, 2 == species selection, 3 == antimicrobials/countries selection
     */
    function openMenu(type) {
        var size = 0;
        switch (type) {
            case 1:
                size = _.size(bacteria);
                break;
            case 2:
                size = _.size(species);
                break;
            case 3:
                if (focusOn === BACTERIA) {
                    size = _.size(antimicrobials)+.5;
                    break;
                } else {
                    size = _.size(countries)+.5;
                    break;
                }
        }
        if (type === 1 || type === 2) {
            d3.select(".sel" + type + "-menu").transition().ease(d3.easeLinear).duration(200).attr("height", size * MENU_ITEM_HEIGHT);
            d3.selectAll(".sel" + type + "-menu-item-back").style("display", "block").transition().delay(function (d, i) {
                return 50 + i * 15;
            }).attr("height", MENU_ITEM_HEIGHT+"px");
            d3.selectAll(".sel" + type + "-menu-item-text").style("display", "block").transition().delay(function (d, i) {
                return 20 + i * 15;
            }).attr("opacity", 1).attr("height", MENU_ITEM_HEIGHT+"px");
        } else {
            // svg menu
            if (isSafari || isOldChrome) {
                d3.selectAll(".top-menu.sel3-menu").attr("opacity", 1).style("display", "block");
                d3.select("#menu-3-box").attr("opacity", 1).style("transform", "scale(1,1)");
            } else {
                d3.selectAll(".top-menu.sel3-menu").attr("opacity", 0).style("display", "block").transition().duration(400).attr("opacity", 1);
                d3.select("#menu-3-box").transition().duration(400).attr("opacity", 1).style("transform", "matrix(1, 0, 0, 0.08, 0, 435)");
                window.setTimeout(function() {
                    d3.select("#menu-3-box").transition().duration(400).attr("opacity", 1).style("transform", "matrix(1, 0, 0, 1, 0, 0)");
                }, 400);
            }
        }
    }

    /**
     * Show or hide the top menu lists
     * @param {int} type the type of the menu: 1 == bacteria selection, 2 == species selection, 3 == antimicrobials/countries selection
     */
    function menuSelection(type) {
        if (dataIsChanging()) {
            return false;
        }
        if (d3.select(".sel" + type + "-menu").attr("height") > 0) {
            closeMenu(type);
            return;
        }
        switch (type) {
            case 1:
                closeMenu(2);
                closeMenu(3);
                break;
            case 2:
                closeMenu(1);
                closeMenu(3);
                break;
            case 3:
                closeMenu(1);
                closeMenu(2);
                break;
        }
        openMenu(type);
    }
    
    /**
     * Set max radius of current visualization
     */
    function setMaxRadius() {
        if (focusOn === BACTERIA) {
            max_nation_radius = comparisonView ? MAX_NATION_RADIUS_CMP : MAX_NATION_RADIUS;
        } else {
            max_nation_radius = MAX_NATION_RADIUS_INV;
        }
    }

    /**
     * Performs the click on a menu item
     * @param {int} type the type of the menu 1 == bacteria selection, 2 == species selection
     * @param {int} index the index of the clicked element
     */
    function menuClick(type, index) {
        if (dataIsChanging()) {
            return false;
        }
        closeMenu(type);
        var delay = 0;
        if (clicked !== null) {
            var bk = clicked;
            $($(".gooey-nationed")[clicked]).d3Trigger("click");
            $($(".gooey-nationed")[bk]).d3Trigger("mouseout");
            delay = 800;
        }

        window.setTimeout(function() {
            switch (type) {
                case 1:
                    selectedBact = index;
                    break;
                case 2:
                    selectedSpecies = index;
                    menu_selectedSpecies = index;
                    break;
                case 3:
                    selectedLev2 = index;
                    setSelectedLev2(false, null);
                    break;
            }
            if (type === 2) {
                if (selectedSpecies === COMPARISON_VIEW_1_MENU_INDEX) {
                    comparisonView = selectedSpecies;
                    comparisonViewA = COMPARISON_VIEW_1A;
                    comparisonViewB = COMPARISON_VIEW_1B;
                } else if (selectedSpecies === COMPARISON_VIEW_2_MENU_INDEX) {
                    comparisonView = selectedSpecies;
                    comparisonViewA = COMPARISON_VIEW_2A;
                    comparisonViewB = COMPARISON_VIEW_2B;
                } else {
                    comparisonView = null;
                }
            }
            setMaxRadius();

            if (comparisonView) {
                d3.select("#nations-line").attr("display", "none");
                d3.selectAll(".comparison-circle-guide").transition().ease(d3.easeExp).duration(1500).attr("opacity", 1);
                d3.select("#macronation-all-0").style("display", "none");
                d3.select("#macronation-all-text-0").style("display", "none");
            } else {
                d3.select("#nations-line").attr("display", "block");
                d3.selectAll(".comparison-circle-guide").transition().ease(d3.easeExp).duration(1500).attr("opacity", 0);
                d3.select("#macronation-all-0").style("display", "block");
                d3.select("#macronation-all-text-0").style("display", "block");
            }

            if (type === 2 && comparisonView && clickedMacronation === null) {
                $("#macronation2-3").d3Trigger("click");
            }

            if (type === 2) {
                if (selectedSpecies === 5 || selectedSpecies === 6) { // accounts for comparison at position #4
                    selectedSpecies --; 
                }
            }

            if (!comparisonView) {
                setupSelection();
            }


            dataChange();
        }, delay);
    }
    
    /**
     * Shows the correct text on the switch button
     */
    function setSwitchButton() {
        if (focusOn === BACTERIA) {
            d3.select("#switch-button-text").text(SWITCH_BUTTON_TEXT);
        } else {
            d3.select("#switch-button-text").text(SWITCH_BUTTON_TEXT_REVERSE);
        }
    }

    /**
     * Repaints drop down menus (the two on top and the central one)
     */
    function doTopMenus() {
        if (!datavizStarted) {
            return ;
        }

        d3.selectAll(".top-menu").remove();

        // left menu
        // lines
        svg.append("line").attr("class", "top-menu").attr("x1", -1500).attr("y1", 18).attr("x2", width / 2).attr("y2", 18).attr("stroke", "#000").attr("stroke-width", .5);
        svg.append("rect").attr("id", "menu-1").attr("class", "top-menu").attr("x", width/2-1500).attr("y", 20).attr("width", 1500).attr("height", 61 - 20).attr("fill", "#f6f6f6").attr("cursor", "pointer").on("click", function (d) {
            d3.event.stopPropagation();
            menuSelection(1);
        })/*.on("mouseover", function () {
        }).on("mouseout", function () {
        })*/;
        svg.append("line").attr("class", "top-menu").attr("x1", -1500).attr("y1", 63).attr("x2", width / 2).attr("y2", 63).attr("stroke", "#000").attr("stroke-width", .5);
        // selected text
        var bactText1 = dictionary.generic.bacteria[bacteria[selectedBact]].part_1.text;
        var bactText2 = dictionary.generic.bacteria[bacteria[selectedBact]].part_2.text;
        var italic = svg.append("text");
        italic.attr("class", "top-menu sel1").attr("x", width / 2 - 400).attr("y", 48).attr("font-size", dims_dictionary.top_menu.item[lang]).attr("font-weight", "300").attr("font-style", "italic").attr("fill", "#777777").text(bactText1).attr("pointer-events", "none");
        var italicWidth = 200;
        if (bactText1 === "Salmonella") {
            italicWidth = 80;
        } else if (bactText1 === "Campylobacter") {
            italicWidth = 120;
        }  else if (bactText1 === "Monophasische Salmonella") {
            italicWidth = 220;
        }// chosen by best-fit instead of ambigous: italic.node().getBoundingClientRect().width;
        svg.append("text").attr("class", "top-menu sel1").attr("x", width / 2 - 370 + italicWidth).attr("y", 48).attr("font-size", dims_dictionary.top_menu.item[lang]).attr("font-weight", "300").attr("fill", "#777777").text(bactText2).attr("pointer-events", "none");
        svg.append("line").attr("x1", width / 2 - 36).attr("y1", 45).attr("x2", width / 2 - 27).attr("y2", 37).attr("stroke", theme_green_dark).attr("stroke-width", 6).attr("cursor", "pointer").attr("pointer-events", "none");
        svg.append("line").attr("x1", width / 2 - 34).attr("y1", 45).attr("x2", width / 2 - 43).attr("y2", 37).attr("stroke", theme_green_dark).attr("stroke-width", 6).attr("cursor", "pointer").attr("pointer-events", "none");
        // background
        svg.append("rect").attr("class", "top-menu sel1-menu").attr("x", width / 2 - 420).attr("y", 61).attr("width", 400).attr("height", 0).attr("fill", "transparent").attr("fill-opacity", .8);
        // items
        _.each(bacteria, function (bact, i) {
            var weight = +i === selectedBact ? "bold" : "normal";
            svg.append("rect").attr("class", "top-menu sel1-menu-item-back").style("display", "none").attr("opacity", .90).attr("x", width / 2 - 420).attr("y", 65 + MENU_ITEM_HEIGHT * i).attr("width", 420).attr("height", 0).attr("fill", "#f0f0f0").attr("cursor", "pointer").attr("stroke", "#dcdcdc").on("mouseover", function (d) {
                d3.select(this).attr("opacity", .98);
                d3.select(this).attr("fill", "#fcfcfc");
            }).on("mouseout", function (d) {
                d3.select(this).attr("opacity", .90);
                d3.select(this).attr("fill", "#f6f6f6");
            }).on("click", function (d) {
                menuClick(1, i);
            });
            var bactText1 = dictionary.generic.bacteria[bact].part_1.text;
            var bactText2 = dictionary.generic.bacteria[bact].part_2.text;
            var italic = svg.append("text");
            italic.attr("class", "top-menu sel1-menu-item-text").attr("opacity", 0).attr("x", width / 2 - 400).attr("y", 90 + MENU_ITEM_HEIGHT * i).attr("fill", theme_green_dark).attr("font-size", dims_dictionary.top_menu.item[lang]).attr("font-weight", weight).attr("font-style", "italic").attr("pointer-events", "none").text(bactText1);
            italicWidth = 195;
            if (bactText1 === "Salmonella") {
                italicWidth = 75;
            } else if (bactText1 === "Campylobacter") {
                italicWidth = 115;
            }  else if (bactText1 === "Monophasische Salmonella") {
                italicWidth = 220;
            }// chosen by best-fit instead of ambigous: italic.node().getBoundingClientRect().width;
            svg.append("text").attr("class", "top-menu sel1-menu-item-text").style("display", "none").attr("opacity", 0).attr("x", width / 2 - 370 + italicWidth).attr("y", 90 + MENU_ITEM_HEIGHT * i).attr("fill", theme_green_dark).attr("font-size", dims_dictionary.top_menu.item[lang]).attr("font-weight", weight).attr("pointer-events", "none").text(bactText2);
        });

        // central pipe
        svg.append("line").attr("class", "top-menu").attr("x1", width / 2).attr("y1", 22).attr("x2", width / 2).attr("y2", 59).attr("stroke", "#888").attr("stroke-width", .5);

        // right menu
        // lines
        svg.append("line").attr("class", "top-menu").attr("x1", width / 2).attr("y1", 18).attr("x2", width + 1500).attr("y2", 18).attr("stroke", "#000").attr("stroke-width", .5);
        svg.append("rect").attr("id", "menu-2").attr("class", "top-menu").attr("x", width / 2).attr("y", 20).attr("width", 1500).attr("height", 61 - 20).attr("fill", "#f6f6f6").attr("cursor", "pointer").on("click", function (d) {
            d3.event.stopPropagation();
            menuSelection(2);
        })/*.on("mouseover", function () {
        }).on("mouseout", function () {
        })*/;
        svg.append("line").attr("class", "top-menu").attr("x1", width / 2).attr("y1", 63).attr("x2", width + 1500).attr("y2", 63).attr("stroke", "#000").attr("stroke-width", .5);
        // selected text
        svg.append("text").attr("class", "top-menu sel2").attr("x", width / 2 + 20).attr("y", 48).attr("font-size", dims_dictionary.top_menu.item[lang]).attr("font-weight", "300").attr("fill", "#777777").text(dictionary.generic.species[species[menu_selectedSpecies]]).attr("pointer-events", "none");
        svg.append("line").attr("x1", width / 2 + 351).attr("y1", 45).attr("x2", width / 2 + 342).attr("y2", 37).attr("stroke", theme_green_dark).attr("stroke-width", 6).attr("cursor", "pointer").attr("pointer-events", "none");
        svg.append("line").attr("x1", width / 2 + 349).attr("y1", 45).attr("x2", width / 2 + 358).attr("y2", 37).attr("stroke", theme_green_dark).attr("stroke-width", 6).attr("cursor", "pointer").attr("pointer-events", "none");
        // background
        svg.append("rect").attr("class", "top-menu sel2-menu").attr("x", width / 2).attr("y", 61).attr("width", 400).attr("height", 0).attr("fill", "transparent").attr("fill-opacity", .8);
        // items
        var ni = 0;
        _.each(species, function (spec, i) {
            if (i !== COMPARISON_VIEW_1_MENU_INDEX && i !== COMPARISON_VIEW_2_MENU_INDEX) { // 2018.02.26 rapid workaround to avoid showing comparison items
                var weight = +i === menu_selectedSpecies ? "bold" : "normal";
                svg.append("rect").attr("class", "top-menu sel2-menu-item-back").style("display", "none").attr("opacity", .90).attr("x", width / 2).attr("y", 65 + MENU_ITEM_HEIGHT * ni).attr("width", 400).attr("height", 0).attr("fill", "#f0f0f0").attr("stroke", "#dcdcdc")
                .attr("cursor", function(d) {
                    if (focusOn === BACTERIA || (i !== COMPARISON_VIEW_1_MENU_INDEX && i !== COMPARISON_VIEW_2_MENU_INDEX)) {
                        return "pointer";
                    }
                    return "default";
                })
                .on("mouseover", function (d) {
                    if (focusOn === BACTERIA || (i !== COMPARISON_VIEW_1_MENU_INDEX && i !== COMPARISON_VIEW_2_MENU_INDEX)) {
                        d3.select(this).attr("opacity", .98);
                        d3.select(this).attr("fill", "#fcfcfc");
                    } else {
                        d3.select(this).attr("opacity", .98);
                        d3.select(this).attr("fill", "#fcfcfc");
                    }
                }).on("mouseout", function (d) {
                    d3.select(this).attr("opacity", .90);
                    d3.select(this).attr("fill", "#f6f6f6");
                }).on("click", function (d) {
                    if (focusOn === BACTERIA || (i !== COMPARISON_VIEW_1_MENU_INDEX && i !== COMPARISON_VIEW_2_MENU_INDEX)) {
                        menuClick(2, i);
                    }
                });
                svg.append("text").attr("class", "top-menu sel2-menu-item-text").style("display", "none").attr("opacity", 0).attr("x", width / 2 + 20).attr("y", 90 + MENU_ITEM_HEIGHT * ni).attr("font-size", dims_dictionary.top_menu.item[lang]).attr("font-weight", weight).attr("pointer-events", "none").attr("fill", function(d) {
                    if (focusOn === BACTERIA || (i !== COMPARISON_VIEW_1_MENU_INDEX && i !== COMPARISON_VIEW_2_MENU_INDEX)) {
                        return theme_green_dark;
                    }
                    return "#b0b0b0";
                }).text(dictionary.generic.species[spec]);
                ni++;
            }
        });

        // central menu
        // background
        var menu3Title = focusOn === BACTERIA ? dictionary.other_labels.select_antimicrobial : dictionary.other_labels.select_country;
        var thirdMenuContainer = svg.append("g").attr("class", "top-menu sel3-menu").style("display", "none");
        //thirdMenuContainer.append("rect").attr("x", -2000).attr("y", -2000).attr("width", 4900).attr("height", 4000).attr("fill", "white").attr("opacity", .85);
        var thirdMenu = thirdMenuContainer.append("g").attr("id", "menu-3-box");
        thirdMenu.attr("opacity", 0);
        thirdMenu.style("transform", "matrix(0.25, 0, 0, 0.08, 357, 435)");
        thirdMenu.append("rect").attr("x", width/2-300).attr("y", height/2-300).attr("width", 600).attr("height", 600).attr("fill", "white").attr("stroke", theme_green_light).attr("stroke-width", 5)
            .on("click", function() {
                d3.event.stopPropagation();
            });
        thirdMenu.append("circle").attr("cx", width/2).attr("cy", height/2-300).attr("r", 30).attr("fill", "white").attr("stroke", theme_green_dark).attr("stroke-width", 5).attr("cursor", "pointer") // x's circle
            .on("mouseover", function() {
                d3.select(this).attr("fill", "#f6f6f6");
            })
            .on("mouseout", function() {
                d3.select(this).attr("fill", "#ffffff");
            });
        thirdMenu.append("line").attr("x1", width/2-15).attr("y1", height/2-315).attr("x2", width/2+15).attr("y2", height/2-285).attr("stroke", theme_green_light).attr("stroke-width", 5).attr("pointer-events", "none"); // x's line
        thirdMenu.append("line").attr("x1", width/2-15).attr("y1", height/2-285).attr("x2", width/2+15).attr("y2", height/2-315).attr("stroke", theme_green_light).attr("stroke-width", 5).attr("pointer-events", "none"); // x's line
        thirdMenu.append("text").attr("id", "third-menu-title").attr("x", width/2).attr("y", height/2-220).attr("text-anchor", "middle").attr("font-size", "26px").attr("font-weight", "bold").attr("fill", "#888").text(menu3Title);
        thirdMenu.append("circle").attr("cx", width/2-30).attr("cy", height/2-175).attr("r", 20).attr("fill", "white").attr("stroke", theme_green_light).attr("stroke-width", 3).attr("cursor", "pointer")
                .on("mouseover", function() {
                    d3.select(this).attr("fill", "#f6f6f6");
                })
                .on("mouseout", function() {
                    d3.select(this).attr("fill", "#ffffff");
                })
                .on("click", function() {
                    d3.event.stopPropagation();
                    scrollMenu3(+40);
                });
        thirdMenu.append("line").attr("x1", width/2-37).attr("y1", height/2-170).attr("x2", width/2-28).attr("y2", height/2-178).attr("stroke", theme_green_dark).attr("stroke-width", 5).attr("pointer-events", "none");
        thirdMenu.append("line").attr("x1", width/2-23).attr("y1", height/2-170).attr("x2", width/2-32).attr("y2", height/2-178).attr("stroke", theme_green_dark).attr("stroke-width", 5).attr("pointer-events", "none");;
        thirdMenu.append("circle").attr("cx", width/2+30).attr("cy", height/2-175).attr("r", 20).attr("fill", "white").attr("stroke", theme_green_light).attr("stroke-width", 3).attr("cursor", "pointer")
                .on("mouseover", function() {
                    d3.select(this).attr("fill", "#f6f6f6");
                })
                .on("mouseout", function() {
                    d3.select(this).attr("fill", "#ffffff");
                })
                .on("click", function() {
                    d3.event.stopPropagation();
                    scrollMenu3(-40);
                });
        thirdMenu.append("line").attr("x1", width/2+37).attr("y1", height/2-178).attr("x2", width/2+28).attr("y2", height/2-170).attr("stroke", theme_green_dark).attr("stroke-width", 5).attr("pointer-events", "none");;
        thirdMenu.append("line").attr("x1", width/2+23).attr("y1", height/2-178).attr("x2", width/2+32).attr("y2", height/2-170).attr("stroke", theme_green_dark).attr("stroke-width", 5).attr("pointer-events", "none");;
        // items
        var arr = [];
        if (focusOn === BACTERIA) {
            var tempArr = [];
            // prepare to reverse order
            _.each(antimicrobials, function(item, index) {
                tempArr[index] = {
                    "value": dictionary.generic.antimicrobials[item.trim()],
                    "index": index
                };
            });
            var x = _.size(tempArr);
            // reverse order
            for (var i = 0; i < x/2; i++) {
                var temp = tempArr[i];
                tempArr[i] = tempArr[x-i-1];
                tempArr[x-i-1] = temp;
            }
            arr = tempArr;
        } else {
            var tempArr = [];
            // prepare to order alphabetically
            _.each(countries, function(item, index) {
                tempArr[index] = {
                    "value": dictionary.generic.countries[item],
                    "index": index
                };
            });
            var x = _.size(tempArr);
            // order alphabetically
            for (var i = 0; i < x; i++) {
                for (var j = i+1; j < x; j++) {
                    if (tempArr[i].value > tempArr[j].value) {
                        var temp = tempArr[i];
                        tempArr[i] = tempArr[j];
                        tempArr[j] = temp;
                    }
                }
            }
            arr = tempArr;
        }
        _.each(arr, function (item, i) {
            var weight = +item.index === selectedLev2 ? "bold" : "normal";
            thirdMenu.append("rect").attr("class", "menu3-item").attr("x", width/2-200).attr("oy", height/2-130+50*i).attr("y", height/2-130+50*i).attr("width", 400).attr("height", 50).attr("fill", "#fff").attr("opacity", .25).attr("cursor", "pointer").on("mouseover", function (d) {
                d3.select(this).attr("fill", theme_green_dark);
            }).on("mouseout", function (d) {
                d3.select(this).attr("fill", "white");
            }).on("click", function (d) {
                menuClick(3, item.index);
            }).attr("clip-path", "url(#clipper4)");
            thirdMenu.append("text").attr("class", "menu3-item").attr("x", width/2).attr("oy", height/2-97+50*i).attr("y", height/2-97+50*i).attr("fill", "#156674").attr("font-size", "24px").attr("font-weight", weight).attr("text-anchor", "middle").attr("pointer-events", "none").text(item.value.capitalizeFirstLetter()).attr("clip-path", "url(#clipper4)");
        });
        // http://stackoverflow.com/questions/25204282/mousewheel-wheel-and-dommousescroll-in-javascript
        var wheelEvt = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
          document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
          "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox
        thirdMenu.on(wheelEvt, function() {
            var delta = d3.event.deltaY;
            if (!delta) {
                delta = -d3.event.wheelDelta; // IE
            }
            scrollMenu3(delta > 0 ? -30 : +30);
        });
    }
    var menu3Translation = 0;
    function scrollMenu3(dir) {
        var maxHeight = focusOn === BACTERIA ? -30*_.size(antimicrobials) : -37*_.size(countries);
        if ((dir > 0 && menu3Translation < 0) || (dir < 0 && menu3Translation >= maxHeight)) {
            menu3Translation += dir;
            d3.selectAll(".menu3-item").attr("y", function(d) {return +d3.select(this).attr("oy")+menu3Translation;});
        }
    }

    /**
     * Performs all the animations and operations to do after the initial selection
     */
    function afterInitialSelection() {
        initializeExternalMacroareas();
        var xys = getXYSPositions(FREE_SPACE, radius_nations);
        var nxys = _.size(xys);
        var ni = 0;
        for (var i = 0; i < 2*nxys; i++) {
            var x = width / 2;
            var y = height / 2;
            x = xys[ni].x;
            y = xys[ni].y;
            svg.append("circle").attr("class", "gooey-border")
                .attr("stroke", "#fff")
                .attr("stroke-width", 1.5)
                .attr("fill", "transparent")
                .attr("opacity", 0)
                .attr("cx", x)
                .attr("cy", y)
                .style("pointer-events", "none");
            ni++;
            if (ni === nxys) { // reset ni
                ni = 0;
            }
        }
        window.setTimeout(function () {
            d3.selectAll(".nation-text")
                    .attr("x", function (d, i) {
                        return xys[i].x;
                    })
                    .attr("y", function (d, i) {
                        var y = xys[i].y + 5;
                        d3.select(this).attr("oy", y);
                        return y;
                    });
            d3.selectAll(".nation-text-perc").attr("opacity", 0)
                    .attr("x", function (d, i) {
                        return xys[i].x;
                    })
                    .attr("y", function (d, i) {
                        return xys[i].y + 20;
                    });
            d3.selectAll(".gooey-nationed")
                    .on("mouseover", function (d, id) {
                        if (d.code === "EU") { // EU
                            hovered = id;
                            disposeNations(getXYSPositions(FREE_SPACE, radius_nations), id);
                            return ;
                        }
                        if (clicked !== id) {
                            hovered = id;
                            var xys = resizeXYS(getXYSPositions(FREE_SPACE, radius_nations), hovered);
                            clicked && (xys = resizeXYS(xys, clicked));
                            disposeNations(xys, id);
                        }
                    })
                    .on("mouseout", function (d, id) {
                        if (clicked !== id) {
                            hovered = null;
                            var xys = getXYSPositions(FREE_SPACE, radius_nations);
                            clicked && (xys = resizeXYS(xys, clicked));
                            disposeNations(xys, id);
                        }
                    })
                    .on("click", function (d, id) {
                        if (dataIsChanging()) {
                            return false;
                        }
                        updateNationsPercentage();
                        startDataChangingTransition();
                        nationClick(d, id, d3.select(this), id);
                        window.setTimeout(stopDataChangingTransition, 600);
                    });
            window.setTimeout(decreaseWatering, 1000);
            d3.select("#blurf").transition().delay(3000).duration(300).attr("stdDeviation", 3);
            
            centralTextLinesTop.style("display", "block");
            centralTextLinesBottom.style("display", "block");
            d3.selectAll(".switch-button").style("display", "block");
            
            window.setTimeout(function () {
                svg.selectAll(".gooey-border").attr("opacity", 1);
                d3.select("#menu-central").attr("opacity", 1);
                d3.selectAll(".gooey-unnationed").remove();
                centralTextLinesTop.attr("opacity", 1);
                centralTextLinesBottom.attr("opacity", 1);
            }, 3000);
        }, 1000);

        doTopMenus();
        setSwitchButton();
        
        d3.selectAll(".macronations-line").transition().duration(1000).attr("opacity", 1);
        d3.select("#glass-ext").transition().duration(2000).ease(d3.easeLinear).attr("opacity", 0).attr("stroke", 0);
        d3.selectAll(".circular-selector")
                .transition().delay(1800).duration(1800).ease(d3.easeLinear)
                .attr("r", central_selector_radius);
        d3.selectAll(".macronations-line-text").transition().delay(1800).duration(2000).attr("opacity", 1);
        d3.selectAll(".central-text").style("display", "block").transition().delay(1800).duration(2000).attr("opacity", 1);
        d3.select("#glass-intra").transition().delay(1400).duration(1400).attr("r", radius_macronations).attr("opacity", 0);
        d3.selectAll(".glass-int").transition().delay(1400).duration(1400).ease(d3.easeLinear).attr("r", radius_center);
        window.setTimeout(function () {
            bacteriaGroupContainerClone.style("display", "block");
            bacteriaGroup.exit().remove();
        }, 4000);
    }

    /**
     * The click event on a nation-bacteria
     * @param {object} d the clicked object
     * @param {ind} i the index of the clicked object
     */
    function gooeyClick(d, i) {   
        d3.selectAll(".column p").transition().duration(4000).style("color", "#e0e0e0");
        var p = d.p;
        var nextDelay = 0;
        if (isChrome) {
            svg.selectAll(".gooey").filter(function (d, j) {
                return d.p != p;
            }).transition().duration(300).attr("r", 0);
        } else {
            nextDelay = 0;
            svg.selectAll(".gooey").filter(function (d, j) {
                return d.p != p;
            }).attr("r", 0)
        }
        d3.select("#nations-line").transition().delay(2000).duration(5000).attr("r", radius_nations);
        // removed on 2017.01.09 d3.select(".glass-int-reflection").transition().delay(2000).duration(3000).attr("r", 0);
        svg.selectAll(".gooey").filter(function (d, j) {
            return d.p == p;
        })
                .attr("class", "gooey gooey-nationed")
                .attr("stroke", "#fff")
                .attr("stroke-width", 0)
                .attr("clip-path", "none");
        svg.selectAll(".gooey").filter(function (d, j) {
            return d.p != p;
        })
                .attr("class", "gooey gooey-unnationed")
                .attr("stroke", "#fff")
                .attr("stroke-width", 0)
                .attr("clip-path", "none");
        startingSelection = p;
        setupGuys(nextDelay);
        d3.select("#central-border").transition().duration(1000).attr("r", radius_center + 5);
        d3.selectAll(".glass-int").transition().duration(1000).attr("stroke-width", 0);
        window.setTimeout(function () {
            increaseWatering();
            svg.selectAll(".gooey").filter(function (d, j) {
                return d.p != p;
            }).attr("r", 0);
            afterInitialSelection();
        }, 1000);
        window.setTimeout(function () {
            var xys = getXYSPositions(FREE_SPACE, radius_nations);
            disposeNations(xys, -1);
        }, 6000);
    }

    /**
     * Increases the watering effect
     */
    function increaseWatering() {
        var cmf = 20;
        var mf = setInterval(function () {
            d3.select("#filterS2 feColorMatrix").attr("values", getFilterValues(cmf));
            cmf++;
            if (cmf > 100) {
                clearInterval(mf);
            }
        }, 10);
    }

    /**
     * Decreases the watering effect
     */
    function decreaseWatering() {
        var cmf = 100;
        var mf = setInterval(function () {
            d3.select("#filterS2 feColorMatrix").attr("values", getFilterValues(cmf));
            cmf--;
            if (cmf < 7) {
                clearInterval(mf);
            }
        }, 30);
    }

    // http://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }
    // http://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
    function describeArc(x, y, radius, startAngle, endAngle) {
        var start = polarToCartesian(x, y, radius, endAngle);
        var end = polarToCartesian(x, y, radius, startAngle);
        var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        var d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
        return d;
    }

    /**
     * Event trigger
     * @param {string} type the name of the event
     */
    jQuery.fn.d3Trigger = function (type) {
        this.each(function (i, e) {
            //var evt = new MouseEvent(type);
            var evt = document.createEvent("MouseEvent");
            evt.initMouseEvent(type,true,true,window,0,0,0,0,0,false,false,false,false,0,null);
            e.dispatchEvent(evt);
        });
    };

    /**
     * Capitalizes the first letter of a string
     * @returns the capitalized string
     */
    String.prototype.capitalizeFirstLetter = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    /**
     * When a nation is clicked, shows or hides the central circle
     * @param {object} d the clicked object
     * @param {int} id the id of the clicked object
     * @param {object} that the clicked object
     * @param {int} ii the index of the clicked object
     */
    function nationClick(d, id, that, ii) {
        closeMenu(1);closeMenu(2);closeMenu(3);
        if (clicked === id) {
            if (ii > data.length) {
                ii -= data.length;
            }
            clicked = null;
            hideCentralCircle();
            d3.selectAll(".nation-text-perc").filter(function (d, i) {
                return i == id || i+countries.length == id;
            }).text(function (d, i) {
                var val = comparisonView ? getValueWithSelectedSpecies(data[ii].value, comparisonViewA) : getValue(data[ii].value);
                if (val < 0) {
                    return "";
                } else if (val <= 100) {
                    return (+val.toFixed(1)).toLocaleString(lang)+"%";
                }
            }).attr("font-weight", "bold").attr("font-size", 29);
            d3.selectAll(".nation-text-perc-cmp").filter(function (d, i) {
                return i == id || i+countries.length == id;
            }).text(function (d, i) {
                if (comparisonView) {
                    var val = getValueWithSelectedSpecies(data[ii].value, comparisonViewB);
                    if (val < 0) {
                        return "";
                    } else if (val <= 100) {
                        return (+val.toFixed(1)).toLocaleString(lang)+"%";
                    }
                } else {
                    return "?%";
                }
            });
        } else {
            clicked = id;
            var nxys = focusOn === BACTERIA ? _.size(countries) : _.size(antimicrobials);
            var iii = ii > data.length ? ii-data.length : ii;
            clickedName = data[iii].name;
            if (comparisonView) {
                showCentralCircleForComparison(that, d, id, ii);
            } else {
                showCentralCircle(that, d, ii);
            }
            d3.selectAll(".nation-text-perc").filter(function (d, i) {
                return i == id || i+countries.length == id;
            }).text("x").attr("font-weight", 100).attr("font-size", 40);
            d3.selectAll(".nation-text-perc-cmp").filter(function (d, i) {
                return i == id || i+countries.length == id;
            }).text("");
            var xys = getXYSPositions(FREE_SPACE, radius_nations);
            if (d.code !== "EU") {
                clicked && (xys = resizeXYS(xys, clicked));
            }
            disposeNations(xys, id);
        }
    }

    /**
     * Switches the currently selected zoomed area
     * @param {type} d the clicked area
     * @param {type} i the index of the clicked area
     * @param {type} that the clicked area
     * @param {type} callback a callback function
     */
    function switchareaZoom(d, i, that, callback) {
        var key = that.attr("key");
        d3.select(".macronation-line-text-"+oclickedMacronation).select("textPath").text(macronationsNames[i]);
        clickedMacronation = i;
        setMacroareaBackLabels();
        var redisposeFrom, redisposeTo;
        switch (key) {
            case "E":
                redisposeFrom = 0;
                redisposeTo = macroareasSize[key];
                break;
            case "S":
                redisposeFrom = macroareasSize["E"];
                redisposeTo = macroareasSize[key];
                break;
            case "W":
                redisposeFrom = macroareasSize["S"];
                redisposeTo = macroareasSize[key];
                break;
            case "N":
                redisposeFrom = macroareasSize["W"];
                redisposeTo = macroareasSize[key];
                break;
        }
        FROM = redisposeFrom;
        TO = redisposeTo;
        setSelectedLev2(false, null);
        refresh(false);
        var xys = getXYSPositions(FREE_SPACE, radius_nations);
        disposeNations(xys, -1);
        callback();
        return ;
    }

    /**
     * Performs macroarea zooming
     * @param {type} d the clicked area
     * @param {type} i the index of the clicked area
     * @param {type} that the clicked area
     * @param {type} callback a callback function
     */
    function macroareaZoom(d, i, that, callback) {
        if (macroareasAreMoving) {
            return;
        }

        if (clicked) {
            hovered = null;
            nationClick(null, clicked, null, clicked);
            clicked = null;
        }
        
        var STEP = .03;
        var STEP_BLOCK = .031;
        if (isIE || isSafari) {
            STEP = .06;
            STEP_BLOCK = .062;
        }

        if (clickedMacronation !== null) {
            svg.selectAll(".macronation-all-guide").attr("opacity", 0);
            macroareasAreMoving = true;
            var key = that.attr("key");
            var wantedFrom = 0;
            var wantedTo = odata.length;
            switch (key) {
                case "E":
                    redisposeFrom = 0;
                    redisposeTo = macroareasSize[key];
                    break;
                case "S":
                    redisposeFrom = macroareasSize["E"];
                    redisposeTo = macroareasSize[key];
                    break;
                case "W":
                    redisposeFrom = macroareasSize["S"];
                    redisposeTo = macroareasSize[key];
                    break;
                case "N":
                    redisposeFrom = macroareasSize["W"];
                    redisposeTo = macroareasSize[key];
                    break;
            }
            if (isIE || isSafari || isLittleScreen) {
                FROM = wantedFrom;
                TO = wantedTo;
            } else {
                var redispose = setInterval(function () {
                    if (redisposeFrom > wantedFrom) {
                        redisposeFrom--;
                    }
                    if (redisposeTo < wantedTo) {
                        redisposeTo++;
                    }
                    FROM = redisposeFrom;
                    TO = redisposeTo;
                    refresh(true);
                    if (redisposeFrom <= wantedFrom && redisposeTo >= wantedTo) {
                        clearInterval(redispose);
                    }
                }, 50);
            }
            var start = 2.2;
            var end = Math.PI * 2 - 2.2;
            var myStart = +d3.select("#macronation2-" + i).attr("startAngle");
            var myEnd = +d3.select("#macronation2-" + i).attr("endAngle");
            var start2 = 2.2;
            var end2 = Math.PI * 2 - 2.2;
            var myStart2 = +d3.select("#macronation2b-" + i).attr("startAngle");
            var myEnd2 = +d3.select("#macronation2b-" + i).attr("endAngle");
            var filtered = d3.select("#macronation2-" + i);
            var filteredb = d3.select("#macronation2b-" + i);
            var mni = setInterval(function () {
                var newArc = d3.arc().innerRadius(radius_macronations).outerRadius(radius_macronations + 45).startAngle(start).endAngle(end);
                filtered.attr("d", newArc);
                var newArc = d3.arc().innerRadius(radius_macronations).outerRadius(radius_macronations + 8).startAngle(start2).endAngle(end2);
                filteredb.attr("d", newArc);
                var clear = true;
                if (Math.abs(myStart - start) > STEP_BLOCK) {
                    if (myStart > start) {
                        start += STEP;
                    } else {
                        start -= STEP;
                    }
                    clear = false;
                }
                if (Math.abs(myStart2 - start2) > STEP_BLOCK) {
                    if (myStart2 > start2) {
                        start2 += STEP;
                    } else {
                        start2 -= STEP;
                    }
                    clear = false;
                }
                if (Math.abs(myEnd - end) > STEP_BLOCK) {
                    if (myEnd < end) {
                        end -= STEP;
                    } else {
                        end += STEP;
                    }
                    clear = false;
                }
                if (Math.abs(myEnd2 - end2) > STEP_BLOCK) {
                    if (myEnd2 < end2) {
                        end2 -= STEP;
                    } else {
                        end2 += STEP;
                    }
                    clear = false;
                }
                if (clear) {
                    var newArc = d3.arc().innerRadius(radius_macronations).outerRadius(radius_macronations + 45).startAngle(myStart).endAngle(myEnd);
                    filtered.attr("d", newArc);
                    var newArc = d3.arc().innerRadius(radius_macronations).outerRadius(radius_macronations + 8).startAngle(myStart2).endAngle(myEnd2);
                    filteredb.attr("d", newArc);
                    clearInterval(mni);
                }
            }, 6);
            clickedMacronation = null;
            if (!isSafari) { // for some reason, safari can't do this
                d3.select(".macronation-line-text-"+i).select("textPath").attr("startOffset", d3.select(".macronation-line-text-"+i).select("textPath").attr("ostartOffset"));
            }
            d3.select(".macronation-line-text-"+i).attr("dy", d3.select(".macronation-line-text-"+i).attr("ody"));
            d3.selectAll(".macronation-line-" + i).attr("cursor", "pointer");
            d3.selectAll(".macronation-all").style("display", "none");
            d3.selectAll(".macronation-all-text").style("display", "none");
            if (isIE || isSafari || isLittleScreen) {
                window.setTimeout(function () {
                    refresh(true);
                    updateNationsPercentage();
                }, 600);
            }
            window.setTimeout(function () {
                for (var j = 0; j < 4; j++) {
                    if (i != j) {
                        d3.selectAll(".macronation-line-" + j).transition().duration(200).style("display", "block");
                        d3.selectAll(".macronation-line-text-" + j).transition().duration(200).style("display", "block");
                    }
                }
                d3.selectAll(".macronations-line").transition().duration(800).attr("opacity", 1);
                d3.selectAll(".macronations-line-sec").transition().duration(800).attr("opacity", 1);
                d3.selectAll(".macronations-line-text").transition().duration(800).attr("opacity", 1);
                macroareasAreMoving = false;
                setSelectedLev2(false, null);
                callback();
            }, 1000);
        } else {
            svg.selectAll(".macronation-all-guide").attr("opacity", 1);
            macroareasAreMoving = true;
            clickedMacronation = i;
            setupSelection();
            for (var j = 0; j < 4; j++) {
                if (i != j) {
                    d3.selectAll(".macronation-line-" + j).transition().duration(200).attr("opacity", 0);
                    d3.selectAll(".macronation-line-text-" + j).transition().duration(200).attr("opacity", 0);
                }
            }
            window.setTimeout(function () {
                for (var j = 0; j < 4; j++) {
                    if (i != j) {
                        d3.selectAll(".macronation-line-" + j).transition().duration(200).style("display", "none");
                        d3.selectAll(".macronation-line-text-" + j).transition().duration(200).style("display", "none");
                    }
                }
                d3.select(".macronation-line-text-"+i).select("textPath").attr("startOffset", "75%");
                d3.select(".macronation-line-text-"+i).attr("dy", 32);
                d3.selectAll(".macronation-line-" + i).attr("cursor", "default");
            }, 250);
            var line = d3.select(".macronation-line-" + i);
            var key = that.attr("key");
            var wantedFrom = 0;
            var wantedTo = odata.length - 1;
            switch (key) {
                case "E":
                    wantedFrom = 0;
                    wantedTo = macroareasSize[key] - 1;
                    break;
                case "S":
                    wantedFrom = macroareasSize["E"];
                    wantedTo = macroareasSize[key] - 1;
                    break;
                case "W":
                    wantedFrom = macroareasSize["S"] + 1;
                    wantedTo = macroareasSize[key];
                    break;
                case "N":
                    wantedFrom = macroareasSize["W"] + 1;
                    wantedTo = macroareasSize[key];
                    break;
            }
            var redisposeFrom = 0, redisposeTo = odata.length;
            if (isIE || isSafari || isLittleScreen) {
                FROM = wantedFrom-1;
                TO = wantedTo;
                refresh(true);
            } else {
                var redispose = setInterval(function () {
                    FROM = redisposeFrom;
                    TO = redisposeTo;
                    refresh(true);
                    if (redisposeFrom < wantedFrom) {
                        redisposeFrom++;
                    }
                    if (redisposeTo > wantedTo) {
                        redisposeTo--;
                    }
                    if (redisposeFrom >= wantedFrom && redisposeTo <= wantedTo) {
                        clearInterval(redispose);
                    }
                }, 50);
            }
            var start = 2.2;
            var end = Math.PI * 2 - 2.2;
            var myStart = +line.attr("startAngle");
            var myEnd = +line.attr("endAngle");
            var start2 = 2.2;
            var end2 = Math.PI * 2 - 2.2;
            var myStart2 = +line.attr("startAngle");
            var myEnd2 = +line.attr("endAngle");
            var filtered = d3.select("#macronation2-" + i);
            var filteredb = d3.select("#macronation2b-" + i);
            if (isSafari || isLittleScreen) {
                var newArc = d3.arc().innerRadius(radius_macronations).outerRadius(radius_macronations + 45).startAngle(start).endAngle(end);
                filtered.attr("d", newArc);
                var newArc = d3.arc().innerRadius(radius_macronations).outerRadius(radius_macronations + 8).startAngle(start2).endAngle(end2);
                filteredb.attr("d", newArc);
            } else {
                var mni = setInterval(function () {
                    var newArc = d3.arc().innerRadius(radius_macronations).outerRadius(radius_macronations + 45).startAngle(myStart).endAngle(myEnd);
                    filtered.attr("d", newArc);
                    var newArc = d3.arc().innerRadius(radius_macronations).outerRadius(radius_macronations + 8).startAngle(myStart2).endAngle(myEnd2);
                    filteredb.attr("d", newArc);
                    if (Math.abs(myStart2 - start2) > STEP_BLOCK) {
                        if (start2 > myStart2) {
                            myStart2 += STEP;
                        } else {
                            myStart2 -= STEP;
                        }
                    }
                    if (Math.abs(myEnd2 - end2) > STEP_BLOCK) {
                        if (end2 > myEnd2) {
                            myEnd2 += STEP;
                        } else {
                            myEnd2 -= STEP;
                        }
                    }

                    if (Math.abs(myStart - start) > STEP_BLOCK) {
                        if (start > myStart) {
                            myStart += STEP;
                        } else {
                            myStart -= STEP;
                        }
                    }
                    if (Math.abs(myEnd - end) > STEP_BLOCK) {
                        if (end > myEnd) {
                            myEnd += STEP;
                        } else {
                            myEnd -= STEP;
                        }
                    }
                    if (myStart2 <= start2 && myEnd2 >= end2) {
                        var newArc = d3.arc().innerRadius(radius_macronations).outerRadius(radius_macronations + 45).startAngle(start).endAngle(end);
                        filtered.attr("d", newArc);
                        var newArc = d3.arc().innerRadius(radius_macronations).outerRadius(radius_macronations + 8).startAngle(start2).endAngle(end2);
                        filteredb.attr("d", newArc);
                        clearInterval(mni);
                    }
                }, 6);
            }
            setMacroareaBackLabels();
            
            window.setTimeout(function () {
                macroareasAreMoving = false;
                callback();
            }, 1000);
        }
    }
    
    /**
     * Places the correct text on the short macroareas labels
     */
    function setMacroareaBackLabels() {
        var backLabelsTexts = [dictionary.macroregions["all"], dictionary.macroregions["e"], dictionary.macroregions["s"], dictionary.macroregions["w"], dictionary.macroregions["n"]];
        var n = 0;
        _.each(backLabelsTexts, function(item, index) {
            if (index-1 != clickedMacronation) {
                d3.select("#macronation-all-text-"+n).select("textPath").text(item);
                d3.select("#macronation-all-"+n).attr("key", item);
                n++;
            }
        });
        d3.selectAll(".macronation-all").style("display", "block");
        d3.selectAll(".macronation-all-text").style("display", "block");
        if (comparisonView) {
            d3.select("#macronation-all-0").style("display", "none");
            d3.select("#macronation-all-text-0").style("display", "none");
        }
    }

    /**
     * It does something on screen resize
     */
    function resizeEvent() {
        if ($(window).outerWidth() < 1001) {
            //debug $("#screenalert").removeClass("hidden");
        } else {
            //debug $("#screenalert").addClass("hidden");
        }
    }
    resizeEvent();
    $(window).on("resize", resizeEvent);
    $(window).on("click", function() { // close all the menus
        closeMenu(1);
        closeMenu(2);
        closeMenu(3);
    });
});

function topMenu() {
	var p = $( "#menu-1" );
	var l = $( "#legend" );
	if( (p.length == 0)) {
	
	} else {
		var pos = p.position();
		if (pos.top>50) {
			//$('#logo-container-top').css('top','0');
			$('#logo-container-top').stop().animate( {top:0}, 200);
		} else {
			var posl = l.position();
			//$('#logo-container-top').css('top',(posl.top-50));
			$('#logo-container-top').stop().animate( {top:(posl.top-50)}, 300);
		}
	}
}


$( ".home-box" ).click(function() {
	window.location.reload();
});
$('.info-box').click(function() {
	if ($('#container').css('opacity') == '1') {
		$('#info').show(500);
		$('#container').animate( {opacity:0.2}, 1000 );
	} else {
		$('#info').hide(300);
		$('#container').animate( {opacity:1}, 500);
	}
	
});
$('#info').click(function() {
	$('#info').hide(300);
	$('#container').animate( {opacity:1}, 500);
});
$('.copy-box').click(function() {
	if ($('#container').css('opacity') == '1') {
		$('#copy').show(500);
		$('#container').animate( {opacity:0.2}, 1000, function() {});
	} else {
		$('#copy').hide(300);
		$('#container').animate( {opacity:1}, 500, function() {});
	}
});
$( "#copy" ).click(function() {
	$( "#copy" ).hide(300);
	$('#container').animate( {opacity:1}, 500, function() {});
});

$( "#orientation" ).click(function() {
	$( "#orientation" ).hide(300);
	$('#container').animate( {opacity:1}, 500, function() {});
});

$( "#screen" ).click(function() {
	$( "#screen" ).hide(300);
	$('#container').animate( {opacity:1}, 500, function() {});
});

  $( ".language-box" ).animate( {
      opacity:1,
  }, 2000, function() {
  });
$( ".social-box" ).animate( {
	opacity:1,
}, 2000, function() {
});
$( ".info-box" ).animate( {
	opacity:1,
}, 3000, function() {
});
$( ".copy-box" ).animate( {
	opacity:1,
}, 4000, function() {
});




$( window ).resize(function() {
	topMenu();
});



// check orientation
if(window.innerHeight < window.innerWidth  && window.innerWidth<720){
	if ($('#container').css('opacity') == '1') {
		$('#orientation').show(500);
		$('#container').animate( {opacity:0.2}, 1000, function() {});
	} else {
		$('#orientation').hide(300);
		$('#container').animate( {opacity:1}, 500, function() {});
	}
} else {
	if(window.innerWidth<640 || window.innerHeight<450){
		if ($('#container').css('opacity') == '1') {
			$('#screen').show(500);
			$('#container').animate( {opacity:0.2}, 1000, function() {});
		} else {
			$('#screen').hide(300);
			$('#container').animate( {opacity:1}, 500, function() {});
		}
	}
	
}

	
function activateBox() {
	$( "#legend-container" ).animate( {
		opacity:1,
		
	}, 2500, function() {
	});
	
	$( ".home-box" ).animate( {
		opacity:1,
	}, 1000, function() {
	});
	
	

	$( "#logo-container" ).animate( {
		opacity:1,
	}, 3500, function() {
	});
	$( "#logo-container-top" ).animate( {
		opacity:1,
	}, 3500, function() {
	});

      var resizeItem = function (animate) {
          var containerHeight = $(window).height();
          var legendHeight = $('#legend').height();
          var newHeight = containerHeight - legendHeight+50;
          newHeight = newHeight + 'px';

          if(animate) {
              $( "#container" ).animate( {
                  height: newHeight,
              }, 3500, function() {
              });
          } else {
              $('#container').height(newHeight);
          }
      };

      resizeItem(true);
      $(window).resize(function() {resizeItem(false)});
	
	
	setTimeout(topMenu, 8000);
}

$(function () {
	    var url = 'https://www.efsa.europa.eu/interactive_pages/AMR_Report_2016',
            container = triggerContainer = $('.social-box');

    function sdvSocialSharePopUp(URL) {
        day = new Date();
        id = day.getTime();
        eval("page" + id + " = window.open('" + URL + "', '" + id + "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=500,height=500,left = 710,top = 290');");
    }

	    jQuery('.tw-share').attr('href', 'https://twitter.com/intent/tweet?text=%23AntimicrobialResistance%20in%20Europe%20in%20food%2C%20animals%20and%20humans.%20Explore%20%23data%20country%20by%20country&url=' + url + '%20%40EFSA_EU&related=EFSA_EU');
	    jQuery('.fb-share').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + url);
	    jQuery('.in-share').attr('href', 'https://www.linkedin.com/shareArticle?mini=true&url=' + url);

      $('.social-box').hover(
          function (e) {
              e.preventDefault();
              $(this).find('.share').stop().animate({left: '100%'}, 400);
          },
          function (e) {
              e.preventDefault();
              $(this).find('.share').stop().animate({left: '-400%'}, 400);
          });

      $('.language-box').hover(
          function (e) {
              e.preventDefault();
              $(this).find('.languages').stop().animate({left: '100%'}, 400);
          },
          function (e) {
              e.preventDefault();
              $(this).find('.languages').stop().animate({left: '-500%'}, 400);
          });

    $('.share a').click(function (e) {
        e.preventDefault();
        thisUrl = $(this).attr('href');
        sdvSocialSharePopUp(thisUrl);
    });
});