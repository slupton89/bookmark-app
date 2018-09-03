/* global Api, Store, Index, BookmarkMan $  */

$(document).ready(function() {

    Api.getBookmarks((bookmarks) => {
        bookmarks.forEach((bookmark) => Store.addBookmark(bookmark));
        BookmarkMan.render();
    });

    BookmarkMan.bindEventListeners();
    BookmarkMan.render();


}());