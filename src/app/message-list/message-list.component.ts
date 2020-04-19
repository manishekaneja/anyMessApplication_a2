import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import { Message } from "../jsons/DataClasses";
import { PageEvent } from "@angular/material/paginator";
@Component({
  selector: "app-message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.css"],
})
export class MessageListComponent implements OnChanges {
  @Input() public itemPerPage: number;
  @Input() public list: Array<Message>;

  @Output("update") public updateItemPerPage: EventEmitter<
    number
  > = new EventEmitter();

  public pageSizeOptions: Array<number>;
  private startIndex: number = 0;
  private endIndex: number = 0;

  constructor() {
    this.list = [];
    this.pageSizeOptions = [3, 5];
    this.itemPerPage = this.pageSizeOptions[0];
  }
  ngOnChanges() {
    this.endIndex = Math.min(
      this.startIndex + this.itemPerPage,
      this.list.length
    );
  }

  pageEvent(event: PageEvent): void {
    this.updateItemPerPage.emit(event.pageSize);
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
