package com.mudanza.api.services;

import java.util.List;

import com.mudanza.api.models.Execute;

public interface IExecuteService {

	public Execute findById(Long id);

	public List<Execute> findAll();

	public Execute save(Execute execute);

	public String calculateOutput(Execute execute);

}
