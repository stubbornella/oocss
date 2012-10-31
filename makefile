DATE=$(shell date +%I:%M%p)
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#
CHECK=\033[32m✔\033[39m

#
# BUILD DOCS
#

build:
	@echo "\n${HR}"
	@echo "Building OOCSS..."
	@echo "${HR}\n"
	@make clean
	@echo "\n${HR}"
	@echo "Building Documentation..."
	@echo "${HR}\n"
	@node tools/build
#	@echo "\n${HR}"
#	@echo "Building CSS Files with Sass..."
#	@echo "${HR}\n"
	@echo "\n${HR}"
	@echo "OOCSS Build                                 ${CHECK} Done"
	@echo "${HR}"


#
# INITIALIZE THE NODE PACKAGE FOR THE BUILD PROCESS
#

initbuild:
	@echo "${HR}"
	@echo "Initialize node packages"
	@echo "${HR}"
	@cd tools/build; npm link
	@echo "\n${HR}"
	@echo "Loading                                     ${CHECK} Done"


#
# CLEAN THE BUILD DIRECTORY
#

clean:
	@rm -rf build
	@echo "${HR}"
	@echo "Clean the build directory                   ${CHECK} Done"
	@echo "${HR}"


#
# INSTALL THIRD PARTY TOOLS FOR BUILD AND WORKING
#

tools:
	@echo "${HR}"
	@echo "Installing Tools (sass, compass)...."
	@echo "${HR}"
	@echo "This command must be launch as root"
	@echo "in Mac use : sudo make tools"
	@echo "${HR}"
	@echo "Install sass and compass with gem\n"
	@echo "If you have an error, please install ruby : http://www.ruby-lang.org/en/downloads/"
	@echo "If password is requested, you must type your system password because root access is needed"
	@echo "Otherwise, wait..."
	@sudo gem install sass
	@sudo gem install compass
	@echo "Tools installation                          ${CHECK} Done"


#
# INSTALL THIRD PARTY TOOLS FOR BUILD AND WORKING
#

watch:
	@echo "${HR}"
	@echo "Start Sass for watching CSS"
	sass --scss --compass --watch .:.
	@echo "End of Sass watching"