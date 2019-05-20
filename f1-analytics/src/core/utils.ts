import { Driver } from 'selenium-webdriver/opera';

export function mapFinishingPositions(Results: any[]) {
  let resultados = new Array();
  Results.map(item => {
    item.Results.map(result => {
      if (result.positionText != 'R' && result.positionText != 'F' && result.positionText != 'D' && result.positionText != 'N' && result.positionText != 'W') {
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
      resultados.push(result.grid);
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

export function setChartOptions(title, xlabel, ylabel, yStepSize, yReverse, legendPointStyle, xTicksDecoration?, yTicksDecoration?) {
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
          }
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
            fontColor: '#000'
          },
          position: 'left',
        },
      ]
    }
  };
}

export function setMobileChartOptions(yStepSize, yReverse, legendPointStyle, yticksDecoration?) {
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
          autoSkip: true
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
            fontColor: '#000'
          },
          position: 'left',
        },
      ]
    }
  };
}

export function setChartDataSet() {

}
