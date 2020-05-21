import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PoI18nService } from '@po-ui/ng-components';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {

    @Output('on-change-page')
    pageChangeEmitter = new EventEmitter();

    @Input('total-hits')
    totalHits: number;

    @Input('count-hits')
    countHits: number;

    @Input('current-page')
    currentPage: number;

    @Input('page-size')
    pageSize: number;

    @Input('records-name')
    recordsName: string;

    lastPage: number;
    initalIndexPage: number;
    totalPageSize: number;

    constructor(
        private poI18nService: PoI18nService
    ) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
      if (changes['totalHits']) {
        const totalHits: number = changes['totalHits'].currentValue;

        if (totalHits) {
            if (totalHits % this.pageSize === 0) {
                this.lastPage = Math.floor(totalHits / this.pageSize);
            } else {
                this.lastPage = Math.floor(totalHits / this.pageSize) + 1;
            }

            this.setPage(1);
        }

        if (this.currentPage >= this.lastPage) {
            this.totalPageSize = this.totalHits;
        }
      }
    }

    goToNextPage() {
        this.setPage(this.currentPage + 1);
    }

    goToPreviousPage() {
        this.setPage(this.currentPage - 1);
    }

    goToFirstPage() {
        this.setPage(1);
    }

    goToLastPage() {
        this.setPage(this.lastPage);
    }

    setPage(page) {

        if (!page) {
            page = 1;
        }

        if (page !== this.currentPage) {

            if (page > this.lastPage) {
                this.currentPage = this.lastPage;
            } else {
                this.currentPage = page;
            }

            this.pageChangeEmitter.emit({
                pageSize: Number(this.pageSize),
                currentPage: this.currentPage
            });
        }

        if (this.currentPage === 1) {
            this.initalIndexPage = this.currentPage;
            this.totalPageSize = this.pageSize;
        } else {
            this.initalIndexPage = (this.currentPage - 1) * this.pageSize + 1;
            this.totalPageSize = this.pageSize * this.currentPage;

            if (this.currentPage >= this.lastPage) {
                this.totalPageSize = this.totalHits;
            }
        }
    }

    eventHandler(event) {
        // KeyCode 13 is "Enter" key
        if (event.keyCode === 13) {

            if (event.target.value) {
                this.setPage(event.target.value);
            }
        }
    }
}
