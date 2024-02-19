import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Recipe } from './models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private dbPath = '/recipes';
  recipesRef: AngularFirestoreCollection<Recipe>;


  constructor(
    private db: AngularFirestore
  ) { 
    this.recipesRef = db.collection(this.dbPath);
  }

  getAll() : any {
    return this.recipesRef.snapshotChanges().pipe(
      map((changes: any) => {
        return changes.map((doc:any) => {
          return ({id: doc.payload.doc.id, ...doc.payload.doc.data()})
        })
      })
    );
  }

  saveNewIngredient(recipe: Recipe) : any {
    return new Observable(obs => {
      this.recipesRef.add({...recipe}).then(() => {
        obs.next();
      });
    });
  }

  get(id: any):any {
    return  new Observable(obs => {
      this.recipesRef.doc(id).get().subscribe(res => {
        obs.next({id: res.id, ...res.data()});
      });
    });
  }

  update(recipe: Recipe) {
    return new Observable(obs => {
      this.recipesRef.doc(recipe.id).update(recipe);
      obs.next();
    });
  }

  delete(id: any) {
    this.db.doc(`ingredients/${id}`).delete();
  }

  // getPossibilitiesPositions(recipe: Recipe) {
  //   const positionsKeys = Object.keys(recipe.positions);
  //   const possibilities: string[] = [];
  
  //   for (const key of positionsKeys) {
  //     const position = recipe.positions[key];
  
  //     if (Array.isArray(position)) {
  //       // Vérifier s'il y a au moins un élément non vide dans le tableau de positions
  //       const isNotEmpty = position.some(item => item !== "");
  //       if (isNotEmpty) {
  //         possibilities.push(key);
  //       }
  //     }
  //   }
  //   return possibilities;
  // }

  getPositionIngredients(recipe: Recipe): Observable<string[][]> {
    return new Observable<string[][]>(observer => {
      const positionsKeys = Object.keys(recipe.positions);
      const positionsArray: string[][] = [];
  
      for (const key of positionsKeys) {
        const position = recipe.positions[key];
  
        if (Array.isArray(position)) {
          // Vérifier s'il y a au moins un élément non vide dans le tableau de positions
          const isNotEmpty = position.some(item => item !== "");
          if (isNotEmpty) {
            positionsArray.push(position);
          }
        }
      }
  
      observer.next(positionsArray); // Émet le tableau de positions
      observer.complete(); // Indique la fin de l'observable
    });
  }

}
