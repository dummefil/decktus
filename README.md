# Decktus

## Android build:
### install: 
* `export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home`
* `export NDK_HOME=~/Library/Android/sdk/ndk/27.0.11902837`
* `yarn tauri android init`
* `yarn tauri android build`
### signing: 
* `keytool -genkey -v -keystore release-keystore.jks -alias alias_name -keyalg RSA -keysize 2048 -validity 10000`
* `~/Library/Android/sdk/build-tools/34.0.0/apksigner sign --ks ~/Playground/decktus/release-keystore.jks ~/Playground/decktus/src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk`


## iOS:
* xcode tools
* `brew install cocoapods`
* `yarn tauri ios init`
* `yarn tauri ios build`

<p style="color: white"> xcode signing cert</p>
### iOS sim
