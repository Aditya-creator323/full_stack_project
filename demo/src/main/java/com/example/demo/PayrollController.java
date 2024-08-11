package com.example.demo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PayrollController {
	private final AtomicLong counter = new AtomicLong();

    // private static List<Employee> storedEmployee = new ArrayList<>();

    @Autowired
    EmployeeRepository repository;
    

	@GetMapping("/employee")
	public List<Employee> employee() {
        List<Employee> storedEmployee = new ArrayList<>();
        storedEmployee = repository.findAll();
        
        return storedEmployee;
	}

    @PostMapping("/addEmployee")
    public Employee addEmployee(@RequestParam(value = "name") String name, @RequestParam(value = "email") String email) {
        Employee newEmployee = new Employee(name, email);

        return repository.save(newEmployee);
    }

    @DeleteMapping("/removeEmployee/{id}")
    public String removEmployee(@PathVariable("id") long id){
        // for(Employee employee: storedEmployee) {
        //     if(employee.getId() == id) {
        //         storedEmployee.remove(employee);
        //     }
        // }

        Optional<Employee> empToDelete = repository.findById(id);
        repository.delete(empToDelete.get());

        return "Success";
    }
}