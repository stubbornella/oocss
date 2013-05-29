# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "stubbornella"

  # === box URLS ===
  config.vm.box_url = "https://dl.dropbox.com/u/558452/vagrant/package.box"
  #config.vm.box_url = "~/Dropbox/Public/vagrant/package.box"

  # === box config ===
  config.vm.network :forwarded_port, guest: 80, host: 8080
  #config.vm.synced_folder ".", "/vagrant"
  #vb.gui = true

  # provision only if .vagrantstartt exists
  #if File.exist?(".vagrantstart")
  #  config.vm.provision :shell, :path => ".vagrantstart"
  #end

  config.vm.provision :shell, :path => "tools/vagrant/vagrant_user.sh"
end

