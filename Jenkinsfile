pipeline {
    agent any // You can specify the type of agent here, e.g., 'agent { docker { image "node:latest" } }' to use a Docker container with Node.js installed

    environment {
        CI = 'false'
    }

    stages {
        stage("Build") {
            steps {
                // Install dependencies
                bat 'npm i --legacy-peer-deps'
                bat 'npm run build'
                bat 'xcopy /h /i /c /k /e /r /y E:\JenkinsHome\workspace\bpa-internal-client\build E:\JenkinsHome\workspace\bpa-internal-api\public'
            }
        }
    }
}
