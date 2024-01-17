import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatHour' })
export class FormatHourPipe implements PipeTransform {
    transform(value: string): string {
        return value ? value.substring(0, 5) : '';
    }
}