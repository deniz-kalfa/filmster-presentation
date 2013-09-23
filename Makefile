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
	git remote add functional01 git@heroku.com:filmster-presentation-func01.git
	git remote add qa01         git@heroku.com:filmster-presentation-qa01.git
	git remote add demo01       git@heroku.com:filmster-presentation-demo01.git
	git remote add stage01      git@heroku.com:filmster-presentation-stage01.git
	git remote add prod01       git@heroku.com:filmster-presentation-prod01.git

setup-heroku:
	heroku apps:create --remote functional01 --app filmster-presentation-func01
	heroku apps:create --remote qa01         --app filmster-presentation-qa01
	heroku apps:create --remote demo01       --app filmster-presentation-demo01
	heroku apps:create --remote stage01      --app filmster-presentation-stage01
	heroku apps:create --remote prod01       --app filmster-presentation-prod01
	heroku config:add NODE_ENV=functional01  --app filmster-presentation-func01
	heroku config:add NODE_ENV=qa01          --app filmster-presentation-qa01
	heroku config:add NODE_ENV=demo01        --app filmster-presentation-demo01
	heroku config:add NODE_ENV=stage01       --app filmster-presentation-stage01
	heroku config:add NODE_ENV=prod01        --app filmster-presentation-prod01

.PHONY: no_targets__ list
no_targets__:
list:
	sh -c "$(MAKE) -p no_targets__ | awk -F':' '/^[a-zA-Z0-9][^\$$#\/\\t=]*:([^=]|$$)/ {split(\$$1,A,/ /);for(i in A)print A[i]}' | grep -v '__\$$' | sort"
