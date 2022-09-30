package nl.hva.wfis2024.esserver.repositories;

import nl.hva.wfis2024.esserver.models.Scooter;
import nl.hva.wfis2024.esserver.models.Trip;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.util.List;


@Component
@Transactional
public class TripsRepositoryJpa extends AbstractEntityRepositoryJpa<Trip> {

    public TripsRepositoryJpa() {
        super(Trip.class);
    }

}
