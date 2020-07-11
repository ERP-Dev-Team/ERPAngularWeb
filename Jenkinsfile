def buildNumber = BUILD_NUMBER as int; if (buildNumber > 1) milestone(buildNumber - 1); milestone(buildNumber)
pipeline {
  agent any
  stages {
    stage('git clone') {
      steps {
        git(url: 'https://github.com/ERP-Dev-Team/ERPAngularWeb.git', branch: 'master')
      }
    }

    stage('intall dependencies') {
      steps {
        bat 'npm install'
      }
    }

    stage('deploy') {
      steps {
        bat 'npm run host'
      }
    }

  }
}