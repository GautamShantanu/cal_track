import {TooltipPosition} from '@angular/material/tooltip';

export class Category {
  label: string;
  list: string[];
  toolTipOptions?: { position?: TooltipPosition, hideDelay?: number, showDelay?: number}
}
