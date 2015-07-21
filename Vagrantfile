# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

    # Get rid of that pesky "stdin: is not a tty" error
    config.ssh.shell = "bash -c 'BASH_ENV=/etc/profile exec bash'"

    # Ansible Citadel Ubuntu 14.04 LTS 64-bit box
    config.vm.define "viper64", primary: true do |viper64|
      viper64.vm.box = "carbonite/viper-dev"

      # Change some default options for better experience
      viper64.vm.provider :virtualbox do |vb|
          # Sets VM name + millis when started
          vb.name = "viper-dev" + "-" + Time.now.to_f.to_i.to_s

          # Allocate memory to the box
          vb.memory = 1024

          # Prevent VirtualBox from using up all of your CPU, limiting to 25% of CPU
          vb.customize ["modifyvm", :id, "--cpuexecutioncap", "25"]
      end
    end

    # We're going to use the shell provider to install Ansible so that we can run
    # it within the Guest VM, not outside
    config.vm.provision :shell,
        :privileged => true,
        :keep_color => true,
        :inline => "export PYTHONUNBUFFERED=1 && export ANSIBLE_FORCE_COLOR=1 && cd /vagrant/ansible/localhost && ./provision.sh"
end
