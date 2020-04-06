package com.mudanza.api.services.impls;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.management.InvalidAttributeValueException;

import java.util.Comparator;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.mudanza.api.daos.IExecuteDao;
import com.mudanza.api.models.Execute;
import com.mudanza.api.services.IExecuteService;

@Service
public class ExecuteServiceImpl implements IExecuteService {

	private static final int MIN_WEIGHT = 50;
	private static final int MIN_VALID_DAYS = 1;
	private static final int MAX_VALID_DAYS = 500;
	private static final int MIN_VALID_OBJECTS = 1;
	private static final int MAX_VALID_OBJECTS = 100;
	private static final int MIN_VALID_WEIGHTS = 1;
	private static final int MAX_VALID_WEIGHTS = 100;

	@Autowired
	private IExecuteDao executeDao;

	@Override
	@Transactional(readOnly = true)
	public Execute findById(Long id) {
		return executeDao.findById(id).orElse(null);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Execute> findAll() {
		return (List<Execute>) executeDao.findAll();
	}

	@Override
	@Transactional
	public Execute save(Execute execute) {
		return executeDao.save(execute);
	}

	@Override
	public String calculateOutput(Execute execute) throws InvalidAttributeValueException {
		String output = "";
		List<List<Integer>> lstWeightPerDay = generateArrayPerDay(execute.getInput());
		int numTravel = 0;
		int numCase = 1;

		for (List<Integer> weightDay : lstWeightPerDay) {
			numTravel = calculateMaxTravelPerDay(new ArrayList<Integer>(weightDay));
			output += "Case #" + numCase + ": " + numTravel + "\n";
			numCase++;
		}

		return output;
	}

	private List<List<Integer>> generateArrayPerDay(String input) throws InvalidAttributeValueException {
		List<List<Integer>> lstWeightPerDay = new ArrayList<List<Integer>>();
		List<Integer> lstInput = Arrays.stream(input.split("\n")).map(Integer::valueOf).collect(Collectors.toList());

		int days = lstInput.get(0);
		int numObjects = lstInput.get(1);
		int firstObject = 2;
		List<Integer> weightDay = new ArrayList<Integer>();

		validateNumDays(days);
		validateNumObjects(numObjects);
		while (days != 0) {
			weightDay = lstInput.subList(firstObject, (firstObject + numObjects));
			weightDay.sort(Comparator.naturalOrder());

			validateWeight(weightDay.get(0));
			validateWeight(weightDay.get(numObjects - 1));

			lstWeightPerDay.add(weightDay);
			days--;
			if (days != 0) {
				firstObject += numObjects + 1;
				numObjects = lstInput.get(firstObject - 1);
				validateNumObjects(numObjects);
			}
		}

		return lstWeightPerDay;
	}

	private void validateNumDays(int days) throws InvalidAttributeValueException {
		if (days < MIN_VALID_DAYS || days > MAX_VALID_DAYS) {
			throw new InvalidAttributeValueException();
		}
	}

	private void validateNumObjects(int numObjects) throws InvalidAttributeValueException {
		if (numObjects < MIN_VALID_OBJECTS || numObjects > MAX_VALID_OBJECTS) {
			throw new InvalidAttributeValueException();
		}
	}

	private void validateWeight(int weight) throws InvalidAttributeValueException {
		if (weight < MIN_VALID_WEIGHTS || weight > MAX_VALID_WEIGHTS) {
			throw new InvalidAttributeValueException();
		}
	}

	private int calculateMaxTravelPerDay(List<Integer> weightOfDay) {
		List<Integer> weightDay = new ArrayList<Integer>(weightOfDay);
		int numTravel = 0;
		int weight = 0;
		int numElements = 1;
		int finalElementPosition = weightDay.size() - 1;
		int weightMax = weightDay.get(finalElementPosition);

		if (weightDay.get(0) >= MIN_WEIGHT) {
			return weightDay.size();
		} else {
			weightDay.remove(finalElementPosition);
			while (weight < MIN_WEIGHT && weightMax < MIN_WEIGHT) {
				if (weightDay.size() == 0) {
					return 0;
				}
				weightDay.remove(0);
				numElements++;
				weight = weightMax * numElements;
			}
			numTravel++;

			if (!weightDay.isEmpty()) {
				numTravel += calculateMaxTravelPerDay(weightDay);
			}
		}

		return numTravel;
	}
}
