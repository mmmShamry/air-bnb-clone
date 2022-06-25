export default {
    name :'review',
    title : 'Review', 
    type  : 'object',
    fields : [
        {
            name : 'reviewDescription',
            title : 'Review Description',
            type : 'string',
        },
        {
            name : 'traveller',
            title : 'Treveller',
            type : 'traveller',
        },
        {
            name : 'rating',
            title : 'Rating',
            type : 'string',
            options : {
                list : [
                    {title : '5 start', value : '5-stars'},
                    {title : '4 start', value : '4-stars'},
                    {title : '3 start', value : '3-stars'},
                    {title : '2 start', value : '2-stars'},
                    {title : '1 start', value : '1-stars'},
                ]
            },
            layout : 'radio',
        }
    ]
}