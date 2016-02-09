# Jenkins Scripts

These are various scripts that can be used in project Jenkins jobs.

* `jenkins-ci.sh`: Installs the appropriate node environment into the Jenkins
    `$WORKSPACE` and runs `gulp build`.
* `jenkins-publish.sh`: Determines if a package should be published to
    Artifactory or not, based on comparison between the latest vesion number in
    the registry and what's in `pacakge.json`.
* `_setup-node.sh`: Script included by other scripts to set up the node
    environment.

The easiest way to install these scripts into your project is by issuing the following command:

```
install-jenkins-scripts": "git archive --remote=git@bitbucket.org:sni/jenkins-scripts.git master --prefix=bin/ | tar xf -
```

This will install the scripts into the `/bin` directory of your project. It
won't affect any other scripts you may already have there, but will replace
previous versions of scripts copied from this repo.

You can also add the command as a npm script for convenience, just add to your `package.json`:

```json
{
  …
  "scripts": {
    "install-jenkins-scripts": "git archive --remote=git@bitbucket.org:sni/jenkins-scripts.git master --prefix=bin/ | tar xf -"
  },
  …
}
```

Then you can simply run `npm run install-jenkins-scripts`.
