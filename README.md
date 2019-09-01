#GET STARTED
1) clone it and yarn OR npm install
2) in ./config, update your PRISMA_ENDPOINT, PRISMA_SECRET and JWT_SECRET for the different environments you want to have
3) move to the ./prisma folder and deploy the relevant Docker container to Prisma by running the following:
   dev: prisma deploy -e ../config/dev.env
   prod: prisma deploy -e ../config/prod.env
   test: prisma deploy -e ../config/test.env

3) update .graphqlschema wusing as the default endpoint the one you defined for dev
4) run yarn get-schema OR npm run get-schema

#If you use Heroku:
   ##Heroku commands needed here
   git push heroku master

   ##Setup env variables
   heroku config:set key=value
   heroku config:get key