## INTRODUCTION

The e-commerce application is a platform dedicated to men's fashion, offering a wide range of stylish and trendy products. Its main purpose is to provide a convenient and engaging shopping experience for men aged 20 to 35. With a focus on the latest fashion trends, the application aims to cater specifically to this demographic, allowing them to browse, discover, and purchase high-quality clothing, accessories, and footwear.

## Table of Contents

- Introduction
- Table of Contents
- Getting Started

   * Prerequisites
   * Installation
   * Setting up the Environment

- Usage
- Features
- Architecture & Design

   * Folder Structure
   * Data Flow
   * Component Structure

- Testing
- Deployment
- Contributing
- License

## Getting Started

### Prerequisites

- Node Js (at least version 16.18.0)
- Git
- Package Manager: Either npm or Yarn

   * npm version: 8.4.1 or higher
   * Yarn version: 1.22.10 or higher

### Installation

- Git command: Git clone https://github.com/LamNgo1911/fs17-Frontend-project.git
- Navigate to the project directory: cd fs17-Frontend-project.
- Install the project dependencies: npm install or yarn install.

## Usage

### Scripts

- Start the development server: npm start or yarn start

- Build the production-ready bundle: npm run build or yarn build
- Run the tests: npm test or yarn test

### Features

- User authentication and registration
  ![register-img](https://github.com/LamNgo1911/fs17-Frontend-project/assets/121915847/5b58c655-ea02-451a-8d79-0db63b7106e5)
  ![login-img](https://github.com/LamNgo1911/fs17-Frontend-project/assets/121915847/943341d5-1da4-413b-9060-74da26a265d7)
- Browse products, categories and, search products by product name
  ![product-listing](https://github.com/LamNgo1911/fs17-Frontend-project/assets/121915847/e09098fe-8055-4e78-abac-36c29dea60cb)
  ![product-detail](https://github.com/LamNgo1911/fs17-Frontend-project/assets/121915847/14ba2204-8fd7-47c5-a0ab-9334ffd07582)
- Add products to the shopping cart
- Manage the shopping cart (remove items, update quantities)
  ![shopping-cart](https://github.com/LamNgo1911/fs17-Frontend-project/assets/121915847/9be1b329-1224-47f1-b5ee-76d02f568ea8)
- Wishlist functionality
- User profile management
  ![user-profile](https://github.com/LamNgo1911/fs17-Frontend-project/assets/121915847/ecd1b7a8-c755-4a5e-b06e-126d9ce8602c)
- Responsive design for mobile and desktop devices
  ![mobile-version](https://github.com/LamNgo1911/fs17-Frontend-project/assets/121915847/1a51f892-025d-497b-ace0-dc0faadccbb6)
  ![tablet-version](https://github.com/LamNgo1911/fs17-Frontend-project/assets/121915847/cdd6b5a6-a2f8-4237-a764-fad38a0ee05e)
- Dark/Light mode switch
  ![light-mode](https://github.com/LamNgo1911/fs17-Frontend-project/assets/121915847/8cab40dc-d352-4338-91cd-18f1136c6cc8)
  ![dark-mode](https://github.com/LamNgo1911/fs17-Frontend-project/assets/121915847/71bf8219-06e0-40bc-931f-9aace955a2bc)

### Architecture & Design

#### Folder Structure

- src/

   * components/: Contains reusable UI components.
   * pages/: Contains the main pages of the application.
   * redux/: Contains Redux-related files (actions, reducers, store).
   * test/: Contains reducer testing files
   * styles/: Contains global styles and styling variables.
   * App.tsx: The root component of the application.
   * index.tsx: Entry point file.

#### Data Flow

- The application follows a Redux architecture for managing the state. Actions are dispatched from components, which trigger corresponding reducers to update the state. The updated state is then reflected in the UI using React's re-rendering mechanism.
- In the Context API, the data flow involves creating a context, providing it to components, consuming the context data, updating the data through defined functions, and triggering updates in components.

#### Component Structure

- The components are organized based on their functionality and can be reused across different pages. The main components include:

   * Header: Displays the navigation bar and user-related actions.
   * ProductCard: Displays product information. It includes an image, product name, price, description
   * Slider: Displays a list of products with different swiping styles, such as pagination, scrollbar or navigation.
   * ImageCard: Displays multiple product images, including a main image and thumbnail views. It enables users to have different perspectives and views of a product.

### Testing

- Testing libraries/frameworks: Jest, React Testing Library
- Run tests using the command npm test or yarn test.
- The tests are structured into unit tests with reducers, covering different aspects of the application.

### Deployment

- To deploy the project to a server, follow these general steps:

   1. Set up a hosting platform (e.g., Netlify, Vercel, AWS, etc.).
   2. Configure the deployment settings, such as specifying the build command and environment variables.
   3. Connect the hosting platform to the Git repository to enable automatic deployments based on commits or pull requests.
   4. Trigger the deployment process, and the hosting platform will build and deploy the application.
