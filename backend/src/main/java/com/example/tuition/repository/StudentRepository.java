package com.example.tuition.repository;

import com.example.tuition.model.CourseType;
import com.example.tuition.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
    long countByCourseType(CourseType courseType);
}
