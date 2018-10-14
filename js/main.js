let bookMarkIt = () => {
    const siteName = document.getElementById('siteName').value;
    const siteUrl = document.getElementById('siteUrl').value;

    let bookmarkObject = {
        name: siteName,
        url: siteUrl
    }
    
    if (localStorage.getItem('bookmarks') === null) {
        let bookmarkArray = [];
        bookmarkArray.push(bookmarkObject);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkArray));
    } else {
        let bookmarkArray = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarkArray.push(bookmarkObject);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkArray));
    }
}

function deleteBookMark(url) {
    let bookmarkArray = JSON.parse(localStorage.getItem('bookmarks'));
    for(const bookmark of bookmarkArray) {
        if (bookmark.url === url ) {
            localStorage.removeItem('bookmarks');
        }
    }
}

let fetchBookMarks = () => {
    let bookmarkArray = JSON.parse(localStorage.getItem('bookmarks'));
    let bookMarksResults = document.getElementById('bookMarksResults');
    bookMarksResults.innerHTML = '';
    
    for (const bookmark of bookmarkArray) {
        const name = bookmark.name;
        const url = bookmark.url;
        bookMarksResults.innerHTML += `
        <div class="well">
        <h3>
        ${name}
        <a class="btn btn-default" target="_blank" href="${url}">visit</a>
        <a onclick="deleteBookMark('${url}')" class="btn btn-danger"  >delete</a>
        </h3>
        </div>
        `;
    }
}

