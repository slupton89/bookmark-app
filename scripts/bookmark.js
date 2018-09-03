/* global cuid */

const Bookmark = (function () {

    const validateData = function (title, url) {
        if (!title || !url) {
            throw new Error('Missing required info');
        }
    };

    const create = function (title, url, desc, rating) {
        return {
            id: cuid(),
            title,
            url,
            desc,
            rating,
        };
    };

    return {
        validateData,
        create,
    };
}());