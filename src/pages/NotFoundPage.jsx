import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationTriangle, HiOutlineArrowLeft, HiOutlineHome } from 'react-icons/hi2';
import { Section, Container, Button } from '../design-system';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Página no encontrada — Novasys</title>
      </Helmet>
      <Section background="default" spacing="lg">
        <Container size="narrow">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 'var(--space-6)',
            paddingTop: 'var(--header-height)',
          }}>
            <HiOutlineExclamationTriangle style={{ fontSize: '4rem', color: 'var(--text-subtle)' }} />
            <h1 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-7xl)',
              fontWeight: 'var(--font-extrabold)',
              color: 'var(--text-heading)',
              lineHeight: 1,
            }}>
              404
            </h1>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'var(--text-heading)' }}>
              Página no encontrada
            </h2>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-muted)', maxWidth: '480px' }}>
              La página que buscas no existe o ha sido movida. Verifica la URL o regresa al inicio.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button to="/" variant="primary" size="lg" icon={HiOutlineHome}>
                Ir al inicio
              </Button>
              <Button onClick={() => window.history.back()} variant="outline" size="lg" icon={HiOutlineArrowLeft}>
                Volver atrás
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
