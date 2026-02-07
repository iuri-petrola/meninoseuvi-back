

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



# comando CURL:
curl --request POST \
  --url http://localhost:8080/api/media \
  --header 'Content-Type: multipart/form-data' \
  --form 'title=Historia 5' \
  --form audioMimeType=audio/mpeg \
  --form audioBase64=BASE64_AUDIO_AQUI \
  --form 'image=@/path/arquivo/img.jpg'


# Import cors #
npm i --save-dev @types/cors


# Adiçao do upload de imagem #  
npm i multer
npm i -D @types/multer


# Criação tabela admin_users:
cd $PATH_ABSOLUTO/MeninosEuVi-backNodeJS
npx prisma migrate dev --name admin
npm run prisma:seed


# Rodar migração para o @unique do name:
cd $PATH_ABSOLUTO/MeninosEuVi-backNodeJS
npx prisma migrate dev --name admin_login_by_name
npm run prisma:seed
