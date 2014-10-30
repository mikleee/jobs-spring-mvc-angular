package com.aimprosoft.jobs.controller;

import com.aimprosoft.jobs.ApplicationException;

/**
 * Created on 23.12.13.
 */
public class EvilUserDetectedException extends ApplicationException {


    private static final long serialVersionUID = 1L;

    public EvilUserDetectedException() {
        super();
    }

    public EvilUserDetectedException(String message) {
        super(message);
    }
}
