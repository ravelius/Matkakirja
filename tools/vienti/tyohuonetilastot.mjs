/*
 * SKEEMA 1.28 (Natiivi-UI 24.9.2026): työhuoneen Tilastot-lehti natiivin
 * KOKEET-valikkoon. Web laskee taulun noin 20 paketista
 * (js/tyohuone-tilastot.js laskeTilastot); natiivilla niitä ei ole, joten
 * tulos viedään valmiiksi laskettuna. Sarakkeet = KAUPUNGIN_OSAT ja
 * MAAN_OSAT ilman laskufunktioita (avain, otsikko, selite, taso, luku =
 * solussa on lukumäärä).
 */
export function tyohuonetilastot(ns, taulukko) {
  const { laskeTilastot, KAUPUNGIN_OSAT, MAAN_OSAT } = ns;
  const sarake = (taso) => (o) => ({ avain: o.avain, otsikko: o.otsikko, selite: o.selite, taso, luku: typeof o.luku === 'function' });
  const kokoelma = taulukko('js/tyohuone-tilastot.js#laskeTilastot',
    'Työhuoneen Tilastot-taulu valmiiksi laskettuna (webin laskeTilastot()): alkio = manner { id, nimi, maat, '
      + 'kaupunkeja, summa, tehty, kaikki, osuus }; maat[] = { iso, nimi, solut, tehty, kaikki, osuus, summa, kaupungit[] }, '
      + 'kaupungit[] = { id, nimi, solut, tehty, kaikki, … }; solut.<avain> = { pari: [tehty, kaikki], teksti, luku }, '
      + 'summa.<avain> = [tehty, kaikki]. Juuren sarakkeet = taulun sarakkeet webin järjestyksessä '
      + '{ avain, otsikko (sarakeotsake), selite (title-vihje), taso kaupunki | maa, luku }.',
    {}, laskeTilastot());
  kokoelma.sarakkeet = [...KAUPUNGIN_OSAT.map(sarake('kaupunki')), ...MAAN_OSAT.map(sarake('maa'))];
  return kokoelma;
}
