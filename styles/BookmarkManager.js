/* global Api, Store, Index, BookmarkMan   */

const BookmarkMan = (function() {

    //handle add
    handleNewBookmark() {
        $('#js-create-bookmark-form').submit(function(event) {
            event.preventDefault();

            const newBmName = $('js-name-input').val();
            const newBmUrl = $('js-url-input').val();
            const newBmDesc = $('js-desc-input').val();
            const newBmRating = $('js-rating-input').val();
            $('js-name-input').val('');
            $('js-url-input').val('');
            $('js-desc-input').val('');
            $('js-name-input').val('');

            Api.createBookmark(newBmName, newBmUrl, newBmDesc, newBmRating, (newBm) => {
                Store.addItem(newBm);
                render();
            });
        })
    }

    //handle del
    function handleDeleteBookmark() {
        $('js-controls').on('click', '#del-btn', event => {
            const id = getItemId(event.currentTarget);
            Api.deleteBookmark(id, (id) => {
                Store.findAndDelete(id);
                render();
            })
        })
    }


    //handle edit
    function handleEditBookmark() {
        $('js-bookmark-controls').on('submit', '#edit-btn', event => {
            const id = getItemId(event.currentTarget);
            const bm = $(event.currentTarget).find('.bookmark')
            const bmName = bm.name.val();
            const bmUrl = bm.url.val();
            const bmDesc = bm.desc.val();
            const bmRating = bm.rating.val();

            Api.updateBookmark(id, bmName, bmUrl, bmDesc, bmRating, Store.updateBookmark);
            render();
        })
    }

    //handle search
    function search() {
        $('#search-input').on('keyup', event => {
            const val = (event.currentTarget);
            Store.setSearchTerm(val);
            render();
        })
    }


    //render
    function render() {
        let items = Store.items;

        if(Store.searchTerm) {
            items = Store.items.filter(item => items.name.includes(Store.searchTerm));
        }

        const bookmarksItemsString = generateBookmarksItemsString;

        $('content').html(bookmarksItemsString);
    }

    function handleCheckbox() {
        $('#checkbox').on('click', event => {
            const id = Store.getItemId(event.currentTarget);
            for (const item of Store.selItems) {
                if(item.id !== id) {
                    Store.selItems.push(id);
                } else {
                    Store.selItems.slice(item.index, 1);
                }
            }
        })
    }

}());