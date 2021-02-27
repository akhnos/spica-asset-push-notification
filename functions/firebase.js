var admin = require("firebase-admin");
    
export default async function(action) {
    var serviceAccount = {
        type: "service_account",
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url:process.env.CLIENT_X509_CERT_URL
    };

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.DATABASE_URL
    });

    if (action.current.token) {
        var message = {
            notification: {
                title: action.current.title,
                body: action.current.body,
                image: action.current.image
            },
            token: action.current.token
        };

        admin
            .messaging()
            .send(message)
            .then(response => {
                console.log("Successfully sent message:", response);
            })
            .catch(error => {
                console.log("Error sending message:", error);
            });
    }

    if (action.current.topic) {
        var message = {
            notification: {
                title: action.current.title,
                body: action.current.body
            },
            topic: action.current.topic
        };

        admin
            .messaging()
            .send(message)
            .then(response => {
                console.log("Successfully sent message:", response);
            })
            .catch(error => {
                console.log("Error sending message:", error);
            });
    }
}

