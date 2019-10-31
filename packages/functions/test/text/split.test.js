const { createTerm } = require('../utils');
const { Sheet } = require('@cedalo/machine-core');
const { FunctionErrors: Error } = require('@cedalo/error-codes');

describe('split', () => {
	it('should split a string by using a specified separator string and return split part at given index', () => {
		const sheet = new Sheet().loadCells({ A1: 3 });
		expect(createTerm('split("topic1/topic2/topic3", "/", 1)', sheet).value).toBe('topic1');
		expect(createTerm('split("topic1/topic2/topic3", "/", 2)', sheet).value).toBe('topic2');
		expect(createTerm('split("topic1/topic2/topic3", "/", A1)', sheet).value).toBe('topic3');
	});
	it('should return complete string if it does not contain specified separator string', () => {
		const sheet = new Sheet();
		expect(createTerm('split("topic1/topic2/topic3", "|", 1)', sheet).value).toBe('topic1/topic2/topic3');
		expect(createTerm('split("topic1/topic2/topic3", ">", 2)', sheet).value).toBe('topic1/topic2/topic3');
		expect(createTerm('split("topic1/topic2/topic3", "<", 3)', sheet).value).toBe('topic1/topic2/topic3');
		expect(createTerm('split("topic1/topic2/topic3",, 3)', sheet).value).toBe('topic1/topic2/topic3');
	});
	it('should return first split part if no index is given or if it is less then 1', () => {
		const sheet = new Sheet();
		expect(createTerm('split("topic1/topic2/topic3", "/")', sheet).value).toBe('topic1');
		expect(createTerm('split("topic1/topic2/topic3", "c", 0)', sheet).value).toBe('topi');
		expect(createTerm('split("topic1/topic2/topic3", "t", -42)', sheet).value).toBe('');
	});
	it('should return last split part if given index is out of range', () => {
		const sheet = new Sheet();
		expect(createTerm('split("topic1/topic2/topic3", "/", 3)', sheet).value).toBe('topic3');
		expect(createTerm('split("topic1/topic2/topic3", "c", 4)', sheet).value).toBe('3');
		expect(createTerm('split("topic1/topic2/topic3", "t", 42)', sheet).value).toBe('opic3');
	});
	// DL-1332
	it('should return error code for invalid or missing parameters', () => {
		const sheet = new Sheet();
		expect(createTerm('split()', sheet).value).toBe(Error.code.ARGS);
		expect(createTerm('split("topic1/topic2/topic3")', sheet).value).toBe(Error.code.ARGS);
		expect(createTerm('split("topic1/topic2/topic3", "/", 3, 45, 56)', sheet).value).toBe(Error.code.ARGS);
		expect(createTerm('split("topic1/topic2/topic3", "/", 1B1)', sheet).value).toBe(Error.code.NAME);
	});
});
