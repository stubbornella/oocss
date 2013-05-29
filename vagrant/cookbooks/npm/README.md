# Cookbook for Node Package Manager
http://community.opscode.com/cookbooks/npm

##DESCRIPTION:
This cookbook grown up from mdxp's nodejs::npm recipe
It provides some LWRP's for simple management of node packages

##REQUIREMENTS:
This cookbook depends on https://github.com/mdxp/cookbooks/tree/master/nodejs/

##ATTRIBUTES:
The only attribute default['npm']['version'] specifies a version of npm should be installed.

_NOTE:_ this cookbook will not work with npm <= 1.0.0

##USAGE:
Use recipe['npm'] to install npm it self. 
To install some packge system-wide use

    npm_package "foo@0.3.2"

or

    npm_package "foo" do
      version "0.3.2"
      action :install
    end 

To install some package under your project root try to:

    npm_package "foo" do
	  version "0.3.2"
	  path "/your/project/path/goes/here"
	  action :install_local
	end
	
To uninstall some package - obviously you can do something like

    npm_package "bad_one" do
	  version "0.3.2"
	  action :uninstall
	end
	
or

    npm_package "bad_local_one" do
	  version "0.3.2"
	  path "/your/project/path/goes/here"
	  action :uninstall_local
	end

## TODO
- wrap other features of npm to LWRP
