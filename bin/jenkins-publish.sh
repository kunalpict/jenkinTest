#!/bin/bash
#
# Script used to publish the project in Jenkins
#
(
set -e

get_value() {
  sed -n -e "s/.*\"$1\".*\"\(.*\)\".*/\1/p" package.json
}

# Ensure we are in the workspace
cd "$WORKSPACE"

__DIR__="${BASH_SOURCE%/*}"

# shellcheck disable=SC1091
# shellcheck source=bin/setup-node.sh
source "$__DIR__/_setup-node.sh"

# Publish the pacakge if necessary
PACKAGE_NAME=$(get_value name)
PACKAGE_VERSION=$(get_value version)
REGISTRY_VERSION=$(npm show "$PACKAGE_NAME" version) || true

echo "Registry version: $REGISTRY_VERSION"
echo "Package version: $PACKAGE_VERSION"

if [ "$PACKAGE_VERSION" != "$REGISTRY_VERSION" ]
then
  echo "Publishing $PACKAGE_NAME v$PACKAGE_VERSION …"
  npm publish ./dist --loglevel warn
else
  echo "$PACKAGE_NAME v$PACKAGE_VERSION is already published."
fi
)
