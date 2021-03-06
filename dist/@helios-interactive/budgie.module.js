/*Budgie ES6 Module v1.0.12*/
export default Budgie = (function() {


"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
        Constructor;
    };
}(), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
    return typeof obj;
} : function(obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
}, styleBlock = document.createElement("style");

styleBlock.innerHTML = "\n.budgie-container {\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center; }\n\n.budgie-item :first-child {\n  max-height: 100%;\n  max-width: 100%; }\n\n.budgie-container-parent {\n  overflow: -moz-scrollbars-none; }\n  .budgie-container-parent::-webkit-scrollbar {\n    display: none; }\n", 
document.head.appendChild(styleBlock);

var imageExtensions = [ "jpg", "gif", "png", "bmp", "jpeg" ], videoExtensions = [ "mp4", "ogg", "webm" ], BudgieDom = Object.create({
    setupBudgieContainer: function(budgie) {
        budgie.parentContainer.classList.add("budgie-container-parent"), budgie.parentContainer.classList.add("budgie-container-parent-" + budgie.budgieId);
        var budgieFlexContainer = document.createElement("div");
        return budgieFlexContainer.classList.add("budgie-container"), budgieFlexContainer.classList.add("budgie-container-" + budgie.budgieId), 
        budgie.parentContainer.appendChild(budgieFlexContainer), budgieFlexContainer;
    },
    setupBudgieCSS: function(budgie) {
        var eleWidth = parseInt(window.getComputedStyle(budgie.budgieContainer).width), numOfSheets = 0, sheetIndex = document.styleSheets.length - 1;
        document.styleSheets[sheetIndex].cssRules && (numOfSheets = document.styleSheets[sheetIndex].cssRules.length);
        var numberAcross = budgie.options.numberHigh >= budgie.options.numberWide ? budgie.options.numberHigh : budgie.options.numberWide, width = eleWidth / budgie.options.numberWide / eleWidth * 100, height = 100 / budgie.options.numberHigh;
        document.styleSheets[sheetIndex].insertRule(".budgie-item-" + budgie.budgieId + "{width: " + width + "%; height: " + height + "%;}", numOfSheets);
        for (var i = numberAcross - 1; i >= 0; i--) document.styleSheets[sheetIndex].insertRule(".budgie-item-" + budgie.budgieId + "--filler-" + i + "\n        {\n          width: " + width * (budgie.options.numberWide - i) / 2 + "%;\n          height: " + height * (budgie.options.numberHigh - i) / 2 + "%; flex-grow: 1;\n        }", numOfSheets);
        var direction = "horizontal" === budgie.options.direction ? "column" : "row";
        document.styleSheets[sheetIndex].insertRule(".budgie-container-" + budgie.budgieId + "{flex-direction: " + direction + ";}", numOfSheets), 
        document.styleSheets[sheetIndex].insertRule(".budgie-container-parent-" + budgie.budgieId + "\n      {\n        overflow-x: " + ("horizontal" === budgie.options.direction ? "scroll" : "hidden") + ";\n        overflow-y: " + ("vertical" === budgie.options.direction ? "scroll" : "hidden") + "\n      }", numOfSheets);
    },
    setupBudgieScrollProperties: function(budgie) {
        var scrollProperty = budgie.scrollProperty(), budgieContainer = BudgieDom.measureElementWidthAndHeight(".budgie-container-" + budgie.budgieId), budgieElementMeasure = void 0;
        budgieElementMeasure = budgie.isHorizontal() ? budgieContainer.width / budgie.options.numberWide : budgieContainer.height / budgie.options.numberHigh, 
        budgie.parentContainer[scrollProperty] = budgieElementMeasure, budgie.parentContainer.addEventListener("scroll", function() {
            budgie.onScroll(scrollProperty);
        });
    },
    setupBudgieMouseDrag: function(budgie) {
        var scrollProperty = budgie.scrollProperty();
        budgie.parentContainer.addEventListener("mousedown", function() {
            budgie.mouseDown = !0;
        }), budgie.parentContainer.addEventListener("mouseup", function() {
            budgie.mouseDown = !1;
        }), budgie.parentContainer.addEventListener("mouseout", function() {
            budgie.mouseDown = !1;
        }), budgie.parentContainer.addEventListener("mousemove", function(event) {
            budgie.onMouseMove(event, scrollProperty);
        });
    },
    insertBudgieElements: function(budgie) {
        if (budgie.items.forEach(function(item, id) {
            budgie.hasOddEnding() && budgie.items.length - budgie.numberLeftWithOddEnding() === id && budgie.budgieContainer.appendChild(BudgieDom.createBudgieFillerElement(budgie)), 
            budgie.budgieContainer.appendChild(BudgieDom.createBudgieElement(budgie, item, id)), 
            budgie.hasOddEnding() > 0 && budgie.items.length === id + 1 && budgie.budgieContainer.appendChild(BudgieDom.createBudgieFillerElement(budgie));
        }), budgie.fitsInContainer()) {
            var blankEle = document.createElement("div");
            blankEle.classList.add("budgie-item-" + budgie.budgieId + "--blank"), budgie.budgieContainer.appendChild(blankEle);
        }
    },
    createBudgieFillerElement: function(budgie) {
        var filler = document.createElement("div");
        return filler.classList.add("budgie-item-" + budgie.budgieId + "--filler"), filler.classList.add("budgie-item-" + budgie.budgieId + "--filler-" + budgie.numberLeftWithOddEnding()), 
        filler;
    },
    createBudgieElement: function(budgie, item, itemIndex) {
        var element = document.createElement("div");
        element.classList.add("budgie-item"), element.classList.add("budgie-item-" + budgie.budgieId), 
        element.classList.add("budgie-" + budgie.budgieId + "-" + itemIndex);
        var innerDiv = BudgieDom.convertItemToElement(item);
        return element.innerHTML = innerDiv.outerHTML, element;
    },
    convertItemToElement: function(item) {
        if ("object" === (void 0 === item ? "undefined" : _typeof(item))) return item;
        if ("string" != typeof item) throw new Error("Only DOM Elements and strings are accepted as budgie items");
        var extension = item.match(/\.{1}\w*$/);
        extension && (extension = extension[0].substr(1));
        var element = void 0;
        if (imageExtensions.includes(extension) ? (element = document.createElement("img"), 
        element.src = item) : videoExtensions.includes(extension) && (element = document.createElement("video"), 
        element.src = item), !element) throw new Error("Extension of: " + extension + " is not supported.");
        return element;
    },
    measureElementWidthAndHeight: function(selector) {
        var measure = {}, elementComputedStyle = window.getComputedStyle(document.querySelector(selector));
        return measure.height = parseFloat(elementComputedStyle.height), measure.width = parseFloat(elementComputedStyle.width), 
        measure;
    }
}), Budgie = function() {
    function Budgie(items, selector) {
        var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        _classCallCheck(this, Budgie), this.parentContainer = document.querySelector(selector), 
        this.options = Object.assign(this.constructor.defaultOptions(), options), this.budgieId = Math.floor(65536 * (1 + Math.random())), 
        this.items = items, this.previousItems = [], this.mouseDown = !1;
        var self = this;
        this.items.pop = function() {
            var a = Array.prototype.pop.apply(self.items, arguments);
            return self.popItem(), a;
        }, this.items.push = function() {
            var a = Array.prototype.push.apply(self.items, arguments);
            return self.pushItem(), a;
        }, this.items.shift = function() {
            var a = Array.prototype.shift.apply(self.items, arguments);
            return self.shiftItem(), a;
        }, this.items.unshift = function() {
            var a = Array.prototype.unshift.apply(self.items, arguments);
            return self.unshiftItem(), a;
        }, this.items.splice = function() {
            var a = Array.prototype.splice.apply(self.items, arguments);
            return self.updateAllElements(), a;
        }, this.budgieSetup(), this.options.autoStart && this.budgieAnimate();
    }
    return _createClass(Budgie, [ {
        key: "isVertical",
        value: function() {
            return "vertical" === this.options.direction;
        }
    }, {
        key: "isHorizontal",
        value: function() {
            return "horizontal" === this.options.direction;
        }
    }, {
        key: "hasOddEnding",
        value: function() {
            return this.numberLeftWithOddEnding() > 0;
        }
    }, {
        key: "elementsOnScreen",
        value: function() {
            return parseInt(this.options.numberHigh) * parseInt(this.options.numberWide);
        }
    }, {
        key: "fitsInContainer",
        value: function() {
            return this.items.length <= this.elementsOnScreen();
        }
    }, {
        key: "numberLeftWithOddEnding",
        value: function() {
            var numberAcross = this.isHorizontal() ? this.options.numberHigh : this.options.numberWide;
            return this.items.length % numberAcross;
        }
    }, {
        key: "clearMeasurements",
        value: function() {
            this.budgieElementMeasurement = void 0, this.scrollContainerSize = void 0;
        }
    }, {
        key: "scrollProperty",
        value: function() {
            return this.isVertical() ? "scrollTop" : this.isHorizontal() ? "scrollLeft" : void 0;
        }
    }, {
        key: "elementMeasurement",
        value: function(selector) {
            var measure = {};
            return measure.height = parseFloat(window.getComputedStyle(document.getElementsByClassName(selector)[0]).height), 
            measure.width = parseFloat(window.getComputedStyle(document.getElementsByClassName(selector)[0]).width), 
            measure;
        }
    }, {
        key: "scrollSizeMeasurement",
        value: function() {
            switch (this.options.direction) {
              case "vertical":
                return BudgieDom.measureElementWidthAndHeight(".budgie-item-" + this.budgieId).height * Math.ceil(this.items.length / this.options.numberWide);

              case "horizontal":
                return BudgieDom.measureElementWidthAndHeight(".budgie-item-" + this.budgieId).width * Math.ceil(this.items.length / this.options.numberHigh);
            }
        }
    }, {
        key: "setItems",
        value: function(items) {
            var _this = this;
            this.numberLeftWithOddEnding();
            this.previousItems = this.items.slice(), this.items = items.slice();
            var indexesToRemove = function(oldArray, newArray) {
                return oldArray.map(function(oldItem, index) {
                    if (!newArray.some(function(newItem) {
                        return newItem === oldItem;
                    })) return index;
                }).filter(function(index) {
                    return index || 0 === index;
                });
            }(this.previousItems, this.items), indexesToAdd = function(oldArray, newArray) {
                return newArray.map(function(newItem, index) {
                    if (!oldArray.some(function(oldItem) {
                        return oldItem === newItem;
                    })) return index;
                }).filter(function(index) {
                    return index || 0 === index;
                });
            }(this.previousItems, this.items);
            indexesToRemove.length > 0 && indexesToRemove.forEach(function(index) {
                _this.removeLastItem(index);
            }), indexesToAdd.length > 0 && indexesToAdd.forEach(function(index) {
                _this.addItemAtIndex(index);
            });
            var realElements = Array.from(document.querySelectorAll(".budgie-item-" + this.budgieId + ":not(.budgie-item-" + this.budgieId + "--duplicate)"));
            realElements.forEach(function(element, index) {
                var className = Array.from(element.classList).filter(function(_className) {
                    return _className.match(new RegExp("budgie-" + _this.budgieId + "-\\d"));
                });
                className !== "budgie-" + _this.budgieId + "-" + index && (element.classList.remove(className), 
                element.classList.add("budgie-" + _this.budgieId + "-" + index));
            }), Array.from(document.querySelectorAll(".budgie-item-" + this.budgieId + ".budgie-item-" + this.budgieId + "--duplicate")).forEach(function(element) {
                element.parentNode.removeChild(element);
            }), Array.from(document.querySelectorAll(".budgie-item-" + this.budgieId + "--filler")).forEach(function(element) {
                element.parentNode.removeChild(element);
            }), this.options.infiniteScroll && (this.prependStartingItems(), this.appendEndingItems()), 
            this.numberLeftWithOddEnding() > 0 && (realElements[realElements.length - this.numberLeftWithOddEnding()].insertAdjacentElement("beforebegin", BudgieDom.createBudgieFillerElement(this)), 
            realElements[realElements.length - 1].insertAdjacentElement("afterend", BudgieDom.createBudgieFillerElement(this))), 
            this.clearMeasurements(), this.budgieAnimate();
        }
    }, {
        key: "pushItem",
        value: function() {
            this.addLastItem(), this.updateBeginningAndEndingItems("add"), this.clearMeasurements(), 
            this.budgieAnimate();
        }
    }, {
        key: "popItem",
        value: function() {
            this.removeLastItem(), this.updateBeginningAndEndingItems("remove"), this.clearMeasurements(), 
            this.budgieAnimate();
        }
    }, {
        key: "shiftItem",
        value: function() {
            this.updateExistingItems(), this.removeLastItem(), this.updateBeginningAndEndingItems("remove"), 
            this.clearMeasurements(), this.budgieAnimate();
        }
    }, {
        key: "unshiftItem",
        value: function() {
            this.updateExistingItems(), this.addLastItem(), this.updateBeginningAndEndingItems("add"), 
            this.clearMeasurements(), this.budgieAnimate();
        }
    }, {
        key: "updateAllElements",
        value: function() {
            var elementCount = document.querySelectorAll(".budgie-item-" + this.budgieId + ":not(.budgie-item-" + this.budgieId + "--duplicate)").length;
            if (this.items.length > elementCount) {
                for (var i = elementCount; i < this.items.length; i++) this.addLastItem(i, i - 1);
                this.updateBeginningAndEndingItems("add");
            } else if (this.items.length < elementCount) {
                for (var _i = elementCount; _i > this.items.length; _i--) this.removeLastItem(_i - 1);
                this.updateBeginningAndEndingItems("remove");
            }
            this.updateExistingItems(), this.clearMeasurements(), this.budgieAnimate();
        }
    }, {
        key: "prependStartingItems",
        value: function() {
            var _this2 = this, realElements = (this.elementsOnScreen(), Array.from(document.querySelectorAll(".budgie-item-" + this.budgieId + ":not(.budgie-item-" + this.budgieId + "--duplicate)")));
            if (!this.fitsInContainer()) if (this.hasOddEnding()) this.budgieContainer.insertAdjacentElement("afterbegin", BudgieDom.createBudgieFillerElement(this)), 
            realElements.slice(realElements.length - this.numberLeftWithOddEnding(), realElements.length).reverse().forEach(function(element) {
                var ele = element.cloneNode(!0);
                ele.classList.add("budgie-item-" + _this2.budgieId + "--duplicate"), _this2.budgieContainer.insertAdjacentElement("afterbegin", ele);
            }), this.budgieContainer.insertAdjacentElement("afterbegin", BudgieDom.createBudgieFillerElement(this)); else {
                var elementsToDupe = this.isHorizontal() ? this.options.numberHigh : this.options.numberWide;
                realElements.slice(realElements.length - elementsToDupe, realElements.length).reverse().forEach(function(element) {
                    var ele = element.cloneNode(!0);
                    ele.classList.add("budgie-item-" + _this2.budgieId + "--duplicate"), _this2.budgieContainer.insertAdjacentElement("afterbegin", ele);
                });
            }
        }
    }, {
        key: "appendEndingItems",
        value: function() {
            var _this3 = this, elementsOnScreen = this.elementsOnScreen(), realElements = Array.from(document.querySelectorAll(".budgie-item-" + this.budgieId + ":not(.budgie-item-" + this.budgieId + "--duplicate)"));
            this.fitsInContainer() || realElements.slice(0, elementsOnScreen).forEach(function(element) {
                var ele = element.cloneNode(!0);
                ele.classList.add("budgie-item-" + _this3.budgieId + "--duplicate"), ele.classList.add("budgie-item-" + _this3.budgieId + "--duplicate-ending"), 
                _this3.budgieContainer.insertAdjacentElement("beforeend", ele);
            });
        }
    }, {
        key: "addItemAtIndex",
        value: function(index) {
            var realElements = Array.from(document.querySelectorAll(".budgie-item-" + this.budgieId + ":not(.budgie-item-" + this.budgieId + "--duplicate)")), newElement = BudgieDom.createBudgieElement(this, this.items[index], index);
            0 === realElements.length && (realElements = Array.from(document.querySelectorAll(".budgie-item-" + this.budgieId + "--blank"))), 
            index > 0 ? realElements[index - 1].insertAdjacentElement("afterend", newElement) : realElements[index].insertAdjacentElement("beforebegin", newElement);
        }
    }, {
        key: "removeLastItem",
        value: function() {
            var eleIndex = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.items.length, elements = document.getElementsByClassName("budgie-" + this.budgieId + "-" + eleIndex);
            Array.from(elements).forEach(function(element) {
                element.parentNode.removeChild(element);
            });
        }
    }, {
        key: "addLastItem",
        value: function() {
            var itemIndex = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.items.length - 1, eleIndex = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.items.length - 2, elements = document.getElementsByClassName("budgie-" + this.budgieId + "-" + eleIndex);
            !elements.length > 0 && (elements = document.getElementsByClassName("budgie-item-" + this.budgieId + "--blank"));
            var newElement = BudgieDom.createBudgieElement(this, this.items[itemIndex], itemIndex), index = 0;
            elements.length > 1 && (index = 1), elements[index].parentNode.insertBefore(newElement, elements[index].nextSibling);
        }
    }, {
        key: "updateExistingItems",
        value: function() {
            var _this4 = this;
            this.items.forEach(function(item, index) {
                Array.from(document.getElementsByClassName("budgie-" + _this4.budgieId + "-" + index)).forEach(function(element) {
                    var newElement = BudgieDom.createBudgieElement(_this4, item, index);
                    element.innerHTML !== newElement.innerHTML && (element.innerHTML = newElement.innerHTML);
                });
            });
        }
    }, {
        key: "updateBeginningAndEndingItems",
        value: function(method) {
            this.updateListStart(), this.updateListEnding(method);
        }
    }, {
        key: "updateListStart",
        value: function() {
            var _this5 = this, numberAtTop = void 0;
            numberAtTop = this.hasOddEnding() ? this.numberLeftWithOddEnding() : this.isHorizontal() ? this.options.numberHigh : this.options.numberWide;
            var realElements = Array.from(document.querySelectorAll(".budgie-item-" + this.budgieId + ":not(.budgie-item-" + this.budgieId + "--duplicate)")), dupedElements = Array.from(document.querySelectorAll(".budgie-item-" + this.budgieId + ".budgie-item-" + this.budgieId + "--duplicate")), topOfDupedElements = dupedElements.slice(0, dupedElements.length - this.elementsOnScreen()), lastRowOfRealElements = realElements.slice(realElements.length - numberAtTop, realElements.length), firstRealElement = realElements[0];
            if (topOfDupedElements.length > lastRowOfRealElements.length) for (var numberOff = topOfDupedElements.length - lastRowOfRealElements.length, i = 0; i < numberOff; i += 1) topOfDupedElements[i].parentNode.removeChild(topOfDupedElements[i]), 
            topOfDupedElements.shift();
            this.fitsInContainer() || lastRowOfRealElements.forEach(function(element, index) {
                var ele = element.cloneNode(!0);
                ele.classList.add("budgie-item-" + _this5.budgieId + "--duplicate"), topOfDupedElements[index] ? topOfDupedElements[index].outerHTML = ele.outerHTML : firstRealElement.parentNode.insertBefore(ele, firstRealElement);
            });
        }
    }, {
        key: "updateListEnding",
        value: function(method) {
            var _this6 = this, redraw = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], operator = void 0;
            if ("remove" === method) operator = 1; else {
                if ("add" !== method) throw new Error("Only 'add' and 'remove' are supported arguments");
                operator = -1;
            }
            if (redraw && Array.from(document.getElementsByClassName("budgie-item-" + this.budgieId + "--filler")).forEach(function(element) {
                return element.parentNode.removeChild(element);
            }), this.hasOddEnding()) if (0 === document.getElementsByClassName("budgie-item-" + this.budgieId + "--filler").length) {
                var lastElements = Array.from(document.getElementsByClassName("budgie-" + this.budgieId + "-" + (this.items.length - 1))), firstElements = Array.from(document.getElementsByClassName("budgie-" + this.budgieId + "-" + (this.items.length - this.numberLeftWithOddEnding())));
                lastElements.forEach(function(lastElement) {
                    lastElement.parentNode.insertBefore(BudgieDom.createBudgieFillerElement(_this6), lastElement.nextSibling);
                }), firstElements.forEach(function(firstElement) {
                    firstElement.parentNode.insertBefore(BudgieDom.createBudgieFillerElement(_this6), firstElement);
                });
            } else Array.from(document.getElementsByClassName("budgie-item-" + this.budgieId + "--filler")).forEach(function(element) {
                element.classList.remove("budgie-item-" + _this6.budgieId + "--filler-" + (_this6.numberLeftWithOddEnding() + operator)), 
                element.classList.add("budgie-item-" + _this6.budgieId + "--filler-" + _this6.numberLeftWithOddEnding());
            }); else Array.from(document.getElementsByClassName("budgie-item-" + this.budgieId + "--filler")).forEach(function(element) {
                return element.parentNode.removeChild(element);
            });
            if (this.fitsInContainer() && (Array.from(document.getElementsByClassName("budgie-item-" + this.budgieId + "--duplicate")).forEach(function(element) {
                return element.parentNode.removeChild(element);
            }), 0 === document.getElementsByClassName("budgie-item-" + this.budgieId + "--blank").length)) {
                var blankEle = document.createElement("div");
                blankEle.classList.add("budgie-item-" + this.budgieId + "--blank"), this.budgieContainer.appendChild(blankEle);
            }
            this.fitsInContainer() || 0 !== document.getElementsByClassName("budgie-item-" + this.budgieId + "--duplicate-ending").length || (this.appendEndingItems(), 
            Array.from(document.getElementsByClassName("budgie-item-" + this.budgieId + "--blank")).forEach(function(blankEle) {
                return blankEle.parentNode.removeChild(blankEle);
            }));
        }
    }, {
        key: "onScroll",
        value: function(scrollDirection) {
            if (this.scrollContainerSize || (this.scrollContainerSize = this.scrollSizeMeasurement()), 
            !this.budgieElementMeasurement) {
                var budgieElement = BudgieDom.measureElementWidthAndHeight(".budgie-item-" + this.budgieId);
                this.budgieElementMeasurement = Math.floor(this.isHorizontal() ? budgieElement.width : budgieElement.height);
            }
            this.parentContainer[scrollDirection] >= this.scrollContainerSize + this.budgieElementMeasurement ? this.parentContainer[scrollDirection] = this.budgieElementMeasurement : this.parentContainer[scrollDirection] <= 0 && (this.parentContainer[scrollDirection] = this.scrollContainerSize);
        }
    }, {
        key: "onMouseMove",
        value: function(event, scrollDirection) {
            this.mouseDown && (this.parentContainer[scrollDirection] -= this.isHorizontal() ? event.movementX : event.movementY, 
            console.log("mouse moved", event));
        }
    }, {
        key: "budgieSetup",
        value: function() {
            this.budgieContainer = BudgieDom.setupBudgieContainer(this), BudgieDom.setupBudgieCSS(this), 
            BudgieDom.insertBudgieElements(this), BudgieDom.setupBudgieMouseDrag(this), this.options.infiniteScroll && (this.appendEndingItems(), 
            this.prependStartingItems(), BudgieDom.setupBudgieScrollProperties(this));
        }
    }, {
        key: "budgieAnimate",
        value: function() {
            var _this7 = this;
            if (this.options.autoScroll) {
                var fps = this.options.fps, scrollDirection = this.scrollProperty(), currentScroll = void 0, budgieContainerMeasurements = BudgieDom.measureElementWidthAndHeight(".budgie-container-" + this.budgieId), viewMeasure = this.isHorizontal() ? budgieContainerMeasurements.width : budgieContainerMeasurements.height, scrollSpeed = Math.ceil(viewMeasure / this.options.secondsOnPage / fps);
                this.stopAnimate(), this.fitsInContainer() ? this.budgieContainer.parentElement[scrollDirection] = 0 : (this.budgieContainer.parentElement[scrollDirection] += 1, 
                this.budgieContainer.parentElement[scrollDirection] -= 1, this.interval = setInterval(function() {
                    currentScroll = _this7.budgieContainer.parentElement[scrollDirection], _this7.options.inverted ? currentScroll += scrollSpeed : currentScroll -= scrollSpeed, 
                    _this7.budgieContainer.parentElement[scrollDirection] = currentScroll;
                }, 1e3 / fps));
            }
        }
    }, {
        key: "changeInversion",
        value: function() {
            this.options.inverted = !this.options.inverted;
        }
    }, {
        key: "stopAnimate",
        value: function() {
            return !!this.interval && (window.clearInterval(this.interval), !0);
        }
    }, {
        key: "removeBudgie",
        value: function() {
            this.stopAnimate(), this.budgieContainer.parentElement.classList.remove("budgie-container-parent-" + this.budgieId), 
            this.budgieContainer.parentElement.removeChild(this.budgieContainer);
        }
    } ], [ {
        key: "defaultOptions",
        value: function() {
            return {
                numberHigh: 1,
                numberWide: 1,
                direction: "vertical",
                secondsOnPage: 1,
                inverted: !1,
                autoScroll: !0,
                fps: 60,
                infiniteScroll: !0,
                autoStart: !0
            };
        }
    } ]), Budgie;
}();

"undefined" != typeof global && (global.Budgie = Budgie);
//# sourceMappingURL=budgie.es6.map
            return Budgie;
          })();