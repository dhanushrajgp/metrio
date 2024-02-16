# Metrio LITE

Metrio LITE is a new web application used for **_filling out forms_** to potentially generate environmental indicators.

## The Task

You will need to build the frontend for this application. Here are the requirements:

- We want to visualize the list of forms, along with the number of data entries in each form.
- We want to create, edit, and delete forms.
- We want to view the data entries of a specific form. This list should be sortable by date or value.
- We want to create and edit data entries for a form based on the form's schema. For example, each tag can be displayed as a dropdown list to limit the possible choices.
- We want to delete data entries for a form.
- We want the application to be responsive (i.e., adapt to both desktop computers and mobile phones).

### Evaluation

The test will be assessed based on the following criteria:

- Code quality (simplicity, style, use of TypeScript, etc.)
- Understanding and adherence to requirements.
- Visual aspect (UI/UX). The choice of a React component library (for example MUI) is left to your discretion.

## Configuration

### React application

You will need to create a React application (using [TypeScript](https://www.typescriptlang.org/)). **_You can use the framework of your choice._**

Here's an example using [Create React App](https://create-react-app.dev/docs/getting-started):

```
npx create-react-app metrio-lite --template typescript
cd metrio-lite
npm start
```

### API

Create a `db.json` file (at the root of `metrio-lite`) containing this JSON:

```
{
  "forms": [
    {
      "id": 1,
      "name": "Residual materials pick-ups (kg)",
      "tags": [
        {
          "name": "Type",
          "choices": ["Waste", "Compost", "Recyclable", "Organic waste"]
        },
        {
          "name": "Zone",
          "choices": ["Residential", "Commercial", "Industrial"]
        }
      ]
    },
    {
      "id": 2,
      "name": "Public transport usage (Tickets)",
      "tags": [
        {
          "name": "Type",
          "choices": ["Bus", "Metro", "Train"]
        }
      ]
    }
  ],
  "data": [
    {
      "id": 1,
      "formId": 1,
      "date": "2024-01-01",
      "tags": { "Type": "Waste", "Zone": "Residential" },
      "value": 130
    },
    {
      "id": 2,
      "formId": 1,
      "date": "2024-02-01",
      "tags": { "Type": "Compost", "Zone": "Residential" },
      "value": 345
    },
    {
      "id": 3,
      "formId": 1,
      "date": "2024-01-01",
      "tags": { "Type": "Waste", "Zone": "Commercial" },
      "value": 234
    },
    {
      "id": 4,
      "formId": 2,
      "date": "2024-01-01",
      "tags": { "Type": "Bus" },
      "value": 833
    }
  ]
}
```

Start the API server (we use [json-server](https://github.com/typicode/json-server) to serve the API based on the `db.json` file):

```
npx json-server --watch db.json --port 3001
```

The API is:

```
# Forms

GET /forms         Get the forms
GET /forms/:id     Get a form
POST /forms        Create a form
PUT /forms/:id     Update a form
DELETE /forms/:id  Delete a form

# Data

GET /data?formId=:formId   Get form data
GET /data/:id              Get specific data
POST /data                 Create data in a form
PUT /data/:id              Update data
DELETE /data/:id           Delete data
```

For example, with `curl`, here are some possible operations:

```
# Créer un formulaire:

curl \
  -X POST "http://localhost:3001/forms" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -d "{ \
    \"name\": \"Mon formulaire\", \
    \"tags\": [{ \"name\": \"Mon tag\", \"choices\": [\"A\", \"B\", \"C\"] }] \
  }"

# Create a form:

curl \
  -X POST "http://localhost:3001/data/" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -d "{ \
    \"formId\": 1, \
    \"date\": \"2024-01-01\", \
    \"note\": \"Ma donnée\", \
    \"tags\": { \"Mon tag\": \"A\" }, \
    \"value\": 1 \
  }"
```

The rest of the API documentation can be deduced from the [json-server](https://github.com/typicode/json-server) documentation.