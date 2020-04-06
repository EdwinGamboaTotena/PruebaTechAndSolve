package com.mudanza.api.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mudanza.api.models.Execute;
import com.mudanza.api.services.IExecuteService;

@RestController
@RequestMapping("/api/execute")
@CrossOrigin(origins = { "http://localhost:4200" })
public class ExecuteController {

	private static final String NO_RECORDS_FOUND = "No se encontro el registros en la base de datos";

	@Autowired
	private IExecuteService executeService;

	@GetMapping("")
	public ResponseEntity<?> findAll() {
		Map<String, Object> response = new HashMap<>();
		try {
			List<Execute> lstExecute = executeService.findAll();
			response.put("lstExecute", lstExecute);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);

		} catch (DataAccessException e) {
			response.put("errors", e);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> calcularOutput(@PathVariable Long id) {
		Map<String, Object> response = new HashMap<>();
		try {
			Execute execute = executeService.findById(id);

			if (execute != null) {
				String output = executeService.calculateOutput(execute);
				response.put("execute", execute);
				response.put("output", output);
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
			} else {
				response.put("errors", NO_RECORDS_FOUND);
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
			}
		} catch (DataAccessException e) {
			response.put("errors", e);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@PostMapping("")
	public ResponseEntity<?> save(@Valid @RequestBody Execute execute) {
		Map<String, Object> response = new HashMap<>();
		try {
			String output = executeService.calculateOutput(execute);
			Execute executeSave = executeService.save(execute);
			response.put("execute", executeSave);
			response.put("output", output);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
		} catch (DataAccessException e) {
			response.put("errors", e);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
