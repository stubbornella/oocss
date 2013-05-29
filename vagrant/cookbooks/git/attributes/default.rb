#
# Author:: Jamie Winsor (<jamie@vialstudios.com>)
# Cookbook Name:: git
# Attributes:: default
#
# Copyright 2008-2012, Opscode, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

case node['platform_family']
when 'windows'
  default['git']['version'] = "1.8.0-preview20121022"
  default['git']['url'] = "http://github.com/downloads/msysgit/git/Git-#{node['git']['version']}.exe"
  default['git']['checksum'] = "8ec19d04912fd27d7350823c857a4807b550fa63a3744bf6fd2841de8cfa9a0f"
  default['git']['display_name'] = "Git version #{ node['git']['version'] }"
when "mac_os_x"
  default['git']['osx_dmg']['app_name']    = "git-1.8.0-intel-universal-snow-leopard"
  default['git']['osx_dmg']['volumes_dir'] = "Git 1.8.0 Snow Leopard Intel Universal"
  default['git']['osx_dmg']['package_id']  = "GitOSX.Installer.git180.git.pkg"
  default['git']['osx_dmg']['url']         = "https://github.com/downloads/timcharper/git_osx_installer/git-1.8.0-intel-universal-snow-leopard.dmg"
  default['git']['osx_dmg']['checksum']    = "da83499f3305061792358bec26c20faa997b7ad9990713d1be2b03cbb5fbce12"
else
  default['git']['prefix'] = "/usr/local"
  default['git']['version'] = "1.8.0"
  default['git']['url'] = "https://github.com/git/git/tarball/v#{node['git']['version']}"
  default['git']['checksum'] = "24f1895fa74a23b3d9233fa89a9ef04d83a1cd952d659720d6ea231bbd0c973c"
end

default['git']['server']['base_path'] = "/srv/git"
default['git']['server']['export_all'] = "true"