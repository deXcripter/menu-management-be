# TABLE OF CONTENTS

1.  [Features](#features)

2.  [Technologies Used](#technologies-used)

3.  [Installation](#installation)

4.  Configuration

5.  API Documentation

6.  Environment Variables

7.  Running the Server

8.  Contact

## Features

### Category

<details>
<summary>
Attributes
</summary>

- Name: String,
- Image: URL,
- Description: String,
- Tax Applicability: Boolean,
- Tax: Bumber (if applicable),
- Tax Type: String,
</details>

- Anyone is allowed to create, update, get, or delete a Category.

### Sub-Category

<details>
<summary>
Attributes
</summary>

- Name: String,
- Image: URL,
- Description: String,
- Tax Applicability: Boolean (Default: Category tax applicability),
- Tax: Bumber (Default: Category tax number),
- Tax Type: String,
</details>

- Sub-Categories will be created under a category.
- A category can have multiple sub-categories in it.
- Sub-categories are optional (Categories can exist without a Sub-category attached).
- A Category can also have multiple sub-categories.

</details>

### Items

<details>
<summary>
Attributes
</summary>

- Name: String,
- Image: URL,
- Description: String,
- Tax Applicability: Boolean ,
- Tax: Number,
- Base Amount: Number
- Discount: Number
- Total Amount: Number (Base - Discount)
</details>

- Items will be created under a sub-category or a category
- A sub-category can have multiple items in it
  Attributes to create an item:

## Technologies Used

- **Cloudinary**: Used for uploading, storing, and managing images and media files in the cloud.
- **dotenv**: Used for loading environment variables from a .env file into the server.
- **Express**: A fast and minimalist web framework for Node.js, used to build the backend API.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB, used to interact with the database.
- **Morgan**: A logging middleware for Express, used to log HTTP requests for debugging and monitoring.
- **Multer**: A middleware for handling file uploads, particularly used for processing multipart/form-data.

## Installation

Follow these steps to clone the repo locally.

- Clone the repo

```bash
git clone https://github.com/deXcripter/menu-management-be

cd menu-management-be

# install dependencies
npm i
```

- Setup env variables
  - create a `.env` file in the root directory.
  - Add required enviroment variables (see [enviromental variables](#enviromental-variables))

## Configuration

Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

MONGO_URI=mongodb+srv://<your-username>:<your-password>@your-
mongo-atlas-connection-string
```
