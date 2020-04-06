package com.mudanza.api.daos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mudanza.api.models.Execute;

@Repository
public interface IExecuteDao extends CrudRepository<Execute, Long> {

}
