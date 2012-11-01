DATE=$(shell date +%I:%M%p)
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#
CHECK=\033[32m✔\033[39m
BUILDDIR=build

#
# BUILD DOCS
#

build:
	@echo "\n${HR}"
	@echo "Building OOCSS..."
	@echo "${HR}\n"
	@make clean
	@mkdir ${BUILDDIR}
	@echo "\n${HR}"
	@echo "Building Documentation..."
	@echo "${HR}\n"
	@mkdir ${BUILDDIR}/docs
	@node tools/build
	@echo "\n${HR}"
	@echo "Building CSS Files with Sass..."
	@echo "${HR}\n"
	@mkdir build/css
	@cd config; compass compile
	@echo "\n${HR}"
	@echo "OOCSS Build                                 ${CHECK} Done"
	@echo "${HR}"


#
# INITIALIZE THE NODE PACKAGE FOR THE BUILD PROCESS
#

initbuild:
	@echo "${HR}"
	@echo "INSTALL NEEDED TOOLS FOR BUILD"
	@echo "THIS COMMAND MUST BE LAUNCHED IN ROOT MODE (su, sudo, etc...)"
	@echo "Example in Mac OSX : sudo make initbuild"
	@echo "${HR}"
	@echo "Initialize node packages"
	@echo "${HR}"
	@cd tools; npm link
	@echo "\n${HR}"
	@echo "Node Packages                               ${CHECK} Done"
	@echo "\n${HR}"
	@echo "Install sass and compass with gem\n"
	@echo "If you have an error, please install ruby :"
	@echo "http://www.ruby-lang.org/en/downloads/"
	@echo "If password is requested, you must type your system"
	@echo "password because root access is needed"
	@echo "Otherwise, wait..."
	@sudo gem install compass
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
	@echo "cleaning compass files..."
	@cd config;compass clean
	@echo "${HR}"
	@echo "Clean project                               ${CHECK} Done"
	@echo "${HR}"



#
# INSTALL THIRD PARTY TOOLS FOR BUILD AND WORKING
#

watch:
	@echo "${HR}"
	@echo "Start Compass and project watch"
	node tools/watch
#	@cd config; compass watch
	@echo "End of project watching"