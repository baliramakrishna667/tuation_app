pipeline {
    agent any

    tools {
        maven 'Maven 3.8'   // Name of Maven tool configured in Jenkins
        nodejs 'NodeJS 18'  // Optional, if frontend uses Node.js
    }

    stages {
       stage('Build Backend') {
            steps {
                dir('backend') {
                    sh './mvnw clean package'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
    }
}
