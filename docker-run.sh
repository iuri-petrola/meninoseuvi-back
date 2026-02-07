# docker build e push image
   docker build -t iuripetrola/meninoseuvi-backnodejs:latest . --push

  
# Iniciar container App
   docker run -itd --name meninoseuvi-backnodejs -h meninoseuvi-backnodejs --net net_someu --restart unless-stopped  -p 8081:8080 --env DATABASE_URL="postgresql://user_nodejs_mev:pass_nodejs_mev@postgresql16:5432/db_nodejs_mev?schema=public" --env UPLOADS_DIR="/mnt/files-mev" --env UPLOADS_PUBLIC_PATH="/files" --env JWT_SECRET=fbc878419638a610508320c876597c83 --mount type=bind,source=/mnt/files-mev,target=/mnt/files-mev iuripetrola/meninoseuvi-backnodejs:latest
