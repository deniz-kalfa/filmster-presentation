# type 'make -s list' to see list of targets.

run-app:
	PORT=5000 ./node_modules/forever/bin/forever ./node_modules/nodemon/nodemon.js server.js

test-app:
	grunt test

test-app-ci:
	npm -d install
	./node_modules/.bin/grunt test

setup-app:
	npm install

.PHONY: no_targets__ list
no_targets__:
list:
	sh -c "$(MAKE) -p no_targets__ | awk -F':' '/^[a-zA-Z0-9][^\$$#\/\\t=]*:([^=]|$$)/ {split(\$$1,A,/ /);for(i in A)print A[i]}' | grep -v '__\$$' | sort"
