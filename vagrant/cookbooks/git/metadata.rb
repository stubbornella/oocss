name              "git"
maintainer        "Opscode, Inc."
maintainer_email  "cookbooks@opscode.com"
license           "Apache 2.0"
description       "Installs git and/or sets up a Git server daemon"
long_description  IO.read(File.join(File.dirname(__FILE__), 'README.md'))
version           "2.2.1"
recipe            "git", "Installs git"
recipe            "git::server", "Sets up a runit_service for git daemon"
recipe            "git::source", "Installs git from source"

%w{ amazon arch centos debian fedora redhat scientific oracle amazon ubuntu windows }.each do |os|
  supports os
end

supports "mac_os_x", ">= 10.6.0"

%w{ dmg build-essential yum windows }.each do |cookbook|
  depends cookbook
end

depends "runit", "~> 1.0"

attribute "git/server/base_path",
  :display_name => "Git Daemon Base Path",
  :description => "A directory containing git repositories to be exposed by the git-daemon",
  :default => "/srv/git",
  :recipes => ["git::server"]

attribute "git/server/export_all",
  :display_name => "Git Daemon Export All",
  :description => "Adds the --export-all option to the git-daemon parameters, making all repositories publicly readable even if they lack the \"git-daemon-export-ok\" file",
  :choice => ["true", "false"],
  :default => "true",
  :recipes => ["git::server"]
