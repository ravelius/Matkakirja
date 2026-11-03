# Valosepän luovutus 3.11.2026 klo 03.15

Syy: konteksti 25 % (pehmeä raja). Edellinen: viesti-valoseppa-luovutus-20261103-0252.md (pysyvät työtavat -20261101-2124.md,
-2220.md voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`. Python: `_tyo/linssiseppa2/tulivuoret/venv/bin/python`.
Esikatselu vain JU:n "ESIKATSELU NYT" -viestillä (JU local_06f8c680…); ajo.zsh:ssä `PROTO_LINJA=2` → vaihda JU:n antamaan linjaan.

## ODOTTAA JU:N VUOROA: sarja sal9 + hur1 (pyydetty 03.14, enintään 2 ajoa)
1. **sal9** (`salamat-aito/sal9/ajo.zsh`, e90183d39): edellinen yritys katkesi nollaukseen ennen Unityä. Kun ajettu:
   pari sal8 a0 | sal9 a0 (keijun yläpää häivytetty 80–92 km, sama rajaus) → PT 3 riviä.
2. **hur1** (`hurrikaani-aito/hur1/ajo.zsh`, 0365a9668, proto `linssiseppa2/hurrikaani-aito`, natiivi-backupissa): kuvat
   p-pysty | a-pysty | a-pysty-z25 | a-vino | a-vino-z25 | p-vino (p = proseduraalinen Hurrikaani, a = aito lauta). Pari
   p-pysty | a-pysty ja p-vino | a-vino samasta kohdasta → PT. Tarkista: lauta näkyy (lukko/kohdistus ei käytössä, katse käsin),
   silmä ruudun keskellä pystyssä, lauta ei leikkaa/peitä nimiä oudosti (renderQueue nimien jälkeen, SarjaKm > 0).

## Hurrikaani aidoista (jono 2) – tehty 02.58–03.12
- Lähde: ISS056-E-162184…162204 (Florence 12.9.2018 11.52.14–11.53.43 UTC, Nikon D5 17–35 mm, Gerst; PD, NASA Gateway).
  Löytyi kehysnumeropyyhkäisyllä (`haku/pyyhkaisy.txt`, `skriptit/meta.py`); Gatewayn tekstihaku ei löydä "Florence"-myrskyä.
  Varalla: 162086–162099 silmän lähikuvat 50–500 mm (lähilauta myöhemmin, kuten Etnan lahi), 162056–60 kalansilmä (ei käytetty).
- Keskus HURDAT2 (nhc.noaa.gov, robots sallii) 11.53 UTC: 29,39 N 70,68 W (`haku/hurdat2.txt`).
- `skriptit/silma.py` → rek/silma.json (21/21). `skriptit/ratkaise.py` → rek/kamerat.json: aseman rata nadirpisteistä, kuvakohtainen
  kierto + polttoväli, k1/k2, limbi vinoissa (20 km), SubSecTimeOriginal-ajat (ilman niitä polttoväli karkasi 20,5 mm:iin).
  Jäännös peräkkäiset parit 0,2–0,6 km, 22–26 s:n välit 2–3,5 km (pilvien korkeusparallaksi), 17 mm → 17,9 mm.
  Ratkaistu silmä 37 km N / 13 km W HURDATista = ratasuuntainen (kameran kellon siirto ~5 s tai HURDAT-virhe; ei haittaa).
- `skriptit/leivo.py sarja2 2048 1000 <11 kuvaa>` → itä–pohjoinen-taso 12 km, pohjoinen ylös, valotus tasattu sarjan mediaaniin,
  aukot lähimmistä, yhteinen maski. Asennettu `asenna-sarja.py` → Resources/Tulivuoret/florence-sarja (11 Mt).
- Tunnettu: lounaan suorakaide puuttuu (Dragon/paneelirajaus vinoissa kuvissa), täyttösaumoja (harmaat kiilat) 162185/189/191:ssä.
  Peli valitsee kuvan vain |katse|:n mukaan; pysty (188, W–SW) → vino (189+, SE) -siirtymässä parallaksin suunta vaihtuu.

## SEURAAVAKSI
- hur1:n tulosten mukaan korjaukset → pari PT:lle. Sitten jono 3 pimennys (PT päättänyt: 2024/2017-kuva, sijainti laskennasta),
  4 tähdenlennot (SUUNNITELMA-ISS-ILMIOT-20261103.md).
