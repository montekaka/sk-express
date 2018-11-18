npm run build
git clone git@bitbucket.org:etse/ng-store-keeper-prod-dist.git distorig
rm -rf ./distorig/*
cp -R ./client/dist/* ./distorig/
cd ./distorig
git add -A && git commit -m "newest update"
git push origin
cd ../
rm -rf ./distorig
