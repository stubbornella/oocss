Description
===========

Installs git and optionally sets up a git server as a daemon under runit.

Requirements
============
## Ohai and Chef:

* Ohai: 6.14.0+

This cookbook makes use of `node['platform_family']` to simplify platform
selection logic. This attribute was introduced in Ohai v0.6.12.

## Platform:

The following platform families are supported:

* Debian
* Arch
* RHEL
* Fedora
* Mac OS X (10.6.0+)
* Windows

## Cookbooks:

* runit (for `git::server`)
* build-essential (for `git::source`)
* dmg (for OS X installation)
* yum (for RHEL 5 installation)

### Windows Dependencies
The [`windows_package`](https://github.com/opscode-cookbooks/windows#windows_package) resource from the Windows cookbook is required to
install the git package on Windows.

## Attributes

### default
The following attributes are platform-specific.

#### Windows

* `node['git']['version']` - git version to install
* `node['git']['url']` - URL to git package
* `node['git']['checksum']` - package SHA256 checksum
* `node['git']['display_name']` - `windows_package` resource Display Name (makes the package install idempotent) 

#### Mac OS X

* `node['git']['osx_dmg']['url']` - URL to git package
* `node['git']['osx_dmg']['checksum']` - package SHA256 checksum

#### Linux

* `node['git']['prefix']` - git install directory
* `node['git']['version']` - git version to install
* `node['git']['url']` - URL to git tarball
* `node['git']['checksum']` - tarball SHA256 checksum

Recipes
=======

## default

Installs base git packages based on platform.

## server

Sets up a git daemon to provide a server.

## source

Installs git from source.

## windows

Installs git client on Windows

Usage
=====


This cookbook primarily installs git core packages. It can also be
used to serve git repositories.

To install git client (all supported platforms):

    include_recipe 'git'

To install git server:

    include_recipe "git::server"

This creates the directory specified by git/server/base_path (default is /srv/git)
and starts a git daemon, exporting all repositories found. Repositories need to be
added manually, but will be available once they are created.

License and Author
==================

- Author:: Joshua Timberman (<joshua@opscode.com>)
- Copyright:: 2009-2012, Opscode, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
