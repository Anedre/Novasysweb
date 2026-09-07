/**
 * Documentos legales del sitio y de ARIA.
 *
 * Meta exige que la Política de privacidad, los Términos del servicio y las
 * instrucciones de Eliminación de datos vivan en URLs públicas propias, sin
 * login: son las tres que se cargan en la configuración de la App de Meta.
 *
 * El corte está en de qué habla cada documento, no en cuántos productos hay:
 *   · LEGAL_DOCS      → de la EMPRESA (responsable del tratamiento) y del
 *                       proceso de baja. Uno solo, sirve para todos los productos.
 *   · PRODUCTOS_LEGAL → los términos, que sí son de cada PRODUCTO.
 *
 * ⚠️ Redacción operativa preparada por el equipo técnico. Antes de publicarla
 * como definitiva, debe pasar por revisión legal de la empresa. Los datos de la
 * ficha del negocio (incluido el RUC) salen de `src/data/empresa.js`.
 */
import { Link } from 'react-router-dom';
import { EMPRESA } from './empresa';

export const LEGAL_UPDATED = '7 de septiembre de 2026';

const contacto = (
  <p>
    Para cualquier consulta sobre este documento escríbenos a{' '}
    <a href={'mailto:' + EMPRESA.correo}>{EMPRESA.correo}</a> o llámanos al{' '}
    <a href={EMPRESA.telHref}>{EMPRESA.telefono}</a>. Dirección: {EMPRESA.direccion}, {EMPRESA.ciudad}.
  </p>
);

