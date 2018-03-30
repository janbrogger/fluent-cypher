# Fluent Cypher

This library allows you to build any cypher query you like and get the query string and all the parameters as an object.

If you want to be able to connect to your Neo4j instance have a look at [fluent-neo4j](https://github.com/ogroppo/fluent-neo4j)

### What is Cypher

[This guide](https://neo4j.com/developer/cypher-query-language/) explains the basic concepts of Cypher, Neo4j’s query language.

Following the official documentation it is better to avoid literals so everything is treated as a parameter.

## Table of Contents
* [Usage](#usage)
* [Building the query](#building)
	* [CREATE](#createMethods)
		* [create()](#create)
		* [createNode()](#createNode)
		* [createRel()](#createRel)
	* [MATCH](#matchMethods)
		* [match()](#match)
		* [matchNode()](#matchNode)
		* [matchRel()](#matchRel)
	* [MERGE](#mergeMethods)
		* [merge()](#merge)
		* [mergeNode()](#mergeNode)
		* [mergeRel()](#mergeRel)
* [Debug](#debug)
* [Tests](#tests)

## <a name="usage"></a> Usage

```js
const CypherQuery = require('fluent-cypher');

var cq = new CypherQuery();

cq.queryString // ''
cq.queryParams // {}

```

## <a name="building"></a> Building the query

### <a name="createMethods"></a> CREATE Methods

#### <a name="create"></a> .create(...patterns)

Generic method that accepts custom string as a pattern

~~~js

query.create("(node)") // 'CREATE (node)'

query.create("(node)", "()->[rel]->()") // 'CREATE (node), ()->[rel]->()'

~~~

#### <a name="createNode"></a> createNode([cypherNode] [, options])

Accepts object with properties, labels, alias.

~~~js

query.createNode() // CREATE (node)

query.createNode({alias: 'myNode', label: 'Obj', labels: ['this', 'fancy label']}) // CREATE (myNode:`Obj`:`this`:`fancy label`)

~~~

#### <a name="createRel"></a> createRel([cypherRel] [, options])

Accepts object with properties, labels, alias.

~~~js

query.createRel() // CREATE ()->[rel]->()

query.createRel({alias: 'myRel', type: 'REL', myProp: 'myVal'}) // CREATE ()->[myRel:`REL` {myProp:'myVal'}]->()

~~~

### <a name="matchMethods"></a> MATCH methods

#### <a name="match"></a> match

~~~js

query.match([...patterns])

query.match() // ''

query.match("(node)") // MATCH (node)

query.match("(node)", "()->[rel]->()") // MATCH (node), ()->[rel]->()

~~~

#### <a name="matchNode"></a> matchNode

~~~js

query.matchNode([cypherNode] [, options])

query.matchNode() // MATCH (node)

query.matchNode({alias: 'myNode', label: 'Obj', labels: ['this', 'fancy label']}) // MATCH (myNode:`Obj`:`this`:`fancy label`)

~~~

#### <a name="matchRel"></a> matchRel

~~~js

query.matchRel([cypherNode] [, options])

query.matchRel() // MATCH ()->[rel]->()

query.matchRel({alias: 'myRel', type: 'REL'}) // MATCH ()->[rel:`REL`]->()

~~~

### <a name="mergeMethods"></a> MERGE methods

#### <a name="merge"></a> merge

~~~js

query.merge([...patterns])

query.merge() // ''

query.merge("(node)") // MERGE (node)

query.merge("(node)", "()->[rel:`type`]->()") // MERGE (node), ()->[rel:`type`]->()

~~~

#### <a name="mergeNode"></a> mergeNode([cypherNode] [, options])

~~~js

query.mergeNode([cypherNode] [, options])

query.mergeNode() // MERGE (node)

query.mergeNode({alias: 'email', name: 'spam@email.com', label: 'Email', labels: ['Verified', 'Blocked']}) // MERGE (email:`Email`:`Verified`:`Blocked`)

~~~

#### <a name="mergeRel"></a> mergeRel

~~~js

query.mergeRel(cypherRel [, options])

query.mergeRel({alias: 'friendship', type: 'friend of'}) // MERGE ()->[friendship:`friend of`]->()

~~~

### WHERE

- IN

- STARTS WITH

- ENDS WITH

- Regexp

Provide your own custom regexp


NB: You need to escape the regexp youself! It might not throw an error but results will be wrong, use built in function

~~~js

query.matchNode().wherePropRegexp({
	propName: `(?i).*${query._escapeStringRegexp("{}+&?!")}.*`,
	otherPropName: "(?g).*doesNotNeedToBeEscaped.*",
})

~~~

### <a name="debug"></a> debug

As `query.queryString` is a parametrised string you may want to print a string that you can copy and paste in the browser console.

~~~js

query
	.matchNode()
	.debug()     // => MATCH (node)
	.matchRel()
	.debug()    // => MATCH (node) MATCH ()-[rel]->()

~~~
