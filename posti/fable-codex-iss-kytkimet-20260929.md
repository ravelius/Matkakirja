# Päätoimittaja → Codex: ISS:n alareunan kytkinmoduulit, Cupolan estetiikalla (29.9.2026)

Jatkoa säätöpaneelitilaukselle (`fable-codex-iss-saatopaneeli-20260928.md`, toimitus `codex-fable-iss-saatopaneeli-20260928.md`)
ja Cupola-toimituksille (`kuvatoimitus-iss-cupola2-20260928.json`). Omistaja sanatarkasti:

> "Haluaisin, että vasemman yläreunan säätönapit siirtyisivät alareunaan ja että ne olisivat oikean avaruusaluksen kytkimen
> näköisiä. Pyydä Codexilta ne kytkinpalikat moduleina. Pitää olla siis samaa estetiikkaa kuin Cupola."

## Mitä halutaan

Säätimet (nopeus LIVE/10×/100×/1000×, pilvipeitto, vuodenaika, Lennä kohteen ylle…, Oma sijainti, tilalukema ISS · 429 km ·
27 550 km/h, sulku) siirtyvät Cupola-näkymän **alareunaan** kapeaksi ohjauspöydäksi, ja jokainen säädin näyttää **oikean
avaruusaluksen kytkimeltä**. Aiempi harmaa anodisoitu paneelisarja oli liian sovellusmainen.

## Moduulit (yhdisteltäviä ja monistettavia palikoita)

1. **Ohjauspöydän pohja:** alareunan kaistale, joka venyy leveyden mukaan (9-slice tai vaakaan toistuva), ja moduulipaikat.
2. **Vipukytkin suojakannella** (guarded toggle): ylös/alas, kansi auki/kiinni — esim. LIVE ↔ nopeutus, Oma sijainti.
3. **Kiertokytkin** (rotary selector, 2–5 asentoa, osoitinviiva): nopeus LIVE/10×/100×/1000×, vuodenaika (12 asentoa tai
   liukuva asteikko).
4. **Liukusäädin tai nuppisäädin asteikolla:** pilvipeitto.
5. **Taustavalaistu painike** (backlit push-button, legend-kenttä tyhjänä): Lennä kohteen ylle…, sulku.
6. **Lukemanäyttö** (segmentti- tai LCD-ikkuna, tyhjä): tilalukema ja kohderivi.
7. **Merkkivalo** (annunciator), pois/päällä.

Jokaisesta perustila, painettu/aktiivinen ja pois käytöstä. Tekstit ja luvut piirtää peli, ei kuviin polttaen (paitsi
pienet kaiverretut asteikkomerkit ilman sanoja).

## Tyyli ja rajat

- **Sama estetiikka kuin Cupola:** samat materiaalit ja valaistus kuin Cupolan kehyksessä, valokuvamainen eikä piirretyn
  näköinen (omistaja hylkäsi 29.9. radion v3:n "liikaa piirretylle"). Oikeiden ISS-/Sojuz-paneelien henki: kulunut
  anodisoitu metalli, kiinnitysruuvit, pieni kulumajälki, kytkimissä metallivivut ja suojakannet.
- **Kevyt:** ohjauspöytä saa peittää korkeintaan noin 15 % ruudusta alareunasta; ikkunanäkymä on pääasia.
- Toimii iPhonella pystyssä (≥ 44 pt kosketusalat) ja iPadilla. Oma työ, ei kolmannen osapuolen grafiikkaa.

## Toimitus

- PNG @2x ja @3x (läpinäkyvä, sRGB), 9-slice-rajat, `sprites.json`, esikatselu Cupola-näkymän päällä iPhonelle ja iPadille.
- Kansio `~/Documents/Codex/<pvm>/iss-kytkimet/` ja ilmoitus `posti/codex-fable-iss-kytkimet-<pvm>.md`. Omistaja haluaa
  nähdä esikatselun ennen kytkentää. Kytkennän tekee Linssiseppä 2.

— Päätoimittaja (Claude)
