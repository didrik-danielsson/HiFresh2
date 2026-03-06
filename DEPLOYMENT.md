# Deployment Guide for Raspberry Pi

## Prerequisites on Raspberry Pi
1. Install Docker and Docker Compose:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
sudo apt-get install -y docker-compose
```

2. Reboot or log out/in for docker group changes to take effect.

## Option 1: Deploy from Git Repository

### On Raspberry Pi:
```bash
# Clone the repository
git clone https://github.com/didrik-danielsson/HiFresh2.git
cd HiFresh2

# Build and run all services
docker-compose up -d --build
```

## Option 2: Transfer Docker Images from Your PC

### On Your PC (Windows):
```bash
# Build the images
cd C:\Users\didri\IdeaProjects\HiFresh2
docker-compose build

# Save images to tar files
docker save -o hifresh-backend.tar hifresh2-backend
docker save -o hifresh-frontend.tar hifresh2-frontend
docker save -o postgres.tar postgres:16-alpine

# Transfer to Raspberry Pi (replace <pi-ip> with your Pi's IP)
scp hifresh-backend.tar pi@<pi-ip>:~/
scp hifresh-frontend.tar pi@<pi-ip>:~/
scp postgres.tar pi@<pi-ip>:~/
scp docker-compose.yml pi@<pi-ip>:~/
```

### On Raspberry Pi:
```bash
# Load the images
docker load -i hifresh-backend.tar
docker load -i hifresh-frontend.tar
docker load -i postgres.tar

# Start the services
docker-compose up -d
```

## Important Configuration Changes

### Before deploying, update frontend environment variables:

1. Edit `Frontend/hifresh-web/.env`:
```env
VITE_RECIPES_API_BASE_URL=http://<raspberry-pi-ip>:8080/api/recipes
VITE_INGRIEDIENT_API_BASE_URL=http://<raspberry-pi-ip>:8080/api/ingredients
VITE_USER_API_BASE_URL=http://<raspberry-pi-ip>:8080/api/users
```

2. Update `Backend/server/src/main/java/org/example/server/WebConfig.java`:
```java
.allowedOrigins("http://<raspberry-pi-ip>", "http://localhost:5173")
```

## Accessing the Application

- **Frontend**: http://<raspberry-pi-ip>
- **Backend API**: http://<raspberry-pi-ip>:8080
- **Database**: localhost:5432 (only accessible within Docker network)

## Useful Commands

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: deletes database data)
docker-compose down -v

# Restart a specific service
docker-compose restart backend

# Rebuild and restart
docker-compose up -d --build
```

## Troubleshooting

### Backend can't connect to database:
```bash
# Check if postgres is healthy
docker-compose ps
docker-compose logs postgres
```

### Frontend can't reach backend:
- Verify CORS settings in WebConfig.java include your Pi's IP
- Check .env file has correct backend URL

### Out of space on Raspberry Pi:
```bash
# Clean up unused Docker resources
docker system prune -a
```

## Architecture Notes

- Java 23 images may be large for Raspberry Pi
- Consider using Java 17 or 21 for better performance on ARM
- PostgreSQL data persists in Docker volume `postgres_data`
- Frontend is served via Nginx on port 80
- Backend runs on port 8080
