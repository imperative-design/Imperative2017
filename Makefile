cnf ?= .env
include $(cnf)
export $(shell sed 's/=.*//' $(cnf))

DOCKERFILE_PATH =./config/$(APP_NAME)/Dockerfile .

# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

VERSION = $(ID_VERSION)

# DOCKER TASKS
# Build the container
#docker build -t intengoworkspace/pairwise:1.0 -f ./apps/pairwise/dev/Dockerfile .
#docker build -t intengoworkspace/intengoadmin:1.0 -f ./apps/intengoadmin/config/prod/Dockerfile .
#docker build -t 339122606568.dkr.ecr.us-east-2.amazonaws.com/intengoadmin:1.0 -f ./apps/intengoadmin/config/prod/Dockerfile .
build: ## Build the container
	@echo building $(APP_NAME) version $(VERSION)
	docker build -t imperative/$(APP_NAME):$(VERSION) -f $(DOCKERFILE_PATH)
