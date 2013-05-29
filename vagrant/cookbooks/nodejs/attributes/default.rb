#
# Cookbook Name:: nodejs
# Attributes:: nodejs
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

default['nodejs']['install_method'] = 'source'
default['nodejs']['version'] = '0.8.18'
default['nodejs']['checksum'] = '1d63dd42f9bd22f087585ddf80a881c6acbe1664891b1dda3b71306fe9ae00f9'
default['nodejs']['dir'] = '/usr/local'
default['nodejs']['npm'] = '1.2.0'
default['nodejs']['src_url'] = "http://nodejs.org/dist"
