#
# Author:: Nathan L Smith (nlloyds@gmail.com)
# Cookbook Name:: nodejs
# Recipe:: package
#
# Copyright 2012, Cramer Development, Inc.
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

case node['platform_family']
  when 'rhel', 'fedora'
    file = '/usr/local/src/nodejs-stable-release.noarch.rpm'

    remote_file file do
      source 'http://nodejs.tchol.org/repocfg/el/nodejs-stable-release.noarch.rpm'
      action :create_if_missing
    end

    yum_package 'nodejs-stable-release' do
      source file
      options '--nogpgcheck'
    end

    %w{ nodejs nodejs-compat-symlinks npm }.each do |pkg|
      package pkg
    end
  when 'debian'
    apt_repository 'node.js' do
      uri 'http://ppa.launchpad.net/chris-lea/node.js/ubuntu'
      distribution node['lsb']['codename']
      components ['main']
      keyserver "keyserver.ubuntu.com"
      key "C7917B12"
      action :add
    end

    %w{ nodejs npm }.each do |pkg|
      package pkg
    end
  when 'smartos'
    %w{ nodejs }.each do |pkg|
      package pkg
    end
  else
    include_recipe "nodejs::install_from_source"
end
