import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  enumSelector(definition) {
    return Object.keys(definition)
      .map(keyString => ({ key: definition[keyString], value: keyString }));
  }

}
