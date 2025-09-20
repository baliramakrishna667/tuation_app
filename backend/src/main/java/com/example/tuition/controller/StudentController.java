package com.example.tuition.controller;

import com.example.tuition.model.CourseType;
import com.example.tuition.model.Student;
import com.example.tuition.repository.StudentRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentRepository repository;

    public StudentController(StudentRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/register")
    public Student registerStudent(@RequestBody Student student){
        return repository.save(student);
    }

    @GetMapping("/courses/daily")
    public long getDailyCount(){
        return repository.countByCourseType(CourseType.DAILY);
    }

    @GetMapping("/courses/summer")
    public long getSummerCount(){
        return repository.countByCourseType(CourseType.SUMMER);
    }
}
