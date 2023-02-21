#!/bin/bash

cmd=$1
id=$2
param2=$3
tag=''

tag(){
    message=$1
    echo ======Add Tag$project======
    date=`date +%Y%m%d%H%M%S`
    tag=v$date
    # git pull
    # git add .
    # git commit -m "$message"
    # if [ $? -eq 0 ] ; then
        # git push
        git tag -a $tag -m $message
        git push --tags
    # else
    #     echo '提交失败'
    # fi
}

sync(){
    git subtree push --prefix=packages/biz-ux biz-ux master
    # git subtree push --prefix=packages/ats-ui ats-ui master
}

pull(){
    git subtree pull --prefix=packages/biz-ux biz-ux master
    # git subtree pull --prefix=packages/ats-ui ats-ui master
}

commit(){
    message=$1

    echo ======Commit $project======
    echo  git add .
    git add .
    echo  git commit -m "$message"
    git commit -m "$message"
    #  if [ $? -eq 0 ] ; then
        echo  git pull
        git pull
        echo  git push 
        git push
        echo  git status 
        git status
    # else
    #     echo '提交失败'
    #     exit  1
    # fi
}

lint(){
    git add .
    sh ./cmd/pre-commit.sh
}

if [ "$cmd"x = "tag"x ] ; then
    commit $param2
    tag $param2
elif [ "$cmd"x = "commit"x ] ; then
    commit $param2
elif [ "$cmd"x = "sync"x ] ; then
    sync $param2
elif [ "$cmd"x = "pull"x ] ; then
    pull $param2
elif [ "$cmd"x = "lint"x ] ; then
    lint
elif [ "$cmd"x = "test"x ] ; then
    echo  $param2 
    commit $param2
    tag $param2
    if [ $? -eq 0 ] ; then
        username=$(npm config get username)
        password=$(npm config get password)
        chrome=$(npm config get chrome)
        target='test'
        # echo $username
        # echo $password
        node './cmd/release.js' $id 'dev' $tag $param2'm' ${target} ${username} ${password} ${chrome}
    else
        echo '提交失败'
    fi
elif [ "$cmd"x = "release"x ] ; then
    echo  $param2 
    commit $param2
    tag $param2
    if [ $? -eq 0 ] ; then
        username=$(npm config get username)
        password=$(npm config get password)
        chrome=$(npm config get chrome)
        target='online'
        # echo $username
        # echo $password
        node './cmd/release.js' $id 'master' $tag ${param2}'m' ${target} ${username} ${password} ${chrome} 
    else
        echo '提交失败'
    fi
fi
