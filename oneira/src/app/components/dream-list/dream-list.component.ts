import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dream-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './dream-list.component.html',
  styleUrl: './dream-list.component.css'
})
export class DreamListComponent {

  Dreams = [
    {
      id: 1,
      title: "Flying over the city",
      type: "lucid",
      date: new Date("2023-10-01"),
      content: "I was flying over the city and felt a sense of freedom."
    },
    {
      id: 2,
      title: "Being chased",
      type: "nightmare",
      date: new Date("2023-10-02"),
      content: "I was being chased by an unknown figure and couldn't escape."
    },
    {
      id: 3,
      title: "Winning the lottery",
      type: "lucid",
      date: new Date("2023-10-03"),
      content: "I won the lottery and felt a sense of euphoria."
    },
    {
      id: 4,
      title: "Falling from a cliff",
      type: "nightmare",
      date: new Date("2023-10-04"),
      content: "I was falling from a cliff and couldn't stop myself."
    },
    {
      id: 5,
      title: "Reuniting with a loved one",
      type: "normal",
      date: new Date("2023-10-05"),
      content: "I reunited with a loved one and felt a sense of joy."
    }
  ]


}
