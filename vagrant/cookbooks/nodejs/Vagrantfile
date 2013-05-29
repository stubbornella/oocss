# Automatically install and mount cookbooks from Berksfile

require 'berkshelf/vagrant'
require 'jamie/vagrant'

Vagrant::Config.run do |config|
  Jamie::Vagrant.define_vms(config)
end

