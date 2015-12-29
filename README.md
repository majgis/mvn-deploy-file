# mvn-deploy-file
A Node.js wrapper for mvn [deploy:deploy-file][0] for deploying files to 
a Nexus repository using information in a config file or package.json.

## Install

    npm i mvn-deploy-file -g
     
## Use at command line

    # With a separate config file
    mvn-deploy-file snapshot *.rpm --config=config.json
    
    # With config in package.json
    mvn-deploy-file snapshot *.rpm
    
    # With options
    mvn-deploy-file snapshot *.rpm \
      --groupId="com.myorg.mygroup" \
      --url="http://nexus.myorg.com/content" \
      --repositoryId="snapshots"

## Use programmatically

    var mvnDeployFile = require('mvn-deploy-file')
    var minimist = require('minimist')
    var options = minimist(process.argv.slice(2))
    var args = options._
    delete options._
    
    mvnDeployFile(args, options, function onMvnDeployFile (err, url) {
      if (err) {
        throw err
      }
      console.log('Uploaded: ', url)
    })
    
## Example config.json

				{
						"snapshot": {
								"groupId": "com.myorg.mygroup",
								"url": "http://nexus.myorg.com/content/snapshots",
								"repositoryId": "snapshots"
						},
						"release": {
								"groupId": "com.myorg.mygroup",
								"url": "http://nexus.myorg.com/content/snapshots",
								"repositoryId": "snapshots"
						}
				}
				
## Example package.json

If you are using config.json or command-line options:

				{
						"name": "mvn-deploy-file",
						"version": "1.0.0",
				}

If you are storing options in package.json

				{
						"name": "mvn-deploy-file",
						"version": "1.0.0",
						"mvn-deploy-file": {
								"snapshot": {
										"groupId": "com.myorg.mygroup",
										"url": "http://nexus.myorg.com/content/snapshots",
										"repositoryId": "snapshots"
								},
								"release": {
										"groupId": "com.myorg.mygroup",
										"url": "http://nexus.myorg.com/content/snapshots",
										"repositoryId": "snapshots"
								}
						}
				}

## The mvn command produced

All the examples above result in this command being executed:

    mvn -e deploy:deploy-file \
        -Durl="http://nexus.myorg.com/content/snapshots" \
        -DrepositoryId="snapshots" \
        -DgroupId="com.myorg.mygroup" \
        -DartifactId="mvn-deploy-file" \
        -Dversion="1.0.0-SNAPSHOT" \
        -Dpackaging=rpm \
        -Dfile="something.rpm"

## Command line arguments

mvn-deploy-file [config-key [glob-pattern]]

   1. config-key - Maps to key in config file. If the word snapshot is anywhere 
   in this key, `-SNAPSHOT` will be appended to the version
   2. glob-pattern - Only a single file can match glob pattern or an error is 
   thrown

## Command line options

All command line options accepted by mvn -e deploy:deploy-file map to equivalent
options for this tool except `-D` is replaced with `--`

For example `-Dpackaging` === `--packaging`

There is also the additional option, unique to this tool, of `--config` for 
specifying a configuration separate from package.json

For the `--file` option, a glob pattern can be used.

## Configuration options

The root object has config-keys that map to the first command line argument.  
Each of the options under a config-key are the same as command line options 
except that `config` is not valid.

The `name` and `version` in a package.json map to `artifactId` and `version` 
respectively.

## Option Hierarchy

Each of the following overwrites the options beneath it:

  1. command-line options 
  2. config.json
  3. package.json mvn-deploy-file section 
  4. package.json

## Unique Behavior

* The following values are pulled from a normal package.json:

  pkg.name ==> -DartifactId
  pkg.version ==> -Dversion
  
* In both the config.json and mvn-deploy-file section of package.json options
are pulled directly based on the first command line argument.  

* If 'snapshot' is found anywhere in the first command line argument, the 
version has "-SNAPSHOT" appended to it, otherwise these config keys may be 
anything and as many as you wish.


## References

* [mvn deploy:deploy-file][0]

[0]: https://maven.apache.org/plugins/maven-deploy-plugin/deploy-file-mojo.html
