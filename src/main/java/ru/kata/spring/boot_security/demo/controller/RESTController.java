package ru.kata.spring.boot_security.demo.controller;

import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RESTController {

    private final UserService userService;
    private final RoleService roleService;

    public RESTController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public List<User> showAllUsers() {
        List<User> allUsers = userService.listUsers();
        return allUsers;
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        User user = userService.getUser(id);
        return user;
    }

    @PostMapping("/users")
    public User addUser(@RequestBody User user) {
        userService.add(user);
        return user;
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        userService.update(user);
        return user;
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.remove(id);
        return "User with ID = " + id + " was deleted";
    }
}
