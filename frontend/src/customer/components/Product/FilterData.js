export const color = [
    "white",
    "Black",
    "Red",
    "maroon",
    "Beige",
    "Pink",
    "Green",
    "Yellow",

];

export const filters = [
    {
        id:"color",
        name:"Color",
        options:[
            {value:"white", label:"White"},
            {value:"beige", label:"Beige"},
            {value:"blue", label:"Blue"},
            {value:"brown", label:"Brown"},
            {value:"green", label:"Green"},
            {value:"purple", label:"Purple"},
            {value:"yellow", label:"Yellow"},
            {value:"pink", label:"Pink"},

        ]
    },
    {
        id:"size",
        name:"Size",
        options:[
            {value:"S", label:"S"},
            {value:"M", label:"M"},
            {value:"L", label:"L"},
            

        ],
    },
];

export const singleFilters = [
    {
        id:"price",
        name:"Price",
        options:[
            {value:"159-399", label:"₹159-399"},
            {value:"399-999", label:"₹399-999"},
            {value:"999-1999", label:"₹999-1999"},
            {value:"1999-2999", label:"₹1999-2999"},
            {value:"3999-4999", label:"₹3999-4999"},

        ],
    },
    {
        id:"discount",
        name:"Discount Range",
        options:[{value:"10",label:"10% and Above",},
                {value:"20%",label:"20% and Above"},
                {value:"30%",label:"30% and Above"},
                {value:"40%",label:"40% and Above"},
                {value:"50%",label:"50% and Above"},
                {value:"60%",label:"60% and Above"},

        ]
    }
]