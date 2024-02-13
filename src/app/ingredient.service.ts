import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {Ingredient } from './models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private dbPath = '/ingredients';
  ingredientsRef: AngularFirestoreCollection<Ingredient>;


  constructor(
    private db: AngularFirestore
  ) { 
    this.ingredientsRef = db.collection(this.dbPath);
  }

  getAll() : any {
    return this.ingredientsRef.snapshotChanges().pipe(
      map((changes: any) => {
        return changes.map((doc:any) => {
          return ({id: doc.payload.doc.id, ...doc.payload.doc.data()})
        })
      })
    );
  }

  saveNewFilm(ingredient: Ingredient) : any {
    return new Observable(obs => {
      this.ingredientsRef.add({...ingredient}).then(() => {
        obs.next();
      });
    });
  }

  get(id: any):any {
    return  new Observable(obs => {
      this.ingredientsRef.doc(id).get().subscribe(res => {
        obs.next({id: res.id, ...res.data()});
      });
    });
  }

  update(ingredient:Ingredient) {
    return new Observable(obs => {
      this.ingredientsRef.doc(ingredient.id).update(ingredient);
      obs.next();
    });
  }

  delete(id: any) {
    this.db.doc(`ingredients/${id}`).delete();
  }
}

