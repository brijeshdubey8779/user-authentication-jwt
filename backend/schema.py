from app import client

db = client.medprime

pd_validator = {
            "$jsonSchema": {
            "bsonType": "object",
            "required": ["_id", "patient_id", "name", "age", "clinical_details"],
            "properties": {
                "_id": {
                  "bsonType": "objectId",
                  "description": "Unique identifier for the patient"
                },
                "patient_id": {
                "bsonType": "string",
                "description": "Human-readable patient ID"
                },
                "name": {
                "bsonType": "string",
                "description": "Name of the patient"
                },
                "age": {
                "bsonType": "int",
                "description": "Age of the patient"
                },
                "clinical_details": {
                "bsonType": "string",
                "description": "Basic clinical details"
                }
            }
            }
        }

try:
    db.command("callMod", "Patient_details", validator=pd_validator)
except Exception as e:
    print(f"Error: {e}")
# db.create_collection("Patient_details", pd_validator)
# try:
#     db.Patient_details.collMod({ "validator": pd_vailidator })
# except Exception as e:
#     print(e)

# try:
#     db.command({
#         "collMod": "Patient_details",  # The collection name
#         "validator": pd_validator,    # Your validator definition
#         "validationLevel": "moderate"  # Optional: Set validation level (strict/moderate/off)
#     })
# except Exception as e:
#     print(f"Error: {e}")



gross_vailidator = {
    "$jsonSchema": {
      "bsonType": "object",
      "required": ["_id", "diagnosis", "doctor_ids", "gross"],
      "properties": {
        "_id": {
          "bsonType": "string",
          "description": "Reference to the patient's unique ID"
        },
        "diagnosis": {
          "bsonType": "string",
          "description": "Medical diagnosis"
        },
        "doctor_ids": {
          "bsonType": "array",
          "items": {
            "bsonType": "string"
          },
          "description": "Array of doctor IDs"
        },
        "gross": {
          "bsonType": "object",
          "required": ["specimen_dimensions", "outer_surface", "gallstones", "mucosa", "wall_thickness"],
          "properties": {
            "specimen_dimensions": {
              "bsonType": "string",
              "description": "Dimensions of the specimen"
            },
            "outer_surface": {
              "bsonType": "string",
              "description": "Description of the outer surface"
            },
            "gallstones": {
              "bsonType": "string",
              "description": "Presence of gallstones"
            },
            "mucosa": {
              "bsonType": "string",
              "description": "Description of the mucosa"
            },
            "wall_thickness": {
              "bsonType": "string",
              "description": "Wall thickness"
            }
          }
        }
      }
    }
  }
