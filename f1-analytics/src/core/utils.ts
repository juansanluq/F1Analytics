import { Driver } from 'selenium-webdriver/opera';
import { ChartOptions } from 'chart.js';

export function mapFinishingPositions(Results: any[]) {
  let resultados = new Array();
  Results.map(item => {
    item.Results.map(result => {
      if (result.positionText != 'R' && result.positionText != 'F' && result.positionText != 'D' && result.positionText != 'N' && result.positionText != 'W' && result.positionText != 'E') {
        resultados.push(result.positionText);
      };
    })
  });
  return countPositions(resultados);
}

export function mapGridPositions(Results: any[]) {
  let resultados = new Array();
  Results.map(item => {
    item.Results.map(result => {
      if (result.grid != 0) {
        resultados.push(result.grid);
      }
    });
  });
  return countPositions(resultados);
}

function countPositions(arr) {
  var a = [], b = [], prev;

  arr.sort(function (a, b) { return a - b });
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      a.push(arr[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = arr[i];
  }

  return [a, b];
}

export function setChartOptions(title, xlabel, ylabel, yStepSize, yReverse, legendPointStyle, minYAxis, xTicksDecoration?, yTicksDecoration?) {
  return {
    maintainAspectRatio: false,
    responsive: true,
    responsiveAnimationDuration: 3000,
    legend: {
      fullWidth: true,
      labels: {
        fontSize: 15,
        fontFamily: 'F1-Regular',
        fontColor: '#000',
        usePointStyle: legendPointStyle
      }
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 25
      }
    },
    title: {
      text: title,
      display: true,
      fontSize: 30,
      fontFamily: 'F1-Bold',
      fontColor: '#000',
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: xlabel,
          fontSize: 20,
          fontFamily: 'F1-Regular',
          fontColor: '#000'
        },
        ticks: {
          fontSize: 15,
          maxRotation: 90,
          minRotation: 50,
          padding: 5,
          fontColor: '#000',
          if(xTicksDecoration) {
            callback: (value, index, values) => {
              return value + xTicksDecoration;
            }
          },
          min: 1,
        },
      }],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: ylabel,
            fontSize: 20,
            fontFamily: 'F1-Regular',
            fontColor: '#000'
          },
          ticks: {
            reverse: yReverse,
            autoSkip: true,
            if(yTicksDecoration) {
              callback: (value, index, values) => {
                return value + yTicksDecoration;
              }
            },
            stepSize: yStepSize,
            fontSize: 15,
            fontColor: '#000',
            beginAtZero: false,
            min: minYAxis
          },
          position: 'left',
        },
      ]
    }
  };
}

export function setMobileChartOptions(yStepSize, yReverse, legendPointStyle, minYAxis, yticksDecoration?) {
  return {
    responsive: true,
    responsiveAnimationDuration: 3000,
    legend: {
      fullWidth: true,
      labels: {
        fontSize: 20,
        fontFamily: 'F1-Regular',
        fontColor: '#000',
        boxWidth: 15,
        fontStyle: 'center',
        usePointStyle: legendPointStyle
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 20,
        top: 10,
        bottom: 25
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Temporadas',
          fontSize: 20,
          fontFamily: 'F1-Regular',
          fontColor: '#000',
        },
        ticks: {
          fontSize: 15,
          padding: 5,
          fontColor: '#000',
          autoSkip: true,
          min: 1,
        },
      }],
      yAxes: [
        {
          ticks: {
            reverse: yReverse,
            // autoSkip: true,
            if(yTicksDecoration) {
              callback: (value, index, values) => {
                return value + yTicksDecoration;
              }
            },
            stepSize: yStepSize,
            fontSize: 15,
            fontColor: '#000',
            beginAtZero: false,
            min: minYAxis
          },
          position: 'left',
        },
      ]
    }
  };
}

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export function getPercentage(valorReal, valorTotal) {
  return round((valorReal * 100) / valorTotal, 1);
}

export function getAvg(count, valorTotal) {
  return Math.round(count / valorTotal);
}

export function mapSeasons(temporadas: any[]) {
  let sMapped = {
    'season': null,
    'eventsCount': null,
  }
  let year = 0;
  let lastYearCount = 0;
  let seasonsMapped = [];
  temporadas.map(item => {
    if (item.season != year) {
      // console.log(item.season);
      // console.log(temporadas.filter(itemf => itemf.season == item.season).length);
      seasonsMapped.push({
        'season': item.season,
        'eventsCount': temporadas.filter(itemf => itemf.season == item.season).length
      });
      year = item.season;
    }
  });
  return seasonsMapped;
}

export function mapPointsDistribution(results: any[]) {
  let totalPoints = 0;
  let teams = results.map(item => {
    totalPoints += parseFloat(item.points);
    return item.Constructors[0].constructorId;
  });
  teams = teams.filter((v, i) => teams.indexOf(v) === i);
  let ppt;
  ppt = teams.map(teamItem => {
    return (results.filter(item => item.Constructors[0].constructorId === teamItem));
  })
  let pd = []
  ppt.map(item => {
    let pointsCounter = 0;
    item.map((item2, index) => {
      // console.log(item2.Constructors[0].name);
      // console.log(item2.points);
      pointsCounter += parseFloat(item2.points);
      if (index === (item.length - 1))
        pd.push({
          'constructor': item2.Constructors[0],
          'points': pointsCounter,
          'percentage': getPercentage(pointsCounter, totalPoints),
        });
    })
  });
  return pd;
}

export function random_rgba() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}
