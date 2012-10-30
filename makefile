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