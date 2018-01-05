VERSION=$1
NAME=microbank-manager

echo Deploying version $VERSION

./createNamespace.sh microbank-manager
helm delete --purge $NAME
helm install -n $NAME ../helm/microbank-manager/$VERSION