(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/*
given markup
<div class="op op1">
	<div id="related-target">joyride element<div>
	<div class="op op2">
		<div id="target">target element</div>
	</div>
</div>

calculate x and y distance from common offsetParent (.op1) to target (#target)
*/

// too lazy to do umd correctly
var global = global || window || {};
var domOffset = {
	parentsFor: parentsFor,
	commonParentsFor: commonParentsFor,
	distToCommonOffsetParent:distToCommonOffsetParent
};

global.domOffset = domOffset;
module.exports = domOffset;

// get offset parents for an element all the way up to root
function parentsFor(el) {
	var parents = [];
	while (el.offsetParent !== null) {
		parents.push(el.offsetParent);
		el = el.offsetParent;
	}

	return parents.length > 0 ? parents : null;
}

// create array of offsetParent elements common to 2 elements
function commonParentsFor(target, relatedTarget) {
	var targetParents = parentsFor(target)
	var relatedParent = relatedTarget.offsetParent;
	var commonParents = [];

	for (var i = 0; i < targetParents.length; i++) {
		commonParents.push(targetParents[i]);
		if (targetParents[i] === relatedParent) {
			break;
		}
	}

	return commonParents.length > 0 ? commonParents : null;
}

// calculate x, and y distance of target from offsetParent common to provided
// elements
function distToCommonOffsetParent(target, relatedTarget) {
	// list of parents commont to both traget and relatedTarget
	var commonParents = commonParentsFor(target, relatedTarget);
	// list of elements we need to get offsets from
	var elements = commonParents.slice(0, -1); // remove the common parent
	elements.unshift(target); // add target element

	// sum x and y offsets
	return elements.reduce(accumulateXY, {x: 0, y: 0});
}

// accululate x and y offsets
function accumulateXY(acc, el) {
	acc.x += el.offsetLeft;
	acc.y += el.offsetTop;
	return acc;
}
},{}]},{},[1]);
