package com.mudanza.api.services;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import javax.management.InvalidAttributeValueException;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import com.mudanza.api.daos.IExecuteDao;
import com.mudanza.api.models.Execute;
import com.mudanza.api.services.impls.ExecuteServiceImpl;

@RunWith(SpringRunner.class)
public class ExecuteServiceImplTest {

	@TestConfiguration
	static class ExecuteServiceImplTestContextConfiguration {

		@Bean
		public IExecuteService executeService() {
			return new ExecuteServiceImpl();
		}
	}

	@Autowired
	private IExecuteService executeService;

	@MockBean
	private IExecuteDao executeDao;

	private static final String DOCUMENT_ONE = "123456";
	private static final String DOCUEMNT_TWO = "654321";
	private static final String INPUT_ONE = "1\n3\n20\n20\n20";
	private static final String INPUT_TWO = "1\n3\n50\n80\n60";
	private static final String INVALID_INPUT_DAYS = "501\n3\n50\n80\n60";
	private static final String INVALID_INPUT_OBJECTS = "1\n101\n50\n80\n60";
	private static final String INVALID_INPUT_WEIGHTS = "1\n3\n50\n102\n60";

	@Before
	public void init() {
		Execute executeOne = new Execute();
		executeOne.setId(1L);
		executeOne.setDocument(DOCUMENT_ONE);
		executeOne.setInput(INPUT_ONE);

		Execute executeTwo = new Execute();
		executeTwo.setId(2L);
		executeTwo.setDocument(DOCUEMNT_TWO);
		executeTwo.setInput(INPUT_TWO);

		List<Execute> lstExecute = new ArrayList<Execute>();
		lstExecute.add(executeOne);
		lstExecute.add(executeTwo);

		Mockito.when(executeDao.findAll()).thenReturn(lstExecute);
		Mockito.when(executeDao.findById(executeOne.getId())).thenReturn(null);
	}

	@Test
	public void findAllTest() {
		List<Execute> lstExecute = executeService.findAll();

		assertEquals(2, lstExecute.size());
		assertEquals(DOCUMENT_ONE, lstExecute.get(0).getDocument());
		assertEquals(2L, lstExecute.get(1).getId());
	}

	@Test
	public void findByIdNullTest() {
		Execute execute = executeService.findById(3L);
		assertEquals(null, execute);
	}

	@Test
	public void calulateOutputTest() {
		Execute execute = new Execute();
		execute.setDocument(DOCUMENT_ONE);
		execute.setInput(INPUT_ONE);

		String output = "Case #1: 1\n";
		try {
			assertEquals(output, executeService.calculateOutput(execute));
		} catch (InvalidAttributeValueException e) {
			e.printStackTrace();
		}
	}

	@Test
	public void calulateOutputAllMaxThanMinWeightTest() {
		Execute execute = new Execute();
		execute.setDocument(DOCUEMNT_TWO);
		execute.setInput(INPUT_TWO);

		String output = "Case #1: 3\n";
		try {
			assertEquals(output, executeService.calculateOutput(execute));
		} catch (InvalidAttributeValueException e) {
			e.printStackTrace();
		}
	}

	@Test
	public void calulateOutputInvalidDaysMinWeightTest() {
		Execute execute = new Execute();
		execute.setDocument(DOCUEMNT_TWO);
		execute.setInput(INVALID_INPUT_DAYS);

		try {
			executeService.calculateOutput(execute);
		} catch (InvalidAttributeValueException e) {
			assertTrue(true);
		}
	}

	@Test
	public void calulateOutputInvalidObjectsMinWeightTest() {
		Execute execute = new Execute();
		execute.setDocument(DOCUEMNT_TWO);
		execute.setInput(INVALID_INPUT_OBJECTS);

		try {
			executeService.calculateOutput(execute);
		} catch (InvalidAttributeValueException e) {
			assertTrue(true);
		}
	}

	@Test
	public void calulateOutputInvalidWeightsMinWeightTest() {
		Execute execute = new Execute();
		execute.setDocument(DOCUEMNT_TWO);
		execute.setInput(INVALID_INPUT_WEIGHTS);

		try {
			executeService.calculateOutput(execute);
		} catch (InvalidAttributeValueException e) {
			assertTrue(true);
		}
	}
}
