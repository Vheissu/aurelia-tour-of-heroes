import {autoinject, customElement} from 'aurelia-framework';
import {HeroService} from './hero-service';

import {Hero} from './hero';

import './heroes.css';

@autoinject()
@customElement('my-heroes')
export class Heroes {

    private heroService: HeroService;

    private heroes: Hero[];
    private selectedHero: Hero;
    private addingHero = false;
    private error: any;

    constructor(heroService: HeroService) {
        this.heroService = heroService;
    }

    activate() {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService
            .getHeroes()
            .then(heroes => this.heroes = heroes)
            .catch(error => this.error = error);
    }

    addHero(): void {
        this.addingHero = true;
        this.selectedHero = null;
    }

    close(savedHero: Hero): void {
        this.addingHero = false;

        if (savedHero) {
            this.getHeroes();
        }
    }

    deleteHero(hero: Hero, event: any): void {
        event.stopPropagation();

        this.heroService
            .delete(hero)
            .then(res => {
                this.heroes = this.heroes.filter(h => h !== hero);
                
                if (this.selectedHero === hero) { 
                    this.selectedHero = null; 
                }
            })
            .catch(error => this.error = error);
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
        this.addingHero = false;
    }

}
