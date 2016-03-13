/* Mock data definition for users endpoints
 *
 */

exports.users = {
  "data": [
    {
      "id": "ACC3FA7A-4A23-42B7-B603-1E0410C6EFEB",
      "username": "jjones",
      "last_name": "Jones",
      "first_name": "James",
      "middle_name": "",
      "additional_name": "Jimmy",
      "gender": "male",
      "birth_date": "1972-07-21",
      "country_of_origin": "US",
      "ssno": "123-45-6789",
      "phone": {
        "mobile": "555-555-5555",
        "home": null,
        "office": null
      },
      "fax": null,
      "email": "jjones@example.com",
      "disabled": false,
      "created_at": "2015-04-03T01:21:34.000-06:00"
    }
  ],
  "meta": {
    "pagination": {
      "total": 1,
      "count": 1,
      "per_page": 50,
      "current_page": 1,
      "total_pages": 1,
      "links": {
        "next": "http:\/\/docker.example.com\/api\/users?page=1"
      }
    }
  }
};
