for i in {1..6}; do curl -i -s http://localhost:8080/nginx | grep -E "X-Server-Name|^{"; echo; done
