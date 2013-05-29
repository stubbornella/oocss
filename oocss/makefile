DATE=$(shell date +%I:%M%p)
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#
CHECK=\033[32m✔\033[39m
BUILDDIR=build

.PHONY:build workshop

#
# BUILD DOCS
#

build: clean
	@echo "\n${HR}"
	@echo "Building OOCSS..."
	@echo "${HR}\n"
	@mkdir ${BUILDDIR}
	@echo "\n${HR}"
	@mkdir build/css
#	@cd tools/config; compass compile
	@echo "Building CSS Files with Sass..."
	@echo "\n${HR}"
	@echo "Building Documentation..."
	@echo "${HR}\n"
	@mkdir ${BUILDDIR}/docs
	@node tools/build
	@echo "\n${HR}"
	@echo "${HR}\n"
	@echo "OOCSS Build                                 ${CHECK} Done"
	@echo "${HR}"

#
# START BUILD AND WATCH
#

bw: build watch
	@echo "watching..."


#
# INITIALIZE THE NODE PACKAGE FOR THE BUILD PROCESS
#

init:
	@echo "${HR}"
	@echo "INSTALL NEEDED TOOLS FOR BUILD"
	@echo "THIS COMMAND MUST BE LAUNCHED IN ROOT MODE (su, sudo, etc...)"
	@echo "Example in Mac OSX : sudo make init"
	@echo "${HR}"
	@echo "Initialize node packages"
	@echo "${HR}"
	@cd tools; npm install
	@echo "\n${HR}"
	@echo "Node Packages                               ${CHECK} Done"
	@echo "\n${HR}"
	@echo "Install sass and compass with gem\n"
	@echo "If you have an error, please install ruby :"
	@echo "http://www.ruby-lang.org/en/downloads/"
	@gem list --local | grep "compass (" && echo "already installed" || (echo "If password is requested, you must type your system\npassword because root access is needed\nOtherwise, wait..." && sudo gem install compass)
	@echo "Tools installation                          ${CHECK} Done"


#
# CLEAN THE BUILD DIRECTORY
#

clean:
	@echo "${HR}"
	@echo "Clean the project"
	@echo "${HR}"
	@echo "Removing the build directory"
	@rm -rf ${BUILDDIR}
	@rm -rf workshop*
	@echo "cleaning compass files..."
	@cd tools/config;compass clean
	@echo "Remove Node modules"
	@echo "${HR}"
	@echo "Clean project                               ${CHECK} Done"
	@echo "${HR}"


#
# RESET THE DIRECTORY (remove node modules folder and clean
#

reset: clean
	@rm -rf tools/node_modules


#
# INSTALL THIRD PARTY TOOLS FOR BUILD AND WORKING
#

watch:
	@echo "${HR}"
	@echo "Start Compass and project watch"
	node tools/watch
	@echo "End of project watching"


#
# Create a new component from ComponentTemplate
#

component:
	@echo "Create component folder $(name)"
	@cp -R tools/componentTemplate src/components/$(name)
	@mv src/components/$(name)/_component.scss src/components/$(name)/_$(name).scss
	@mv src/components/$(name)/component.handlebars src/components/$(name)/$(name).handlebars
	@mv src/components/$(name)/component_doc.handlebars src/components/$(name)/$(name)_doc.handlebars
	@mv src/components/$(name)/script/component.js  src/components/$(name)/script/$(name).js
	@node tools/component.js $(name)
	@echo "Done"
	
#
# Create A Workshop folder
#

workshop:
	@echo "${HR}"
	@echo "Build the project"
	@make -B
	@echo "Create the workshop directory"
	@rm -rf workshop
	@cp -R build workshop
# clean workshop directory
	@rm -rf workshop/sample
	@rm -rf workshop/docs/components
	@mv workshop/template/template.html workshop/
	@node tools/workshop.js
	@rm -rf workshop/template
	@cp -R src/workshop/assets workshop/assets
	@echo "Workshop directory is created"
	@rm -f workshop.zip
	@zip -r -9 -q workshop.zip workshop
	@echo "workshop.zip is created"

#
# Install osx terminal-notifier, only use this command if you want watch notifications in OSx 10.7/10.8
#

notifier:
	@gem list --local | grep "terminal-notifier (" && echo "already installed" || (echo "If password is requested, you must type your system\npassword because root access is needed\nOtherwise, wait..." && sudo gem install terminal-notifier)
