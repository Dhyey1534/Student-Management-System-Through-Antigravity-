package com.sms.service.impl;

import com.sms.entity.Student;
import com.sms.exception.DuplicateResourceException;
import com.sms.exception.ResourceNotFoundException;
import com.sms.repository.StudentRepository;
import com.sms.service.StudentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Override
    @Transactional
    public Student createStudent(Student student) {
        log.info("Creating student with email: {}", student.getEmail());

        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new DuplicateResourceException(
                    "A student with email '" + student.getEmail() + "' already exists.");
        }

        Student savedStudent = studentRepository.save(student);
        log.info("Student created successfully with ID: {}", savedStudent.getId());
        return savedStudent;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Student> getAllStudents() {
        log.info("Fetching all students");
        return studentRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Student getStudentById(Long id) {
        log.info("Fetching student with ID: {}", id);
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));
    }

    @Override
    @Transactional
    public Student updateStudent(Long id, Student updatedStudent) {
        log.info("Updating student with ID: {}", id);

        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));

        // Check if the new email is taken by a different student
        if (!existingStudent.getEmail().equals(updatedStudent.getEmail())
                && studentRepository.existsByEmail(updatedStudent.getEmail())) {
            throw new DuplicateResourceException(
                    "Email '" + updatedStudent.getEmail() + "' is already in use by another student.");
        }

        existingStudent.setFirstName(updatedStudent.getFirstName());
        existingStudent.setLastName(updatedStudent.getLastName());
        existingStudent.setEmail(updatedStudent.getEmail());
        existingStudent.setCourse(updatedStudent.getCourse());
        existingStudent.setPhoneNumber(updatedStudent.getPhoneNumber());

        Student savedStudent = studentRepository.save(existingStudent);
        log.info("Student updated successfully with ID: {}", savedStudent.getId());
        return savedStudent;
    }

    @Override
    @Transactional
    public void deleteStudent(Long id) {
        log.info("Deleting student with ID: {}", id);

        if (!studentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Student", "id", id);
        }

        studentRepository.deleteById(id);
        log.info("Student deleted successfully with ID: {}", id);
    }
}
