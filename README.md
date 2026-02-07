

### Inicial  ###
cd $PATH_ABSOLUTO/MeninosEuVi-backNodeJS
npm i express cors
npm i -D typescript ts-node-dev @types/node @types/express


### Criação da integração com banco de dados ###
cd $PATH_ABSOLUTO/MeninosEuVi-backNodeJS
npm i prisma @prisma/client
npx prisma migrate dev --name init
npx prisma generate