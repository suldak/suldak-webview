pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                bat 'Hello!! Suldak'
            }
        }
    }
    post {
        always {
            echo 'Cleaning up...'
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}