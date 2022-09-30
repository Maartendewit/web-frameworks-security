package nl.hva.wfis2024.esserver.models;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.sun.istack.NotNull;
import nl.hva.wfis2024.esserver.repositories.CustomJson;
import nl.hva.wfis2024.esserver.repositories.Identifiable;

import javax.persistence.*;
import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@NamedQuery(name="Scooter.findAll", query="SELECT s FROM Scooter s WHERE s.id = -1")
@NamedQuery(name="Scooter.byId", query="SELECT s FROM Scooter s WHERE s.id = :id")
@NamedQuery(name="Scooter.findByStatus", query="SELECT s FROM Scooter s WHERE s.status = :param")
@NamedQuery(name="Scooter.findByBatteryCharge", query="SELECT s FROM Scooter s WHERE s.batteryCharge = :param")

@Entity
public class Scooter implements Identifiable {
    @JsonView({Scooter.dynamicFilter.class, CustomJson.Summary.class, CustomJson.Shallow.class})
    @Id
    @GeneratedValue
    @NotNull
    private long id;
    @JsonView({Scooter.dynamicFilter.class, CustomJson.Summary.class, CustomJson.Shallow.class})
    @NotNull
    private String tag;
    @JsonView({Scooter.dynamicFilter.class, CustomJson.Summary.class, CustomJson.Shallow.class})
    @NotNull
    @Enumerated(EnumType.STRING)
    private ScooterStatus status;
    @JsonView({CustomJson.Summary.class})
    @NotNull
    private String gpsLocation;
    @JsonView({CustomJson.Summary.class})
    @NotNull
    private int mileage;
    @JsonView({Scooter.dynamicFilter.class, CustomJson.Summary.class})
    @NotNull
    private int batteryCharge;
    @OneToOne(cascade = CascadeType.ALL)
    //@JsonManagedReference
    @JsonView({CustomJson.Summary.class})
    @JsonSerialize(using = CustomJson.ShallowSerializer.class)
    private Trip currentTrip;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonSerialize(using = CustomJson.ShallowSerializer.class)
    private List<Trip> trips = new ArrayList<>();

    public Scooter(long id, String tag, ScooterStatus status, String gpsLocation, int mileage, int batteryCharge) {
        this.id = id;
        this.tag = tag;
        this.status = status;
        this.gpsLocation = gpsLocation;
        this.mileage = mileage;
        this.batteryCharge = batteryCharge;
        //this.trips = new ArrayList<>();
    }

    public Scooter(String tag, ScooterStatus status, String gpsLocation, int mileage, int batteryCharge) {
      this.tag = tag;
      this.status = status;
      this.gpsLocation = gpsLocation;
      this.mileage = mileage;
      this.batteryCharge = batteryCharge;
    }

    public Scooter() {

    }

    public static Scooter createRandomScooter() {
        //ID
        long id = 0;
        //Tag
        StringBuilder tag = new StringBuilder();
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (int i = 0; i < 8; i++) {
            tag.append(characters.charAt((int) Math.round(Math.floor(Math.random() * characters.length()))));
        }
        //Status
        Random random = new Random();
        ScooterStatus[] scooterStatusAsArray = ScooterStatus.values();
        ScooterStatus status = scooterStatusAsArray[random.nextInt(scooterStatusAsArray.length)];
        //Location
        double x1 = 52.432778;
        double y1 = 4.689905;
        double x2 = 52.270627;
        double y2 = 5.033197;
        DecimalFormat formatter = new DecimalFormat("##.0000");
        String location = formatter.format(Math.random() * (x1 - x2) + x2) + "N " + formatter.format(Math.random() * (y2 - y1) + y1) + "E";
        //Mileage
        int mileage = Math.round((float) Math.random() * 20000);
        //BatteryCharge
        int charge = Math.round((float) Math.random() * (100 - 5) + 5);
        return new Scooter(id, tag.toString(), status, location, mileage, charge);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTag() {
        return tag;
    }

    public ScooterStatus getStatus() {
        return status;
    }

    public String getGpsLocation() {
        return gpsLocation;
    }

    public int getMileage() {
        return mileage;
    }

    public int getBatteryCharge() {
        return batteryCharge;
    }

//    public List<Trip> getTrips() {
//        return trips;
//    }

    public Trip getCurrentTrip() {
        return currentTrip;
    }

    public void setStatus(ScooterStatus status) {
        this.status = status;
    }

    public interface dynamicFilter {

    }

    /**
     * Creates a new trip and associates the trip with this scooter.
     * Can succeed only if the status of this scooter is idle
     * Copies the start location of the trip from the current location of this scooter
     * Sets this scooter INUSE, and associates the new trip as the current trip
     * @param startDateTime
     * @return the new trip, or null if preconditions are not met
     */
    public Trip startNewTrip(LocalDateTime startDateTime) {
        if (this.status.equals(ScooterStatus.IDLE)) {
            Trip trip = new Trip(gpsLocation, startDateTime, this);
            currentTrip = trip;
            this.status = ScooterStatus.INUSE;
            return trip;
        }
        return null;
    }

    //TODO: Put currentTrip into old trips when done

    /**
     * Associates the trip with this scooter
     * @param trip
     */
    public void addTrip(Trip trip) {
        trips.add(trip);
    }

    public List<Trip> getTrips() {
        return trips;
    }
}
