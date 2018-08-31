/* global Api, Store, Index, BookmarkMan $ */

const Store = (function() {

    const addBookmark = function(bm) {
        this.items.push(bm);
    };

    const findAndDelete = function(id) {
        this.items = this.items.filter(item => item.id !== id);
        console.log('deleting', id, 'from', this.items);

    };

    const findAndUpdate = function(id, newData) {
        const oldData = this.items.find(function(item) {
            return item.id === id;
        });

        Object.assign(oldData, newData);
    };

    const setSearchTerm = function(term) {
        this.searchTerm = term;
        console.log('term', term);
    };

    const setSort = function(sort) {
        console.log(sort);
        this.items = this.items.sort(sort);
    };

    return {
        items: [],
        addBookmark: addBookmark,
        findAndDelete,
        findAndUpdate,
        setSearchTerm,
        setSort,
    };
}());