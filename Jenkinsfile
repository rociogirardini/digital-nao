pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        dir 'reto-3/site'
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('Quality Test') {
      steps {
        dir 'reto-3/site'
        sh 'npm install standard --save-dev'
      }
    }
    stage('Test') {
      steps {
        dir 'reto-3/site'
        sh 'npm test'
      }
    }
    stage('Deploy') {
      steps {
        dir 'reto-3/site'
        sh './deploy.sh'
      }
    }
    stage('Docker Build') {
      steps {
        dir 'reto-3/site'
        script {
          sh 'docker build -t digitalnao .'
        }
      }
    }
  }
}