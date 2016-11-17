import {HttpClient, json} from 'aurelia-fetch-client';
import {Hero} from './hero';

export class HeroService {
    private heroesUrl = 'app/heroes';
    private http: HttpClient;

    constructor() {
        this.http = new HttpClient();
    }

    getHeroes(): Promise<Hero[]> {
        return this.http.fetch(this.heroesUrl)
            .then(response => response.json())
            .catch(this.handleError);
    }

    getHero(id: number): Promise<Hero> {
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
    }

    delete(hero: Hero): Promise<Response> {
        const url = `${this.heroesUrl}/${hero.id}`;

        return this.http.fetch(url, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {
        return this.http.fetch(this.heroesUrl, {
            mode: 'post',
            body: json({name: name})
        })
          .then(res => res.json().data)
          .catch(this.handleError);
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;

        return this.http.fetch(url, {
            mode: 'put',
            body: json(hero)
        })
          .then(() => hero)
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
