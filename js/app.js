$(function () {
    console.log('dziala');
    $.ajax({
        url: 'http://date.jsontest.com',
        type:'GET',
        dataType:'json'
    })
        .done(function (dane) {
            console.log(dane)
            $('#test').text(dane.date);
        })
        .fail(function (xhr, status,err) {
            console.log(xhr)
            console.log(status)
            console.log(err)
        })
    $.ajax({
        url: 'https://swapi.co/api/people/4/',
        type: 'GET',
        dataType: 'json'
    })
        .done(function (infoOludziku) {
            console.log(infoOludziku);
            $('#ludzik').text(infoOludziku.name)
        })
        .fail(function () {
            $('#ludzik').text('przepraszamy:nie udalo sie poprac danych z serwera')
        })
    $.ajax({
        url: 'http://127.0.0.1:8000/book/',
        type: 'GET',
        dataType: 'json'
    })
        .done(function (books) {
            console.log(books);
            for (var i = 0; i < books.length; i++) {
                var bookid = books[i].id;
                var newLi = $('<li>', { id : bookid});
                var lista = $('ul');
                newLi.appendTo(lista).text(books[i].title)
                var newDiv = $('<div class="dives">')
                newDiv.appendTo(lista)
            }
            })

        .fail(function () {
            $('#books').text('przepraszamy:nie udalo sie poprac danych z serwera')
        });

    function getInfo() {
        var lista = $('ul');
        lista.on('click','li',function (event) {
            console.log(event.target.id);
            var id = event.target.id;
            $.ajax({
            url: 'http://127.0.0.1:8000/book/'+id,
            type: 'GET',
            dataType: 'json'
        })
            .done(function (book) {
                console.log(book.id);
                console.log(event.target);
                var liWyb = $('#'+id);
                var divWyb = liWyb.next();
                divWyb.text("id "+book.id+" author " +book.author+" isbn "
                    +book.isbn+" publisher "+book.publisher)
            })
        })}
    getInfo()


    function sendForm(){
        var newform = $('#newform')
        newform.on('submit',function (event) {
            event.preventDefault()
            console.log(newform)
            var author = $('#author')
            var gendre = $('#gendre')
            var isbn = $('#isbn')
            var publisher = $('#pubslisher')
            var title = $('#title')
            $.ajax({
            url: 'http://127.0.0.1:8000/book/'+id,
            type: 'POST',
            data: {"author" :author,
                "gendre":gendre,"isbn":isbn,
                "publisher":publisher,
                "title":title}
        })
            .done(function () {
                console.log('poszlo');

            })
        })
    }
    sendForm()
})


