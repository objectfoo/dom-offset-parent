var expect = chai.expect;

var markup = {
	nestedOffsetParents: '<div class="op op1">' +
		'<div id="related-target">joyride element (hidden so we can see the fixture if we want)</div>' +
		'<div class="op op2">' +
			'<div id="target">target element</div>' +
		'</div>' +
	'</div>',

	bodyParent: '<div>' +
		'<div id="related-target">joyride element (hidden so we can see the fixture if we want)</div>' +
		'<div id="target">target element</div>' +
	'</div>'
};

var $body = document.body;
var $fixture = document.querySelector('#fixture');

describe('api', function() {
	describe('distToCommonOffsetParent with offset parents', function() {
		var $relatedTarget = null;
		var $target = null;
		var domOffset = window.domOffset;

		beforeEach(function() {
			$fixture.innerHTML = markup.nestedOffsetParents;
			$relatedTarget = document.querySelector('#related-target');
			$target = document.querySelector('#target');
		});

		afterEach(function() {
			$fixture.innerHTML = '';
			$relatedTarget = null;
			$target = null;
		});

		it('should calculate distance from common offsetParent for 2 elements', function() {
			var result = domOffset.distToCommonOffsetParent($target, $relatedTarget);

			expect(result).to.have.property('x', 40);
			expect(result).to.have.property('y', 40);
		});
	});

	describe('distToCommonOffsetParent with BODY as offsetParent', function() {
		var $relatedTarget = null;
		var $target = null;
		var domOffset = window.domOffset;

		beforeEach(function() {
			$fixture.innerHTML = markup.bodyParent;
			$relatedTarget = document.querySelector('#related-target');
			$target = document.querySelector('#target');
		});

		afterEach(function() {
			$fixture.innerHTML = '';
			$relatedTarget = null;
			$target = null;
		});

		it('should calculate distance from common parent for 2 elements', function() {
			var result = domOffset.distToCommonOffsetParent($target, $relatedTarget);

			expect(result).to.have.property('x', 20);
			expect(result).to.have.property('y', 20);
		});
	});
});

describe('helpers', function() {
	describe('parentsFor', function() {
		var $relatedTarget = null;
		var $target = null;
		var domOffset = window.domOffset;

		beforeEach(function() {
			$fixture.innerHTML = markup.nestedOffsetParents;
			$relatedTarget = document.querySelector('#related-target');
			$target = document.querySelector('#target');
		});

		afterEach(function() {
			$fixture.innerHTML = '';
			$relatedTarget = null;
			$target = null;
		});

		it('should return array of offset parents for target including BODY', function() {
			var result = domOffset.parentsFor($target);

			expect(result[0]).to.have.property('className', 'op op2');
			expect(result[1]).to.have.property('className', 'op op1');
			expect(result[2]).to.have.property('tagName', 'BODY');
		});
	});

	describe('commonParentsFor', function() {
		var $relatedTarget = null;
		var $target = null;
		var domOffset = window.domOffset;

		beforeEach(function() {
			$fixture.innerHTML = markup.nestedOffsetParents;
			$relatedTarget = document.querySelector('#related-target');
			$target = document.querySelector('#target');
		});

		afterEach(function() {
			$fixture.innerHTML = '';
			$relatedTarget = null;
			$target = null;
		});

		it('should return array of offset parents common to two elements', function() {
			var result = domOffset.commonParentsFor($target, $relatedTarget);

			expect(result[0]).to.have.property('className', 'op op2');
			expect(result[1]).to.have.property('className', 'op op1');
		});
	});
});


