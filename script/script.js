import {selecionaCotacao} from "./imprimeCotacao.js";

const graficoDolar = document.getElementById('graficoDolar');
const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dólar',
        data: [],
        borderWidth: 1
      }]
    }
});   

function geraHorario() {
    let data = new Date();
    let horario = data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds();
    return horario;
}

function adicionarDados(grafico, legenda, dados) {
    grafico.data.labels.push(legenda);
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados);
    })
    grafico.update();
}

let workDolar = new Worker('./script/workers/workerDolar.js');
workDolar.postMessage('usd');

workDolar.addEventListener('message', event => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  selecionaCotacao('dolar', valor);
  adicionarDados(graficoParaDolar, tempo, valor);
})

const graficoIene = document.querySelector('#graficoIene');
const graficoParaIene = new Chart(graficoIene, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Iene',
      data: [],
      borderWidth: 1
    }]
  }
})

let workerIene = new Worker('./script/workers/workerIene.js');
workerIene.postMessage('iene');
workerIene.addEventListener('message', event => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  adicionarDados(graficoParaIene, tempo, valor);
  selecionaCotacao('iene', valor);
});


const graficoPesoMexicano = document.getElementById('graficoPesoMexicano');
const graficoParaPesoMexicano = new Chart(graficoPesoMexicano, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'PesoMexicano',
      data: [],
      borderWidth: 1,
      fill: false,
      borderColor: 'rgb(75, 100, 192)',
      tension:  0.1
    }]
  }
});
let workerPeso = new Worker('./script/workers/workerPesoMexicano.js');
workerPeso.postMessage('pesoMexicano');
workerPeso.addEventListener('message', event => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  adicionarDados(graficoParaPesoMexicano, tempo, valor);
  selecionaCotacao('pesoMexicano', valor);
})