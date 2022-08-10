import React, { useRef } from 'react';

import EmailEditor from 'react-email-editor';

import Navbar from "./NavBar/Navbar";



const SendMailEditor = (props) => {
    const emailEditorRef = useRef(null);
   

     const exportHtml = async () => {
        const email  = emailEditorRef.current.editor.exportHtml((data) => {
            // const { design } = data;
            // console.log(JSON.stringify(design))

            sendMail(data)
         });
         console.log(email)
    };
    

        const sendMail = async (emailmsg) =>{

        try {

            // console.log(typeof emailmsg)
            const req = await fetch('/sendmail', {
                method : "POST",
                headers: {
                    "Content-Type" : "application/json" 
                },
                body : JSON.stringify(emailmsg)
            })
            console.log(req )
            window.alert("Mesazhet u derguan !")

        } catch (error) {
            console.log(error)
        }
    }


    const onLoad = () => {
        // you can load your template here;
        const templateJson = {
            "counters":{
               "u_column":1,
               "u_row":1,
               "u_content_image":2,
               "u_content_heading":1,
               "u_content_text":1,
               "u_content_button":1
            },
            
            "body":{
               "rows":[
                  {
                     "cells":[
                        1
                     ],
                     "columns":[
                        {
                           "contents":[
                               
                            
                            {
                                "type":"heading",
                                "values":{
                                   "containerPadding":"10px",
                                   "headingType":"h1",
                                   "fontFamily":{
                                      "label":"Arial",
                                      "value":"arial,helvetica,sans-serif"
                                   },
                                   "fontSize":"22px",
                                   "textAlign":"center",
                                   "lineHeight":"140%",
                                   "linkStyle":{
                                      "inherit":true,
                                      "linkColor":"#0000ee",
                                      "linkHoverColor":"#0000ee",
                                      "linkUnderline":true,
                                      "linkHoverUnderline":true
                                   },
                                   "_meta":{
                                      "htmlID":"u_content_heading_1",
                                      "htmlClassNames":"u_content_heading"
                                   },
                                   "selectable":true,
                                   "draggable":true,
                                   "duplicatable":true,
                                   "deletable":true,
                                   "hideable":true,
                                   "text":"BACK2SCHOOL"
                                }
                             },
                              {
                                 "type":"image",
                                 "values":{
                                    "containerPadding":"10px",
                                    "src":{
                                       "url":"https://americancomputers.al/wp-content/uploads/2021/05/ALIENWARE-1.jpg",
                                       "width":474,
                                       "height":447
                                    },
                                    "textAlign":"center",
                                    "altText":"Image",
                                    "action":{
                                       "name":"web",
                                       "values":{
                                          "href":"",
                                          "target":"_blank"
                                       }
                                    },
                                    "_meta":{
                                       "htmlID":"u_content_image_2",
                                       "htmlClassNames":"u_content_image"
                                    },
                                    "selectable":true,
                                    "draggable":true,
                                    "duplicatable":true,
                                    "deletable":true,
                                    "hideable":true
                                 }
                              },
                              {
                                 "type":"heading",
                                 "values":{
                                    "containerPadding":"10px",
                                    "headingType":"h1",
                                    "fontFamily":{
                                       "label":"Arial",
                                       "value":"arial,helvetica,sans-serif"
                                    },
                                    "fontSize":"22px",
                                    "textAlign":"center",
                                    "lineHeight":"140%",
                                    "linkStyle":{
                                       "inherit":true,
                                       "linkColor":"#0000ee",
                                       "linkHoverColor":"#0000ee",
                                       "linkUnderline":true,
                                       "linkHoverUnderline":true
                                    },
                                    "_meta":{
                                       "htmlID":"u_content_heading_1",
                                       "htmlClassNames":"u_content_heading"
                                    },
                                    "selectable":true,
                                    "draggable":true,
                                    "duplicatable":true,
                                    "deletable":true,
                                    "hideable":true,
                                    "text":"Laptopi lenovo ALIENWARE M17 R2 me 20% ulje"
                                 }
                              },
                              {
                                 "type":"text",
                                 "values":{
                                    "containerPadding":"10px",
                                    "textAlign":"center",
                                    "lineHeight":"140%",
                                    "linkStyle":{
                                       "inherit":true,
                                       "linkColor":"#0000ee",
                                       "linkHoverColor":"#0000ee",
                                       "linkUnderline":true,
                                       "linkHoverUnderline":true
                                    },
                                    "_meta":{
                                       "htmlID":"u_content_text_1",
                                       "htmlClassNames":"u_content_text"
                                    },
                                    "selectable":true,
                                    "draggable":true,
                                    "duplicatable":true,
                                    "deletable":true,
                                    "hideable":true,
                                    "text":"<p style=\"font-size: 14px; line-height: 140%;\">Ju sjellim laptopat me te mire ne treg me cmime konkuruese.</p>"
                                 }
                              },
                              {
                                 "type":"button",
                                 "values":{
                                    "containerPadding":"10px",
                                    "href":{
                                       "name":"web",
                                       "attrs":{
                                          "href":"{{href}}",
                                          "target":"{{target}}"
                                       },
                                       "values":{
                                          "href":"https://americancomputers.al/shop/alienware-m17-r2/",
                                          "target":"_blank"
                                       }
                                    },
                                    "buttonColors":{
                                       "color":"#FFFFFF",
                                       "backgroundColor":"#af5b21",
                                       "hoverColor":"#FFFFFF",
                                       "hoverBackgroundColor":"#3AAEE0"
                                    },
                                    "size":{
                                       "autoWidth":true,
                                       "width":"100%"
                                    },
                                    "textAlign":"center",
                                    "lineHeight":"120%",
                                    "padding":"10px 20px",
                                    "border":{
                                       
                                    },
                                    "borderRadius":"4px",
                                    "_meta":{
                                       "htmlID":"u_content_button_1",
                                       "htmlClassNames":"u_content_button"
                                    },
                                    "selectable":true,
                                    "draggable":true,
                                    "duplicatable":true,
                                    "deletable":true,
                                    "hideable":true,
                                    "text":"<span style=\"font-size: 14px; line-height: 16.8px;\">KLIKO KETU PER ME SHUME</span>",
                                    "calculatedWidth":234,
                                    "calculatedHeight":37
                                 }
                              }
                           ],
                           "values":{
                              "backgroundColor":"",
                              "padding":"0px",
                              "border":{
                                 
                              },
                              "_meta":{
                                 "htmlID":"u_column_1",
                                 "htmlClassNames":"u_column"
                              }
                           }
                        }
                     ],
                     "values":{
                        "displayCondition":null,
                        "columns":false,
                        "backgroundColor":"",
                        "columnsBackgroundColor":"",
                        "backgroundImage":{
                           "url":"",
                           "fullWidth":true,
                           "repeat":false,
                           "center":true,
                           "cover":false
                        },
                        "padding":"0px",
                        "hideDesktop":false,
                        "_meta":{
                           "htmlID":"u_row_1",
                           "htmlClassNames":"u_row"
                        },
                        "selectable":true,
                        "draggable":true,
                        "duplicatable":true,
                        "deletable":true,
                        "hideable":true
                     }
                  }
               ],
               "values":{
                  "textColor":"#000000",
                  "backgroundColor":"#e7e7e7",
                  "backgroundImage":{
                     "url":"",
                     "fullWidth":true,
                     "repeat":false,
                     "center":true,
                     "cover":false
                  },
                  "contentWidth":"500px",
                  "contentAlign":"center",
                  "fontFamily":{
                     "label":"Arial",
                     "value":"arial,helvetica,sans-serif"
                  },
                  "preheaderText":"",
                  "linkStyle":{
                     "body":true,
                     "linkColor":"#0000ee",
                     "linkHoverColor":"#0000ee",
                     "linkUnderline":true,
                     "linkHoverUnderline":true
                  },
                  "_meta":{
                     "htmlID":"u_body",
                     "htmlClassNames":"u_body"
                  }
               }
            },
            "schemaVersion":6
         }
        emailEditorRef.current.editor.loadDesign(templateJson);
    };

    return (
        <>
        <Navbar/>
        <div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-success" onClick={exportHtml}>Dergo</button>
            </div>

            <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
        </div>
        </>
    );
};

export default SendMailEditor