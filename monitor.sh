#!/bin/bash
echo "=== LMS System Status ==="
echo "Date: $(date)"
echo ""

echo "=== Docker Containers ==="
docker-compose -f /opt/lms/docker-compose.production.yml ps
echo ""

echo "=== System Resources ==="
echo "Memory Usage:"
free -h
echo ""
echo "Disk Usage:"
df -h /opt/lms
echo ""

echo "=== Service Health ==="
echo "Backend Health:"
curl -s http://localhost:8080/actuator/health || echo "Backend not responding"
echo ""
echo "Client Health:"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 || echo "Client not responding"
echo ""
echo "Admin Health:"
curl -s -o /dev/null -w "%{http_code}" http://localhost:5173 || echo "Admin not responding"