addEventListener('message', event => {
    let moeda = event.data;
    conectaAPI(moeda);
    setInterval(() =>  conectaAPI(moeda), 5000)
});

async function conectaAPI(moeda) {
    const conecta = await fetch('https://economia.awesomeapi.com.br/last/MXN-BRL');
    const conectaTraduzido = await conecta.json();
    postMessage(conectaTraduzido.MXNBRL);
}