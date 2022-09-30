package nl.hva.wfis2024.esserver.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.sun.istack.NotNull;
import nl.hva.wfis2024.esserver.repositories.CustomJson;
import nl.hva.wfis2024.esserver.repositories.Identifiable;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NamedQuery(name = "Trip.findAll", query = "SELECT s FROM Trip s")
@NamedQuery(name = "Trip.findCurrentFromScooter", query = "SELECT s FROM Trip s WHERE s.scooter.status = :param AND s.positionEnd IS NULL")
@NamedQuery(name = "Trip.findAllFromScooter", query = "SELECT t FROM Trip t WHERE t.scooter.id = :param")
public class Trip implements Identifiable {
    @Id
    @GeneratedValue
    @NotNull
    @JsonView({CustomJson.Shallow.class})
    private long id;
    @NotNull
    @JsonSerialize(using = CustomJson.ShallowSerializer.class)
    @JsonView({CustomJson.Shallow.class})
    private LocalDateTime dateStart;
    @JsonSerialize(using = CustomJson.ShallowSerializer.class)
    private LocalDateTime dateEnd;
    @NotNull
    @JsonView({CustomJson.Shallow.class})
    private String positionStart;
    private String positionEnd;
    @JsonView({CustomJson.Shallow.class})
    private double mileage;
    private double cost;
    @NotNull
    @ManyToOne(cascade = CascadeType.ALL)
    //@JsonBackReference
    @JsonSerialize(using = CustomJson.ShallowSerializer.class)
    private Scooter scooter;

    public Trip(String positionStart, LocalDateTime dateStart, Scooter scooter) {
        this.id = 0;
        this.positionStart = positionStart;
        this.dateStart = dateStart;
        this.scooter = scooter;
    }

    public Trip(LocalDateTime dateStart, LocalDateTime dateEnd, String positionStart, String positionEnd, double mileage, double cost, Scooter scooter) {
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.positionStart = positionStart;
        this.positionEnd = positionEnd;
        this.mileage = mileage;
        this.cost = cost;
        this.scooter = scooter;
    }

    public Trip() {

    }

    public long getId() {
        return id;
    }

    @Override
    public void setId(long id) {
        this.id = id;
    }

    public LocalDateTime getDateStart() {
        return dateStart;
    }

    public LocalDateTime getDateEnd() {
        return dateEnd;
    }

    public String getPositionStart() {
        return positionStart;
    }

    public String getPositionEnd() {
        return positionEnd;
    }

    public double getMileage() {
        return mileage;
    }

    public double getCost() {
        return cost;
    }

    public Scooter getScooter() {
        return scooter;
    }

    public void setScooter(Scooter scooter) {
        this.scooter = scooter;
    }

    public static Trip randomCompletedTrip(Scooter forScooter) {
        return new Trip(LocalDateTime.now().minusDays(1), LocalDateTime.now(), "somewhere", "somewhere else", 10, 10, forScooter);
    }
}
