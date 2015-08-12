/*
 *  Made by Sahil Prajapati
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	"use strict";
		// Create the defaults once
		var pluginName = "spellIt",
						defaults = {
							className: "spellIt",
							target: "result",
							getTabulatedResult: true
						};
		
		function Plugin ( element, options ) {
				this.element = element;
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.mainString = this.element.innerHTML;
				this.words = new Array;
				this.actual_code = new Array;
				this.lowercaseWord = new Array;
				this.terms = {"a" : "Alfa", "b": "Bravo", "c": "Charlie", "d": "Delta", "e": "Echo", "f": "Foxtrot", "g": "Golf", "h": "Hotel", "i": "India", "j": "Juliett", "k": "Kilo","l": "Lima", "m": "Mike", "n": "November", "o": "Oscar", "p": "Papa", "q": "Quebec", "r": "Romeo", "s": "Sierra", "t": "Tango", "u": "Uniform", "v": "Victor", "w": "Whiskey", "x": "X-ray", "y": "Yankee", "z": "Zulu", "0": "Zero", "1": "One", "2": "Two", "3": "Three", "4": "Four", "5": "Five", "6": "Six", "7": "Seven", "8": "Eight", "9": "Nine", ".": "Dot", "@": "At Sign", "?": "Question Mark", "!": "Exclamation Mak", "&" : "Ampersand", "-": "Minus", "_": "Underscore", "*": "Star", "$": "Dollar", "#": "Hash", "%": "Percentage", "^": "Caret", "\u20AC": "Euro Sign", "~": "Tilde", ";": "Semicolon", ":" : "Colon", "(": "Left Bracket", ")": "Right Bracket", "|": "Vertical Bar/Pipe", "+": "Plus Sign", ",": "Comma"};
				this.init();
		}
		$.extend(Plugin.prototype, {
				init: function () {
						var string = [];
						this.actual_code = this.mainString.split('');
						this.lowercaseWord = this.mainString.toLowerCase().split('');
			            string = this.lowercaseWord;
			            for (var i=0; i < string.length; i++){
			                this.words.push(this.terms[string[i]]);
			            }
			            if (this.settings.getTabulatedResult === true){
			            	return this.showOutput();
			            }
			            else{
			            	return this.words;
			            }
				},
		        splitCode: function(){
			            return this.actual_code;
		        },
		        getCodeHash: function() {
			            var obj = {};
			            for (var i=0; i< this.words.length; i++){
			                obj[this.actual_code[i]] = this.words[i];
			            }
			            return obj;
		        },
		        showOutput: function(){
		        	var container = $('<table />');
		        	var data = "<thead><tr><th>Character</th><th>Spellified</th></tr></thead><tbody>";
		        	for (var i=0;i < this.actual_code.length; i++){
		        		data += "<tr><th>"+ this.actual_code[i] +"</th>";
		        		data += "<td>"+ this.words[i]+"</td></tr>";
		        	}
		        	data += "</tbody>";
		        	container.addClass(this.settings.className).append(data);
		        	$(this.settings.target).append(container);
		        }

		});
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );
