import {Observable, Subscription} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Scooter} from '../models/scooter';

@Injectable({
    providedIn: 'root'
})
export class ScootersSbService {
    private scootersUrl = "http://localhost:8080/scooters";
    //Exists for compatibility with overview 4 ngFor
    public scooters: Scooter[] = [];

    constructor(private http: HttpClient) {}

    addRandomScooter(): void {
        const newScooter = Scooter.createRandomScooter();
        newScooter.id = undefined;
        this.restPostScooter(newScooter).subscribe(
            response => {
                this.restGetScooters().subscribe(
                    response => {
                        this.scooters = response;
                    }
                );
            }
        );
    }

    restGetScooters(): Observable<Scooter[]> {
        return this.http
            .get<{ [key: string]: Scooter }>(this.scootersUrl)
            .pipe(map(responseData => {
                // create an array of scooters
                const scooters: Scooter[] = [];
                for (const scooterData in responseData) {
                    const scooter = ScootersSbService.trueCopy(responseData[scooterData]);
                    scooters.push(scooter);
                }
                return scooters;
            }));
    }

    restGetScooter(id: number): Observable<Scooter> {
        return this.http
            .get<Scooter>(`${this.scootersUrl}/${id}`)
            .pipe(map(responseData => {
                return ScootersSbService.trueCopy(responseData);
            }));
    }

    restPostScooter(scooter: Scooter): Observable<Scooter> {
        return this.http
            .post<Scooter>(this.scootersUrl, JSON.parse(JSON.stringify(scooter)))
            .pipe(map(responseData => {
                return ScootersSbService.trueCopy(responseData);
            }));
    }

    restDeleteScooter(id: number) {
        return this.http
            .delete(`${this.scootersUrl}/${id}`);
    }
    
    static trueCopy(scooter: Object): Scooter {
        return scooter == null ? null : Object.assign(new Scooter(), scooter);
    }
}
