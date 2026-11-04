# Valosepän luovutus 4.11.2026 klo 06.54

Syy: konteksti 25 % (pehmeä raja, Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261104-0630.md (lue Työkalut; sen kohdat 1 ja LISÄYS tehty, kohta 2 odottaa, kohta 3 osin tehty). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md. Tulokset _tyo/linssiseppa2/pariisi-tyyli/: k44/TULOS.md, k43/TULOS.md, k41/TULOS.md, k40/TULOS.md. KK:n linja: lokit/kk-peli-a94d8e7fb-20261103/KORJAUSLISTA.md, osiot "VS: k42", "VS: reuna k41", "VS: k39 ja k40".

## Tila (haarat natiivi-backup, wt /Users/Shared/Claude/wt/proto-linssiseppa2-k30, nyt haarassa pariisi-k44, puhdas; ei junaan)
- **k44 e97f26bcc** (linssiseppa2/pariisi-k44, p44, 615/615, pushattu, PT:lle lähetetty; viesti jonossa 06.53, kuittausta ei vielä): OMISTAJA 06.51 PT:n kautta: pienet kadut pois myös lähikuvasta, k40:n kadut z16–17. Sisältö: k41-reuna, läikkä a5f54a930, k43-portaat 75cee8f62, k39 + k40, z15 arkista mip 1, arkki repossa (materiaali-lahi.rgb = k40/sauma2-bul.rgb × 0,96/0,965/1,02; kerrointa ei mitattu tälle arkille). Seuraavan yhdistelmän VS-osa, EI hyväksytty pinta. Unity ja laite todistamatta.
- **k42** on hylätty katujen osalta omistajan päätöksellä; siitä otettiin vain z15:n rivi. ELAVA_KATURAJA ja PitkatKadut eivät ole k44:ssä.
- PT 06.4x: ei yhdistelmää ennen käskyä, ei omaa laiteajoa k43:lle. Tee yhdistelmä vain PT:n käskystä.
- **yhd5:** kuvia ei vielä 06.43 (JU: lokit/julkaisija-yhd5-iso-8dee95d57, kansiota ei ollut). Odotan JU:n riviä.

## Seuraavaksi
1. **Kun PT käskee: yhdistelmä k44:n päälle, laitteelta kuva KK:lle ennen hyväksyntää, muisti ja vieritys.** k41:n ehto: muistihuippu vähintään 300 Mt rajan alla, ruutuaika ei huonone reunalla; muuten reuna 1 200 / 450 m. Kuvat 0,13, 0,08, 0,05 täysikoossa. z14 | z15 zoomisarjasta: jos näkyy, ensin z15:n kattojen sävy kohti 2029:ää tai pehmeä vaihto (VS + NS).
2. **yhd5-kuvat täysikokoisina** edellisen luovutuksen kohdan 2 listan mukaan, rivi PT:lle.
3. **Pienet kohdat:** KK 06.24/7 (kaksoisviivat, ohut suorakulmio, sahalaita, kermalaikut), talo katkeaa kadun reunaan, arkki kaupunginosittain. z17:n Seinen rantaporras jää (k44/z17-rajaus.jpg x noin 600, y noin 150): SileaReuna koskee z ≤ 15, ja z16:lla sigma 10 m vaatisi enemmän kuin 64 näytteen varan. Saaren kärki z15 pyöreä, z16 terävä. Poistuvien katujen nimet ja liikkuvat: KS (06.24/3).
4. **Vyön puistot:** läikän korjaus näyttää muut rajan ulkopuoliset puistot tavallisena karttana (Mont-Valérien): katso laitteelta.
5. Vanhat: joki Pariisin jälkeen; k32 sora; raiteet z ≤ 14; kadut hieman keltaiset (yhd2/15).

## Opit
- Porras on kahden suoran rannan siirtymä, joten avaus + sulkeminen vain pyöristää kulmat. Pelkkä pehmennys hävittää kanavat ja altaat. k43 = pehmennys + kynnys vain leveän veden ytimen lähellä (ElavaMaski.SileaReuna). Tarkistuskuvat k43/pari-c.jpg, k43/pari-s.jpg.
- Arkin suora viiva: limitys oli 35 px, polku etsittiin 48 px:n kaistalta ja täyttämätön alue oli ilmainen. Korjattu k40/tee-arkki.py:ssä.

## Työkalut
Kuten edellisessä; lisäksi k44:n arkki k30/vari.py:llä (python venv-rembg). k38/aja.zsh käyttää työpuun omia pintoja, joten k44:llä arkki tulee mukaan; k39/aja.zsh kirjoittaisi sen yli omasta lähteestään, älä käytä sitä k44:lle.
