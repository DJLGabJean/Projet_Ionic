export class Ingredient {
    id?: string;
    name: string;
    tool: string;
    type: string;
    blastresistant: number;
    hardness: number;
    flammable: boolean;
    transparent: boolean;
    luminous: boolean;
    renewable: boolean;
    experience: number;
    picturelink: string;
    variants: Array<string>;

    constructor() {
        this.name = '';
        this.tool = '';
        this.type = '';
        this.blastresistant = 0;
        this.hardness = 0;
        this.flammable = false;
        this.transparent = false;
        this.luminous = false;
        this.renewable = false;
        this.experience = 0;
        this.picturelink = '';
        this.variants = [];
    }
}
