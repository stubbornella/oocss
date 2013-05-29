action :install do
  cmd  = "npm -g install #{new_resource.name}"
  cmd += "@#{new_resource.version}" if new_resource.version
  execute "install NPM package #{new_resource.name}" do
    command cmd
  end
end

action :install_local do
  path = new_resource.path if new_resource.path
  cmd  = "npm install #{new_resource.name}"
  cmd += "@#{new_resource.version}" if new_resource.version
  execute "install NPM package #{new_resource.name} into #{path}" do
    cwd path
    command cmd
  end
end

action :uninstall do
  cmd  = "npm -g uninstall #{new_resource.name}"
  cmd += "@#{new_resource.version}" if new_resource.version
  execute "uninstall NPM package #{new_resource.name}" do
    command cmd
  end
end

action :uninstall_local do
  path = new_resource.path if new_resource.path
  cmd  = "npm uninstall #{new_resource.name}"
  cmd += "@#{new_resource.version}" if new_resource.version
  execute "uninstall NPM package #{new_resource.name} from #{path}" do
    cwd path
    command cmd
  end
end
