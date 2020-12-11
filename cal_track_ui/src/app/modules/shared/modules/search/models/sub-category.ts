import {TooltipPosition} from "@angular/material/tooltip";

export class SubCategory {
  label: string;
  list: string[];
  toolTipOptions?: { position?: TooltipPosition, hideDelay?: number, showDelay?: number}
}
