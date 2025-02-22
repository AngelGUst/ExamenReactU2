import React, { useState } from 'react';

function Form() {
    const [forms, setForm] = useState({ name: "", email: "", contra: "" });
    const [error, setError] = useState({ name: "", email: "", contra: "" });
    const [enviar, setEnviar] = useState(false);
    
    const validaciones = (campo, resultado) => {
        let error = "";

        if (campo === 'name' && resultado.trim() === "") { 
            error = "Este campo está vacío, debe estar lleno";
        }

        if (campo === 'contra') {
            if (resultado.trim() === "") {
                error = "Este campo está vacío, debe estar lleno";
            } else if (resultado.length < 6) {
                error = "La contraseña debe tener más de 6 caracteres";
            }
        }

        setError((prev) => ({ ...prev, [campo]: error }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        validaciones(name, value);
    };

    const handleEnvio = (e) => {
        e.preventDefault();
        validaciones("name", forms.name);
        validaciones("contra", forms.contra);
        
        if (!error.name && !error.contra) {
            setEnviar(true);
        }
    };

    const Limpiar = () => {
        setForm({ name: "", email: "", contra: "" });
        setError({ name: "", email: "", contra: "" });
        setEnviar(false);
    };

    return (
        <div>
            {!enviar ? (
                <form onSubmit={handleEnvio}>
                    <div>
                        <h1>FORMULARIO</h1>
                        <label>NOMBRE: </label>
                        <input type="text" name="name" value={forms.name} onChange={handleChange} />
                        <span>{error.name}</span>
                    </div>

                    <div>
                        <label>EMAIL: </label>
                        <input type="email" name="email" value={forms.email} onChange={handleChange} />
                    </div>

                    <div>
                        <label>CONTRASEÑA: </label>
                        <input type="password" name="contra" value={forms.contra} onChange={handleChange} />
                        <span>{error.contra}</span>
                    </div>

                    <br />
                    <button type="submit">REGISTRAR</button>
                </form>
            ) : (
                <DatosUsuario forms={forms} onReset={Limpiar} />
            )}
        </div>
    );
}

function DatosUsuario({ forms, onReset }) {
    return (
        <div>
            <h2>DATOS REGISTRADOS</h2>
            <p><strong>Nombre: </strong> {forms.name}</p>
            <p><strong>Email: </strong>{forms.email}</p>
            <p><strong>Contraseña: </strong>{forms.contra}</p>
            <p><button onClick={onReset}>HACER OTRO REGISTRO</button></p>
        </div>
    );
}

export default Form;
