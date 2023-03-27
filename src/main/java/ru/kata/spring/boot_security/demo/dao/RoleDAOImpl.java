package ru.kata.spring.boot_security.demo.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import ru.kata.spring.boot_security.demo.entity.Role;

import java.util.List;

public class RoleDAOImpl implements RoleDAO{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Role getRoleByName(String name) {
        Query query = entityManager.createQuery("select role from Role role where role.name = :name", Role.class);
        return (Role) query.setParameter("name", name).getSingleResult();
    }

    @Override
    public List<Role> getListOfRoles() {
        return entityManager.createQuery("select r from Role r", Role.class).getResultList();
    }
}
