# Page for ORT Obli-sec

This web application requires a server to retrieve information. The IP address is hardcoded due to the web app being developed using Svelte.

If you need to change the server's IP address, follow these steps:

```bash
git clone https://github.com/gferradas/obli-sec.git

cd obli-sec

npm i
```

Once you've completed these steps, you can find the IP address in the "./src/helpers/writables.js" file under the "client" variable, which contains an object called 'baseurl.' Then, all you need to do is build the app:

```bash
npm run build
```

Next, manually move the contents of the "./dist" folder into the "./docs" folder. Make sure to remove the old files (index.html and the assets folder), but do not delete the image folder.

In the "index.html" file inside the "docs" folder, add a period (.) to the path of the links for the CSS, JS, and icon files. Failing to do this will result in the webpage displaying only a white screen.

Finally, push the changes to GitHub and wait for the page to update:

```bash
git add docs/
git commit -m "updated ip for page"
git push
```
