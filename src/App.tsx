import { Route, Routes } from "react-router";
import ListaCvs from "./pages/ListaCvs";
import FormCreateCv from "./pages/FormCreateCv";
import FormUpdateCv from "./pages/FormUpdateCv";
import LayoutWeb from "./layouts/LayoutWeb";
import { ThemeProvider } from "@/components/theme-provider";
import Layout from "./layouts/Layout";


function App() {
    
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Routes>
                <Route element={<Layout/>} >
                    <Route path="/" index element={<ListaCvs />} />
                    <Route element={<LayoutWeb/>} >
                        <Route path="cvs" element={<ListaCvs/>}  />
                        <Route path="cv/crear" element={<FormCreateCv/>}  />   
                        <Route path="cv/editar/:id" element={<FormUpdateCv/>}  />   
                    </Route>
                </Route>
                <Route path="*" element={<div>Not Found</div>}  />   
            </Routes>
        </ThemeProvider>
    );
}

export default App;
