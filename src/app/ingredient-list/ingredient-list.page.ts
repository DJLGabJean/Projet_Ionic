import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.page.html',
  styleUrls: ['./ingredient-list.page.scss'],
})
export class IngredientListPage implements OnInit {

  ingredients = [
    { 
      id: 1,
      title: 'Ingrédient 1',
      img: '../../assets/img/noimg.png',
      param1: 'testParam1',
      param2: 'testParam2'
    }, { 
      id: 2,
      title: 'Ingrédient 2',
      img: '../../assets/img/noimg.png',
      param1: 'testParam1',
      param2: 'testParam2'
    }, { 
      id: 3,
      title: 'Ingrédient 3',
      img: '../../assets/img/noimg.png',
      param1: 'testParam1',
      param2: 'testParam2'
    }, { 
      id: 4,
      title: 'Ingrédient 4',
      img: '../../assets/img/noimg.png',
      param1: 'testParam1',
      param2: 'testParam2'
    },
  ];
  constructor() { }

  ngOnInit() {}
}
