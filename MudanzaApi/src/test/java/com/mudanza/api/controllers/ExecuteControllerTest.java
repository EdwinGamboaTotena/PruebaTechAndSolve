package com.mudanza.api.controllers;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.mudanza.api.services.IExecuteService;

@RunWith(SpringRunner.class)
@WebMvcTest(ExecuteController.class)
public class ExecuteControllerTest {

	@Autowired
	private MockMvc mvc;

	@MockBean
	private IExecuteService executeService;

	private static final String VALID_JSON = "{ \"id\": \"\", \"document\": \"123456\", \"createAt\": \"\", \"input\": \"1\\n3\\n20\\n20\\n20\"}";
	
	@Test
	public void findAll() throws Exception {
		mvc.perform(MockMvcRequestBuilders.get("/api/execute").contentType(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	public void calculateOutputNotFound() throws Exception {
		mvc.perform(MockMvcRequestBuilders.get("/api/execute/1").contentType(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isNotFound());
	}

	@Test
	public void save() throws Exception {
		mvc.perform(
				MockMvcRequestBuilders.post("/api/execute").contentType(MediaType.APPLICATION_JSON).content(VALID_JSON))
				.andExpect(MockMvcResultMatchers.status().isCreated());
	}
}
