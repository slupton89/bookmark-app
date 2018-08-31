/* global Api, Store, Index, BookmarkMan $ */

const BookmarkMan = (function() {

    //get id
    function getItemId(bm) {
        return $(bm).closest('#bookmark').data('bm-id');
    }

    //handle add
    function handleNewBookmark() {
        $('#js-create-bookmark-form').on('click', '#submit-btn', function(event) {
            event.preventDefault();

            // const newBmName = 'Test Name';
            // const newBmUrl = 'http://google.com';
            // const newBmDesc = 'Short description';
            // const newBmRating = 3;

            const newBmName = $('#js-name-input').val();
            const newBmUrl = $('#js-url-input').val();
            const newBmDesc = $('#js-desc-input').val();
            const newBmRating = $('.dropdown-content').find('.radio:checked').val()
            $('#js-name-input').val('');
            $('#js-url-input').val('');
            $('#js-desc-input').val('');
            $('#js-name-input').val('');

            console.log(newBmName, newBmUrl, newBmDesc, newBmRating);

            Api.createBookmark(newBmName, newBmUrl, newBmDesc, newBmRating, (newBm) => {
                Store.addBookmark(newBm);
                console.log(newBmName, newBmUrl, newBmDesc, newBmRating);

                //render();
            });
        });
    }

    //handle del
    function handleDeleteBookmark() {
        $('.bookmark').on('click', '#delete-btn', event => {
            const id = getItemId(event.currentTarget);
            console.log('deleting', id);

            Api.deleteBookmark(id, (id) => {
                Store.findAndDelete(id);
                render();
            });
        });
    }


    //handle edit
    function handleEditBookmark() {
        $('js-bookmark-controls').on('submit', '#edit-btn', event => {
            const id = getItemId(event.currentTarget);
            const bm = $(event.currentTarget).find('.bookmark');
            const bmName = bm.name.val();
            const bmUrl = bm.url.val();
            const bmDesc = bm.desc.val();
            const bmRating = bm.rating.val();

            Api.updateBookmark(id, bmName, bmUrl, bmDesc, bmRating, Store.updateBookmark);
            render();
        });
    }

    //handle search
    function search() {
        $('#search-input').on('keyup', event => {
            const val = (event.currentTarget);
            Store.setSearchTerm(val);
            render();
        });
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
        });
    }

    function generateBookmarksElement(bookmark) {
        let bookmarkTitle = `<h3 class="bm-title">${bookmark.title}</h3>`;

        return `
            <div class="bookmark" bm-id="${bookmark.id}">
                <img src="delete-button.png" id="delete-btn" alt="delete-btn">
                <img src="img-placeholder.jpg" alt="" class="bm-img">
                ${bookmarkTitle}
                <p class="bm-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <div class="rating-container">
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                </div>
            </div>
        `
    }

    function generateBookmarksItemsString(bookmarkItems) {
        const bmString = bookmarkItems.map((bm) => generateBookmarksElement(bm));
        return bmString.join('');
    }


    //render
    function render() {
        let bookmarks = Store.items;

        if(Store.searchTerm) {
            bookmarks = Store.items.filter(bm => bm.name.includes(Store.searchTerm));
        }

        const bookmarksItemsString = generateBookmarksItemsString(bookmarks);

        $('.content').html(bookmarksItemsString);
    }

    function bindEventListeners() {
        handleNewBookmark();
        handleDeleteBookmark();
        handleEditBookmark();
        handleCheckbox();

    }

    return {
        render: render,
        bindEventListeners: bindEventListeners,
    };

}());