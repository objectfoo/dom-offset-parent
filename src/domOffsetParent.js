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

function parentsFor(el) {
	var parents = [];
	while (el.offsetParent !== null) {
		parents.push(el.offsetParent);
		el = el.offsetParent;
	}

	return parents.length > 0 ? parents : null;
}

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

function distToCommonOffsetParent(target, relatedTarget) {
	// list of parents commont to both traget and relatedTarget
	var commonParents = commonParentsFor(target, relatedTarget);
	// list of elements we need to get offsets from
	var elements = commonParents.slice(0, -1); // remove the common parent
	elements.unshift(target); // add target element

	// sum x and y offsets
	return elements.reduce(sumOffsets, {x: 0, y: 0});
}

function sumOffsets(acc, el) {
	acc.x += el.offsetLeft;
	acc.y += el.offsetTop;
	return acc;
}