$env:GIT_REDIRECT_STDERR = '2>&1'
$version = "0.0.13"
$rootDir = "C:\Dev\Github"
cls
$branch = "rel-" + $version
$commit = "build " + $version


cd $rootDir
cd test-app-core\frontend

git pull origin
git checkout -b $branch
git push origin $branch

npm version $version --allow-same-version
npm install
npm run build-lib
npm run build
npm publish

git tag -a $version -m $branch
git commit -a -m $commit
git push origin $branch
git push origin $version
gh pr create -t $commit -b $branch
git checkout master
git branch -d $branch





## test-app-config
cd $rootDir
cd test-app-config

git pull origin
git checkout -b $branch
git push origin $branch

npm version $version --allow-same-version
npm install
npm install test-app-core@$version
#npm run build-lib
npm run build
npm publish

git tag -a $version -m $branch
git commit -a -m $commit
git push origin $branch
git push origin $version
gh pr create -t $commit -b $branch
git checkout master
git branch -d $branch



## test-app-admin
cd $rootDir
cd test-app-admin

git pull origin
git checkout -b $branch
git push origin $branch

npm version $version --allow-same-version
npm install
npm install test-app-core@$version
npm install test-app-config@$version
#npm run build-lib
npm run build
npm publish

git tag -a $version -m $branch
git commit -a -m $commit
git push origin $branch
git push origin $version
gh pr create -t $commit -b $branch
git checkout master
git branch -d $branch



cd $rootDir