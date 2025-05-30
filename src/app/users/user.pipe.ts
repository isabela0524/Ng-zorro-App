import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ageCategory',
    standalone: true
})
export class AgeCategoryPipe implements PipeTransform {
    transform(age: number): string {
        return age >= 18 ? 'Adult' : 'Minor';
    }
}