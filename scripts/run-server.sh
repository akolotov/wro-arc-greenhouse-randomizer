#!/usr/bin/env bash

ROOT='.'

if [[ ! -e "${ROOT}/node_modules" ]]; then
    cd ${ROOT} && npm install
    cd scripts
fi

if [[ ! -e "${ROOT}/generator/bin/generator" ]]; then
    echo 'The generator is not built; Proceed to building the generator'

    cd ${ROOT}/scripts
    if bash "${ROOT}/scripts/build-generator.sh"; then
        :
    else
        echo 'Generator build failed'
        exit -1
    fi
    cd ${ROOT}
fi

if [[ ! -e "${ROOT}/src.transpiled" ]]; then
    echo 'The code is not transpiled and packed; Proceed to transpiling the server and packing frontend'
    cd ${ROOT}
    if npm run build; then
        :
    else
        echo 'Server build failed'
        exit -1
    fi
fi

if [[ ! -e "${ROOT}/public/bundle.js" ]]; then
    cd ${ROOT}
    npm run pack
    cd scripts
fi

echo 'Running the server...'
node "${ROOT}/src.transpiled/server/app.js"