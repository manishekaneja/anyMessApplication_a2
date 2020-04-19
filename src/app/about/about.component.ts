import { Component } from "@angular/core";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent {
  list: Array<any> = [
    {
      question: `"Is it possible to know the identityof person who has actually sent a specific
    message?"`,
      answer: `Sorry but we can't do that. The whole concept is based on being anonymous which sending message or
    giving feedback.`,
    },
    {
      question: `"Are my messages safe or do you intend to use this data somewhere
    else?!"`,
      answer: `I don't intend to stealing any kind of data.`,
    },
    {
      question: `"Can my messages be viewied by someone else?"`,
      answer: `No. No one except you can see your messages.`,
    },
    {
      question: `"Can I respond back to the messages?"`,
      answer: `Sorry for this one but you can't respond back to the messages.`,
    },
  ];
}
