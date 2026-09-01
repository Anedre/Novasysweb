import EntelLogo from '../img/entel.png';
import RenzoLogo from '../img/RenzoC.png';
import AmericatelLogo from '../img/americatel.png';
import PacificoLogo from '../img/pacifico.svg';
import InterbankLogo from '../img/Interbank_logo.png';
import CentrumLogo from '../img/centrum.png';
import AWSLogo from '../img/AWscloud.png';
import OracleLogo from '../img/Obusiness.png';
import HPLogo from '../img/HP_enterprise.png';

export const clients = [
  { name: 'Entel', logo: EntelLogo },
  { name: 'Renzo Costa', logo: RenzoLogo },
  { name: 'Americatel', logo: AmericatelLogo },
  { name: 'Pacífico Seguros', logo: PacificoLogo },
  { name: 'Interbank', logo: InterbankLogo },
  { name: 'Centrum PUCP', logo: CentrumLogo },
];

export const technologyPartners = [
  {
    name: 'Amazon Web Services',
    logo: AWSLogo,
    level: 'Advanced Partner',
    path: '/cloud',
    color: '#FF9900',
  },
  {
    name: 'HP / HPE',
    logo: HPLogo,
    level: 'Distribuidor',
    path: '/infraestructura/computo',
    color: '#0096D6',
  },
  {
    name: 'Oracle',
    logo: OracleLogo,
    level: 'Partner',
    path: '/soluciones',
    color: '#C74634',
  },
];
