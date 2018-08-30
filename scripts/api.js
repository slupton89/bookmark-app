const Api = (function() {

    const BASE_URL = 'https://thinkful-list-api.herokuapp.com/shanelupton/bookmarks';

    const getBookmarks = function(callback) { $.getJSON(BASE_URL, callback); };

    const createBookmark = function(title, url, desc, rating, callback) {
        const newBookmark = JSON.stringify({title, url, desc, rating});

        $.ajax({
            url: `${BASE_URL}`,
            method: 'POST',
            contentType: 'application/json',
            data: newBookmark,
            success: callback,
        });
    };

    const deleteBookmark = function(id, callback) {
        $.ajax({
            url: BASE_URL + `/${id}`,
            method: 'DELETE',
            success: callback,
        });
    };

    return {
        getBookmarks,
        createBookmark,
        deleteBookmark,
    };
})();