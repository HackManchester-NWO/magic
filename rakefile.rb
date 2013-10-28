require 'rake'

task :test do
	sh " mocha .\test\parsing-magic.js --ui tdd --reporter nyan"
end