export const LEGAL_DOCS = [
  {
    slug: 'privacidad',
    path: '/legal/privacidad',
    nav: 'Privacidad',
    title: 'Política de privacidad',
    label: 'Legal — Privacidad',
    lede:
      'Qué información tratamos, con qué finalidad, dónde se guarda y cómo se pide su eliminación. Aplica al sitio novasys.com.pe y a ARIA, la plataforma de atención al cliente de ' +
      EMPRESA.razon + '.',
    meta:
      'Política de privacidad de Novasys del Perú S.A.C. y de ARIA: qué datos tratamos, para qué, dónde se alojan, cuánto se conservan y cómo solicitar su eliminación.',
    sections: [
      {
        id: 'responsable',
        title: '1. Quién trata tus datos',
        body: (
          <>
            <p>
              El responsable es <b>{EMPRESA.razon}</b>, con domicilio en {EMPRESA.direccion}, {EMPRESA.ciudad}.
              Correo de contacto: <a href={'mailto:' + EMPRESA.correo}>{EMPRESA.correo}</a>.
            </p>
            <p>
              Novasys actúa en <b>dos papeles distintos</b>, y conviene distinguirlos porque las reglas
              cambian:
            </p>
            <ul>
              <li>
                <b>Como responsable.</b> De los datos de quienes visitan novasys.com.pe o nos escriben
                para contratar: nombre, empresa, correo, teléfono y el mensaje que nos envían.
              </li>
              <li>
                <b>Como encargado del tratamiento.</b> De las conversaciones que las empresas clientes
                atienden con ARIA. Esos datos son de la empresa cliente: nosotros solo los procesamos
                siguiendo sus instrucciones, para prestarle el servicio.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: 'datos-meta',
        title: '2. Qué información recibimos de las plataformas de Meta',
        body: (
          <>
            <p>
              Cuando una empresa cliente conecta sus cuentas de <b>WhatsApp</b>, <b>Instagram</b> o{' '}
              <b>Messenger</b> a ARIA, recibimos de Meta únicamente lo necesario para que su equipo
              pueda atender esas conversaciones:
            </p>
            <ul>
              <li>El <b>contenido de los mensajes</b> intercambiados con la cuenta de la empresa, incluidos los archivos adjuntos que se envíen en ellos.</li>
              <li>El <b>nombre público y el identificador</b> que la plataforma asigna a quien escribe, y su foto de perfil cuando la plataforma la entrega.</li>
              <li>Los <b>comentarios y reacciones</b> en las publicaciones de la empresa, cuando la empresa habilita esa función.</li>
              <li><b>Metadatos técnicos</b> de cada mensaje: fecha y hora, canal de origen, estado de entrega y lectura.</li>
            </ul>
            <p>
              No solicitamos ni almacenamos las credenciales de acceso de nadie. La conexión se hace con
              la autorización que la empresa otorga desde su propia cuenta de Meta, y esa autorización
              puede revocarse en cualquier momento desde ahí.
            </p>
          </>
        ),
      },
      {
        id: 'finalidad',
        title: '3. Para qué usamos esa información',
        body: (
          <>
            <ul>
              <li>Mostrar la conversación al equipo de la empresa que atiende ese canal.</li>
              <li>Responder de forma automática cuando la empresa configura un asistente, y derivar a una persona cuando corresponde.</li>
              <li>Generar el resumen y la clasificación de la conversación, y medir tiempos de respuesta y volumen por canal.</li>
              <li>Enviar los mensajes salientes y las plantillas que la propia empresa aprueba.</li>
              <li>Operar, monitorear y dar soporte a la plataforma.</li>
            </ul>
            <p>
              <b>No usamos esa información para publicidad</b>, no la vendemos, no la cedemos a terceros
              con fines comerciales y no la empleamos para entrenar modelos de inteligencia artificial de
              terceros. El procesamiento con IA que ocurre dentro de ARIA — resumen, clasificación,
              sugerencias al asesor — se hace para prestar el servicio a esa empresa y nada más.
            </p>
          </>
        ),
      },
      {
        id: 'donde',
        title: '4. Dónde se guarda y quién puede verla',
        body: (
          <>
            <p>
              La información se aloja en infraestructura de <b>Amazon Web Services</b>, cifrada en
              tránsito y en reposo. Cada empresa cliente está separada lógicamente del resto:{' '}
              <b>una empresa solo ve sus propias cuentas y sus propias conversaciones</b>.
            </p>
            <p>
              Dentro de Novasys, el acceso está restringido al personal que necesita entrar para operar o
              dar soporte, bajo control de acceso y con registro de auditoría. Cuando una empresa lo
              prefiere, ARIA puede desplegarse sobre la cuenta de AWS de esa misma empresa, de modo que
              los datos nunca salgan de su nube.
            </p>
            <p>
              Los proveedores de infraestructura y de servicios que intervienen en la operación
              (alojamiento, mensajería y telefonía) tratan los datos solo para prestar ese servicio, bajo
              los acuerdos correspondientes.
            </p>
          </>
        ),
      },
      {
        id: 'conservacion',
        title: '5. Cuánto tiempo la conservamos',
        body: (
          <>
            <ul>
              <li>
                <b>Conversaciones y grabaciones:</b> mientras el servicio esté activo y según el plazo de
                retención que defina la empresa cliente en su configuración.
              </li>
              <li>
                <b>Al cerrar una cuenta:</b> se conserva 30 días como período de gracia para permitir la
                exportación, y después se elimina. El detalle está en{' '}
                <Link to="/legal/eliminacion-de-datos">Eliminación de datos</Link>.
              </li>
              <li>
                <b>Datos de contacto comercial:</b> mientras exista relación o interés legítimo, y hasta
                que se solicite la baja.
              </li>
              <li>
                <b>Información contable y tributaria:</b> por el plazo que exige la ley peruana.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: 'derechos',
        title: '6. Tus derechos',
        body: (
          <>
            <p>
              De acuerdo con la Ley N.º 29733, Ley de Protección de Datos Personales, y su reglamento,
              puedes solicitar el acceso, la rectificación, la cancelación o la oposición al tratamiento
              de tus datos personales. Para ejercerlos escríbenos a{' '}
              <a href={'mailto:' + EMPRESA.correo}>{EMPRESA.correo}</a> desde el correo asociado a tu
              solicitud, indicando qué derecho quieres ejercer.
            </p>
            <p>
              Si escribiste a una empresa que atiende con ARIA y quieres que esa empresa borre tu
              conversación, la vía más rápida es pedírselo directamente a ella, porque esos datos son
              suyos. Igual podemos ayudarte a canalizarlo: el procedimiento está en{' '}
              <Link to="/legal/eliminacion-de-datos">Eliminación de datos</Link>.
            </p>
          </>
        ),
      },
      {
        id: 'cookies',
        title: '7. Cookies y medición del sitio',
        body: (
          <p>
            novasys.com.pe usa almacenamiento local del navegador para recordar preferencias como el
            tema claro u oscuro, y herramientas de analítica para entender de forma agregada qué páginas
            se visitan. Esa medición no se cruza con las conversaciones que ARIA atiende. Puedes
            bloquear o borrar cookies desde la configuración de tu navegador.
          </p>
        ),
      },
      {
        id: 'cambios',
        title: '8. Cambios en esta política',
        body: (
          <>
            <p>
              Si cambiamos esta política, actualizamos la fecha del encabezado y publicamos la nueva
              versión en esta misma dirección. Cuando el cambio afecte de forma relevante a las empresas
              clientes, se lo avisamos por correo.
            </p>
            {contacto}
          </>
        ),
      },
    ],
  },

  {
    slug: 'eliminacion-de-datos',
    path: '/legal/eliminacion-de-datos',
    nav: 'Eliminación de datos',
    title: 'Eliminación de datos',
    label: 'Legal — Eliminación de datos',
    lede:
      'Cómo pedir que borremos tu información, qué se elimina, en qué plazo y cómo te lo confirmamos. Aplica tanto a las empresas que usan ARIA como a las personas que escribieron a una de ellas.',
    meta:
      'Cómo solicitar la eliminación de datos en ARIA y en Novasys del Perú S.A.C.: vías de solicitud, qué se borra, plazos y confirmación.',
    sections: [
      {
        id: 'quien',
        title: '1. Primero: ¿de quién son los datos?',
        body: (
          <>
            <p>
              ARIA es la plataforma con la que <b>otras empresas</b> atienden a sus clientes. Por eso hay
              dos caminos distintos, y conviene elegir el correcto:
            </p>
            <ul>
              <li>
                <b>Escribiste a una empresa</b> por WhatsApp, Instagram, Messenger, correo o chat, y esa
                empresa atiende con ARIA. Esa conversación es de <b>esa empresa</b>. Lo más rápido es
                pedirle a ella que la borre. Si no sabes a quién escribir o no obtienes respuesta,
                canalízalo con nosotros y trasladamos la solicitud (paso 2).
              </li>
              <li>
                <b>Eres una empresa cliente de ARIA</b> y quieres eliminar tu cuenta y todo lo que
                contiene: ve directo al paso 3.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: 'como',
        title: '2. Cómo se pide (personas)',
        body: (
          <>
            <p>Escríbenos a <a href={'mailto:' + EMPRESA.correo}>{EMPRESA.correo}</a> con el asunto <b>«Eliminación de datos»</b> e incluye:</p>
            <ul>
              <li>El nombre de la empresa a la que escribiste, si lo recuerdas.</li>
              <li>El canal por el que la contactaste (WhatsApp, Instagram, Messenger, correo o chat web).</li>
              <li>El número de teléfono o el usuario desde el que escribiste, para poder localizar la conversación.</li>
            </ul>
            <p>
              Confirmamos la recepción en un plazo de <b>5 días hábiles</b> y trasladamos la solicitud a
              la empresa responsable de esa conversación. También puedes retirar el acceso de la
              aplicación desde la configuración de tu cuenta de Meta; eso corta el flujo futuro de
              mensajes, aunque no borra por sí solo lo ya recibido por la empresa.
            </p>
          </>
        ),
      },
      {
        id: 'empresa',
        title: '3. Cómo se elimina una cuenta de empresa',
        body: (
          <>
            <p>
              La empresa cliente puede solicitar la baja escribiendo desde el correo de un usuario
              administrador a <a href={'mailto:' + EMPRESA.correo}>{EMPRESA.correo}</a>. El proceso es:
            </p>
            <ol>
              <li><b>Confirmación.</b> Verificamos que la solicitud viene de un administrador de la cuenta.</li>
              <li><b>Desconexión.</b> Se desvinculan las cuentas de canales conectadas y cesa la recepción de mensajes.</li>
              <li><b>Período de gracia de 30 días.</b> La información queda disponible para exportarla. Durante ese plazo la baja puede revertirse.</li>
              <li><b>Eliminación.</b> Cumplidos los 30 días, se elimina la cuenta con sus conversaciones, contactos, grabaciones, adjuntos y reportes.</li>
              <li><b>Constancia.</b> Enviamos por correo la confirmación de la eliminación.</li>
            </ol>
          </>
        ),
      },
      {
        id: 'que',
        title: '4. Qué se elimina y qué se conserva',
        body: (
          <>
            <p><b>Se elimina:</b> conversaciones de todos los canales, adjuntos, grabaciones y transcripciones, fichas de contacto, oportunidades del embudo, plantillas, configuraciones y reportes asociados a la cuenta.</p>
            <p>
              <b>Se conserva únicamente</b> lo que la ley obliga a guardar —en particular la información
              contable y tributaria de la relación comercial— y los registros técnicos mínimos de
              seguridad, que no contienen el contenido de las conversaciones. Las copias de respaldo se
              sobrescriben en sus ciclos normales de rotación.
            </p>
            <p>
              Lo que ya se haya exportado o compartido fuera de ARIA por la propia empresa cliente queda
              fuera de nuestro alcance.
            </p>
          </>
        ),
      },
      {
        id: 'plazos',
        title: '5. Plazos, en resumen',
        body: (
          <>
            <ul>
              <li><b>Acuse de recibo:</b> hasta 5 días hábiles desde la solicitud.</li>
              <li><b>Período de gracia (cuentas de empresa):</b> 30 días corridos para exportar o revertir.</li>
              <li><b>Eliminación definitiva:</b> al vencer el período de gracia.</li>
              <li><b>Constancia por correo:</b> dentro de los 5 días hábiles siguientes a la eliminación.</li>
            </ul>
            {contacto}
          </>
        ),
      },
    ],
  },
];

/**
 * Productos SaaS de la casa y sus términos del servicio.
 *
 * Los términos SÍ son por producto (alcance, modelo de cobro, uso aceptable y
 * promesas cambian de uno a otro); la privacidad y la eliminación de datos NO,
 * porque hablan de la empresa y del proceso, que son los mismos para todos.
 *
 * Para sumar un producto: agregar una entrada aquí con su `doc`. La ruta
 * /legal/terminos/<id>, el índice de /legal/terminos y las pestañas salen solos.
 */
export const PRODUCTOS_LEGAL = [
  {
    id: 'aria',
    nombre: 'ARIA',
    resumen:
      'Plataforma de atención al cliente: WhatsApp, Instagram, Messenger, correo, llamadas y chat web en una sola bandeja, con asistentes automáticos.',
    pagina: '/soluciones/aria',
    terminos: '/legal/terminos/aria',
    canales: 'WhatsApp · Instagram · Messenger',
    notaLegal:
      'ARIA es la plataforma de atención al cliente desarrollada y operada por ' + EMPRESA.razon +
      '. No es una marca independiente ni un producto revendido.',
    mark: '/v4/aria/aria-mark.png',
    markDark: '/v4/aria/aria-mark-white.png',
    doc: {
      title: 'Términos del servicio de ARIA',
      lede:
        'Condiciones bajo las que ' + EMPRESA.razon + ' presta ARIA, la plataforma de atención al cliente. Al contratar el servicio, la empresa cliente acepta estos términos.',
      meta:
        'Términos del servicio de ARIA, la plataforma de atención al cliente de Novasys del Perú S.A.C.: alcance, cuentas conectadas, uso aceptable, suscripción y responsabilidades.',
      sections: [
        {
          id: 'objeto',
          title: '1. Qué es este documento',
          body: (
            <>
              <p>
                Estos términos regulan el uso de <b>ARIA</b>, la plataforma de atención al cliente
                desarrollada y operada por <b>{EMPRESA.razon}</b> ({EMPRESA.direccion}, {EMPRESA.ciudad}).
              </p>
              <p>
                ARIA se contrata entre empresas. La empresa que contrata es la «cliente»; las personas de
                su equipo que la usan son «usuarios»; y quienes escriben a esa empresa por WhatsApp,
                Instagram, Messenger, correo, teléfono o chat web son «contactos». Cuando el contrato
                firmado entre las partes diga algo distinto de lo que dice aquí, manda el contrato.
              </p>
            </>
          ),
        },
        {
          id: 'servicio',
          title: '2. El servicio',
          body: (
            <>
              <p>
                ARIA reúne en una sola bandeja las conversaciones de los canales que la empresa cliente
                conecta, permite responderlas de forma manual o automática, gestionar el embudo comercial,
                enviar campañas con plantillas aprobadas y consultar reportes de la operación.
              </p>
              <p>
                El servicio se presta sobre infraestructura en la nube. Podemos actualizarlo y mejorarlo;
                si un cambio elimina una funcionalidad relevante, lo avisamos con antelación razonable.
              </p>
            </>
          ),
        },
        {
          id: 'cuentas',
          title: '3. Cuentas conectadas',
          body: (
            <>
              <p>
                La empresa cliente conecta <b>sus propias cuentas</b> de WhatsApp, Instagram, Messenger,
                correo y telefonía. Esas cuentas siguen siendo suyas. Al conectarlas autoriza a Novasys a
                acceder a ellas <b>únicamente para prestarle el servicio</b>, y puede revocar esa
                autorización en cualquier momento desde la plataforma correspondiente.
              </p>
              <p>
                La empresa cliente declara ser titular de las cuentas que conecta o contar con
                autorización para hacerlo, y es responsable de mantener sus credenciales seguras y de las
                acciones que sus usuarios realicen desde la plataforma.
              </p>
            </>
          ),
        },
        {
          id: 'uso',
          title: '4. Uso aceptable y cumplimiento',
          body: (
            <>
              <p>La empresa cliente se compromete a no usar ARIA para:</p>
              <ul>
                <li>Enviar mensajes no solicitados, masivos o engañosos, ni contenido ilícito.</li>
                <li>Contactar personas que hayan pedido no ser contactadas.</li>
                <li>Suplantar a otra persona u organización.</li>
                <li>Vulnerar derechos de terceros o la normativa de protección de datos aplicable.</li>
              </ul>
              <p>
                Los canales de terceros tienen sus propias reglas. La empresa cliente es responsable de
                cumplir las políticas de las plataformas que conecta —entre ellas las políticas de Meta y
                de WhatsApp Business— y de obtener el consentimiento que corresponda de las personas a las
                que contacta. <b>Novasys no garantiza la entregabilidad de los mensajes ni que las
                plataformas de terceros no apliquen restricciones</b> sobre una cuenta o un número: eso
                depende del comportamiento de envío y de decisiones de esas plataformas.
              </p>
              <p>
                Podemos suspender el servicio si detectamos un uso que infrinja esta sección o que ponga en
                riesgo la operación de otros clientes, avisando en cuanto sea posible.
              </p>
            </>
          ),
        },
        {
          id: 'ia',
          title: '5. Funciones de inteligencia artificial',
          body: (
            <p>
              ARIA incluye funciones automáticas: resumen de conversación, clasificación sugerida,
              sugerencias al asesor y asistentes que responden por los canales configurados. Son{' '}
              <b>apoyo al equipo, no un reemplazo</b>: sus resultados pueden contener errores y la empresa
              cliente decide qué se automatiza y qué se revisa. La responsabilidad sobre lo que se
              responde a un contacto es de la empresa cliente.
            </p>
          ),
        },
        {
          id: 'suscripcion',
          title: '6. Suscripción, precios y facturación',
          body: (
            <>
              <p>
                ARIA se contrata por <b>suscripción mensual por asesor</b>. El precio vigente, el alcance
                de la implementación y los niveles de servicio se detallan en la propuesta y el contrato
                firmados con cada cliente. La facturación se emite conforme a la normativa peruana.
              </p>
              <p>
                La suscripción no tiene permanencia mínima salvo que el contrato indique lo contrario. La
                empresa cliente puede darla de baja avisando por escrito; el servicio se mantiene activo
                hasta el fin del período ya facturado.
              </p>
              <p>
                Cuando el despliegue se realiza sobre la cuenta de AWS de la propia empresa cliente, el
                consumo de esa infraestructura lo paga la empresa directamente a su proveedor de nube.
              </p>
            </>
          ),
        },
        {
          id: 'datos-cliente',
          title: '7. Datos del cliente',
          body: (
            <p>
              Las conversaciones, contactos y registros que se generan en la plataforma son{' '}
              <b>propiedad de la empresa cliente</b>. Novasys los trata como encargado, siguiendo la{' '}
              <Link to="/legal/privacidad">Política de privacidad</Link>. Al terminar la relación, la empresa
              cliente puede exportarlos durante el período de gracia descrito en{' '}
              <Link to="/legal/eliminacion-de-datos">Eliminación de datos</Link>.
            </p>
          ),
        },
        {
          id: 'propiedad',
          title: '8. Propiedad intelectual',
          body: (
            <p>
              El software de ARIA, su marca, su documentación y sus componentes son propiedad de{' '}
              {EMPRESA.razon}. La contratación otorga a la empresa cliente un derecho de uso no exclusivo
              e intransferible mientras la suscripción esté vigente, y no supone cesión de la propiedad
              intelectual.
            </p>
          ),
        },
        {
          id: 'responsabilidad',
          title: '9. Disponibilidad y responsabilidad',
          body: (
            <>
              <p>
                Trabajamos para mantener el servicio disponible y monitoreado. Los compromisos concretos de
                disponibilidad y soporte se pactan en el contrato de cada cliente. El servicio puede verse
                afectado por causas ajenas a Novasys, como interrupciones de los proveedores de nube o de
                las plataformas de mensajería de terceros.
              </p>
              <p>
                Salvo dolo o culpa grave, y en la medida que permita la ley aplicable, la responsabilidad
                de Novasys frente a la empresa cliente se limita a lo pactado en el contrato
                correspondiente.
              </p>
            </>
          ),
        },
        {
          id: 'ley',
          title: '10. Ley aplicable y cambios',
          body: (
            <>
              <p>
                Estos términos se rigen por las leyes de la República del Perú. Cualquier controversia se
                somete a los jueces y tribunales de Lima, salvo que el contrato firmado establezca otro
                mecanismo.
              </p>
              <p>
                Si actualizamos estos términos, publicamos la nueva versión en esta dirección y
                actualizamos la fecha del encabezado. Los cambios relevantes se comunican a las empresas
                clientes por correo.
              </p>
              {contacto}
            </>
          ),
        },
      ],
    },
  },
];

export const getLegalDoc = (slug) => LEGAL_DOCS.find((d) => d.slug === slug);
export const getProductoLegal = (id) => PRODUCTOS_LEGAL.find((p) => p.id === id);

/** Términos de un producto con la forma que espera LegalV4. */
export function getTerminosDoc(id) {
  const p = getProductoLegal(id);
  if (!p) return null;
  return { ...p.doc, slug: 'terminos', producto: p, path: p.terminos, nav: 'Términos' };
}
