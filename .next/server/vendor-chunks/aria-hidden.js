"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/aria-hidden";
exports.ids = ["vendor-chunks/aria-hidden"];
exports.modules = {

/***/ "(ssr)/./node_modules/aria-hidden/dist/es2015/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/aria-hidden/dist/es2015/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   hideOthers: () => (/* binding */ hideOthers),\n/* harmony export */   inertOthers: () => (/* binding */ inertOthers),\n/* harmony export */   supportsInert: () => (/* binding */ supportsInert),\n/* harmony export */   suppressOthers: () => (/* binding */ suppressOthers)\n/* harmony export */ });\nvar getDefaultParent = function(originalTarget) {\n    if (typeof document === \"undefined\") {\n        return null;\n    }\n    var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;\n    return sampleTarget.ownerDocument.body;\n};\nvar counterMap = new WeakMap();\nvar uncontrolledNodes = new WeakMap();\nvar markerMap = {};\nvar lockCount = 0;\nvar unwrapHost = function(node) {\n    return node && (node.host || unwrapHost(node.parentNode));\n};\nvar correctTargets = function(parent, targets) {\n    return targets.map(function(target) {\n        if (parent.contains(target)) {\n            return target;\n        }\n        var correctedTarget = unwrapHost(target);\n        if (correctedTarget && parent.contains(correctedTarget)) {\n            return correctedTarget;\n        }\n        console.error(\"aria-hidden\", target, \"in not contained inside\", parent, \". Doing nothing\");\n        return null;\n    }).filter(function(x) {\n        return Boolean(x);\n    });\n};\n/**\n * Marks everything except given node(or nodes) as aria-hidden\n * @param {Element | Element[]} originalTarget - elements to keep on the page\n * @param [parentNode] - top element, defaults to document.body\n * @param {String} [markerName] - a special attribute to mark every node\n * @param {String} [controlAttribute] - html Attribute to control\n * @return {Undo} undo command\n */ var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {\n    var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [\n        originalTarget\n    ]);\n    if (!markerMap[markerName]) {\n        markerMap[markerName] = new WeakMap();\n    }\n    var markerCounter = markerMap[markerName];\n    var hiddenNodes = [];\n    var elementsToKeep = new Set();\n    var elementsToStop = new Set(targets);\n    var keep = function(el) {\n        if (!el || elementsToKeep.has(el)) {\n            return;\n        }\n        elementsToKeep.add(el);\n        keep(el.parentNode);\n    };\n    targets.forEach(keep);\n    var deep = function(parent) {\n        if (!parent || elementsToStop.has(parent)) {\n            return;\n        }\n        Array.prototype.forEach.call(parent.children, function(node) {\n            if (elementsToKeep.has(node)) {\n                deep(node);\n            } else {\n                var attr = node.getAttribute(controlAttribute);\n                var alreadyHidden = attr !== null && attr !== \"false\";\n                var counterValue = (counterMap.get(node) || 0) + 1;\n                var markerValue = (markerCounter.get(node) || 0) + 1;\n                counterMap.set(node, counterValue);\n                markerCounter.set(node, markerValue);\n                hiddenNodes.push(node);\n                if (counterValue === 1 && alreadyHidden) {\n                    uncontrolledNodes.set(node, true);\n                }\n                if (markerValue === 1) {\n                    node.setAttribute(markerName, \"true\");\n                }\n                if (!alreadyHidden) {\n                    node.setAttribute(controlAttribute, \"true\");\n                }\n            }\n        });\n    };\n    deep(parentNode);\n    elementsToKeep.clear();\n    lockCount++;\n    return function() {\n        hiddenNodes.forEach(function(node) {\n            var counterValue = counterMap.get(node) - 1;\n            var markerValue = markerCounter.get(node) - 1;\n            counterMap.set(node, counterValue);\n            markerCounter.set(node, markerValue);\n            if (!counterValue) {\n                if (!uncontrolledNodes.has(node)) {\n                    node.removeAttribute(controlAttribute);\n                }\n                uncontrolledNodes.delete(node);\n            }\n            if (!markerValue) {\n                node.removeAttribute(markerName);\n            }\n        });\n        lockCount--;\n        if (!lockCount) {\n            // clear\n            counterMap = new WeakMap();\n            counterMap = new WeakMap();\n            uncontrolledNodes = new WeakMap();\n            markerMap = {};\n        }\n    };\n};\n/**\n * Marks everything except given node(or nodes) as aria-hidden\n * @param {Element | Element[]} originalTarget - elements to keep on the page\n * @param [parentNode] - top element, defaults to document.body\n * @param {String} [markerName] - a special attribute to mark every node\n * @return {Undo} undo command\n */ var hideOthers = function(originalTarget, parentNode, markerName) {\n    if (markerName === void 0) {\n        markerName = \"data-aria-hidden\";\n    }\n    var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [\n        originalTarget\n    ]);\n    var activeParentNode = parentNode || getDefaultParent(originalTarget);\n    if (!activeParentNode) {\n        return function() {\n            return null;\n        };\n    }\n    // we should not hide ariaLive elements - https://github.com/theKashey/aria-hidden/issues/10\n    targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll(\"[aria-live]\")));\n    return applyAttributeToOthers(targets, activeParentNode, markerName, \"aria-hidden\");\n};\n/**\n * Marks everything except given node(or nodes) as inert\n * @param {Element | Element[]} originalTarget - elements to keep on the page\n * @param [parentNode] - top element, defaults to document.body\n * @param {String} [markerName] - a special attribute to mark every node\n * @return {Undo} undo command\n */ var inertOthers = function(originalTarget, parentNode, markerName) {\n    if (markerName === void 0) {\n        markerName = \"data-inert-ed\";\n    }\n    var activeParentNode = parentNode || getDefaultParent(originalTarget);\n    if (!activeParentNode) {\n        return function() {\n            return null;\n        };\n    }\n    return applyAttributeToOthers(originalTarget, activeParentNode, markerName, \"inert\");\n};\n/**\n * @returns if current browser supports inert\n */ var supportsInert = function() {\n    return typeof HTMLElement !== \"undefined\" && HTMLElement.prototype.hasOwnProperty(\"inert\");\n};\n/**\n * Automatic function to \"suppress\" DOM elements - _hide_ or _inert_ in the best possible way\n * @param {Element | Element[]} originalTarget - elements to keep on the page\n * @param [parentNode] - top element, defaults to document.body\n * @param {String} [markerName] - a special attribute to mark every node\n * @return {Undo} undo command\n */ var suppressOthers = function(originalTarget, parentNode, markerName) {\n    if (markerName === void 0) {\n        markerName = \"data-suppressed\";\n    }\n    return (supportsInert() ? inertOthers : hideOthers)(originalTarget, parentNode, markerName);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvYXJpYS1oaWRkZW4vZGlzdC9lczIwMTUvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQUlBLG1CQUFtQixTQUFVQyxjQUFjO0lBQzNDLElBQUksT0FBT0MsYUFBYSxhQUFhO1FBQ2pDLE9BQU87SUFDWDtJQUNBLElBQUlDLGVBQWVDLE1BQU1DLE9BQU8sQ0FBQ0osa0JBQWtCQSxjQUFjLENBQUMsRUFBRSxHQUFHQTtJQUN2RSxPQUFPRSxhQUFhRyxhQUFhLENBQUNDLElBQUk7QUFDMUM7QUFDQSxJQUFJQyxhQUFhLElBQUlDO0FBQ3JCLElBQUlDLG9CQUFvQixJQUFJRDtBQUM1QixJQUFJRSxZQUFZLENBQUM7QUFDakIsSUFBSUMsWUFBWTtBQUNoQixJQUFJQyxhQUFhLFNBQVVDLElBQUk7SUFDM0IsT0FBT0EsUUFBU0EsQ0FBQUEsS0FBS0MsSUFBSSxJQUFJRixXQUFXQyxLQUFLRSxVQUFVO0FBQzNEO0FBQ0EsSUFBSUMsaUJBQWlCLFNBQVVDLE1BQU0sRUFBRUMsT0FBTztJQUMxQyxPQUFPQSxRQUNGQyxHQUFHLENBQUMsU0FBVUMsTUFBTTtRQUNyQixJQUFJSCxPQUFPSSxRQUFRLENBQUNELFNBQVM7WUFDekIsT0FBT0E7UUFDWDtRQUNBLElBQUlFLGtCQUFrQlYsV0FBV1E7UUFDakMsSUFBSUUsbUJBQW1CTCxPQUFPSSxRQUFRLENBQUNDLGtCQUFrQjtZQUNyRCxPQUFPQTtRQUNYO1FBQ0FDLFFBQVFDLEtBQUssQ0FBQyxlQUFlSixRQUFRLDJCQUEyQkgsUUFBUTtRQUN4RSxPQUFPO0lBQ1gsR0FDS1EsTUFBTSxDQUFDLFNBQVVDLENBQUM7UUFBSSxPQUFPQyxRQUFRRDtJQUFJO0FBQ2xEO0FBQ0E7Ozs7Ozs7Q0FPQyxHQUNELElBQUlFLHlCQUF5QixTQUFVNUIsY0FBYyxFQUFFZSxVQUFVLEVBQUVjLFVBQVUsRUFBRUMsZ0JBQWdCO0lBQzNGLElBQUlaLFVBQVVGLGVBQWVELFlBQVlaLE1BQU1DLE9BQU8sQ0FBQ0osa0JBQWtCQSxpQkFBaUI7UUFBQ0E7S0FBZTtJQUMxRyxJQUFJLENBQUNVLFNBQVMsQ0FBQ21CLFdBQVcsRUFBRTtRQUN4Qm5CLFNBQVMsQ0FBQ21CLFdBQVcsR0FBRyxJQUFJckI7SUFDaEM7SUFDQSxJQUFJdUIsZ0JBQWdCckIsU0FBUyxDQUFDbUIsV0FBVztJQUN6QyxJQUFJRyxjQUFjLEVBQUU7SUFDcEIsSUFBSUMsaUJBQWlCLElBQUlDO0lBQ3pCLElBQUlDLGlCQUFpQixJQUFJRCxJQUFJaEI7SUFDN0IsSUFBSWtCLE9BQU8sU0FBVUMsRUFBRTtRQUNuQixJQUFJLENBQUNBLE1BQU1KLGVBQWVLLEdBQUcsQ0FBQ0QsS0FBSztZQUMvQjtRQUNKO1FBQ0FKLGVBQWVNLEdBQUcsQ0FBQ0Y7UUFDbkJELEtBQUtDLEdBQUd0QixVQUFVO0lBQ3RCO0lBQ0FHLFFBQVFzQixPQUFPLENBQUNKO0lBQ2hCLElBQUlLLE9BQU8sU0FBVXhCLE1BQU07UUFDdkIsSUFBSSxDQUFDQSxVQUFVa0IsZUFBZUcsR0FBRyxDQUFDckIsU0FBUztZQUN2QztRQUNKO1FBQ0FkLE1BQU11QyxTQUFTLENBQUNGLE9BQU8sQ0FBQ0csSUFBSSxDQUFDMUIsT0FBTzJCLFFBQVEsRUFBRSxTQUFVL0IsSUFBSTtZQUN4RCxJQUFJb0IsZUFBZUssR0FBRyxDQUFDekIsT0FBTztnQkFDMUI0QixLQUFLNUI7WUFDVCxPQUNLO2dCQUNELElBQUlnQyxPQUFPaEMsS0FBS2lDLFlBQVksQ0FBQ2hCO2dCQUM3QixJQUFJaUIsZ0JBQWdCRixTQUFTLFFBQVFBLFNBQVM7Z0JBQzlDLElBQUlHLGVBQWUsQ0FBQ3pDLFdBQVcwQyxHQUFHLENBQUNwQyxTQUFTLEtBQUs7Z0JBQ2pELElBQUlxQyxjQUFjLENBQUNuQixjQUFja0IsR0FBRyxDQUFDcEMsU0FBUyxLQUFLO2dCQUNuRE4sV0FBVzRDLEdBQUcsQ0FBQ3RDLE1BQU1tQztnQkFDckJqQixjQUFjb0IsR0FBRyxDQUFDdEMsTUFBTXFDO2dCQUN4QmxCLFlBQVlvQixJQUFJLENBQUN2QztnQkFDakIsSUFBSW1DLGlCQUFpQixLQUFLRCxlQUFlO29CQUNyQ3RDLGtCQUFrQjBDLEdBQUcsQ0FBQ3RDLE1BQU07Z0JBQ2hDO2dCQUNBLElBQUlxQyxnQkFBZ0IsR0FBRztvQkFDbkJyQyxLQUFLd0MsWUFBWSxDQUFDeEIsWUFBWTtnQkFDbEM7Z0JBQ0EsSUFBSSxDQUFDa0IsZUFBZTtvQkFDaEJsQyxLQUFLd0MsWUFBWSxDQUFDdkIsa0JBQWtCO2dCQUN4QztZQUNKO1FBQ0o7SUFDSjtJQUNBVyxLQUFLMUI7SUFDTGtCLGVBQWVxQixLQUFLO0lBQ3BCM0M7SUFDQSxPQUFPO1FBQ0hxQixZQUFZUSxPQUFPLENBQUMsU0FBVTNCLElBQUk7WUFDOUIsSUFBSW1DLGVBQWV6QyxXQUFXMEMsR0FBRyxDQUFDcEMsUUFBUTtZQUMxQyxJQUFJcUMsY0FBY25CLGNBQWNrQixHQUFHLENBQUNwQyxRQUFRO1lBQzVDTixXQUFXNEMsR0FBRyxDQUFDdEMsTUFBTW1DO1lBQ3JCakIsY0FBY29CLEdBQUcsQ0FBQ3RDLE1BQU1xQztZQUN4QixJQUFJLENBQUNGLGNBQWM7Z0JBQ2YsSUFBSSxDQUFDdkMsa0JBQWtCNkIsR0FBRyxDQUFDekIsT0FBTztvQkFDOUJBLEtBQUswQyxlQUFlLENBQUN6QjtnQkFDekI7Z0JBQ0FyQixrQkFBa0IrQyxNQUFNLENBQUMzQztZQUM3QjtZQUNBLElBQUksQ0FBQ3FDLGFBQWE7Z0JBQ2RyQyxLQUFLMEMsZUFBZSxDQUFDMUI7WUFDekI7UUFDSjtRQUNBbEI7UUFDQSxJQUFJLENBQUNBLFdBQVc7WUFDWixRQUFRO1lBQ1JKLGFBQWEsSUFBSUM7WUFDakJELGFBQWEsSUFBSUM7WUFDakJDLG9CQUFvQixJQUFJRDtZQUN4QkUsWUFBWSxDQUFDO1FBQ2pCO0lBQ0o7QUFDSjtBQUNBOzs7Ozs7Q0FNQyxHQUNNLElBQUkrQyxhQUFhLFNBQVV6RCxjQUFjLEVBQUVlLFVBQVUsRUFBRWMsVUFBVTtJQUNwRSxJQUFJQSxlQUFlLEtBQUssR0FBRztRQUFFQSxhQUFhO0lBQW9CO0lBQzlELElBQUlYLFVBQVVmLE1BQU11RCxJQUFJLENBQUN2RCxNQUFNQyxPQUFPLENBQUNKLGtCQUFrQkEsaUJBQWlCO1FBQUNBO0tBQWU7SUFDMUYsSUFBSTJELG1CQUFtQjVDLGNBQWNoQixpQkFBaUJDO0lBQ3RELElBQUksQ0FBQzJELGtCQUFrQjtRQUNuQixPQUFPO1lBQWMsT0FBTztRQUFNO0lBQ3RDO0lBQ0EsNEZBQTRGO0lBQzVGekMsUUFBUWtDLElBQUksQ0FBQ1EsS0FBSyxDQUFDMUMsU0FBU2YsTUFBTXVELElBQUksQ0FBQ0MsaUJBQWlCRSxnQkFBZ0IsQ0FBQztJQUN6RSxPQUFPakMsdUJBQXVCVixTQUFTeUMsa0JBQWtCOUIsWUFBWTtBQUN6RSxFQUFFO0FBQ0Y7Ozs7OztDQU1DLEdBQ00sSUFBSWlDLGNBQWMsU0FBVTlELGNBQWMsRUFBRWUsVUFBVSxFQUFFYyxVQUFVO0lBQ3JFLElBQUlBLGVBQWUsS0FBSyxHQUFHO1FBQUVBLGFBQWE7SUFBaUI7SUFDM0QsSUFBSThCLG1CQUFtQjVDLGNBQWNoQixpQkFBaUJDO0lBQ3RELElBQUksQ0FBQzJELGtCQUFrQjtRQUNuQixPQUFPO1lBQWMsT0FBTztRQUFNO0lBQ3RDO0lBQ0EsT0FBTy9CLHVCQUF1QjVCLGdCQUFnQjJELGtCQUFrQjlCLFlBQVk7QUFDaEYsRUFBRTtBQUNGOztDQUVDLEdBQ00sSUFBSWtDLGdCQUFnQjtJQUN2QixPQUFPLE9BQU9DLGdCQUFnQixlQUFlQSxZQUFZdEIsU0FBUyxDQUFDdUIsY0FBYyxDQUFDO0FBQ3RGLEVBQUU7QUFDRjs7Ozs7O0NBTUMsR0FDTSxJQUFJQyxpQkFBaUIsU0FBVWxFLGNBQWMsRUFBRWUsVUFBVSxFQUFFYyxVQUFVO0lBQ3hFLElBQUlBLGVBQWUsS0FBSyxHQUFHO1FBQUVBLGFBQWE7SUFBbUI7SUFDN0QsT0FBTyxDQUFDa0Msa0JBQWtCRCxjQUFjTCxVQUFTLEVBQUd6RCxnQkFBZ0JlLFlBQVljO0FBQ3BGLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1nZW5pZS1haS8uL25vZGVfbW9kdWxlcy9hcmlhLWhpZGRlbi9kaXN0L2VzMjAxNS9pbmRleC5qcz9hOWZmIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBnZXREZWZhdWx0UGFyZW50ID0gZnVuY3Rpb24gKG9yaWdpbmFsVGFyZ2V0KSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBzYW1wbGVUYXJnZXQgPSBBcnJheS5pc0FycmF5KG9yaWdpbmFsVGFyZ2V0KSA/IG9yaWdpbmFsVGFyZ2V0WzBdIDogb3JpZ2luYWxUYXJnZXQ7XG4gICAgcmV0dXJuIHNhbXBsZVRhcmdldC5vd25lckRvY3VtZW50LmJvZHk7XG59O1xudmFyIGNvdW50ZXJNYXAgPSBuZXcgV2Vha01hcCgpO1xudmFyIHVuY29udHJvbGxlZE5vZGVzID0gbmV3IFdlYWtNYXAoKTtcbnZhciBtYXJrZXJNYXAgPSB7fTtcbnZhciBsb2NrQ291bnQgPSAwO1xudmFyIHVud3JhcEhvc3QgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiBub2RlICYmIChub2RlLmhvc3QgfHwgdW53cmFwSG9zdChub2RlLnBhcmVudE5vZGUpKTtcbn07XG52YXIgY29ycmVjdFRhcmdldHMgPSBmdW5jdGlvbiAocGFyZW50LCB0YXJnZXRzKSB7XG4gICAgcmV0dXJuIHRhcmdldHNcbiAgICAgICAgLm1hcChmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGlmIChwYXJlbnQuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29ycmVjdGVkVGFyZ2V0ID0gdW53cmFwSG9zdCh0YXJnZXQpO1xuICAgICAgICBpZiAoY29ycmVjdGVkVGFyZ2V0ICYmIHBhcmVudC5jb250YWlucyhjb3JyZWN0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gY29ycmVjdGVkVGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2FyaWEtaGlkZGVuJywgdGFyZ2V0LCAnaW4gbm90IGNvbnRhaW5lZCBpbnNpZGUnLCBwYXJlbnQsICcuIERvaW5nIG5vdGhpbmcnKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSlcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4gQm9vbGVhbih4KTsgfSk7XG59O1xuLyoqXG4gKiBNYXJrcyBldmVyeXRoaW5nIGV4Y2VwdCBnaXZlbiBub2RlKG9yIG5vZGVzKSBhcyBhcmlhLWhpZGRlblxuICogQHBhcmFtIHtFbGVtZW50IHwgRWxlbWVudFtdfSBvcmlnaW5hbFRhcmdldCAtIGVsZW1lbnRzIHRvIGtlZXAgb24gdGhlIHBhZ2VcbiAqIEBwYXJhbSBbcGFyZW50Tm9kZV0gLSB0b3AgZWxlbWVudCwgZGVmYXVsdHMgdG8gZG9jdW1lbnQuYm9keVxuICogQHBhcmFtIHtTdHJpbmd9IFttYXJrZXJOYW1lXSAtIGEgc3BlY2lhbCBhdHRyaWJ1dGUgdG8gbWFyayBldmVyeSBub2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gW2NvbnRyb2xBdHRyaWJ1dGVdIC0gaHRtbCBBdHRyaWJ1dGUgdG8gY29udHJvbFxuICogQHJldHVybiB7VW5kb30gdW5kbyBjb21tYW5kXG4gKi9cbnZhciBhcHBseUF0dHJpYnV0ZVRvT3RoZXJzID0gZnVuY3Rpb24gKG9yaWdpbmFsVGFyZ2V0LCBwYXJlbnROb2RlLCBtYXJrZXJOYW1lLCBjb250cm9sQXR0cmlidXRlKSB7XG4gICAgdmFyIHRhcmdldHMgPSBjb3JyZWN0VGFyZ2V0cyhwYXJlbnROb2RlLCBBcnJheS5pc0FycmF5KG9yaWdpbmFsVGFyZ2V0KSA/IG9yaWdpbmFsVGFyZ2V0IDogW29yaWdpbmFsVGFyZ2V0XSk7XG4gICAgaWYgKCFtYXJrZXJNYXBbbWFya2VyTmFtZV0pIHtcbiAgICAgICAgbWFya2VyTWFwW21hcmtlck5hbWVdID0gbmV3IFdlYWtNYXAoKTtcbiAgICB9XG4gICAgdmFyIG1hcmtlckNvdW50ZXIgPSBtYXJrZXJNYXBbbWFya2VyTmFtZV07XG4gICAgdmFyIGhpZGRlbk5vZGVzID0gW107XG4gICAgdmFyIGVsZW1lbnRzVG9LZWVwID0gbmV3IFNldCgpO1xuICAgIHZhciBlbGVtZW50c1RvU3RvcCA9IG5ldyBTZXQodGFyZ2V0cyk7XG4gICAgdmFyIGtlZXAgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgaWYgKCFlbCB8fCBlbGVtZW50c1RvS2VlcC5oYXMoZWwpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudHNUb0tlZXAuYWRkKGVsKTtcbiAgICAgICAga2VlcChlbC5wYXJlbnROb2RlKTtcbiAgICB9O1xuICAgIHRhcmdldHMuZm9yRWFjaChrZWVwKTtcbiAgICB2YXIgZGVlcCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgaWYgKCFwYXJlbnQgfHwgZWxlbWVudHNUb1N0b3AuaGFzKHBhcmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHBhcmVudC5jaGlsZHJlbiwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50c1RvS2VlcC5oYXMobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBkZWVwKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGF0dHIgPSBub2RlLmdldEF0dHJpYnV0ZShjb250cm9sQXR0cmlidXRlKTtcbiAgICAgICAgICAgICAgICB2YXIgYWxyZWFkeUhpZGRlbiA9IGF0dHIgIT09IG51bGwgJiYgYXR0ciAhPT0gJ2ZhbHNlJztcbiAgICAgICAgICAgICAgICB2YXIgY291bnRlclZhbHVlID0gKGNvdW50ZXJNYXAuZ2V0KG5vZGUpIHx8IDApICsgMTtcbiAgICAgICAgICAgICAgICB2YXIgbWFya2VyVmFsdWUgPSAobWFya2VyQ291bnRlci5nZXQobm9kZSkgfHwgMCkgKyAxO1xuICAgICAgICAgICAgICAgIGNvdW50ZXJNYXAuc2V0KG5vZGUsIGNvdW50ZXJWYWx1ZSk7XG4gICAgICAgICAgICAgICAgbWFya2VyQ291bnRlci5zZXQobm9kZSwgbWFya2VyVmFsdWUpO1xuICAgICAgICAgICAgICAgIGhpZGRlbk5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXJWYWx1ZSA9PT0gMSAmJiBhbHJlYWR5SGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHVuY29udHJvbGxlZE5vZGVzLnNldChub2RlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1hcmtlclZhbHVlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKG1hcmtlck5hbWUsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghYWxyZWFkeUhpZGRlbikge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShjb250cm9sQXR0cmlidXRlLCAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBkZWVwKHBhcmVudE5vZGUpO1xuICAgIGVsZW1lbnRzVG9LZWVwLmNsZWFyKCk7XG4gICAgbG9ja0NvdW50Kys7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaGlkZGVuTm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgdmFyIGNvdW50ZXJWYWx1ZSA9IGNvdW50ZXJNYXAuZ2V0KG5vZGUpIC0gMTtcbiAgICAgICAgICAgIHZhciBtYXJrZXJWYWx1ZSA9IG1hcmtlckNvdW50ZXIuZ2V0KG5vZGUpIC0gMTtcbiAgICAgICAgICAgIGNvdW50ZXJNYXAuc2V0KG5vZGUsIGNvdW50ZXJWYWx1ZSk7XG4gICAgICAgICAgICBtYXJrZXJDb3VudGVyLnNldChub2RlLCBtYXJrZXJWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoIWNvdW50ZXJWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghdW5jb250cm9sbGVkTm9kZXMuaGFzKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGNvbnRyb2xBdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1bmNvbnRyb2xsZWROb2Rlcy5kZWxldGUobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW1hcmtlclZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUobWFya2VyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsb2NrQ291bnQtLTtcbiAgICAgICAgaWYgKCFsb2NrQ291bnQpIHtcbiAgICAgICAgICAgIC8vIGNsZWFyXG4gICAgICAgICAgICBjb3VudGVyTWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgICAgICAgICAgIGNvdW50ZXJNYXAgPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICAgICAgdW5jb250cm9sbGVkTm9kZXMgPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICAgICAgbWFya2VyTWFwID0ge307XG4gICAgICAgIH1cbiAgICB9O1xufTtcbi8qKlxuICogTWFya3MgZXZlcnl0aGluZyBleGNlcHQgZ2l2ZW4gbm9kZShvciBub2RlcykgYXMgYXJpYS1oaWRkZW5cbiAqIEBwYXJhbSB7RWxlbWVudCB8IEVsZW1lbnRbXX0gb3JpZ2luYWxUYXJnZXQgLSBlbGVtZW50cyB0byBrZWVwIG9uIHRoZSBwYWdlXG4gKiBAcGFyYW0gW3BhcmVudE5vZGVdIC0gdG9wIGVsZW1lbnQsIGRlZmF1bHRzIHRvIGRvY3VtZW50LmJvZHlcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbWFya2VyTmFtZV0gLSBhIHNwZWNpYWwgYXR0cmlidXRlIHRvIG1hcmsgZXZlcnkgbm9kZVxuICogQHJldHVybiB7VW5kb30gdW5kbyBjb21tYW5kXG4gKi9cbmV4cG9ydCB2YXIgaGlkZU90aGVycyA9IGZ1bmN0aW9uIChvcmlnaW5hbFRhcmdldCwgcGFyZW50Tm9kZSwgbWFya2VyTmFtZSkge1xuICAgIGlmIChtYXJrZXJOYW1lID09PSB2b2lkIDApIHsgbWFya2VyTmFtZSA9ICdkYXRhLWFyaWEtaGlkZGVuJzsgfVxuICAgIHZhciB0YXJnZXRzID0gQXJyYXkuZnJvbShBcnJheS5pc0FycmF5KG9yaWdpbmFsVGFyZ2V0KSA/IG9yaWdpbmFsVGFyZ2V0IDogW29yaWdpbmFsVGFyZ2V0XSk7XG4gICAgdmFyIGFjdGl2ZVBhcmVudE5vZGUgPSBwYXJlbnROb2RlIHx8IGdldERlZmF1bHRQYXJlbnQob3JpZ2luYWxUYXJnZXQpO1xuICAgIGlmICghYWN0aXZlUGFyZW50Tm9kZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfTtcbiAgICB9XG4gICAgLy8gd2Ugc2hvdWxkIG5vdCBoaWRlIGFyaWFMaXZlIGVsZW1lbnRzIC0gaHR0cHM6Ly9naXRodWIuY29tL3RoZUthc2hleS9hcmlhLWhpZGRlbi9pc3N1ZXMvMTBcbiAgICB0YXJnZXRzLnB1c2guYXBwbHkodGFyZ2V0cywgQXJyYXkuZnJvbShhY3RpdmVQYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1thcmlhLWxpdmVdJykpKTtcbiAgICByZXR1cm4gYXBwbHlBdHRyaWJ1dGVUb090aGVycyh0YXJnZXRzLCBhY3RpdmVQYXJlbnROb2RlLCBtYXJrZXJOYW1lLCAnYXJpYS1oaWRkZW4nKTtcbn07XG4vKipcbiAqIE1hcmtzIGV2ZXJ5dGhpbmcgZXhjZXB0IGdpdmVuIG5vZGUob3Igbm9kZXMpIGFzIGluZXJ0XG4gKiBAcGFyYW0ge0VsZW1lbnQgfCBFbGVtZW50W119IG9yaWdpbmFsVGFyZ2V0IC0gZWxlbWVudHMgdG8ga2VlcCBvbiB0aGUgcGFnZVxuICogQHBhcmFtIFtwYXJlbnROb2RlXSAtIHRvcCBlbGVtZW50LCBkZWZhdWx0cyB0byBkb2N1bWVudC5ib2R5XG4gKiBAcGFyYW0ge1N0cmluZ30gW21hcmtlck5hbWVdIC0gYSBzcGVjaWFsIGF0dHJpYnV0ZSB0byBtYXJrIGV2ZXJ5IG5vZGVcbiAqIEByZXR1cm4ge1VuZG99IHVuZG8gY29tbWFuZFxuICovXG5leHBvcnQgdmFyIGluZXJ0T3RoZXJzID0gZnVuY3Rpb24gKG9yaWdpbmFsVGFyZ2V0LCBwYXJlbnROb2RlLCBtYXJrZXJOYW1lKSB7XG4gICAgaWYgKG1hcmtlck5hbWUgPT09IHZvaWQgMCkgeyBtYXJrZXJOYW1lID0gJ2RhdGEtaW5lcnQtZWQnOyB9XG4gICAgdmFyIGFjdGl2ZVBhcmVudE5vZGUgPSBwYXJlbnROb2RlIHx8IGdldERlZmF1bHRQYXJlbnQob3JpZ2luYWxUYXJnZXQpO1xuICAgIGlmICghYWN0aXZlUGFyZW50Tm9kZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfTtcbiAgICB9XG4gICAgcmV0dXJuIGFwcGx5QXR0cmlidXRlVG9PdGhlcnMob3JpZ2luYWxUYXJnZXQsIGFjdGl2ZVBhcmVudE5vZGUsIG1hcmtlck5hbWUsICdpbmVydCcpO1xufTtcbi8qKlxuICogQHJldHVybnMgaWYgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIGluZXJ0XG4gKi9cbmV4cG9ydCB2YXIgc3VwcG9ydHNJbmVydCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdHlwZW9mIEhUTUxFbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBIVE1MRWxlbWVudC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkoJ2luZXJ0Jyk7XG59O1xuLyoqXG4gKiBBdXRvbWF0aWMgZnVuY3Rpb24gdG8gXCJzdXBwcmVzc1wiIERPTSBlbGVtZW50cyAtIF9oaWRlXyBvciBfaW5lcnRfIGluIHRoZSBiZXN0IHBvc3NpYmxlIHdheVxuICogQHBhcmFtIHtFbGVtZW50IHwgRWxlbWVudFtdfSBvcmlnaW5hbFRhcmdldCAtIGVsZW1lbnRzIHRvIGtlZXAgb24gdGhlIHBhZ2VcbiAqIEBwYXJhbSBbcGFyZW50Tm9kZV0gLSB0b3AgZWxlbWVudCwgZGVmYXVsdHMgdG8gZG9jdW1lbnQuYm9keVxuICogQHBhcmFtIHtTdHJpbmd9IFttYXJrZXJOYW1lXSAtIGEgc3BlY2lhbCBhdHRyaWJ1dGUgdG8gbWFyayBldmVyeSBub2RlXG4gKiBAcmV0dXJuIHtVbmRvfSB1bmRvIGNvbW1hbmRcbiAqL1xuZXhwb3J0IHZhciBzdXBwcmVzc090aGVycyA9IGZ1bmN0aW9uIChvcmlnaW5hbFRhcmdldCwgcGFyZW50Tm9kZSwgbWFya2VyTmFtZSkge1xuICAgIGlmIChtYXJrZXJOYW1lID09PSB2b2lkIDApIHsgbWFya2VyTmFtZSA9ICdkYXRhLXN1cHByZXNzZWQnOyB9XG4gICAgcmV0dXJuIChzdXBwb3J0c0luZXJ0KCkgPyBpbmVydE90aGVycyA6IGhpZGVPdGhlcnMpKG9yaWdpbmFsVGFyZ2V0LCBwYXJlbnROb2RlLCBtYXJrZXJOYW1lKTtcbn07XG4iXSwibmFtZXMiOlsiZ2V0RGVmYXVsdFBhcmVudCIsIm9yaWdpbmFsVGFyZ2V0IiwiZG9jdW1lbnQiLCJzYW1wbGVUYXJnZXQiLCJBcnJheSIsImlzQXJyYXkiLCJvd25lckRvY3VtZW50IiwiYm9keSIsImNvdW50ZXJNYXAiLCJXZWFrTWFwIiwidW5jb250cm9sbGVkTm9kZXMiLCJtYXJrZXJNYXAiLCJsb2NrQ291bnQiLCJ1bndyYXBIb3N0Iiwibm9kZSIsImhvc3QiLCJwYXJlbnROb2RlIiwiY29ycmVjdFRhcmdldHMiLCJwYXJlbnQiLCJ0YXJnZXRzIiwibWFwIiwidGFyZ2V0IiwiY29udGFpbnMiLCJjb3JyZWN0ZWRUYXJnZXQiLCJjb25zb2xlIiwiZXJyb3IiLCJmaWx0ZXIiLCJ4IiwiQm9vbGVhbiIsImFwcGx5QXR0cmlidXRlVG9PdGhlcnMiLCJtYXJrZXJOYW1lIiwiY29udHJvbEF0dHJpYnV0ZSIsIm1hcmtlckNvdW50ZXIiLCJoaWRkZW5Ob2RlcyIsImVsZW1lbnRzVG9LZWVwIiwiU2V0IiwiZWxlbWVudHNUb1N0b3AiLCJrZWVwIiwiZWwiLCJoYXMiLCJhZGQiLCJmb3JFYWNoIiwiZGVlcCIsInByb3RvdHlwZSIsImNhbGwiLCJjaGlsZHJlbiIsImF0dHIiLCJnZXRBdHRyaWJ1dGUiLCJhbHJlYWR5SGlkZGVuIiwiY291bnRlclZhbHVlIiwiZ2V0IiwibWFya2VyVmFsdWUiLCJzZXQiLCJwdXNoIiwic2V0QXR0cmlidXRlIiwiY2xlYXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJkZWxldGUiLCJoaWRlT3RoZXJzIiwiZnJvbSIsImFjdGl2ZVBhcmVudE5vZGUiLCJhcHBseSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbmVydE90aGVycyIsInN1cHBvcnRzSW5lcnQiLCJIVE1MRWxlbWVudCIsImhhc093blByb3BlcnR5Iiwic3VwcHJlc3NPdGhlcnMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/aria-hidden/dist/es2015/index.js\n");

/***/ })

};
;