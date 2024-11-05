"use client";
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [successMessages, setSuccessMessages] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  require('dotenv').config();
  const apiUrl = process.env.NEXT_PUBLIC_APP_API_URL;

  const [errors, setErrors] = useState({
    file: "",
    file2: "",
    file3: "",
    file4: "",
    file5: "",
    file6: ""
  });

  const [files, setFiles] = useState({
    file: null,
    file2: null,
    file3: null,
    file4: null,
    file5: null,
    file6: null
  });

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    const file = fileList[0];

    if (file) {
      if (file.type === 'application/pdf' || file.type.startsWith('image/jpeg')) {
        setFiles(prev => ({ ...prev, [name]: file }));
        setErrors(prev => ({ ...prev, [name]: '' }));
        setSuccessMessages(prev => ({ ...prev, [name]: ` ${file.name}` }));
      } else if (name === 'file6' && file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFiles(prev => ({ ...prev, [name]: file }));
        setErrors(prev => ({ ...prev, [name]: '' }));
        setSuccessMessages(prev => ({ ...prev, [name]: ` ${file.name}` }));
      } else {
        setErrors(prev => ({ ...prev, [name]: 'El archivo no posee el formato correcto' }));
        setSuccessMessages(prev => ({ ...prev, [name]: '' }));
      }
    } else {
      setFiles(prev => ({ ...prev, [name]: null }));
      setErrors(prev => ({ ...prev, [name]: '' }));
      setSuccessMessages(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file);
      }
    });

    try {
      const response = await fetch(apiUrl + '/inscripcion/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error en la carga de archivos');
      }

      setModalMessage("Solicitud de inscripción enviada con éxito");
      setIsModalOpen(true);
    } catch (error) {
      setModalMessage("Hubo un error al enviar la solicitud. Por favor, intente de nuevo.");
      setIsModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }

    resetForm();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const allFilesUploaded = Object.values(files).every(file => file !== null);
    const noErrors = Object.values(errors).every(error => error === '');
    setIsFormValid(allFilesUploaded && noErrors);
  }, [files, errors]);

  const resetForm = () => {
    setErrors({});
    setSuccessMessages({});
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
      input.value = '';
    });
  };

  async function downloadPlanilla() {
    const response = await fetch(apiUrl + '/descarga/');
    const result = await response.blob();
    const url = window.URL.createObjectURL(result);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'planilla.docx';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <main className='flex justify-center bg-gray-300 h-full w-full'>
      <section className='flex flex-col p-5 m-5 bg-slate-200 border-solid border-2 border-gray-300 rounded-lg lg:w-2/3 sm:w-4/5'>
        <h3 className='text-center mt-4 text-4xl underline font-semibold mb-5'>Requisitos para la inscripcion</h3>
        <span className='font-bold mb-5 mt-3'>Nota: Todos los archivos deben ir en formato .jpeg o .pdf y la planilla en formato .docx</span>
        <section className='mb-6'>
          <label htmlFor="Dplanilla" className='font-medium'>Haz click en el boton para descargar la planilla: </label>
          <button onClick={downloadPlanilla} className='lg:mt-0 md:mt-2 sm:mt-3 mt-3 p-2 rounded-lg bg-transparent border-2 border-gray-400 hover:bg-gray-300 font-semibold'>Planilla.docx</button>
        </section>
        <form onSubmit={handleSubmit}>
          <section className='mb-6'>
            <label htmlFor="file" className='font-medium'>Copia del nombramiento definitivo como profesor ordinario, o constancia de trabajo. Si es profesor contratado subir copia del contrato o copia del DPD:</label>
            <input type="file" id="file" name="file" className='' onChange={handleFileChange} required accept=".pdf, .jpeg, .jpg" />
            {errors.file && <p className="text-red-500">{errors.file}</p>}
            {successMessages.file && <p className="text-sky-600 text-center mt-2">Archivo cargado: {successMessages.file}</p>}
          </section>

          <section className='mb-6'>
            <label htmlFor="file2" className='font-medium'>Copia del ultimo detalle de pago:</label>
            <input type="file" id="file2" name="file2" required onChange={handleFileChange} className='' accept=".pdf, .jpeg, .jpg" />
            {errors.file2 && <p className="text-red-500">{errors.file2}</p>}
            {successMessages.file2 && <p className="text-sky-600 text-center mt-2">Archivo cargado: {successMessages.file2}</p>}
          </section>

          <section className='mb-6'>
            <label htmlFor="file3" className='font-medium'>Copia de la cédula de identidad:</label>
            <input type="file" id="file3" name="file3" required onChange={handleFileChange} className='' accept=".pdf, .jpeg, .jpg" />
            {errors.file3 && <p className="text-red-500">{errors.file3}</p>}
            {successMessages.file3 && <p className="text-sky-600 text-center mt-2">Archivo cargado: {successMessages.file3}</p>}
          </section>

          <section className='mb-6'>
            <label htmlFor="file4" className='font-medium'>Copia del comprobante de cuenta bancaria:</label>
            <input type="file" id="file4" name="file4" className='' onChange={handleFileChange} required accept=".pdf, .jpeg, .jpg" />
            {errors.file4 && <p className="text-red-500">{errors.file4}</p>}
            {successMessages.file4 && <p className="text-sky-600 text-center mt-2">Archivo cargado: {successMessages.file4}</p>}
          </section>

          <section className='mb-6'>
            <label htmlFor="file5" className='font-medium'>Foto tipo carnet:</label>
            <input type="file" id="file5" name="file5" required onChange={handleFileChange} className='' accept=".pdf, .jpeg, .jpg" />
            {errors.file5 && <p className="text-red-500">{errors.file5}</p>}
            {successMessages.file5 && <p className="text-sky-600 text-center mt-2">Archivo cargado: {successMessages.file5}</p>}
          </section>

          <section className='mb-6'>
            <label htmlFor="file6" className='font-medium'>Adjuntar planilla:</label>
            <input type="file" id="file6" name="file6" required onChange={handleFileChange} className='' accept=".docx" />
            {errors.file6 && <p className="text-red-500">{errors.file6}</p>}
            {successMessages.file6 && <p className="text-sky-600 text-center mt-2">Archivo cargado: {successMessages.file6}</p>}
          </section>

          <section className='flex justify-center'>
            <button type='submit'
              disabled={isSubmitting}
              className={`${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"} mt-10 items-center bg-sky-700 p-4 text-white text-lg rounded-xl w-60 hover:bg-sky-600`}>
              {isSubmitting ? 'Enviando...' : 'Solicitar inscripción'}
            </button>
          </section>
        </form>
      </section>

      <Dialog open={isModalOpen} onOpenChange={closeModal} className="bg-white shadow-md">
        <DialogContent className="flex flex-col p-6 bg-slate-200 justify-center items-center text-center rounded-3xl">
          <DialogHeader className="border-b mb-4 gap-4 rounded-xl">
            <DialogTitle className="text-2xl font-bold text-center">Mensaje</DialogTitle>
            <DialogDescription className="text-lg text-black mt-5">{modalMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center">
            <Button onClick={closeModal} className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2">Aceptar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
