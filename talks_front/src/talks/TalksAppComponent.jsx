import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import React from 'react';
import AuthProvider, { useAuth } from './security/AuthContext'
import LetStartComponent from './LetStartComponent.jsx'
import LoginComponent from './LoginComponent.jsx'
import MainPageComponent from './MainPageComponent.jsx'
import RegisterComponent from './RegisterCompetent.jsx'
import EditCompotent from './EditComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import Try from './Try.jsx'
import PageCompotent from './PageComponent.jsx';
import ReadArticleComponent from './ReadArticleComponent.jsx';

function AuthenticatedRoute({children}) {
    const authContext = useAuth()
    
    if(authContext.isAuthenticated)
        return children

    return <Navigate to="/" />
}

export default function TalksAppComponent() {
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={ <LetStartComponent /> } />
                        <Route path='/login' element={ <LoginComponent /> } />
                        <Route path='/register' element={ <RegisterComponent /> } />

                        <Route path='/try' element={
                            <Try/>
                        } />

                        <Route path='/readArticle' element={
                            <ReadArticleComponent/>
                        } />
                        
                        <Route path='/mainPage' element={
                            <AuthenticatedRoute>
                                <HeaderComponent/>
                                <MainPageComponent/>
                            </AuthenticatedRoute> 
                        } />

                        <Route path='/edit' element={
                            <AuthenticatedRoute>
                                <div>
                                    <HeaderComponent/>
                                    <EditCompotent/>
                                </div>
                            </AuthenticatedRoute>
                        } />

                        <Route path='/page/:boardName' element={
                            <AuthenticatedRoute>
                                <div>
                                    <HeaderComponent/>
                                    <PageCompotent/>
                                </div>
                            </AuthenticatedRoute>
                        } />



                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}