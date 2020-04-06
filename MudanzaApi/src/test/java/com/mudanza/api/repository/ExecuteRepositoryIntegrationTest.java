package com.mudanza.api.repository;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import javax.validation.ConstraintViolationException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.mudanza.api.daos.IExecuteDao;
import com.mudanza.api.models.Execute;

@RunWith(SpringRunner.class)
@DataJpaTest
public class ExecuteRepositoryIntegrationTest {

	@Autowired
	private IExecuteDao executeDao;

	private static final String DOCUMENT = "123456";
	private static final String INVALID_DOCUMENT = "123";
	private static final String INPUT = "1\n4\n10\n50\n20\n40";

	@Test
	public void registerExecuteTest() {
		Execute execute = new Execute();
		execute.setDocument(DOCUMENT);
		execute.setInput(INPUT);

		Execute executeSaved = executeDao.save(execute);

		assertEquals(DOCUMENT, executeSaved.getDocument());
		assertEquals(INPUT, executeSaved.getInput());
		assertNotEquals(0, executeSaved.getId());
	}

	@Test
	public void registerBadDocumentExecuteTest() {
		Execute execute = new Execute();
		execute.setDocument(INVALID_DOCUMENT);
		execute.setInput(INPUT);
		try {
			executeDao.save(execute);
			fail();
		} catch (ConstraintViolationException e) {
			assertTrue(true);
		}
	}

	@Test
	public void registerBadInputExecuteTest() {
		Execute execute = new Execute();
		execute.setDocument(DOCUMENT);
		execute.setInput(null);
		try {
			executeDao.save(execute);
			fail();
		} catch (ConstraintViolationException e) {
			assertTrue(true);
		}
	}
}
