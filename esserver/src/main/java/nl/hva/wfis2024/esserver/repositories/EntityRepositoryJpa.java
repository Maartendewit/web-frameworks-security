package nl.hva.wfis2024.esserver.repositories;

import nl.hva.wfis2024.esserver.models.Scooter;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.util.List;


@Component
@Transactional
public class EntityRepositoryJpa extends AbstractEntityRepositoryJpa<Scooter> {

    public EntityRepositoryJpa() {
        super(Scooter.class);
    }
}
