import { effect, Injectable } from "@angular/core";
import { Dream } from "../models/dream.model";
import {signal} from '@angular/core';


@Injectable({ providedIn: 'root' })
export class DreamService{

    constructor() {
  
        const storedDreams = localStorage.getItem('dreams');
        if (storedDreams) {
            try {
                this.DreamList.set(JSON.parse(storedDreams));
            } catch (error) {
                console.error('Erreur lors du parsing des rêves depuis localStorage :', error);
            }
        } else {
            localStorage.setItem('dreams', JSON.stringify(this.DreamList()));
        }

        effect(() => {
        const dreams = this.DreamList();
        localStorage.setItem('dreams', JSON.stringify(dreams));

  });
}


    readonly DreamList = signal<Dream[]>([
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
        type: "recurring",
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
    );


    addDream(dream: Dream): void {
        this.DreamList.update(dreams => [...dreams, dream]);
    }

    getDreamById(id: number): Dream | undefined {
        return this.DreamList().find(dream => dream.id === id);
    }

    deleteDream(id: number): void {
        this.DreamList.update(dreams => dreams.filter(dream => dream.id !== id));
    }

    updateDream(id: number, updatedDream: Partial<Dream>): void {
        const dreamIndex = this.DreamList().findIndex(dream => dream.id === id);
        if (dreamIndex !== -1) {
            this.DreamList.update(dreams => {
                dreams[dreamIndex] = { ...dreams[dreamIndex], ...updatedDream };
                return dreams;
            });
        }
    }

    
}