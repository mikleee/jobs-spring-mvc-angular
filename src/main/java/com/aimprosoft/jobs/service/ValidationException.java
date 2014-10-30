package com.aimprosoft.jobs.service;

import com.aimprosoft.jobs.ApplicationException;
import com.aimprosoft.jobs.model.PersistEntity;

import java.util.HashMap;
import java.util.Map;

public class ValidationException extends ApplicationException {

    private static final long serialVersionUID = 1L;

    private Map<String, String> messenger = new HashMap<>();

   private PersistEntity incorrectEntity;

    public ValidationException() {
    }

    public ValidationException(String message) {
        super(message);
    }

    public ValidationException(Map<String, String> messenger) {
        this.messenger = messenger;
    }

    public ValidationException(Map<String, String> messenger, PersistEntity incorrectEntity) {
        this.messenger = messenger;
        this.incorrectEntity = incorrectEntity;
    }

    public Map<String, String> getMessenger() {
        return messenger;
    }

    public PersistEntity getIncorrectEntity() {
        return incorrectEntity;
    }

}
