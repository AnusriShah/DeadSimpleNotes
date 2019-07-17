let fileReader = require('./readFile');
let fileName = "notes.txt";

let fs = require('fs');
// dot slash tells it to look in the same directory
//fileReader.getFileData("notes.txt"); 
let fileArray = fileReader.getFileData(fileName); //puts file into array
//parse each element for tag at beginning of line
//split at space between tag and rest of text

function parseFile(fileArray)
{
    let newFile = getStartOfFile(fileName);
    console.log(fileArray.length);
    for (let i = 0; i < fileArray.length; i ++) 
    {
        let lineElement = fileArray[i];
        let tag = lineElement.charAt(0);
        let line = lineElement.substring(1);
        console.log(lineElement);
        if(tag == "#") //HEADING
        {
            //append corresponding HTML code with line text
            let headingHTML = '<center><h1 class="display-3">' + line + '</h1></center>';
            newFile += headingHTML + "\n";
        }
        else if(tag == "!") //BOLD
        {
            let boldHTML = '<b>' + line + '</b>';
            newFile += boldHTML + "\n";
        }
        else if(tag == "/") //ITALICS
        {
            let italicsHTML = '<br><i>' + line + '</i>';
            newFile += italicsHTML + "\n";
        }
        //TODO: add support for multilevel bulleted lists
        else if(tag == "*") //BULLET FIELD
        {
            let bulletedHTML = "<ul>\n";
            //keep iterating until u hit * again
            let inList = true;
            let listCounter = 1; //start at line after beginning of list indicator
            while(inList)
            {
                /*
                    a bulleted list entry would look like this
                    *
                    stuff
                    to
                    be
                    bulleted
                    *
                */
                let listElement = fileArray[listCounter + i];
                if(listElement.charAt(0) != '*')
                {
                    bulletedHTML += "<li>" + listElement + "</li>\n";
                    //continue adding to list
                }
                else
                {
                    inList = false;
                    //add ending tags for bulleted stuff
                }
                listCounter++; //QUESTION: DO WE NEED TO INCREMENT HERE?
            }
            i += listCounter;
            bulletedHTML += "</ul>";
            newFile += bulletedHTML + "\n";
            i--;
        }
        //TODO: 
        // else if(tag == ";") //CODE - indent and make different font
        // {
        //     let codeHTML = "<body>\n";
        //     let inCode = true;
        //     let codeLineCounter = 1;
        //     while(inCode)
        //     {
        //         /*
        //             a code entry would look like this
        //             :
        //             if(x = 5)
        //             {
        //                 //do this
        //             }
        //             :
        //         */
        //         let codeElement = fileArray[listCounter + i];
        //         if(codeElement.charAt()0 != ';')
        //         {
        //             //continue adding to code
        //             codeHTML += '<p style="font-family:courier;">\t'+ codeElement + '</p>\n'; 
        //             //tab initially once to differentiate code, user determines how to indent code after that
        //         }
        //         else
        //         {
        //             inCode = false;
        //         }
        //         listCounter++; //QUESTION: DO WE NEED TO INCREMENT HERE?
        //     }
        //     i += listCounter;
        //     codeHTML += "</body>";
        //     newFile += codeHTML + "\n";
        // }
        else if (tag == "-" && line.length == 0) {
            console.log("THIS IS AN HR");
            newFile += '<div class="container"><hr></div>';
        }
        else //REGULAR TEXT
        {
            let textHTML = '<p>'+ lineElement +'</p>';
            newFile += textHTML + "\n";
        }
    }
    newFile += getEndOfFile();
    return newFile;
}

function getStartOfFile(pageTitle)
{
    return `<html>
                <head>
                    <title>Page Title</title>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                </head>
                <body>
                <div class="container"`;
}

function getEndOfFile() {
    return `    </container>
                </body>
            </html>`
}
console.log((fileArray));
console.log(parseFile(fileArray));
fs.writeFileSync("test.html", parseFile(fileArray));