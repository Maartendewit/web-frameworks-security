export class Scooter {
    id: number;
    tag: string;
    status: ScooterStatus;
    gpsLocation: string;
    mileage: number;
    batteryCharge: number;

    static lastId: number = 0;
    public static createRandomScooter(): Scooter {
        //ID
        Scooter.lastId++;
        let id = 30000 + Scooter.lastId;
        //Tag
        let tag = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 8; i++) {
            tag += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        //Status
        let status = ScooterStatus[Object.keys(ScooterStatus)[Math.round(Math.random() * (Object.keys(ScooterStatus).length - 1))]];
        //Location
        let x1 = 52.432778;
        let y1 = 4.689905;
        let x2 = 52.270627;
        let y2 = 5.033197;
        let location = `${(Math.random() * (x1 - x2) + x2).toFixed(4)}N ${(Math.random() * (y2 - y1) + y1).toFixed(4)}E`;
        //Mileage
        let mileage = Math.round(Math.random() * 20000);
        //BatteryCharge
        let charge = Math.round(Math.random() * (100 - 5) + 5);
        return new Scooter(id, tag, status, location, mileage, charge);
    }

    public getStatusAsString(): string {
        return Object.keys(ScooterStatus)[status];
    }

    constructor(id?: number, tag?: string, status?: ScooterStatus, gpsLocation?: string, mileage?: number, batteryCharge?: number) {
        this.id = id;
        this.tag = tag;
        this.status = status;
        this.gpsLocation = gpsLocation;
        this.mileage = mileage;
        this.batteryCharge = batteryCharge;
    }

    public getAllScooterStatuses(): any {
        return Object.keys(ScooterStatus);
    }
}

export enum ScooterStatus {
    IDLE = "IDLE",
    INUSE = "INUSE",
    MAINTENANCE = "MAINTENANCE"
}
