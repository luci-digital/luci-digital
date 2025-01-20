#!/bin/bash

# Variables (you can customize these)
PROXMOX_USER="root"
PROXMOX_REALM="pam"
API_TOKEN_NAME="LuciAPIToken"
API_USER_DESC="API token for Luci Digital"
PROXMOX_API_ROLE="PVEAdmin"  # Set desired API role (PVEAdmin has full permissions)
PROXMOX_API_TOKEN_FILE="/root/proxmox_api_token.txt"

# Check for root privileges
if [[ $EUID -ne 0 ]]; then
  echo "This script must be run as root." 
  exit 1
fi

# Install necessary dependencies
echo "Installing dependencies..."
apt-get update
apt-get install -y curl jq

# Enable Proxmox API (check if API is accessible)
echo "Checking Proxmox API availability..."
API_STATUS=$(curl -k -s -o /dev/null -w "%{http_code}" https://192.168.1.20:8006/api2/json)
if [[ "$API_STATUS" != "200" ]]; then
    echo "Error: Proxmox API not accessible. Ensure Proxmox VE is running and API access is enabled."
    exit 1
fi

echo "Proxmox API is accessible."

# Create API Token (if not already created)
echo "Creating API Token for user: $PROXMOX_USER@$PROXMOX_REALM"
pveum user modify $PROXMOX_USER@$PROXMOX_REALM -comment "$API_USER_DESC"

# Check if the token already exists
EXISTING_TOKEN=$(pveum token list $PROXMOX_USER@$PROXMOX_REALM | grep $API_TOKEN_NAME)
if [[ -z "$EXISTING_TOKEN" ]]; then
    # Generate new API token
    echo "Generating new API Token..."
    pveum user token add $PROXMOX_USER@$PROXMOX_REALM $API_TOKEN_NAME --privsep 1 --comment "$API_USER_DESC" --role $PROXMOX_API_ROLE
    
    # Save token to a file
    echo "Saving API Token to $PROXMOX_API_TOKEN_FILE"
    API_TOKEN="PVEAPIToken=$PROXMOX_USER@$PROXMOX_REALM!$API_TOKEN_NAME=$(pveum user token create $PROXMOX_USER@$PROXMOX_REALM $API_TOKEN_NAME)"
    echo $API_TOKEN > $PROXMOX_API_TOKEN_FILE
    chmod 600 $PROXMOX_API_TOKEN_FILE
    echo "API Token generated and saved."
else
    echo "API Token already exists. Skipping generation."
fi

# Test API access with the generated token
echo "Testing API access..."
curl -k -H "Authorization: $(cat $PROXMOX_API_TOKEN_FILE)" https://localhost:8006/api2/json/nodes

echo "Proxmox API setup is complete."