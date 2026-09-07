/**
 * Ficha del negocio que presta los servicios. La usan la página de ARIA y las
 * páginas legales, que deben mostrar exactamente los mismos datos: el revisor de
 * Meta los compara con la razón social de la solicitud de verificación.
 *
 * Si `ruc` queda vacío, la ficha lo muestra marcado como «(completar)» en rojo.
 */
export const EMPRESA = {
  razon: 'Novasys del Perú S.A.C.',
  ruc: '20512134166',
  direccion: 'Narciso de la Colina 421, Miraflores',
  ciudad: 'Lima, Perú',
  telefono: '+51 1 643-3467',
  telHref: 'tel:+5116433467',
  correo: 'contacto@novasysperu.com',
  desde: '2010',
};

export default EMPRESA;
