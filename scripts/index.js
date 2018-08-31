/* global Api, Store, Index, BookmarkMan $  */

$(document).ready(function() {
    BookmarkMan.bindEventListeners();
    BookmarkMan.render();

    Api.getBookmarks((bookmarks) => {
        console.log(bookmarks);

        bookmarks.forEach((bookmark) => Store.addBookmark(bookmark));
        console.log(Store.items);

        BookmarkMan.render();
    });
});