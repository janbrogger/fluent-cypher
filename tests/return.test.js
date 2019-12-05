import test from 'ava';
import CypherQuery from '../index';

test('#return no args', t => {
	t.throws(() => new CypherQuery().return())
});

test('#return strings', t => {
	var query = new CypherQuery;
	query.return('node', 'blatch');
	t.is(query.queryString, 'RETURN node, blatch ');
});

test('#return objects', t => {
	var query = new CypherQuery;
	query.return({alias: 'node', prop: 'z', as: 'criminal'}, {alias: 'blatch'}, 'kling');
	t.is(query.queryString, 'RETURN node.z as criminal, blatch, kling ');
});
