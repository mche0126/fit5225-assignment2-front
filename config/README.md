This folder contains all third party config


Note that :

config all files can not be passed, import.meta.env to get the environment variables, will report an error, to use the environment variables in the config file, can only be passed in through vite-config-ts, passed to the config file through configEnv, then the config file, it must be written in the form of a function