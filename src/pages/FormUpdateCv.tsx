import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { CornerUpLeft, Save, X } from 'lucide-react';
import { NavLink } from "react-router";
import FormCv from "@/components/formCv/FormCv";
import { AlertError } from "@/components/AlertError";
import useFormUpdate from "@/hooks/useFormUpdate";


export default function FormUpdate() {

    const {
        useFormInstance,
        errorsValidations,
        handleClearForm,
        handleSaveForm,
    } = useFormUpdate();


    return (
        <Page>
            { errorsValidations.length > 0 &&
                <AlertError title="Formulario de contacto" className="my-4">
                    <ul>
                        { errorsValidations.map((ele,idx) => (
                            <li key={idx} >{ele}</li>
                        )) }
                    </ul>
                </AlertError>
               
            }


            <FormCv 
                header={
                    <div className='flex gap-4 justify-between '>
                        <Button variant={'link'} asChild>
                            <NavLink to='/'>
                                <CornerUpLeft /> Regresar
                            </NavLink>
                        </Button>
                        <div className='flex gap-4'>
                            <Button variant={'secondary'} onClick={handleClearForm}>
                                <X/>  Resetear
                            </Button>

                            <Button type="submit" >
                                <Save /> Actualizar
                            </Button>
                        </div>
                    </div>
                }
                onSubmit={handleSaveForm} {...useFormInstance }
                footer={
                    <div className='flex gap-4 justify-center pt-4 border-t border-gray-200 dark:border-gray-700'>
                        <Button variant={'secondary'} onClick={handleClearForm}>
                            <X/> Resetear
                        </Button>

                        <Button type="submit" >
                            <Save /> Actualizar
                        </Button>
                    </div>
                }
            />

        </Page>
    );
}



