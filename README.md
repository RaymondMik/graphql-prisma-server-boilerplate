<h2>GET STARTED</h2>ù
<ol>
   <li>clone it and yarn OR npm install</li>
   <li>in ./config, update your PRISMA_ENDPOINT, PRISMA_SECRET and JWT_SECRET for the different environments you want to have</li>
   <li>move to the ./prisma folder and deploy the relevant Docker container to Prisma by running the following:
      dev: prisma deploy -e ../config/dev.env
      prod: prisma deploy -e ../config/prod.env
      test: prisma deploy -e ../config/test.env</li>

   <li>update .graphqlschema wusing as the default endpoint the one you defined for dev</li>
   <li>run yarn get-schema OR npm run get-schema</li>
   <li>run the app</li>
</ol>

<h3>If you use Heroku:</h3>
   ##Heroku commands needed here
   git push heroku master

   ##Setup env variables
   heroku config:set key=value
   heroku config:get key