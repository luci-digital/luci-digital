#!/bin/bash

# Set variables
OS_ISO="/path/to/os.iso"
VENTOY_PARTITION="/dev/sdX1"

# Boot Ventoy
sudo ventoy -i $VENTOY_PARTITION || { echo "Ventoy setup failed. Exiting."; exit 1; }

# Install OS
sudo dd if=$OS_ISO of=$VENTOY_PARTITION bs=4M status=progress || { echo "OS installation failed. Exiting."; exit 1; }

# Automate dependencies
echo "Installing dependencies..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install necessary packages
sudo apt install -y python3 python3-pip build-essential nvidia-driver-515 cuda-toolkit-11-7

# Install Python libraries
pip3 install --upgrade pip
pip3 install torch torchvision tensorflow scikit-learn numpy pandas

# Check GPU availability
echo "Detecting GPUs..."
nvidia-smi || { echo "No NVIDIA GPU detected. Exiting."; exit 1; }

# GPU memory check
MEMORY=$(nvidia-smi --query-gpu=memory.total --format=csv,noheader,nounits | head -n 1)
echo "Detected GPU memory: ${MEMORY}MB"
if [ $MEMORY -lt 8000 ]; then
    echo "Insufficient GPU memory. Exiting."
    exit 1
fi

# Assign tasks based on GPU model
GPU=$(nvidia-smi --query-gpu=name --format=csv,noheader | head -n 1)
echo "Detected GPU: $GPU"

case $GPU in
  "NVIDIA GeForce GTX 1080 Ti")
    echo "Initializing tasks for 1080 Ti..."
    ;;
  "Tesla K80")
    echo "Initializing tasks for Tesla K80..."
    ;;
  "NVIDIA GeForce RTX 3070")
    echo "Initializing tasks for RTX 3070..."
    ;;
  *)
    echo "Unsupported GPU model. Proceeding with default configuration..."
    ;;
esac

# Logging
LOGFILE="/path/to/logfile.log"
exec > >(tee -i $LOGFILE) 2>&1

# Start AI workload
echo "Starting AI workload..."
# Add your AI startup script here
