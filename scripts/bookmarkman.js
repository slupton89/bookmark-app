/* global Api, Store, Index, BookmarkMan $ */

const BookmarkMan = (function() {

    function render() {
        let bookmarks = Store.items;

        if(Store.searchTerm) {

            bookmarks = Store.items.filter(bm => bm.title.includes(Store.searchTerm));
        }


        console.log('render ran');
        const bookmarksItemsString = generateBookmarksItemsString(bookmarks);

        $('.content').html(bookmarksItemsString);
    }

    function getItemId(bm) {
        return $(bm).closest('.bookmark').attr('bm-id');
    }

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
            $('#js-url-input').val('http://');
            $('#js-desc-input').val('');
            $('#js-desc-input').val('');



            Api.createBookmark(newBmName, newBmUrl, newBmDesc, newBmRating, (newBm) => {
                Store.addBookmark(newBm);
                render();
            });
        });
    }

    function handleDeleteBookmark() {
        $('.content').on('click', '#js-delete-btn', (function(event) {
            const id = getItemId(event.currentTarget);
            Api.deleteBookmark(id, function() {
                Store.findAndDelete(id);
                render();
            });
        }));

    }

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

    function handleSearch() {
        $('.search-input').on('keyup', event => {
            const val = $(event.currentTarget).val();
            Store.setSearchTerm(val);
            render();
        });
    }

    function generateRating(bookmark) {
        console.log(bookmark.rating);

        switch (bookmark.rating) {
            case 1:
                return `<span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>`;
                break;

            case 2:
                return `<span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>`;
                break;

            case 3:
                return `<span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>`;
                break;

            case 4:
                return `<span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>`;
                break;

            case 5:
                return `<span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>`
                break;
        }

    }

    function generateBookmarksElement(bookmark) {
        let bookmarkTitle = `<h3 class="bm-title">${bookmark.title}</h3>`;

        return `
            <div class="bookmark" id="js-bookmark" bm-id="${bookmark.id}">

                ${bookmarkTitle}

                <div class="rating-container">
                    ${generateRating(bookmark)}
                </div>

                <p class="bm-description">${bookmark.desc}</p>

                <div class="bm-btns">
                <form method="get" action="${bookmark.url}"><button class="control-btn" id="add-btn" >Open Link</button></form>


                <button class="control-btn" id="js-delete-btn">Delete</button>
                </div>
              </div>

            </div>
        `
    }
           // <a href=${bookmark.url}><button class="control-btn" id="open-link-btn"></a><br><button class="js-delete-btn" id="delete-btn">
    function generateBookmarksItemsString(bookmarkItems) {
        const bmString = bookmarkItems.map((bm) => generateBookmarksElement(bm));
        return bmString.join('');
    }

    function handleDetailView() {
        $('.content').on('click', '.bookmark', (function(event) {
            $(event.currentTarget).toggleClass('active');
            const desc = $(event.currentTarget).find('.bm-description');
            const bmBtns = $(event.currentTarget).find('.bm-btns');

            if(desc.css('visibility') === 'hidden') {
                desc.css('visibility', 'visible');
                bmBtns.css('visibility', 'visible');

            } else {
                desc.css('visibility', 'hidden');
                bmBtns.css('visibility', 'hidden');

            }

        }));
    }

    function handleSort() {
        $('.js-controls').on('click', '#sort-select', (function(event) {
            console.log('clicked');
            const sortVal= $(event.currentTarget).val();
            let sortMethod = '';
            console.log(sortVal);

            switch (sortVal) {
                case 'az':
                        sortMethod = undefined;
                    break;
                case 'za':
                    sortMethod = function(a, b){return b[1]-a[1]};
                    break;
                case 'newest':
                    break;
                case 'oldest':
                    break;
                case 'ratingBest':
                sortMethod = function(a, b){return b.rating-a.rating}
                break;
                case 'ratingWorst':
                sortMethod = function(a, b){return a.rating-b.rating}
                    break;
                    //

            }
            console.log();
            Store.setSort(sortMethod);
            render();
        }));
    }

    function bindEventListeners() {
        handleNewBookmark();
        handleDeleteBookmark();
        handleEditBookmark();
        handleSearch();
        handleDetailView();
        handleSort();
    }

    return {
        render: render,
        bindEventListeners: bindEventListeners,
    };

}());