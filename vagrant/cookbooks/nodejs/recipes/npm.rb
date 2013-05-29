#
# Author:: Marius Ducea (marius@promethost.com)
# Cookbook Name:: nodejs
# Recipe:: npm
#
# Copyright 2010-2012, Promet Solutions
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
#

include_recipe "nodejs"

package "curl"

npm_src_url = "http://registry.npmjs.org/npm/-/npm-#{node['nodejs']['npm']}.tgz"

bash "install npm - package manager for node" do
  cwd "/usr/local/src"
  user "root"
  code <<-EOH
    mkdir -p npm-v#{node['nodejs']['npm']} && \
    cd npm-v#{node['nodejs']['npm']}
    curl -L #{npm_src_url} | tar xzf - --strip-components=1 && \
    make uninstall dev
  EOH
  not_if "#{node['nodejs']['dir']}/bin/npm -v 2>&1 | grep '#{node['nodejs']['npm']}'"
end

