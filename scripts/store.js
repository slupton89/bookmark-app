/* global Api, Store, Index, BookmarkMan $ */

const Store = (function() {

    const addBookmark = function(bm) {
        this.items.push(bm);
    };

    const findAndDelete = function(id) {
        this.items = this.items.filter(item => item.id !== id);
        Api.deleteBookmark(id);
    };

    const findAndUpdate = function(id, newData) {
        const oldData = this.items.find(function(item) {
            return item.id === id;
        });

        Object.assign(oldData, newData);
    };

    const setSearchTerm = function(term) {
        this.searchTerm = term;
    };

    return {
        items: [],
        selItems: [],
        addBookmark,
        findAndDelete,
        findAndUpdate,
        setSearchTerm,
    };
});