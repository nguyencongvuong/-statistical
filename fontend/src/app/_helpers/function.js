 filtersLabel = function(value, key) {
  var keyText = 0;
  key.labels.forEach(function (v, k) {
    if (value.text == v) {
      keyText = k;
    }
  });
  var val = key.datasets[0]['data'][keyText];
  value.text = value.text + ': ' + val;
  return value;
};

customTooltip = function(tooltipModel) {
  // Tooltip Element
  var tooltipEl = document.getElementById('chartjs-tooltip');
  // Create element on first render
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'chartjs-tooltip';
    tooltipEl.innerHTML = '<table></table>';
    document.body.appendChild(tooltipEl);
  }
  // Hide if no tooltip
  if (tooltipModel.opacity === 0) {
    // tooltipEl.style.opacity = 0;
    tooltipEl.style.opacity = "1";
    return;
  }
  // Set caret Position
  tooltipEl.classList.remove('above', 'below', 'no-transform');
  if (tooltipModel.yAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign);
  } else {
    tooltipEl.classList.add('no-transform');
  }
  function getBody(bodyItem) {
    return bodyItem.lines;
  }
  if (tooltipModel.body) {
    var titleLines = tooltipModel.title || [];
    var bodyLines = tooltipModel.body.map(getBody);

    var innerHtml = '<thead>';

    titleLines.forEach(function(title) {
      innerHtml += '<tr><th>' + title + '</th></tr>';
    });
    innerHtml += '</thead><tbody>';

    bodyLines.forEach(function(body, i) {
      var colors = tooltipModel.labelColors[i];

      var style = 'background:' + "#000";
      style += '; border-color:' + colors.borderColor;
      style += '; border-width: 2px';
      var span = '<span style="background-color: red"></span>';
      innerHtml += '<tr><td>' + span + body + '</td></tr>';
    });
    innerHtml += '</tbody>';

    var tableRoot = tooltipEl.querySelector('table');
    tableRoot.innerHTML = innerHtml;
  }
  var position = this._chart.canvas.getBoundingClientRect();
  // Display, position, and set styles for font
  console.log(this);
  tooltipEl.style.opacity = "1";
  tooltipEl.style.zIndex = "10000";
  tooltipEl.style.backgroundColor= "#000";
  tooltipEl.style.position = 'absolute';
  tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
  tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - 20 + 'px';
  tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
  tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
  tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
  tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
  tooltipEl.style.pointerEvents = 'none';
}
