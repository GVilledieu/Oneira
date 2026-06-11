/// <reference types="jasmine" />

import { TestBed } from "@angular/core/testing";
import { DreamService } from "./dream.service";
import { Dream } from "../models/dream.model"

describe('DreamService', () => {
    //Ajout d'un rêve
    it('should add a dream', () => {
    const service = TestBed.inject(DreamService);

    const initialCount = service.DreamList().length;

    service.addDream({
        id: 999,
        title: 'Test',
        content: 'Test content',
        type: 'normal',
        date: new Date()
    });

    expect(service.DreamList().length)
        .toBe(initialCount + 1);
    });

    //Suppression d'un rêve
    it('should delete a dream', () => {
    const service = TestBed.inject(DreamService);

    service.deleteDream(1);

    expect(
        service.DreamList().find(x => x.id === 1)
    ).toBeUndefined();
    });

    //Suppression d'un rêve inexistant
    it('should not change the list when deleting a non existing dream', () => {
    const service = TestBed.inject(DreamService);

    const initialDreams = [...service.DreamList()];

    service.deleteDream(6545644665);

    expect(service.DreamList())
        .toEqual(initialDreams);
    });

    //Filtre lucid
    it('should return only lucid dreams', () => {
    const service = TestBed.inject(DreamService);

    service.selectedType.set('lucid');

    expect(
        service.filteredDreams().every(
        dream => dream.type === 'lucid'
        )
    ).toBeTrue();
    });

    it('should update title, content and type of a dream', () => {
    const service = TestBed.inject(DreamService);

    const updatedDream: Dream = {
        id: 1,
        date: new Date('2023-10-01'),
        title: 'test',
        content: 'test',
        type: 'nightmare',
    };

    service.updateDream(1, updatedDream);

    const dream = service.getDreamById(1);

    expect(dream).toBeDefined();
    expect(dream?.title).toBe('test');
    expect(dream?.content).toBe('test');
    expect(dream?.type).toBe('nightmare');
    });

    //Pas d'update sur un rêve inexistant

it('should not update a non existing dream', () => {
  const service = TestBed.inject(DreamService);

  const initialDreams = [...service.DreamList()];

  const dream: Dream = {
    id: 9999,
    title: 'Test',
    content: 'Test content',
    type: 'normal',
    date: new Date()
  };

  service.updateDream(9999, dream);

  expect(service.DreamList())
    .toEqual(initialDreams);
});


    //Filtre tous
    it('should return all dreams when type is tous', () => {
    const service = TestBed.inject(DreamService);
    
    service.selectedType.set('tous');

    expect(service.filteredDreams())
        .toEqual(service.DreamList())
    });
});