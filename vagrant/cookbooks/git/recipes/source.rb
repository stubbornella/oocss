#
# Cookbook Name:: git
# Recipe:: source
#
# Copyright 2012, Brian Flad, Fletcher Nichol
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

if node["platform"] == "windows"
  return "#{node['platform']} is not supported by the #{cookbook_name}::#{recipe_name} recipe"
end

include_recipe "build-essential"

pkgs = value_for_platform_family(
  ["rhel"] => %w{ expat-devel gettext-devel libcurl-devel openssl-devel perl-ExtUtils-MakeMaker zlib-devel }
)

pkgs.each do |pkg|
  package pkg
end

remote_file "#{Chef::Config['file_cache_path']}/git-#{node['git']['version']}.tar.gz" do
  source    node['git']['url']
  checksum  node['git']['checksum']
  mode      00644
  not_if "test -f #{Chef::Config['file_cache_path']}/git-#{node['git']['version']}.tar.gz"
end

execute "Extracting and Building Git #{node['git']['version']} from Source" do
  cwd Chef::Config['file_cache_path']
  command <<-COMMAND
    (mkdir git-#{node['git']['version']} && tar -zxf git-#{node['git']['version']}.tar.gz -C git-#{node['git']['version']} --strip-components 1)
    (cd git-#{node['git']['version']} && make prefix=#{node['git']['prefix']} install)
  COMMAND
  creates "node['git']['prefix']}/bin/git"
  not_if "git --version | grep #{node['git']['version']}"
end
