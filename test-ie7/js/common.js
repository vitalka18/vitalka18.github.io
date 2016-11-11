'use strict';

/*global $*/
(function () {
	$('input, textarea').placeholder();
	tab('#searchTab');
})();

/**
 * init tab
 * @param {[String]} selector [Jquery selector]
 */
function tab(selector) {
	var $tabContainer = $(selector);
	var $nav = $tabContainer.find('.tab__control');

	$($nav).click(function (e) {
		if (!$(this).hasClass('is-active')) {
			var tabNum = $(this).parent().index();
			var nthChild = tabNum + 1;
			$tabContainer.find('.is-active').removeClass('is-active');
			$(this).addClass('is-active');
			$tabContainer.find('.tab__pane:nth-child(' + nthChild + ')').addClass('is-active');
		}
	});
}