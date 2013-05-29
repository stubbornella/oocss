#
# Cookbook Name:: git
# Recipe:: windows
#
# Copyright 2008-2009, Opscode, Inc.
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

windows_package node['git']['display_name'] do
  action :install
  source node['git']['url']
  checksum node['git']['checksum']
  installer_type :inno
end

# Git is installed to Program Files (x86) on 64-bit machines and
# 'Program Files' on 32-bit machines
PROGRAM_FILES = ENV['ProgramFiles(x86)'] || ENV['ProgramFiles']

windows_path "#{ PROGRAM_FILES }\\Git\\Cmd" do
  action :add
end
