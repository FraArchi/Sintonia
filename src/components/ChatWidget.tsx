import { useEffect } from 'react';

declare global {
  interface Window {
    $chatwoot?: {
      toggleOpened: () => void;
    };
    chatwootSettings?: {
      hideMessageBubble?: boolean;
      position?: 'left' | 'right';
      locale?: string;
      type?: 'standard' | 'expanded_bubble';
      launcherTitle?: string;
    };
    chatwootSDK?: {
      run: (config: { websiteToken: string; baseUrl: string }) => void;
    };
  }
}

interface ChatWidgetProps {
  websiteToken?: string;
  baseUrl?: string;
  position?: 'left' | 'right';
  locale?: string;
  launcherTitle?: string;
}

/**
 * Componente che integra il widget di live chat di Sintonia (Pilota AI).
 *
 * Una volta che il backend Sintonia è attivo su `app.sintonia.cloud`,
 * vai in Impostazioni → Canali → Website e copia il "Website Token"
 * per configurare questo componente.
 */
export default function ChatWidget({
  websiteToken = 'qGPUwRXk8rjsSGCVUuKR69ot',
  baseUrl = 'https://app.sintonia.cloud',
  position = 'right',
  locale = 'it',
  launcherTitle = 'Chatta con Pilota',
}: ChatWidgetProps) {
  useEffect(() => {
    // Non caricare se manca il token
    if (!websiteToken) return;

    // Configura il widget
    window.chatwootSettings = {
      hideMessageBubble: false,
      position,
      locale,
      type: 'standard',
      launcherTitle,
    };

    // Carica lo script SDK
    const script = document.createElement('script');
    script.src = `${baseUrl}/packs/js/sdk.js`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.chatwootSDK?.run({
        websiteToken,
        baseUrl,
      });
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup: rimuovi lo script al dismount
      document.head.removeChild(script);
      // Rimuovi il widget dal DOM
      const widget = document.querySelector('.woot-widget-holder');
      if (widget) widget.remove();
      const bubble = document.querySelector('.woot--bubble-holder');
      if (bubble) bubble.remove();
    };
  }, [websiteToken, baseUrl, position, locale, launcherTitle]);

  return null; // Il widget si inietta nel DOM autonomamente
}
