export default  
new Object({
    "container-width":1100,
    "block":[
        {
            "id":"row-block-1",
            "display":"flex",
            "flex-direction":"column",
            "order":"asc",
            "flex-group":3,
            "items":[
                {
                    "id":"item-row-1",
                    "width":"290",
                    //"height":"700",
                },
                {
                    "id":"item-row-2",
                    "width":"360",
                    //"height":"700",
                },
                {
                    "id":"item-row-3",
                    "width":"345",
                    //"height":"700",
                },
            ],
       },
        {
            "id":"row-block-2",
            "display":"flex",
            "flex-direction":"column",
            "order":"asc",
            "flex-group":2,
            "items":[
                {
                    "id":"item-row-1",
                    "width":"680",
                    "width-size":"100vw"
                    //"height":"358",
                },
                {
                    "id":"item-row-2",
                    "width":"515",
                    //"height":"188",
                },
            ],
        },
        {
            "id":"row-block-3",
            "display":"flex",
            "flex-direction":"row",
            "items":[
                {
                    "id":"item-row-1",
                    "width":"50",
                    "height":"2",
                },
                {
                    "id":"item-row-2",
                    //"width":"130",
                    //"height":"30",
                },
                {
                    "id":"item-row-3",
                    "width":"50",
                    "height":"2",
                },
            ],
        },
        {
            "id":"row-block-4",
            "display":"flex",
            "flex-group":3,
            "flex-direction":"column",
            "order":"desc",
            "justify-content":"left",
            "item-repeat":4,
            "items":
            {
                "id":"item-row",
                "width-size":"100%",
                //"min-width":"315",
                //"height":"228",
            }
        },
    ],
    
})