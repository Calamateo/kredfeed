import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "../interfaces/FormInput";

function Form() {
  // State de array de la informacion de la APi
  const [postalCode, setPostalCode] = React.useState({
    asentamiento: [],
    ciudad: "",
    cp: "",
    estado: "",
    municipio: "",
    pais: "",
    tipo_asentamiento: "",
  });
  const [postalCodeRepresentat, setPostalCodeRepresentat] = React.useState({
    asentamiento: [],
    ciudad: "",
    cp: "",
    estado: "",
    municipio: "",
    pais: "",
    tipo_asentamiento: "",
  });

  // Token para la API
  const token: string = "08bb0ec1-7f72-4b30-92a9-3261df918f0c";
  // const token: string = "pruebas";

  // Aqui se evalua el FORM, registrandolo, actualizando y mostrando los errores
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit = async (data: FormInput) => {
    console.table(data);
    console.table(data.companyData.address);

    alert("Datos completados y guardados");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  /**
   * Devuelve los datos de direccion, ingresando el codigo postal
   * @param code Codigo postal
   * @param name Nombre de quien solicita
   */
  const getZipCode = async (code: string, name: string) => {
    const zipCode = await fetch(
      `https://api.copomex.com/query/info_cp/${code}?type=simplified&token=${token}`
    );
    const result = await zipCode.json();
    // Si no hay un error, se guarda la informacion
    if (!valideZip(result)) {
      if (name === "company") {
        setPostalCode(result.response);
      } else {
        setPostalCodeRepresentat(result.response);
      }
    }
  };

  /**
   * Arroja una alerta si el codigo postal es invalido
   * @param result Array devuelta por la API
   */
  const valideZip = (result: any) => {
    if (result.error) {
      console.log(result.error_message);
      alert(
        `${result.error_message} 
De momento solo operamos en Mexico`
      );
      return true;
    }
  };

  /**
   * Revisa y envia manda a la API de COPOMEX
   * @param e value del codigo postal
   */
  const hangleChangeCompany = (e: string) => {
    if (e.length === 5) {
      getZipCode(e, "company");
    }
  };
  /**
   * Revisa y envia manda a la API de COPOMEX
   * @param e value del codigo postal
   */
  const hangleChangeRepresentat = (e: string) => {
    if (e.length === 5) {
      getZipCode(e, "representat");
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)} className="container">
        <Grid container>
          <Typography variant="h4" fontWeight="bold">
            Datos de la empresa
          </Typography>
        </Grid>
        <Grid container marginTop={1} marginBottom={3} spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="name"
              label="Nombre"
              fullWidth
              required
              {...register("companyData.name")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="emailCompany"
              label="Correo electrónico"
              fullWidth
              error={errors.companyData?.email && true}
              type={"email"}
              required
              {...register("companyData.email", {
                pattern: {
                  value:
                    /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
                  message: "Formato de email incorrecto",
                },
              })}
              helperText={errors.companyData?.email?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="date"
              label="Fecha de constitución"
              focused
              fullWidth
              type={"date"}
              required
              {...register("companyData.date")}
            />
          </Grid>
          {/* Address */}
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="cpCompany"
              label="Código Postal"
              fullWidth
              required
              type={"number"}
              {...register("companyData.address.zipCode", {
                onChange: (e) => hangleChangeCompany(e.target.value),
              })}
              helperText="5 digitos"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="stretCompany"
              label="Calle o Avenida"
              fullWidth
              required
              {...register("companyData.address.street")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="numExtCompany"
              label="Número Exterior"
              fullWidth
              required
              {...register("companyData.address.numExt")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="numIntCompany"
              label="Número Interior"
              fullWidth
              {...register("companyData.address.numInt")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <Autocomplete
              disablePortal
              id="settlement"
              fullWidth
              options={postalCode?.asentamiento}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Colonia"
                  {...register("companyData.address.settlement")}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="municipio"
              label="Municipio"
              variant="outlined"
              fullWidth
              required
              value={postalCode.municipio}
              {...register("companyData.address.Municipality", {
                onChange: (e) => console.log(e.target.value),
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="ciudad"
              label="Ciudad"
              variant="outlined"
              fullWidth
              required
              value={postalCode.ciudad}
              {...register("companyData.address.city", {
                value: postalCode.ciudad,
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="estado"
              label="Estado"
              variant="outlined"
              fullWidth
              required
              value={postalCode.estado}
              {...register("companyData.address.state")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="pais"
              label="Pais"
              variant="outlined"
              fullWidth
              required
              value={postalCode.pais}
              {...register("companyData.address.country")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              id="fileCompany"
              helperText="Comprobante De Domicilio"
              variant="outlined"
              fullWidth
              type={"file"}
            />
          </Grid>
          {/* End Address */}
        </Grid>

        <Grid container>
          <Typography variant="h4" fontWeight="bold">
            Datos del representante legal
          </Typography>
        </Grid>
        <Grid container marginTop={1} marginBottom={3} spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="nameRepresentative"
              label="Nombre"
              fullWidth
              required
              {...register("representativeDetails.name")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="emailRepresentative"
              label="Correo electrónico"
              fullWidth
              error={errors.representativeDetails?.email && true}
              type={"email"}
              required
              {...register("representativeDetails.email", {
                pattern: {
                  value:
                    /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
                  message: "Formato de email incorrecto",
                },
              })}
              helperText={errors.representativeDetails?.email?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="dateRepresentative"
              label="Fecha De Nacimiento"
              focused
              fullWidth
              type={"date"}
              required
              {...register("representativeDetails.date")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="nacionalidad"
              label="Nacionalidad"
              fullWidth
              required
              {...register("representativeDetails.nationality")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="phone"
              label="Teléfono"
              fullWidth
              error={errors.representativeDetails?.phone && true}
              required
              type={"number"}
              {...register("representativeDetails.phone", {
                minLength: {
                  value: 8,
                  message: "Ingrese mas de 8 digitos",
                },
                maxLength: {
                  value: 10,
                  message: "Maximo 10 digitos",
                },
              })}
              helperText={errors.representativeDetails?.phone?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="cpRepresentative"
              label="Código Postal"
              fullWidth
              required
              type={"number"}
              {...register("representativeDetails.address.zipCode", {
                onChange: (e) => hangleChangeRepresentat(e.target.value),
              })}
              helperText="5 digitos"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="stretCompany"
              label="Calle o Avenida"
              fullWidth
              required
              {...register("representativeDetails.address.street")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="numExtCompany"
              label="Número Exterior"
              fullWidth
              required
              {...register("representativeDetails.address.numExt")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="numIntCompany"
              label="Número Interior"
              fullWidth
              {...register("representativeDetails.address.numInt")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <Autocomplete
              disablePortal
              id="settlement"
              fullWidth
              options={postalCodeRepresentat?.asentamiento}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Colonia"
                  {...register("representativeDetails.address.settlement")}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="municipio"
              label="Municipio"
              variant="outlined"
              fullWidth
              required
              value={postalCodeRepresentat.municipio}
              {...register("representativeDetails.address.Municipality")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="ciudad"
              label="Ciudad"
              variant="outlined"
              fullWidth
              required
              value={postalCodeRepresentat.ciudad}
              {...register("representativeDetails.address.city")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="estado"
              label="Estado"
              variant="outlined"
              fullWidth
              required
              value={postalCodeRepresentat.estado}
              {...register("representativeDetails.address.state")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <TextField
              id="pais"
              label="Pais"
              variant="outlined"
              fullWidth
              required
              value={postalCodeRepresentat.pais}
              {...register("representativeDetails.address.country")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              id="fileCompany"
              helperText="Identificación"
              variant="outlined"
              fullWidth
              type={"file"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}></Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}></Grid>
        </Grid>
        <button type="submit" className="btn btn-primary mb-5">
          Enviar
        </button>
      </form>
    </React.Fragment>
  );
}

export default Form;
