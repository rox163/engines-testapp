(function() {
    "use strict";
    var ember$inflector$lib$system$inflector$$capitalize = Ember.String.capitalize;

    var ember$inflector$lib$system$inflector$$BLANK_REGEX = /^\s*$/;
    var ember$inflector$lib$system$inflector$$LAST_WORD_DASHED_REGEX = /(\w+[_-])([a-z\d]+$)/;
    var ember$inflector$lib$system$inflector$$LAST_WORD_CAMELIZED_REGEX = /(\w+)([A-Z][a-z\d]*$)/;
    var ember$inflector$lib$system$inflector$$CAMELIZED_REGEX = /[A-Z][a-z\d]*$/;

    function ember$inflector$lib$system$inflector$$loadUncountable(rules, uncountable) {
      for (var i = 0, length = uncountable.length; i < length; i++) {
        rules.uncountable[uncountable[i].toLowerCase()] = true;
      }
    }

    function ember$inflector$lib$system$inflector$$loadIrregular(rules, irregularPairs) {
      var pair;

      for (var i = 0, length = irregularPairs.length; i < length; i++) {
        pair = irregularPairs[i];

        //pluralizing
        rules.irregular[pair[0].toLowerCase()] = pair[1];
        rules.irregular[pair[1].toLowerCase()] = pair[1];

        //singularizing
        rules.irregularInverse[pair[1].toLowerCase()] = pair[0];
        rules.irregularInverse[pair[0].toLowerCase()] = pair[0];
      }
    }

    /**
      Inflector.Ember provides a mechanism for supplying inflection rules for your
      application. Ember includes a default set of inflection rules, and provides an
      API for providing additional rules.

      Examples:

      Creating an inflector with no rules.

      ```js
      var inflector = new Ember.Inflector();
      ```

      Creating an inflector with the default ember ruleset.

      ```js
      var inflector = new Ember.Inflector(Ember.Inflector.defaultRules);

      inflector.pluralize('cow'); //=> 'kine'
      inflector.singularize('kine'); //=> 'cow'
      ```

      Creating an inflector and adding rules later.

      ```javascript
      var inflector = Ember.Inflector.inflector;

      inflector.pluralize('advice'); // => 'advices'
      inflector.uncountable('advice');
      inflector.pluralize('advice'); // => 'advice'

      inflector.pluralize('formula'); // => 'formulas'
      inflector.irregular('formula', 'formulae');
      inflector.pluralize('formula'); // => 'formulae'

      // you would not need to add these as they are the default rules
      inflector.plural(/$/, 's');
      inflector.singular(/s$/i, '');
      ```

      Creating an inflector with a nondefault ruleset.

      ```javascript
      var rules = {
        plurals:  [ /$/, 's' ],
        singular: [ /\s$/, '' ],
        irregularPairs: [
          [ 'cow', 'kine' ]
        ],
        uncountable: [ 'fish' ]
      };

      var inflector = new Ember.Inflector(rules);
      ```

      @class Inflector
      @namespace Ember
    */
    function ember$inflector$lib$system$inflector$$Inflector(ruleSet) {
      ruleSet = ruleSet || {};
      ruleSet.uncountable = ruleSet.uncountable || ember$inflector$lib$system$inflector$$makeDictionary();
      ruleSet.irregularPairs = ruleSet.irregularPairs || ember$inflector$lib$system$inflector$$makeDictionary();

      var rules = this.rules = {
        plurals:  ruleSet.plurals || [],
        singular: ruleSet.singular || [],
        irregular: ember$inflector$lib$system$inflector$$makeDictionary(),
        irregularInverse: ember$inflector$lib$system$inflector$$makeDictionary(),
        uncountable: ember$inflector$lib$system$inflector$$makeDictionary()
      };

      ember$inflector$lib$system$inflector$$loadUncountable(rules, ruleSet.uncountable);
      ember$inflector$lib$system$inflector$$loadIrregular(rules, ruleSet.irregularPairs);

      this.enableCache();
    }

    if (!Object.create && !Object.create(null).hasOwnProperty) {
      throw new Error("This browser does not support Object.create(null), please polyfil with es5-sham: http://git.io/yBU2rg");
    }

    function ember$inflector$lib$system$inflector$$makeDictionary() {
      var cache = Object.create(null);
      cache['_dict'] = null;
      delete cache['_dict'];
      return cache;
    }

    ember$inflector$lib$system$inflector$$Inflector.prototype = {
      /**
        @public

        As inflections can be costly, and commonly the same subset of words are repeatedly
        inflected an optional cache is provided.

        @method enableCache
      */
      enableCache: function() {
        this.purgeCache();

        this.singularize = function(word) {
          this._cacheUsed = true;
          return this._sCache[word] || (this._sCache[word] = this._singularize(word));
        };

        this.pluralize = function(word) {
          this._cacheUsed = true;
          return this._pCache[word] || (this._pCache[word] = this._pluralize(word));
        };
      },

      /**
        @public

        @method purgedCache
      */
      purgeCache: function() {
        this._cacheUsed = false;
        this._sCache = ember$inflector$lib$system$inflector$$makeDictionary();
        this._pCache = ember$inflector$lib$system$inflector$$makeDictionary();
      },

      /**
        @public
        disable caching

        @method disableCache;
      */
      disableCache: function() {
        this._sCache = null;
        this._pCache = null;
        this.singularize = function(word) {
          return this._singularize(word);
        };

        this.pluralize = function(word) {
          return this._pluralize(word);
        };
      },

      /**
        @method plural
        @param {RegExp} regex
        @param {String} string
      */
      plural: function(regex, string) {
        if (this._cacheUsed) { this.purgeCache(); }
        this.rules.plurals.push([regex, string.toLowerCase()]);
      },

      /**
        @method singular
        @param {RegExp} regex
        @param {String} string
      */
      singular: function(regex, string) {
        if (this._cacheUsed) { this.purgeCache(); }
        this.rules.singular.push([regex, string.toLowerCase()]);
      },

      /**
        @method uncountable
        @param {String} regex
      */
      uncountable: function(string) {
        if (this._cacheUsed) { this.purgeCache(); }
        ember$inflector$lib$system$inflector$$loadUncountable(this.rules, [string.toLowerCase()]);
      },

      /**
        @method irregular
        @param {String} singular
        @param {String} plural
      */
      irregular: function (singular, plural) {
        if (this._cacheUsed) { this.purgeCache(); }
        ember$inflector$lib$system$inflector$$loadIrregular(this.rules, [[singular, plural]]);
      },

      /**
        @method pluralize
        @param {String} word
      */
      pluralize: function(word) {
        return this._pluralize(word);
      },

      _pluralize: function(word) {
        return this.inflect(word, this.rules.plurals, this.rules.irregular);
      },
      /**
        @method singularize
        @param {String} word
      */
      singularize: function(word) {
        return this._singularize(word);
      },

      _singularize: function(word) {
        return this.inflect(word, this.rules.singular,  this.rules.irregularInverse);
      },

      /**
        @protected

        @method inflect
        @param {String} word
        @param {Object} typeRules
        @param {Object} irregular
      */
      inflect: function(word, typeRules, irregular) {
        var inflection, substitution, result, lowercase, wordSplit,
          firstPhrase, lastWord, isBlank, isCamelized, isUncountable,
          isIrregular, isIrregularInverse, rule;

        isBlank = ember$inflector$lib$system$inflector$$BLANK_REGEX.test(word);
        isCamelized = ember$inflector$lib$system$inflector$$CAMELIZED_REGEX.test(word);
        firstPhrase = "";

        if (isBlank) {
          return word;
        }

        lowercase = word.toLowerCase();
        wordSplit = ember$inflector$lib$system$inflector$$LAST_WORD_DASHED_REGEX.exec(word) || ember$inflector$lib$system$inflector$$LAST_WORD_CAMELIZED_REGEX.exec(word);
        if (wordSplit){
          firstPhrase = wordSplit[1];
          lastWord = wordSplit[2].toLowerCase();
        }

        isUncountable = this.rules.uncountable[lowercase] || this.rules.uncountable[lastWord];

        if (isUncountable) {
          return word;
        }

        isIrregular = irregular && (irregular[lowercase] || irregular[lastWord]);

        if (isIrregular) {
          if (irregular[lowercase]){
            return isIrregular;
          }
          else {
            isIrregular = (isCamelized) ? ember$inflector$lib$system$inflector$$capitalize(isIrregular) : isIrregular;
            return firstPhrase + isIrregular;
          }
        }

        for (var i = typeRules.length, min = 0; i > min; i--) {
           inflection = typeRules[i-1];
           rule = inflection[0];

          if (rule.test(word)) {
            break;
          }
        }

        inflection = inflection || [];

        rule = inflection[0];
        substitution = inflection[1];

        result = word.replace(rule, substitution);

        return result;
      }
    };

    var ember$inflector$lib$system$inflector$$default = ember$inflector$lib$system$inflector$$Inflector;

    function ember$inflector$lib$system$string$$pluralize(word) {
      return ember$inflector$lib$system$inflector$$default.inflector.pluralize(word);
    }

    function ember$inflector$lib$system$string$$singularize(word) {
      return ember$inflector$lib$system$inflector$$default.inflector.singularize(word);
    }

    if (Ember.EXTEND_PROTOTYPES === true || Ember.EXTEND_PROTOTYPES.String) {
      /**
        See {{#crossLink "Ember.String/pluralize"}}{{/crossLink}}

        @method pluralize
        @for String
      */
      String.prototype.pluralize = function() {
        return ember$inflector$lib$system$string$$pluralize(this);
      };

      /**
        See {{#crossLink "Ember.String/singularize"}}{{/crossLink}}

        @method singularize
        @for String
      */
      String.prototype.singularize = function() {
        return ember$inflector$lib$system$string$$singularize(this);
      };
    }

    /**
     *
     * If you have Ember Inflector (such as if Ember Data is present),
     * singularize a word. For example, turn "oxen" into "ox".
     *
     * Example:
     *
     * {{singularize myProperty}}
     * {{singularize "oxen"}}
     *
     * @for Ember.Handlebars.helpers
     * @method singularize
     * @param {String|Property} word word to singularize
    */
    Ember.Handlebars.helper('singularize', ember$inflector$lib$system$string$$singularize);

    /**
     *
     * If you have Ember Inflector (such as if Ember Data is present),
     * pluralize a word. For example, turn "ox" into "oxen".
     *
     * Example:
     *
     * {{pluralize count myProperty}}
     * {{pluralize 1 "oxen"}}
     * {{pluralize myProperty}}
     * {{pluralize "ox"}}
     *
     * @for Ember.Handlebars.helpers
     * @method pluralize
     * @param {Number|Property} [count] count of objects
     * @param {String|Property} word word to pluralize
    */
    Ember.Handlebars.helper('pluralize', function(count, word, options) {
      if(arguments.length < 3) {
        return ember$inflector$lib$system$string$$pluralize(count);
      } else {
        /* jshint eqeqeq: false */
        if(count != 1) {
          /* jshint eqeqeq: true */
          word = ember$inflector$lib$system$string$$pluralize(word);
        }
        return count + " " + word;
      }
    });

    var ember$inflector$lib$system$inflections$$default = {
      plurals: [
        [/$/, 's'],
        [/s$/i, 's'],
        [/^(ax|test)is$/i, '$1es'],
        [/(octop|vir)us$/i, '$1i'],
        [/(octop|vir)i$/i, '$1i'],
        [/(alias|status)$/i, '$1es'],
        [/(bu)s$/i, '$1ses'],
        [/(buffal|tomat)o$/i, '$1oes'],
        [/([ti])um$/i, '$1a'],
        [/([ti])a$/i, '$1a'],
        [/sis$/i, 'ses'],
        [/(?:([^f])fe|([lr])f)$/i, '$1$2ves'],
        [/(hive)$/i, '$1s'],
        [/([^aeiouy]|qu)y$/i, '$1ies'],
        [/(x|ch|ss|sh)$/i, '$1es'],
        [/(matr|vert|ind)(?:ix|ex)$/i, '$1ices'],
        [/^(m|l)ouse$/i, '$1ice'],
        [/^(m|l)ice$/i, '$1ice'],
        [/^(ox)$/i, '$1en'],
        [/^(oxen)$/i, '$1'],
        [/(quiz)$/i, '$1zes']
      ],

      singular: [
        [/s$/i, ''],
        [/(ss)$/i, '$1'],
        [/(n)ews$/i, '$1ews'],
        [/([ti])a$/i, '$1um'],
        [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(sis|ses)$/i, '$1sis'],
        [/(^analy)(sis|ses)$/i, '$1sis'],
        [/([^f])ves$/i, '$1fe'],
        [/(hive)s$/i, '$1'],
        [/(tive)s$/i, '$1'],
        [/([lr])ves$/i, '$1f'],
        [/([^aeiouy]|qu)ies$/i, '$1y'],
        [/(s)eries$/i, '$1eries'],
        [/(m)ovies$/i, '$1ovie'],
        [/(x|ch|ss|sh)es$/i, '$1'],
        [/^(m|l)ice$/i, '$1ouse'],
        [/(bus)(es)?$/i, '$1'],
        [/(o)es$/i, '$1'],
        [/(shoe)s$/i, '$1'],
        [/(cris|test)(is|es)$/i, '$1is'],
        [/^(a)x[ie]s$/i, '$1xis'],
        [/(octop|vir)(us|i)$/i, '$1us'],
        [/(alias|status)(es)?$/i, '$1'],
        [/^(ox)en/i, '$1'],
        [/(vert|ind)ices$/i, '$1ex'],
        [/(matr)ices$/i, '$1ix'],
        [/(quiz)zes$/i, '$1'],
        [/(database)s$/i, '$1']
      ],

      irregularPairs: [
        ['person', 'people'],
        ['man', 'men'],
        ['child', 'children'],
        ['sex', 'sexes'],
        ['move', 'moves'],
        ['cow', 'kine'],
        ['zombie', 'zombies']
      ],

      uncountable: [
        'equipment',
        'information',
        'rice',
        'money',
        'species',
        'series',
        'fish',
        'sheep',
        'jeans',
        'police'
      ]
    };

    ember$inflector$lib$system$inflector$$default.inflector = new ember$inflector$lib$system$inflector$$default(ember$inflector$lib$system$inflections$$default);

    ember$inflector$lib$system$inflector$$default.defaultRules = ember$inflector$lib$system$inflections$$default;
    Ember.Inflector        = ember$inflector$lib$system$inflector$$default;

    Ember.String.pluralize   = ember$inflector$lib$system$string$$pluralize;
    Ember.String.singularize = ember$inflector$lib$system$string$$singularize;

    var ember$inflector$lib$main$$default = ember$inflector$lib$system$inflector$$default;

    if (typeof 'define' !== 'undefined' && define.amd){
      define('ember-inflector', ['exports'], function(__exports__){
        __exports__['default'] = ember$inflector$lib$system$inflector$$default;
        return ember$inflector$lib$system$inflector$$default;
      });
    } else if (typeof module !== 'undefined' && module['exports']){
      module['exports'] = ember$inflector$lib$system$inflector$$default;
    }
}).call(this);

//# sourceMappingURL=ember-inflector.js.map