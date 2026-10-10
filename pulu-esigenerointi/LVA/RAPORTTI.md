# Pulu LVA (Latvia): raportti

- Vastauksia: vaihe 1 = 195 (39 kohtaa × 5), vaihe 2 = 426 (linkkitaso "Kerro lisää"); yhteensä 621.
- Kesto: noin 43 min (vaiheen 0 latauksesta pakettiin; agentit enintään 2 rinnakkain, Sonnet, effort low).
- Agenttien tokenit yhteensä: noin 2 171 000 (vaihe 1: 815 689; vaiheen 1 käsitekorjaukset: 140 682; vaihe 2: 1 214 616).
- Tarkistus (tarkista-era.mjs): vaihe 1 ensimmäisellä ajolla 44 virhettä, kaikki liian vähän [[käsitteitä]] (0–1, vaaditaan 2–5); korjattu kahdella korjausagentilla, lopputulos 0 virhettä. Vaihe 2: 0 virhettä.
- Tarkistus (tarkista-valmis.mjs): lopputulos 0 virhettä, 0 varoitusta (195 + 426). Aiemmat "lisaa-avainta"-virheet kuuluivat vain ennen vaihetta 2.
- Faktojen pistokoetta (30 vastausta) ei ajettu koneellisesti eikä käsin; se jää omistajalle/Päätoimittajalle. Vaiheen 2 agentti nosti tarkistettaviksi: Kandavan, Kolkan majakan ja Kuldīgan tiilisillan rakennusvuodet, Ruhnun puukirkko, Slīteren majakka sekä "Kūolka"-nimen selitys.
- Paketti: pulu-esigenerointi/LVA/LVA.json (39 kohtaa, 195 kysymysvastausta, 426 linkkivastausta); pulu-esigenerointi/maat.json päivitetty (vain LVA-rivi).
