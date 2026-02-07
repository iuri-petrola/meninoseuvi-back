

### Inicial  ###
cd $PATH_ABSOLUTO/MeninosEuVi-backNodeJS
npm i express cors
npm i -D typescript ts-node-dev @types/node @types/express


### Criação da integração com banco de dados ###
cd $PATH_ABSOLUTO/MeninosEuVi-backNodeJS
npm i prisma @prisma/client
npx prisma migrate dev --name init
npx prisma generate


### carga no banco de dados ###
cd $PATH_ABSOLUTO/MeninosEuVi-backNodeJS
npm i
npx prisma migrate dev --name carga
npm run prisma:seed



# Body esperado:
{
  "title": "Historia 1",
  "imageUrl": "https://...",
  "audioBase64": "BASE64_AUDIO_AQUI",
  "audioMimeType": "audio/mpeg"
}