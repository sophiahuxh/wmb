## TODOs

See [issue](https://github.com/sophiahuxh/wmb/issues)

## Deploy

- Prepare a `.env` file by copying from `.env.example`
- Go to the deploy server and pull down latest code
- restart docker container to pick up the latest code

# frontend running - log will display in frontend
$ docker run -it --name wmb -p 80:3000 -v /root/wmb:/usr/src/app -w /usr/src/app node:4 node keystone.js 

## backend running
$ docker run -d --name wmb -p 80:3000 -v /root/wmb:/usr/src/app -w /usr/src/app node:4 node keystone.js
