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
	@echo "Node Packages                               ${CHECK} Done"
	@echo "Install sass and compass with gem\n"
	@echo "If you have an error, please install ruby : http://www.ruby-lang.org/en/downloads/"
	@echo "If password is requested, you must type your system password because root access is needed"
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
	@echo "Cleaning the builddir (remove it)"
	@rm -rf ${BUILDDIR}
	@echo "cleaning compass files..."
	@cd config;compass clean
	@echo "${HR}"
	@echo "Clean project                               ${CHECK} Done"
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
	@sudo gem install compass
	@echo "Tools installation                          ${CHECK} Done"


#
# INSTALL THIRD PARTY TOOLS FOR BUILD AND WORKING
#

watch:
	@echo "${HR}"
	@echo "Start Compass for watching CSS"
	@cd config; compass watch
	@echo "End of Compass watching"