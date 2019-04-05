// Import {Injectable} from 'angular2/core';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class Helpers {

  public filtersLabel(value, key) {
    var keyText = 0;
    key.labels.forEach(function (v, k) {
      if (value.text == v) {
        keyText = k;
      }
    });
    var val = key.datasets[0]['data'][keyText];
    value.text = value.text + ': ' + val;
    return value;
  }
  getData(){
    // return
  }
}
