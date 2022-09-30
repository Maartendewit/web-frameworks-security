package nl.hva.wfis2024.esserver;

import nl.hva.wfis2024.esserver.models.Scooter;
import nl.hva.wfis2024.esserver.models.ScooterStatus;
import nl.hva.wfis2024.esserver.models.Trip;
import nl.hva.wfis2024.esserver.models.User;
import nl.hva.wfis2024.esserver.repositories.EntityRepository;
import nl.hva.wfis2024.esserver.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.transaction.Transactional;
import java.util.List;

@SpringBootApplication
public class EsserverApplication implements CommandLineRunner {

    @Qualifier("entityRepositoryJpa")
    @Autowired
    private EntityRepository<Scooter> scootersRepo;
    @Qualifier("tripsRepositoryJpa")
    @Autowired
    private EntityRepository<Trip> tripsRepo;
    @Autowired
    private UserRepository usersRepo;

    public static void main(String[] args) {
        SpringApplication.run(EsserverApplication.class, args);
    }

    @Transactional
    @Override
    public void run(String... args) {
        System.out.println("Running CommandLine Startup");
        this.createInitialScooters();
    }

    private void createInitialScooters() {
        // Check wheter the repo is empty
        List<Scooter> scooters = this.scootersRepo.findAll();
        if (scooters != null && scooters.size() > 0) return;

        System.out.println("Configuring some initial scooter data");
        for (int i = 0; i < 7; i++) {
            this.scootersRepo.save(Scooter.createRandomScooter());
        }

        for (Scooter scooter : this.scootersRepo.findAll()) {
            //No inuse random scooters anymore
            if (scooter.getCurrentTrip() == null && scooter.getStatus() == ScooterStatus.INUSE) {
                scooter.setStatus(ScooterStatus.IDLE);
            }
            //Add historic trips
            for (int i = 0; i < 2; i++) {
                Trip trip = Trip.randomCompletedTrip(scooter);
                scooter.addTrip(trip);
                tripsRepo.save(trip);
                scootersRepo.save(scooter);
            }
        }

      for (int i = 0; i < 7; i++) {
        this.usersRepo.save(User.createRandomUser());
      }
    }
}
