import { computed, effect, Injectable, Signal } from "@angular/core";
import { Dream } from "../models/dream.model";
import {signal} from '@angular/core';
import { Form, FormGroup } from "@angular/forms";


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

    selectedType = signal<"tous" | "normal" | "nightmare" | "lucid" | "recurring">("tous");

    searchQuery = signal<string>("");

    filteredDreams = computed(() => {
        const type = this.selectedType();
        const query = this.searchQuery().toLowerCase();
        if (query) {
            return this.DreamList().filter(dream => 
                (type === "tous" || dream.type === type) &&
                (dream.title.toLowerCase().includes(query) || dream.content.toLowerCase().includes(query))
            );
        } else
        if (type === "tous") {
            return this.DreamList();
        } 
        return this.DreamList().filter(dream => dream.type === type);
    });

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

    selectedDreamToEdit = signal<Dream | undefined>(undefined);

    startEditingDream(id : number) {
        const dream = this.getDreamById(id);

        if (dream) {
            this.selectedDreamToEdit.set(dream);
        }
        
    }

    updateDream(id: number, updatedDream: Dream): void {
        this.DreamList.update(dreams =>
        dreams.map(dream => dream.id === id ? updatedDream : dream
        )
    );
        this.selectedDreamToEdit.set(undefined);
    }
}