package nl.hva.wfis2024.esserver.repositories;

import nl.hva.wfis2024.esserver.models.Scooter;

import java.util.List;

public interface EntityRepository<E extends Identifiable> {
  List<E> findAll();              // Finds all available e
  E findById(long id);            // Finds one e identified by id
                                  // Returns null if e does not exist
  E save(E e);                    // Updates the e in the repository identified by e.id
                                  // Inserts a new e if scooter.id == 0L
                                  // Returns the updated or inserted e with new e.id
  boolean deleteById(long id);    // Deletes the e from the repository, identified by id
                                  // Returns whether an existing scooter has been deleted
  List<E> findByQuery(String jpqlName, List<Object> params);
                                  // Find all instances from a named jpql-query
}
