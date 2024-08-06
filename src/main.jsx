import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/global.css'



import {NextUIProvider} from "@nextui-org/react";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import AuthProvider from './context/AuthContext.jsx'



const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode >

    <QueryClientProvider client={queryClient}>
    <AuthProvider>
              
              <App />
        
    </AuthProvider>
    <ReactQueryDevtools initialIsOpen={false} />

    </QueryClientProvider>

//  </React.StrictMode>, 
)
