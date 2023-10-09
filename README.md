# Page for ORT Obli-sec

This web-app needs a server to look up the info.
The IP is hardcoded because is a webapp made with Svelte

If needed to change the IP adress of the server the steps are:

```bash
git clone https://github.com/gferradas/obli-sec.git

cd obli-sec

npm i
```

After that the IP is in "./src/helpers/writables.js" in the const ip;
Later the only thing you have to do is build the app

```bash
npm run build
```

Now you have to manually move the contents of the ./dist folder into the ./docs folder
Remove the old files beforehand (index.html, assets folder)
DO NOT remove the image folder

In the index.html file inside the docs folder put a . in the path of the links for the css js and icon files, if this is not done the webpage will only show a white screen

Then you have to push the changes to github and wait for the page to update

```bash
git push
```
