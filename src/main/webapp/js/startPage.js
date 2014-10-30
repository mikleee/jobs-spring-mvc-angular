function renderStartPage() {
    var body = $('body');
    $(body).append(createStartPageTable());
}

function reRenderStartPage() {
    $('body').empty().load("/jobs.html");
}


function createStartPageTable() {

    var buttonManager = new ButtonManager();

    return $('<table>').attr({'id': 'startTable'})
        .append($('<tr>')
            .append($('<th>').attr({'class': 'withButtons'})
                .append('This is start page')
            )
        )
        .append($('<tr>')
            .append($('<td>')
                .append(buttonManager.goToStartPageButton)
                .append('\n')
                .append(buttonManager.goToDepListButton)
            )
        );

}
