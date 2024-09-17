# App Dev with Google Cloud

- Overview of GCP Services including Firebase
  - GCP Projects
- Firebase
  - Projects
    - Add new project
  - Hosting
    - https://firebase.google.com/docs/hosting/quickstart
    - npm install -g firebase-tools
    - firebase init hosting --project crg-250916-1
    - npm run build
    - firebase deploy --only hosting
  - Firestore
    - Add new app
    - add config
    - update 
- Cloud Run
  - gcloud run deploy
  
  ```
  "rewrites": [

    {
      "source": "/api/**",
      "run": {
        "serviceId": "python-app",
        "region": "us-east5"
      }
    }
  ]
```