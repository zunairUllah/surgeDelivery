


// below is format of data returned in getPlaceDetails function ref addStop() in globalState.js
// below is also stops data stucture saved in local storage
/*[
    {
        "place_id": "ChIJV7OIRWZdpRIRQIC4-2Z-FaM",
        "name": "Núria",
        "lat": 42.3967409,
        "lng": 2.1526984
    },
    {
        "place_id": "ChIJC87VdOAGugcRvp7xXf5PaUY",
        "name": "Mossoró",
        "lat": -5.1919109,
        "lng": -37.3423886
    }
  ]

*/

// below is input data structure for route optimize function ref route() function
/*
export const request = {
   origin: {
      lat: 52.9647713,
      lng: -1.1697501
   },
   destination: {
      lat: 52.9647713,
      lng: -1.1697501
   },
   waypoints: [
      {
         location: {
            lat: 52.9667047,
            lng: -1.1778959
         }
      },
      {
         location: {
            lat: 52.968111,
            lng: -1.1945723
         }
      },
      {
         location: {
            lat: 52.9660124,
            lng: -1.1936783
         }
      }
   ],
   optimizeWaypoints: true,
   travelMode: "DRIVING",
}
*/


/* below is structure of predictions object literal
[
  {
      "description": "Carrer de Mossèn Andreu, 32, Cornellà de Llobregat, Spain",
      "matched_substrings": [
          {
              "length": 13,
              "offset": 10
          },
          {
              "length": 2,
              "offset": 25
          }
      ],
      "place_id": "ChIJW2IH9UKZpBIRUQN3DKFjf6Q",
      "reference": "ChIJW2IH9UKZpBIRUQN3DKFjf6Q",
      "structured_formatting": {
          "main_text": "Carrer de Mossèn Andreu, 32",
          "main_text_matched_substrings": [
              {
                  "length": 13,
                  "offset": 10
              },
              {
                  "length": 2,
                  "offset": 25
              }
          ],
          "secondary_text": "Cornellà de Llobregat, Spain"
      },
      "terms": [
          {
              "offset": 0,
              "value": "Carrer de Mossèn Andreu"
          },
          {
              "offset": 25,
              "value": "32"
          },
          {
              "offset": 29,
              "value": "Cornellà de Llobregat"
          },
          {
              "offset": 52,
              "value": "Spain"
          }
      ],
      "types": [
          "geocode",
          "premise"
      ]
  }
]
*/
/*
// below is data structure to marker component input locations 
[
  {
    position: { lat: 52.9647713, lng: -1.1697501 },
    title: "86 Radford Rd, Radford, Nottingham NG7 5FU, UK",
  },
  {
    position: { lat: 52.9667047, lng: -1.1778959 },
    title: "123 Bobbers Mill Rd, Nottingham NG7 5JS, UK",
  },
  {
    position: { lat: 52.968111, lng: -1.1945723 },
    title: "113 Trentham Dr, Nottingham, UK",
  },
  {
    position: { lat: 52.9660124, lng: -1.1936783 },
    title: "64 Trentham Gardens, Nottingham NG8 3NF, UK",
  },
];

*/
/*

{
    origin: {
       lat: 52.9647713,
       lng: -1.1697501
    },
    destination: {
       lat: 52.9647713,
       lng: -1.1697501
    },
    waypoints: [
       {
          location: {
             lat: 52.9667047,
             lng: -1.1778959
          }
       },
       {
          location: {
             lat: 52.968111,
             lng: -1.1945723
          }
       },
       {
          location: {
             lat: 52.9660124,
             lng: -1.1936783
          }
       }
    ],
    optimizeWaypoints: true,
    travelMode: "DRIVING",
 }

 [
    {
        "place_id": "ChIJPZ1z943BeUgRVdNV65sm9e4",
        "name": "86 Radford Rd",
        "lat": 52.9647713,
        "lng": -1.1697501
    },
    {
        "place_id": "ChIJUcjlDu3BeUgRn3CivfKG6Pw",
        "name": "123 Bobbers Mill Rd",
        "lat": 52.9667047,
        "lng": -1.1778959
    },
    {
        "place_id": "ChIJzXyFiOPBeUgR-SNIUT7Uuds",
        "name": "113 Trentham Dr",
        "lat": 52.968111,
        "lng": -1.1945723
    },
    {
        "place_id": "ChIJSQllouTBeUgRfXmlKn9qRrk",
        "name": "64 Trentham Gardens",
        "lat": 52.9660124,
        "lng": -1.1936783
    },
    {
        "place_id": "ChIJPZ1z943BeUgRVdNV65sm9e4",
        "name": "86 Radford Rd",
        "lat": 52.9647713,
        "lng": -1.1697501
    }
]
    */