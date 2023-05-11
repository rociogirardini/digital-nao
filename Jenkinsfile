pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        dir 'reto-3'
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('Test') {
      steps {
        dir 'reto-3'
        sh 'npm test'
      }
    }
    stage('Quality PEP8 Test') {
      steps {
        dir 'reto-3'
        sh 'pip install flake8'
        sh 'flake8 reto-3'
      }
    }
    stage('Deploy') {
      steps {
        dir 'reto-3'
        sh './deploy.sh'
      }
    }
    stage('Docker Build') {
      steps {
        dir 'reto-3'
        script {
          sh 'docker build -t digitalnao .'
        }
      }
    }
  }
}