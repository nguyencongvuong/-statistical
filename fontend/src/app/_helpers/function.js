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
