import { Ingredient } from "./ingredient.model";

export class Recipe {
    id?: string;
    name : string;
    picturelink : string;
    positions: { [key: string]: number };
    ingredients: Array<Ingredient>;
    variants: Array<string>;

    constructor() {
        this.name = '';
        this.picturelink = '';
        this.positions = {};
        this.ingredients = [];
        this.variants = [];
    }
}
