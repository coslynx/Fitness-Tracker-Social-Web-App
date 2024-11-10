#!/bin/bash
set -euo pipefail

# Load environment variables from .env
source .env

# Declare important variables
PROJECT_ROOT=$(dirname "$0")
LOG_FILE="$PROJECT_ROOT/logs/startup.log"
PID_FILE="$PROJECT_ROOT/logs/startup.pid"
SERVICE_TIMEOUT=60

# Define logging functions
log_info() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") INFO: $*" >> "$LOG_FILE"
}

log_error() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") ERROR: $*" >&2
}

# Define cleanup function
cleanup() {
  log_info "Cleaning up..."
  if [ -f "$PID_FILE" ]; then
    kill -9 $(cat "$PID_FILE")
    rm "$PID_FILE"
  fi
}

# Handle signals for graceful shutdown
trap cleanup EXIT ERR

# Start database service
start_database() {
  log_info "Starting MongoDB..."
  mongod --config "/etc/mongod.conf"
  store_pid "mongodb"
}

# Start backend service
start_backend() {
  log_info "Starting backend server..."
  node index.js
  store_pid "backend"
}

# Store process ID
store_pid() {
  local service_name="$1"
  if [ -f "$PID_FILE" ]; then
    echo "$(pgrep "$service_name")" >> "$PID_FILE"
  fi
}

# Main execution flow
log_info "Starting Fitness Tracker MVP..."
start_database
start_backend

log_info "Fitness Tracker MVP started successfully!"