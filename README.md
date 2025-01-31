# TABLE OF CONTENTS

1.  Features

2.  Technologies Used

3.  Installation

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

- Sub-Categories will be created under a category.
- A category can have multiple sub-categories in it.
- Sub-categories are optional (Categories can exist without a Sub-category attached).
- A Category can also have multiple sub-categories.

</details>

- Items will be created under a sub-category or a category
- A sub-category can have multiple items in it
  Attributes to create an item:
