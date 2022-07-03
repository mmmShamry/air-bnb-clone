export default { 
    name : 'person',
    title : 'Person',
    type : 'document',
    fields : [
        {
            name : 'name',
            title : 'Name',
            type : 'string',
            descripton : 'Please use "Firstname Lastname" format',
        },
        {
            name : 'slug',
            title : 'Slug',
            type : 'slug',
            options : {
                source : 'name',
                maxLength : 100,
            }
        },
        {
            name : 'image',
            Title : 'Image',
            type : 'image',
        },
        {
            name : 'id',
            title : 'ID',
            type : 'number',
        }
    ],
    preview: {
        select: {
          title: 'name',
          media: 'image',
        },
      },
}