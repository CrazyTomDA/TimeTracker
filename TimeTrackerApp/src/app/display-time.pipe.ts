import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayTime'
})
export class DisplayTimePipe implements PipeTransform {

  transform(time: number, args?: any): string {
    var seconds = Math.ceil(time % 60);
    var minutes = Math.floor(time / 60);
    var hours = Math.floor(minutes / 60);
    minutes = minutes % 60;

    return ("0" + hours).slice(-2) + ":" +
    ("0" + minutes).slice(-2) + ":" +
    ("0" + seconds).slice(-2);
  }
}
