# docker build e push image
   docker build -t iuripetrola/meninoseuvi-backnodejs:latest . --push

  
# Iniciar container App
   docker run -itd --name meninoseuvi-backnodejs -h meninoseuvi-backnodejs --net net_someu --restart unless-stopped  -p 8081:8080 --env DATABASE_URL="postgresql://user_nodejs_mev:pass_nodejs_mev@postgresql16:5432/db_nodejs_mev?schema=public"
   
   
   # --mount type=bind,source=/mnt/img/,target=/mnt/img/ iuripetrola/meninoseuvi-backnodejs:latest
