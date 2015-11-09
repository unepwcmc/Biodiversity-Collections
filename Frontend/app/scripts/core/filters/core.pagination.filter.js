/**
 * Pagination Filter
 * Create link page to pagination module
 *
 * @author Jose Carlos
 * @since 06/07/2015
 *
 */
define(['angularAMD'], function (angularAMD) {

    'use strict';

    angularAMD.filter('pages', function (  ) {

        return function (input, currentPage, totalPages, range) {

            currentPage = parseInt(currentPage);
            totalPages = parseInt(totalPages);
            range = parseInt(range);

            var minPage = (currentPage - range < 0) ? 0 : (currentPage - range > (totalPages - (range * 2))) ? totalPages - (range * 2) : currentPage - range;
            var maxPage = (currentPage + range > totalPages) ? totalPages : (currentPage + range < range * 2) ? range * 2 : currentPage + range;

            for(var i=minPage; i<maxPage; i++) {
                input.push(i);
            }

            return input;
        };
    });
});
