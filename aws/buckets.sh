#!/bin/bash
set -e

echo "Ensuring S3 bucket exists..."

if ! awslocal s3 ls | grep -q profile-test2; then
  awslocal s3 mb s3://profile-test2
fi
