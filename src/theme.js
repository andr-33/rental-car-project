import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#01260E',      // Verde oscuro como color principal sólido
            light: '#B0CE88',     // Verde medio como variación clara del primario
        },
        secondary: {
            main: '#93D929',      // Verde chillón como color secundario/acento
            light: '#21D904',     // Verde limón suave para hover o micro-interacciones
        },
        background: {
            default: '#F2F2F2',   // Fondo general de la app
            paper: '#FFFFFF',     // Fondo de contenedores (tarjetas, modales)
        },
        text: {
            primary: '#01260E',   // Verde oscuro o casi negro para texto principal
            secondary: '#8d8d8d', // Verde medio para textos secundarios o labels
            disabled: '#8d8d8d'   // Gris para texto deshabilitado
        },
        warning: {
            main: '#FFA726',      // Naranja clásico para advertencias
            light: '#FFCE85',
            dark: '#C77800',
        },
        error: {
            main: '#D32F2F',      // Rojo para errores
            light: '#FF6659',
            dark: '#9A0007',
        },
        success: {
            main: '#21D904',      // Verde chillón para estados de éxito (coherente con secondary)
            light: '#B9E774',     // Verde limón suave como variación
            dark: '#418C1F',      // Verde medio como versión más profunda
        },
        info:{
            main: '#03A9F4',
            light: '#86D8FE',
            dark: '#0288d1',
        }
    },
    typography: {
        button: {
            textTransform: 'none', // Desactiva las mayúsculas en botones
        },
    },
    components:{
        MuiButton:{
            styleOverrides:{
                root:{
                    borderRadius: "0.8em"
                }
            }
        },
        MuiTextField:{
            styleOverrides:{
                root:{
                    "& .MuiOutlinedInput-root":{
                        borderRadius: "0.8em",
                        height: "45px"
                    }
                }
            }
        },
        MuiFormLabel:{
            styleOverrides:{
                root:{
                    marginBottom: "0.5em",
                    fontWeight: "bold",
                    fontSize: "1.2em"
                }
            }
        },
        MuiInputLabel:{
            styleOverrides:{
                root:{
                    fontWeight: "normal",
                    fontSize: "1em"
                }
            }
        },
    },
});

export default theme;