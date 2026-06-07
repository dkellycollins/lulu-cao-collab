#!/bin/bash
set -e

echo "Ensuring S3 bucket exists..."

if ! awslocal s3 ls | grep -q blog-files; then
  awslocal s3 mb s3://blog-files
fi