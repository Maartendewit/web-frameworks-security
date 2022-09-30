package nl.hva.wfis2024.esserver.repositories;

import nl.hva.wfis2024.esserver.models.Scooter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class EntityRepositoryMock2 extends AbstractEntityRepositoryJpa<Scooter> {
    private List<Scooter> scooters = new ArrayList<>();

    public EntityRepositoryMock2() {
        super(Scooter.class);
    }

    @Override
    public List<Scooter> findAll() {
        return null;
    }

    @Override
    public Scooter findById(long id) {
        return null;
    }

    @Override
    public Scooter save(Scooter scooter) {
        return null;
    }

    @Override
    public boolean deleteById(long id) {
        return false;
    }
}
