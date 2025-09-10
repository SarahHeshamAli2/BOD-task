# 🌟 BOD-task Dashboard

A lightweight user dashboard to browse, manage, and interact with product categories and materials. Built with **React** and **Tailwind CSS**, integrated with a custom backend API.

---

## **Badges**
![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-blue?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

---

## **Table of Contents**
1. [Features](#features)  
2. [Installation](#installation)  
3. [Usage](#usage)  
4. [API Endpoints](#api-endpoints)  
5. [Project Structure](#project-structure)  
6. [Future Improvements](#future-improvements)  

---

## **Features**
- ✅ Responsive dashboard layout with sidebar and main content  
- ✅ Reusable UI components: buttons, modals, tables  
- ✅ Fetch and display product categories from your backend API  
- ✅ Paginated and searchable data tables  
- ✅ Forms to create and edit categories  
- ✅ State management using React hooks  
- ✅ Notifications for success/error messages  
- ✅ Loading and error states  

## **Usage**
1. Navigate the sidebar to explore different data sections.  
2. Search, paginate, or filter products and categories.  
3. Add or edit categories using forms.  
4. Notifications appear for success or error messages.  
 ## **API Endpoints**

# Fetch all product categories
GET `/categories/search`

# Fetch items by category name
GET `/get-items/:categoryName`

# Add a new product/category
POST `/categories`

# Edit a product/category
PUT `/categories/:id`

# Delete a product/category
DELETE `/categories/:id`

# Get top recycled materials
GET `/top-materials-recycled`

