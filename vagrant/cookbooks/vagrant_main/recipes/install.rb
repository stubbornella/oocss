include_recipe "apt"
include_recipe "apache2"
include_recipe "git"
include_recipe "rubygems"
include_recipe "nodejs"
include_recipe "nodejs::npm"



execute "disable-default-site" do
  command "sudo a2dissite default"
  notifies :reload, resources(:service => "apache2"), :delayed
end

web_app "project" do
  template "project.conf.erb"
  notifies :reload, resources(:service => "apache2"), :delayed
end

bash "install gem compass" do
  user "root"
  code <<-EOH
    gem install compass
  EOH
end

bash "install npm modules" do
    user "root"
    code <<-EOH
        cd /home/vagrant
        npm install fs.extra@1.2.0
        npm install nodewatch@0.3.1
        npm install handlebars@1.0.7
        npm install batchdir@0.1.0
        npm install path@0.4.9
        npm install html@0.0.7
        npm install uglify-js
    EOH
end

bash "Symlink node_modules to root" do
    user "root"
    code <<-EOH
        ln -s /home/vagrant/node_modules/
    EOH
end

bash "Add cd /project in profile" do
    user "vagrant"
    code <<-EOH
        echo "cd /vagrant" >> /home/vagrant/.profile
    EOH
end