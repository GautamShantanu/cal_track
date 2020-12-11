import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, startWith} from 'rxjs/operators';
import {Category} from '../../models/category';
import {SubCategory} from '../../models/sub-category';


@Component({
    selector: 'app-categorised-search',
    templateUrl: './categorised-search.component.html',
    styleUrls: ['./categorised-search.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CategorisedSearchComponent implements OnInit {

    @Input() category: Category;
    @Input() subCategory: SubCategory;
    @Input() panelClass: string;
    @Input() sortFn: (userInput: string) => ((a: string, b: string) => number);
    @Output() categorySelected: EventEmitter<string> = new EventEmitter<string>();
    @Output() subCategorySelected: EventEmitter<string> = new EventEmitter<string>();
    categoryFormControl = new FormControl();
    subCategoryFormControl = new FormControl();
    filteredSubCategoryList: string[];
    filteredCategoryList: string[];
    currentSelectedCategory: string;
    currentSelectedSubCategory: string;

    @ViewChild('categoryInput') categoryAutocompleteInput: ElementRef;
    @ViewChild('subCategoryAutocompleteInput') subCategoryAutocompleteInput: ElementRef;

    constructor() {
    }

    ngOnInit(): void {
        this.registerInputListeners();
    }

    registerInputListeners() {
        this.categoryFormControl.valueChanges
            .pipe(
                debounceTime(500),
                startWith(''))
            .subscribe(userInput => {
                this.filteredCategoryList = this.filterAutoSuggestList(userInput, this.category.list);
            });
        this.subCategoryFormControl.valueChanges
            .pipe(
                debounceTime(500),
                startWith('')
            )
            .subscribe(userInput => {
                this.filteredSubCategoryList = this.filterAutoSuggestList(userInput, this.subCategory.list);
            });
    }

    filterAutoSuggestList(userInput: string, sourceList: string[]): string[] {
        let filteredAutoSuggestList: string[] = [];
        if (sourceList === null || sourceList === undefined) {
            return filteredAutoSuggestList;
        }

        let filteredListUnordered = sourceList
            .filter(item =>
                item
                    .toLowerCase()
                    .indexOf(userInput.toLowerCase()) !== -1
            );
        if (!this.sortFn) {
            filteredAutoSuggestList = filteredListUnordered
                .sort(this.sortByIndexMatched(userInput));
        } else {
            filteredAutoSuggestList = filteredListUnordered.sort(this.sortFn(userInput));
        }
        return filteredAutoSuggestList;
    }

    onSelectCategory(event) {
        this.currentSelectedCategory = event.option.value || '';
        this.subCategory.list = [];
        this.filteredSubCategoryList = [];
        this.focusOnPlaceSubCategoryInput();
        this.categorySelected.emit(this.currentSelectedCategory);
    }

    onSubCategorySelected(event) {
        this.currentSelectedSubCategory = event.option.value || '';
        this.subCategorySelected.emit(this.currentSelectedSubCategory);
    }

    clearCategorySelection() {
        this.focusOnPlaceCategoryInput();
        this.subCategory.list = [];
        this.categorySelected.emit('');
        this.subCategorySelected.emit('');
    }

    clearSubCategorySelection() {
        this.focusOnPlaceSubCategoryInput();
        this.subCategorySelected.emit('');
    }

    focusOnPlaceCategoryInput() {
        this.categoryAutocompleteInput.nativeElement.focus();
        this.categoryAutocompleteInput.nativeElement.value = '';
    }

    focusOnPlaceSubCategoryInput() {
        this.subCategoryAutocompleteInput.nativeElement.focus();
        this.subCategoryAutocompleteInput.nativeElement.value = '';
    }

    private sortByIndexMatched(input: string): (a: string, b: string) => number {
        return (firstTerm: string, secondTerm: string): number => {
            let indexOfFirstTerm = firstTerm.toLowerCase().indexOf(input.toLowerCase());
            let indexOfSecondTerm = secondTerm.toLowerCase().indexOf(input.toLowerCase());
            if (indexOfSecondTerm > indexOfFirstTerm) {
                return -1;
            }
            if (indexOfSecondTerm < indexOfFirstTerm) {
                return 1;
            }
            return 0;
        }
    }

    getCategoryToolTipPosition() {
        return this.category.toolTipOptions?.position || 'below';
    }

    getCategoryTooltipShowDelay() {
        return this.category.toolTipOptions?.showDelay || 0;
    }

    getCategoryTooltipHideDelay() {
        return this.category.toolTipOptions?.hideDelay || 0;
    }

    getSubCategoryToolTipPosition() {
        return this.category.toolTipOptions?.position || 'below' ;
    }

    getSubCategoryTooltipShowDelay() {
        return this.subCategory.toolTipOptions?.showDelay || 0;
    }

    getSubCategoryTooltipHideDelay() {
        return this.subCategory.toolTipOptions?.hideDelay || 0;
    }
}

