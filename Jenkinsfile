pipeline {
    agent any

    tools {
        maven 'Maven 3.8'   // Name of Maven tool configured in Jenkins
        nodejs 'NodeJS 18'  // Optional, if frontend uses Node.js
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'git@github.com:baliramakrishna667/tuation_app.git'
            }
        }

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
