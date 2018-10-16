let bookMarkIt = () => {
    const siteName = document.getElementById('siteName').value;
    const siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)) {
        return false;
    }

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
    document.getElementById('myForm').reset();
    fetchBookMarks();
}

let deleteBookMark = (url) => {
    let bookmarkArray = JSON.parse(localStorage.getItem('bookmarks'));
    
    for (let i = 0; i <bookmarkArray.length; ++i) {
        if (bookmarkArray[i].url === url) {
            bookmarkArray.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkArray));
    fetchBookMarks();
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

let validateForm = (siteName, siteUrl) => {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('please enter a valid url');
        return false;
    }

    if (!siteName || !siteUrl) {
        alert('enter a name or url');
        return false;
    }
    return true;
}