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
	@node tools/build
	@echo "\n${HR}"
	@echo "OOCSS Documentation Build                   ${CHECK} Done"
	@echo "${HR}"


#
# INITIALIZE THE NODE PACKAGE FOR THE BUILD PROCESS
#

initbuild:
	@echo "${HR}"
	@echo "Initialize node packages"
	@echo "${HR}"
	@cd tools/build; npm link
	@echo "Loading                                     ${CHECK} Done"

