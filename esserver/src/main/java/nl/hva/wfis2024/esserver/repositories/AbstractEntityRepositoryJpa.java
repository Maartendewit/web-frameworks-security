package nl.hva.wfis2024.esserver.repositories;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
public abstract class AbstractEntityRepositoryJpa<E extends Identifiable> implements EntityRepository<E> {
    @PersistenceContext
    protected EntityManager entityManager;

    private final Class<E> theEntityClass;

    public AbstractEntityRepositoryJpa(Class<E> entityClass) {
        this.theEntityClass = entityClass;
        System.out.println("Created " + this.getClass().getName() + "<" + this.theEntityClass.getSimpleName() + ">");
    }

    @Override
    public List<E> findAll() {
        try {
            TypedQuery<E> query = entityManager.createNamedQuery(theEntityClass.getSimpleName() + ".findAll", theEntityClass);
            return query.getResultList();
        } catch (IllegalStateException | QueryTimeoutException | TransactionRequiredException | PessimisticLockException | LockTimeoutException e) {
            throw new RuntimeException("Could not find all", e);
        }
    }

    @Override
    public E findById(long id) {
        TypedQuery<E> query = entityManager.createNamedQuery(theEntityClass.getSimpleName() + ".byId", theEntityClass);
        query.setParameter("id", id);
        try {
            return query.getSingleResult();
        } catch (NoResultException | NonUniqueResultException | IllegalStateException | QueryTimeoutException | TransactionRequiredException | PessimisticLockException | LockTimeoutException e) {
            throw new RuntimeException("Could not find by id", e);
        }
    }

    @Override
    public E save(E object) {
        try {
            E e = entityManager.merge(object);
            entityManager.flush();
            return e;
        } catch (IllegalArgumentException | TransactionRequiredException ex) {
            throw new RuntimeException("Could not save object", ex);
        }
    }

    @Override
    public boolean deleteById(long id) {
        E e = findById(id);
        try {
            entityManager.remove(e);
            return true;
        } catch (IllegalArgumentException | TransactionRequiredException ex) {
            throw new RuntimeException("Could not delete by id", ex);
        }
    }

    @Override
    public List<E> findByQuery(String jpqlName, List<Object> params) {
        TypedQuery<E> query = entityManager.createNamedQuery(jpqlName, theEntityClass);
        query.setParameter("param", params.get(0));
        try {
            return query.getResultList();
        } catch (IllegalStateException | QueryTimeoutException | TransactionRequiredException | PessimisticLockException | LockTimeoutException e) {
            throw new RuntimeException("Could not find by query", e);
        }
    }
}
