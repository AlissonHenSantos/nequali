// Função para carregar e exibir dados da planilha do Google Sheets
function loadGoogleSheetData() {
    // ID da planilha do Google Sheets
    const spreadsheetId = '11_6yplqetscEVGbr1z6hWBKe60OewLWp6hIQVONhhQ4';
    // ID da planilha dentro do documento (geralmente 0 para a primeira planilha)
    const sheetId = 0;

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'acoes' // Substitua pelo nome da aba que você deseja ler
    }).then(function(response) {
        const data = response.result.values;
        const tableBody = document.querySelector('#grid-eventos');
        console.log(data);

        // Limpe qualquer conteúdo existente na tabela
        tableBody.innerHTML = '';

        // Preencha a tabela com os dados da planilha
       
            data.slice(1).forEach((data) => {
                const article = document.createElement('article');
                article.className = 'event-card';
                const img = document.createElement('img');
                img.src = "https://placehold.co/465x320";
                const divEventBody = document.createElement('div');
                divEventBody.className = 'event-body';
                const time = document.createElement('time')
                time.className = 'event-date';
                time.textContent = data[0];
                const h3 = document.createElement('h3');
                h3.textContent = data[1];
                const p = document.createElement('p');
                p.textContent = data[2];
                const a = document.createElement('a');
                a.className = 'card-cta';
                a.href = data[4];
                a.textContent = 'Saiba mais';
                article.appendChild(img);
                divEventBody.appendChild(time);
                divEventBody.appendChild(h3);
                divEventBody.appendChild(p);
                divEventBody.appendChild(a);
                article.appendChild(divEventBody);
                tableBody.appendChild(article);
            })
           
        });
    ;
}
//<article class="event-card">
//          <img src="https://placehold.co/465x320" alt="Evento 1" class="event-media">
//          <div class="event-body">
//            <time class="event-date">12 Maio • 2026</time>
//            <h3>Workshop — Técnicas de Pesquisa</h3>
//            <p>Oficina prática sobre metodologia e ferramentas para pesquisas aplicadas em empresas.</p>
//            <a class="card-cta" href="#">Saiba mais</a>
//          </div>
//        </article>

// Função para inicializar a API do Google Sheets
function initGoogleSheetsApi() {
    gapi.client.init({
        apiKey: 'AIzaSyAA89x1MCDtbVYEWZj7B-8trHiwuP3LrdM',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        loadGoogleSheetData();
    });
}

// Carrega a API do Google Sheets e inicia a aplicação
gapi.load('client', initGoogleSheetsApi);


