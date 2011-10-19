/** @license
* Trainwreck.js : chaining made easy
* Author: Miller Medeiros
* Version: 0.1.0 (2011/10/19)
* Released under the WTFPL (http://sam.zoy.org/wtfpl/)
*/
(function(global) {

    var trainwreck = {

        /**
         * Wrap a regular function into a chainable function.
         * @param {string} fnName Function name.
         * @param {object} scope Object to lookup the property.
         * @param {object} chain Object that should be returned when setting
         * the property value.
         * @return {function} Chainable getter/setter.
         */
        fn : function(fnName, scope, chain){
            return function(){
                return scope[fnName].apply(scope, arguments) || chain;
            };
        },

        /**
         * Create a function that works as a getter/setter of a property.
         * @param {string} propName Property name.
         * @param {object} scope Object to lookup the property.
         * @param {object} chain Object that should be returned when setting
         * the property value.
         * @return {function} Chainable getter/setter.
         */
        prop : function(propName, scope, chain){
            return function(val){
                if(typeof val === 'undefined'){
                    return scope[propName];
                }else{
                    scope[propName] = val;
                    return chain;
                }
            };
        },

        /**
         * Create a new object that wraps calls to the `target` object and
         * provide a chainable API.
         * @param {object} target Target Object
         * @return {object} Object with chainable API.
         */
        create : function(target){
            var prop, obj = {};
            for(prop in target){
                //no need to filter properties of the prototype, let js-lint complain...
                obj[prop] = (typeof target[prop] === 'function')? trainwreck.fn(prop, target, obj) : trainwreck.prop(prop, target, obj);
            }
            return obj;
        }

    };

    //exports library to multiple environments
    if(typeof define === 'function' && define.amd){ //AMD
        define('trainwreck', trainwreck);
    } else if(typeof module !== 'undefined' && module.exports){ //node
        module.exports = trainwreck;
    } else { //browser
        //use string because of Google closure compiler ADVANCED_MODE
        global['trainwreck'] = trainwreck;
    }

}(this));
