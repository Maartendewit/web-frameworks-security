package nl.hva.wfis2024.esserver.repositories;

import nl.hva.wfis2024.esserver.exeptions.UnAuthorizedException;
import nl.hva.wfis2024.esserver.models.User;
import org.springframework.stereotype.Repository;

import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;

@Repository
public class UserRepository extends AbstractEntityRepositoryJpa<User> {
  public UserRepository() {
    super(User.class);
  }

  public User login(User u) {
    TypedQuery<User> query = entityManager.createNamedQuery("User.login", User.class);
    query.setParameter("eMail", u.geteMail());
    query.setParameter("hashedPassword", u.getHashedPassword());
    try {
      return query.getSingleResult();
    } catch (NoResultException ex) {
      throw new UnAuthorizedException("Invalid credentials");
    }
  }
}
