# RASPBERRY PI 3 B+ SERVER

https://nts.strzibny.name/systemd-user-services/
sudo setcap 'CAP_NET_BIND_SERVICE+ep' /usr/bin/netcat

installed modules:
- flask

Endpoint: /

Endpoint: /costs/
Endpoint: /costs/statistic


Endpoint: costs/api/
Methods: GET, POST

Endpoint: costs/api/id/<id>
Methods: GET, DELETE, PUT

Endpoint: costs/api/getshops
Methods: GET

Endpoint: costs/api/statistic
Methods: GET