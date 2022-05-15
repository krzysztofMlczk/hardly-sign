openssl req -new -x509 -newkey rsa:2048 -keyout Privkey.out -pubkey -out Pubkey.out -days 365 -nodes -sha256
openssl rsa -in Privkey.out -noout -text
openssl x509 -in Pubkey.crt -noout -text
