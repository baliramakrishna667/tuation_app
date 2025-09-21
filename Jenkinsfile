pipeline {
    agent any

    tools {
        maven 'Maven 3.8'       // Configured in Jenkins
        nodejs 'NodeJS 18'      // Configured in Jenkins
        
    }

    environment {
        SONARQUBE_SERVER = 'SonarQube' // Must match Jenkins global config

        // Backend project
        SONAR_PROJECT_KEY_BACKEND = 'tuation_app'
        SONAR_LOGIN_BACKEND = credentials('sonar-token')

        // Frontend project
        SONAR_PROJECT_KEY_FRONTEND = 'tuation_app_frontend'
        SONAR_LOGIN_FRONTEND = credentials('sonar-token_frontend')
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'git@github.com:baliramakrishna667/tuation_app.git'
            }
        }

        /* ==== BACKEND ==== */
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Backend Unit Test') {
            steps {
                dir('backend') {
                    sh 'mvn test'
                }
            }
        }

        stage('Backend Integration Test') {
            steps {
                dir('backend') {
                    sh 'mvn verify -DskipUnitTests'
                }
            }
        }

        stage('Backend Checkstyle') {
            steps {
                dir('backend') {
                    sh 'mvn checkstyle:checkstyle'
                }
            }
            post {
                success {
                    echo "Generated backend checkstyle report"
                }
            }
        }

        stage('Backend Code Analysis with SonarQube') {
            steps {
                dir('backend') {
                    withSonarQubeEnv('SonarQube') {
                        sh """
                        mvn sonar:sonar \
                            -Dsonar.projectKey=${SONAR_PROJECT_KEY_BACKEND} \
                            -Dsonar.login=${SONAR_LOGIN_BACKEND}
                        """
                    }
                }
            }
        }

        /* ==== FRONTEND ==== */
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Frontend Unit Test') {
            steps {
                dir('frontend') {
                    sh 'npm test -- --watchAll=false'
                }
            }
        }

        stage('Frontend Integration Test') {
            steps {
                dir('frontend') {
                    sh 'npm run e2e'
                }
            }
        }

        stage('Frontend Code Analysis with SonarQube') {
            steps {
                dir('frontend') {
                    withSonarQubeEnv('SonarQube') {
                        sh """
                        sonar-scanner \
                            -Dsonar.projectKey=${SONAR_PROJECT_KEY_FRONTEND} \
                            -Dsonar.sources=. \
                            -Dsonar.login=${SONAR_LOGIN_FRONTEND}
                        """
                    }
                }
            }
        }
    }
}
