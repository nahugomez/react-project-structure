# Keycloak Test Environment

This folder contains the necessary configuration to run a local Keycloak instance with pre-configured settings and custom theme.

## Prerequisites

- Docker
- Docker Compose

## Directory Structure

```
infra/keycloak/
├── docker-compose.yml
├── import/
│   └── realm-export.json    # Initial realm configuration
└── themes/
    └── custom/             # Custom theme files
        └── login/
            ├── theme.properties
            └── resources/
                └── css/
                    └── styles.css
```

## Getting Started

1. Start the Keycloak server:

   ```bash
   docker-compose up -d
   ```

2. The server will automatically:

   - Import the realm configuration
   - Set up the testing_app client
   - Create a test user
   - Apply the custom theme

3. Default credentials:

   - Admin Console:
     - URL: http://localhost:8080/auth/admin
     - Username: admin
     - Password: admin
   - Test User:
     - Username: testuser
     - Password: testuser123

4. Verify the setup by accessing:
   - Admin Console: http://localhost:8080/auth/admin
   - Application URL: http://localhost:5173

## Custom Theme

The custom theme is automatically mounted and can be selected in the realm settings:

1. Go to Realm Settings
2. Open the Themes tab
3. Select "custom" from the Login Theme dropdown

## Stopping the Environment

To stop the Keycloak server:

```bash
docker-compose down
```

To stop and remove all data:

```bash
docker-compose down -v
```
