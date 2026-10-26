/*
 * DIORAAMAN ESIKATSELUPANEELI — esikatselu, erä 2b (29.9.2026, ali-agentti P7).
 * Pieni kelluva kytkinpaneeli kehittäjälle (suomeksi): Aurinko, Lamput, Tuli,
 * Pinnat A/B, Hahmot 2D/3D, ja Ajautuminen (drift) JOS leijunta-funktio on
 * olemassa. Piilotettavissa URL-parametrilla paneeli=0 — silloin esikatselu.mjs
 * ei kutsu tätä moduulia ollenkaan (ks. sen kommentti), niin kuvakaappaukset
 * pysyvät puhtaina. Puhdas DOM+CSS, ei riippuvuutta THREE:hen — kutsuja antaa
 * kaikki toiminnallisuuden callbackeina.
 */

function lisaaTyyli() {
  if (document.getElementById('dioraama-paneeli-tyyli')) return;
  const s = document.createElement('style');
  s.id = 'dioraama-paneeli-tyyli';
  s.textContent = `
    #dioraama-paneeli { position: fixed; left: 10px; top: 10px; z-index: 20;
      background: rgba(20,22,20,0.72); color: #f2ede2; font: 12px/1.4 system-ui, sans-serif;
      border-radius: 10px; padding: 10px 12px; max-width: 200px; }
    #dioraama-paneeli h3 { margin: 0 0 6px; font-size: 12px; opacity: 0.7; font-weight: 600; }
    #dioraama-paneeli .rivi { display: flex; align-items: center; justify-content: space-between; margin: 4px 0; gap: 8px; }
    #dioraama-paneeli button { background: #3a3f38; color: #f2ede2; border: 1px solid #565c53;
      border-radius: 6px; padding: 3px 8px; font: inherit; cursor: pointer; }
    #dioraama-paneeli button.pois { opacity: 0.45; }
    #dioraama-paneeli button.valittu { background: #6a7a52; border-color: #8fa06f; }
    #dioraama-paneeli .huomio { margin-top: 6px; font-size: 11px; color: #e0c98f; min-height: 14px; }
    #dioraama-paneeli .tilat { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }
  `;
  document.head.appendChild(s);
}

/**
 * Rakentaa paneelin. `tilat`: kohdistettavat tilat [{id,nimi}]. `onKytkin(avain,arvo)`
 * kutsutaan kun jokin kytkin muuttuu (avain: aurinko|lamput|tuli|pinnat|hahmot|drift,
 * arvo: boolean paalla/pois-kytkimille, 'A'/'B' tai '2D'/'3D' valintariveille).
 * `onTila(id)` kutsutaan tilanappia painettaessa (id === '' → yleisnäkymä).
 * Palauttaa { naytaHuomio(teksti) } lyhyen ilmoituksen näyttämiseen paneelissa.
 */
export function rakennaPaneeli({ tilat, onKytkin, onTila, onkoLeijunta }) {
  lisaaTyyli();
  const juuri = document.createElement('div');
  juuri.id = 'dioraama-paneeli';
  document.body.appendChild(juuri);

  const otsikko = document.createElement('h3');
  otsikko.textContent = 'Dioraama';
  juuri.appendChild(otsikko);

  const kytkinRivi = (nimiTeksti, avain, tekstiPaalla, tekstiPois) => {
    const rivi = document.createElement('div');
    rivi.className = 'rivi';
    const nimi = document.createElement('span');
    nimi.textContent = nimiTeksti;
    const nappi = document.createElement('button');
    nappi.textContent = tekstiPaalla;
    let paalla = true;
    nappi.addEventListener('click', () => {
      paalla = !paalla;
      nappi.textContent = paalla ? tekstiPaalla : tekstiPois;
      nappi.classList.toggle('pois', !paalla);
      onKytkin(avain, paalla);
    });
    rivi.append(nimi, nappi);
    juuri.appendChild(rivi);
  };

  const valintaRivi = (nimiTeksti, avain, vaihtoehdot) => {
    const rivi = document.createElement('div');
    rivi.className = 'rivi';
    const nimi = document.createElement('span');
    nimi.textContent = nimiTeksti;
    const ryhma = document.createElement('span');
    const napit = vaihtoehdot.map((v, i) => {
      const n = document.createElement('button');
      n.textContent = v;
      n.style.marginLeft = i === 0 ? '0' : '3px';
      n.classList.toggle('valittu', i === 0);
      n.addEventListener('click', () => {
        for (const nn of napit) nn.classList.toggle('valittu', nn === n);
        onKytkin(avain, v);
      });
      ryhma.appendChild(n);
      return n;
    });
    rivi.append(nimi, ryhma);
    juuri.appendChild(rivi);
  };

  kytkinRivi('Aurinko', 'aurinko', 'Päällä', 'Pois');
  kytkinRivi('Lamput', 'lamput', 'Päällä', 'Pois');
  kytkinRivi('Tuli', 'tuli', 'Päällä', 'Pois');
  valintaRivi('Pinnat', 'pinnat', ['A', 'B']);
  valintaRivi('Hahmot', 'hahmot', ['2D', '3D']);
  if (onkoLeijunta) kytkinRivi('Ajautuminen', 'drift', 'Päällä', 'Pois');

  const huomio = document.createElement('div');
  huomio.className = 'huomio';
  juuri.appendChild(huomio);
  let huomioAjastin = null;
  const naytaHuomio = (teksti) => {
    huomio.textContent = teksti;
    clearTimeout(huomioAjastin);
    huomioAjastin = setTimeout(() => { huomio.textContent = ''; }, 4000);
  };

  const tilaRivi = document.createElement('div');
  tilaRivi.className = 'tilat';
  juuri.appendChild(tilaRivi);
  const teeTilaNappi = (id, nimiTeksti) => {
    const n = document.createElement('button');
    n.textContent = nimiTeksti;
    n.addEventListener('click', () => onTila(id));
    tilaRivi.appendChild(n);
  };
  teeTilaNappi('', 'Yleisnäkymä');
  for (const t of tilat) teeTilaNappi(t.id, t.nimi ?? t.id);

  return { naytaHuomio };
}
