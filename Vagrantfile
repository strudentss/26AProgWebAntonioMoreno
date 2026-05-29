Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"

  # Puerto HTTP principal
  config.vm.network "forwarded_port", guest: 80, host: 8080

  # Backends
  config.vm.network "forwarded_port", guest: 3001, host: 3001
  config.vm.network "forwarded_port", guest: 3002, host: 3002
  config.vm.network "forwarded_port", guest: 3003, host: 3003

  # Frontends
  config.vm.network "forwarded_port", guest: 5171, host: 5171
  config.vm.network "forwarded_port", guest: 5172, host: 5172
  config.vm.network "forwarded_port", guest: 5173, host: 5173
end
