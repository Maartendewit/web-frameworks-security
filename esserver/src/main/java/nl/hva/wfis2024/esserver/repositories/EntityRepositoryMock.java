package nl.hva.wfis2024.esserver.repositories;

import nl.hva.wfis2024.esserver.models.Scooter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Component
public class EntityRepositoryMock extends AbstractEntityRepositoryJpa<Scooter> {
    private final List<Scooter> scooters = new ArrayList<>();

    public EntityRepositoryMock() {
        super(Scooter.class);
    }

    @Override
    public List<Scooter> findAll() {
        return scooters;
    }

    @Override
    public Scooter findById(long id) {
        for (Scooter scooter : scooters) {
            if (scooter.getId() == id) {
                return scooter;
            }
        }
        return null;
    }

    @Override
    public Scooter save(Scooter updatedScooter) {
        if (updatedScooter.getId() == 0) {
            if (scooters.size() > 0) {
                updatedScooter.setId(scooters.get(scooters.size() - 1).getId() + 1);
            } else {
                updatedScooter.setId(1);
            }
            scooters.add(updatedScooter);
            return updatedScooter;
        } else {
            for (Scooter scooter : scooters) {
                if (scooter.getId() == updatedScooter.getId()) {
                    scooters.set(scooters.indexOf(scooter), updatedScooter);
                    return updatedScooter;
                }
            }
        }
        return null;
    }

    @Override
    public boolean deleteById(long id) {
        Iterator<Scooter> iterator = scooters.iterator();
        while (iterator.hasNext()) {
            Scooter scooter = iterator.next();
            if (scooter.getId() == id) {
                iterator.remove();
                return true;
            }
        }
        return false;
    }
}
