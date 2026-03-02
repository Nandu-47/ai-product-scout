# DiscvrAI – AI-Powered Product Discovery Platform

An AI-powered product discovery application that allows users to search products using natural language queries. The system uses a serverless backend with Supabase Edge Functions and integrates OpenAI to interpret user intent and return structured results.

---

##  Live Demo

Frontend (Vercel):  
https://ai-product-scout1.vercel.app/

---

##  Problem Statement

Build a mini product discovery experience with:

- Backend API exposing a product catalog
- Natural language search powered by LLM
- Structured JSON response (productIds + summary)
- Clean frontend UI consuming backend APIs

---

##  Architecture

User (Browser)  
↓  
Vercel (React Frontend)  
↓  
Supabase Edge Function (Serverless Backend)  
↓  
OpenAI API (LLM)  
↓  
Structured JSON Response  

---

##  Tech Stack

### Frontend
- React (TypeScript)
- Vite
- Tailwind CSS
- ShadCN UI Components
- Lucide Icons

### Backend
- Supabase Edge Functions (Deno runtime)
- Supabase Client SDK

### AI Integration
- OpenAI API (gpt-4o-mini)
- Prompt engineering for structured JSON output

### Deployment
- Vercel (Frontend)
- Supabase Cloud (Backend)
- GitHub (Version Control)
