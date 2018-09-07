/* global $ */

const Api = (function () {

    const BASE_URL = 'https://thinkful-list-api.herokuapp.com/shanelupton/bookmarks/';

    const getBookmarks = function (callback) {
        $.getJSON(BASE_URL, callback );
    };

    const createBookmark = function (title, url, desc, rating, ) {
        const newBookmark = JSON.stringify({
            title,
            url,
            desc,
            rating
        });

        return $.ajax({
            url: `${BASE_URL}`,
            method: 'POST',
            contentType: 'application/json',
            data: newBookmark,

        });
    };

    const deleteBookmark = function (id) {
        return $.ajax({
            url: BASE_URL + id,
            method: 'DELETE',

        });
    };

    return {
        getBookmarks,
        createBookmark,
        deleteBookmark,
    };
}());