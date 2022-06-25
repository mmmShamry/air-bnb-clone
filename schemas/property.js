export default {
    name : 'property',
    title : 'Property',
    type : 'document',
    fields : [
        {
            name : 'title',
            title : 'Title',
            type : 'string'
        },
        {
            name : 'location',
            title : 'Location',
            type : 'geopoint'
        },
        {
            name : 'propertyType',
            title : 'PropertyType',
            type : 'string',
            options : {
                list: [
                    {title : 'House', value : 'house'},
                    {title : 'Flat', value : 'flat'},
                    {title : 'Bed and Breakfast', value : 'bed-and-breakfast'},
                    {title : 'Boutique Hotel', value : 'boutique-hotel'},
                ],
                layout : 'radio'
            }
        },
    ]
}