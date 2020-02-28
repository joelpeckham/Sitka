# File Structure

### docs
The docs folder contain the files needed to create the documentation webpage. These files can be updated by running ```npm run docs``` in your command line.

+ __index.html__

   This file is the main HTML file for the documentation. This is what Github Pages is looking at to host the documentation. This is also the file you would need to open in your browser to view the docs locally.
___
### manual
This folder holds all the markdown files that create this very manual!

### src
This folder is where all the code lives. I said ALL of it! Let's keep things neat, yes?

+ __html__ | A subfolder for HTML files.
  + __index.html__

   This is the main html file of our app! It's a single page app... so this is the only html file. (At least for now).

+ __css__ | A subfolder for css files.
+ __js__ | A subfolder for javascript files.
  + __main.js__

   This file is the entry point of the application. Here we import Electron and manage all our windows.

+ __exercises__ | A subfolder for exercise js functions.
