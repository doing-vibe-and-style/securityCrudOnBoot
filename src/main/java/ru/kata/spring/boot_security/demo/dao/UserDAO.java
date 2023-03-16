package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.entity.User;
import java.util.List;

public interface UserDAO {
    void add(User user);
    User update(User user);
    void remove(Long id);
    User getUser (Long id);
    List<User> listUsers();

}
