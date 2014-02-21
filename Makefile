all:
	echo "empty"
	
coveralls:
	jscoverage lib
	LIB_COV=1 ./node_modules/.bin/mocha test -R mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js

clean:
	rm -rf lib-cov
	
unittest:
	./node_modules/.bin/mocha test

coverage:
	jscoverage lib
	LIB_COV=1 ./node_modules/.bin/mocha test -R html-cov > coverage.html