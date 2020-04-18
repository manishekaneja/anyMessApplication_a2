import { Component, Input, OnChanges } from "@angular/core";
import { Message } from "../jsons/DataClasses";
import { PageEvent } from "@angular/material/paginator";
@Component({
  selector: "app-message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.css"],
})
export class MessageListComponent implements OnChanges {
  public itemPerPage: number;
  public pageSizeOptions: Array<number>;
  @Input() public list: Array<Message>;
  private startIndex: number = 0;
  private endIndex: number = 0;

  constructor() {
    this.list = [];
    this.pageSizeOptions = [2, 5];
    this.itemPerPage = this.pageSizeOptions[0];
  }
  ngOnChanges() {
    this.endIndex = Math.min(
      this.startIndex + this.itemPerPage,
      this.list.length
    );
  }

  pageEvent(event: PageEvent): void {
    this.itemPerPage = event.pageSize;
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = Math.min(
      this.startIndex + this.itemPerPage,
      this.list.length
    );
  }

  getList(): Array<Message> {
    return this.list.slice(this.startIndex, this.endIndex);
  }
}
