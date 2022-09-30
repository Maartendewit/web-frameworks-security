import { Injectable } from '@angular/core';
import { Scooter } from 'src/app/models/scooter'

@Injectable({
    providedIn: 'root'
})
export class ScootersService {
    public scooters: Scooter[];

    constructor() {
        this.scooters = [];
        for (let i = 0; i < 8; i++) {
            this.addRandomScooter();
        }
    }

    public addRandomScooter(): void {
        this.scooters.push(Scooter.createRandomScooter());
    }

    /**
     * @returns list of all scooters
     */
    findAll(): Scooter[] {
        return this.scooters
    }

    /**
     * Find a scooter by id
     *
     * @param oId
     * @returns scooter or null
     */
    findById(oId: number): Scooter {
        let scoot = null;
        this.scooters.forEach(scooter => {
            if (scooter.id === oId) {
                scoot = scooter;
            }
        });
        scoot = Object.create(scoot);
        return scoot;
    }

    /**
     * Update or add an scooter
     *
     * @param scooter
     * @returns scooter or null
     */
    save(scooter: Scooter): Scooter {
        for (let i = 0; i < this.scooters.length; i++) {
            if (this.scooters[i].id === scooter.id) {
                this.scooters[i] = scooter;
                return this.scooters[i];
            }
        }
        this.scooters.push(scooter);
        return null;
    }

    /**
     * Delete a scooter
     *
     * @param oId
     * @returns scooter or null
     */
    deleteById(oId: number): Scooter {
        const SCOOTER = this.findById(oId);
        let index: number = 0;
        for (let scooter of this.scooters) {
            if (scooter.id === SCOOTER.id) { //Loop replaces this.scooters.indexOf(SCOOTER) cuz maarten made a copy in findId so it cant find it
                break;
            }
            index++;
        }
        if (index !== -1) {
            this.scooters.splice(index, 1);
            return SCOOTER;
        }
        return null;
    }
}
