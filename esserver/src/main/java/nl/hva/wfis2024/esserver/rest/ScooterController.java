package nl.hva.wfis2024.esserver.rest;

import com.fasterxml.jackson.annotation.JsonView;
import nl.hva.wfis2024.esserver.exeptions.BadRequestException;
import nl.hva.wfis2024.esserver.exeptions.PreconditionFailedException;
import nl.hva.wfis2024.esserver.exeptions.ResourceNotFoundException;
import nl.hva.wfis2024.esserver.models.Scooter;
import nl.hva.wfis2024.esserver.models.ScooterStatus;
import nl.hva.wfis2024.esserver.models.Trip;
import nl.hva.wfis2024.esserver.repositories.CustomJson;
import nl.hva.wfis2024.esserver.repositories.EntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@RestController
public class ScooterController {

  @Qualifier("entityRepositoryJpa")
  @Autowired
  private EntityRepository<Scooter> entityRepository;
  @Qualifier("tripsRepositoryJpa")
  @Autowired
  private EntityRepository<Trip> tripRepository;

  @JsonView(CustomJson.Summary.class)
  @GetMapping("/scooters")
  public List<Scooter> getAllScooters(@RequestParam(required = false) Object battery, @RequestParam(required = false) Object status) {
    List<Scooter> scooters;
    List<Object> params = new ArrayList<>(1);
    ScooterStatus s = null;
    Integer b = null;

    if (battery != null) {
      try {
        b = Integer.valueOf((String) battery);
      } catch (ClassCastException e) {
        throw new BadRequestException("battery must be an integer");
      }
    }

    if (status != null) {
      try {
        s = (ScooterStatus) status;
      } catch (ClassCastException e) {
        throw new BadRequestException("status is invalid");
      }
    }

    if (b != null && s != null) {
      throw new BadRequestException("This program can not search for battery and status at the same time");
    } else if (b == null && s == null) {
      scooters = entityRepository.findAll();
    } else if (s != null) {
      params.add(s);
      scooters = entityRepository.findByQuery("Scooter.findByStatus", params);
    } else if (b >= 0 && b <= 100) {
      params.add(b);
      scooters = entityRepository.findByQuery("Scooter.findByBatteryCharge", params);
    } else {
      throw new BadRequestException("Battery charge must be between 0 and 100");
    }

    if (scooters == null) {
      throw new ResourceNotFoundException("No scooters found");
    }

    return scooters;
  }

  @GetMapping("/scooters/{id}")
  public Scooter findById(@PathVariable long id) {
    Scooter scooter = entityRepository.findById(id);
    if (scooter == null) {
      throw new ResourceNotFoundException("Scooter with id-" + id + " not found");
    }
    return scooter;
  }

  @PostMapping("/scooters")
  public ResponseEntity<Scooter> save(@RequestBody Scooter scooter) {
    Scooter updatedScooter = entityRepository.save(scooter);
    if (updatedScooter == null || updatedScooter.getId() != scooter.getId() && scooter.getId() != 0) {
      throw new PreconditionFailedException("Scooter-" + scooter.getId() + " does not exist");
    }
    String location = ServletUriComponentsBuilder
      .fromCurrentRequest()
      .path("/{id}")
      .buildAndExpand(updatedScooter.getId())
      .toUriString();
    return ResponseEntity.status(HttpStatus.CREATED).header(HttpHeaders.LOCATION, location).body(updatedScooter);
  }

  @DeleteMapping("/scooters/{id}")
  public boolean deleteById(@PathVariable long id) {
    boolean isDeleted = entityRepository.deleteById(id);
    if (!isDeleted) {
      throw new ResourceNotFoundException("Scooter with id-" + id + " not found");
    }
    return true;
  }

  @JsonView(Scooter.dynamicFilter.class)
  @GetMapping("scooters/summary")
  public List<Scooter> getScootersSummary() {
    return entityRepository.findAll();
  }

  @PostMapping("scooters/{scooterId}/claim")
  public ResponseEntity<Trip> claim(@PathVariable long scooterId) {
    Scooter scooterToClaim = entityRepository.findById(scooterId);
    if (scooterToClaim == null) {
      throw new ResourceNotFoundException("Scooter with id: " + scooterId + " not found");
    }
    if (scooterToClaim.getStatus() != ScooterStatus.IDLE || scooterToClaim.getBatteryCharge() < 10) {
      throw new PreconditionFailedException("Scooter with id: " + scooterId + " is not available for charter");
    }
    Trip trip = scooterToClaim.startNewTrip(LocalDateTime.now());
    tripRepository.save(trip);
    entityRepository.save(scooterToClaim);
    return ResponseEntity.status(200).body(trip);
  }

  @GetMapping("scooters/currenttrips")
  public List<Trip> currentTrips() {
    List<Trip> trips;
    List<Object> params = new ArrayList<>(1);

    params.add(ScooterStatus.INUSE);
    trips = tripRepository.findByQuery("Trip.findCurrentFromScooter", params);

    if (trips == null) {
      throw new ResourceNotFoundException("No scooters found");
    }

    return trips;
  }

  @GetMapping("scooters/{scooterid}/trips")
  public List<Trip> getTripsFor(@PathVariable long scooterid) {
    List<Object> id = new ArrayList<>();
    id.add(scooterid);
    return tripRepository.findByQuery("Trip.findAllFromScooter", id);
  }
}
