# Laitekierros 20 — v1982 tuotanto, iPhone 18 Pro -simulaattori (Safari)

20.9.2026 n. klo 22.17–22.27. Testattu matkakirja.app (tuotanto, v1982
vahvistettu `git show origin/main:js/main.js`). Kaappaukset
`docs/raportit/kaappaukset/laitekierros-20-20260920/`.

## 1) Nimiöt Marseille/Bordeaux zoomattuna

`marseille-nimiot.png`: Marseillen ympäristön nimiöklusteri (Roquefavour,
La Bonne Mère, Marseillen saippua, Cosquerin luola, Pétanque) on tiheä
mutta luettava — en löytänyt yhtään reunaan leikattua tekstiä.
Kaksi merkkiä (La Bonne Mère / Marseillen saippua) ovat lähekkäin mutta
molempien nimet erottuvat. En saanut karttaa zoomattua fyysisesti
tiiviimmäksi tällä laitteella (nipistys ei liikuttanut näkymää tämän
zoomin yli — kamera pysyy pelaajakeskeisenä, sama rajoite kuin
kierros 19:ssä), joten en nähnyt aivan lähintä tasoa.

## 2) Nostokortin karuselli ja kuvakoko

`nostokortti-karuselli.png` (Chaîne des Puys, tuotannon oikea kortti):
karusellilaskuri "1 / 2" ja nuolet (‹ ›) näkyvät kuvan päällä, kuva
täyttää lähes koko kortin leveyden — selvästi isompi kuin ennen
v1982:ta. **En pystynyt testaamaan pyyhkäisyä tai nuolinapin
napautusta simulaattorilla**: sama ilmiö kuin "Liiku"-napissa tänään —
kosketus ei rekisteröidy tälle elementtityypille synteettisen
tap/touch_path/swipe-injektion kautta (kokeilin molempia, useita
kertoja), vaikka LISÄÄ- ja X-napit samalla kortilla toimivat
moitteetta. Tämä on jo raportoitu simulaattorityökalun omaksi
rajoitteeksi ("Liiku"-diagnoosi), en toista tutkintaa tässä.

Playwright/WebKit-tarkistus (Pic du Midi de Bigorre, 3 kuvaa,
paikallinen palvelin): kortti avautui otsikolla "LUONTO · VUORI",
kuvat latautuivat, LISÄÄ-tilan kuva on iso — rakenne vastaa
tuotannon näkymää.

## 3) Lähderivi — EI poistettu (löydös, vakavuus 2)

**Pic du Midi de Bigorre -kortin (ja oletettavasti muidenkin)
LISÄÄ-tilan lopussa näkyy yhä lähdeviite-rivi** visakysymysten
jälkeen:

> *"en-Wikipedia 'Pic du Midi de Bigorre' ja fr-Wikipedia 'Pic du Midi
> de Bigorre', johdanto-osat (tarkistettu 18.9.2026)."*

Toistopolku: paikallinen palvelin + tallenne (pelaaja Brysselissä) →
`maanKohdetiedot(ui,'FRA').get('hahmotelma-pic-du-midi')` →
`avaaFokuskohde` → LISÄÄ-nappi. Kuva
`pic-du-midi-lahderivi.png` (koko kortin teksti alusta loppuun asti).

**Varaus:** en varmuudella tiedä, tarkoittiko Fablen "lähderivi pois"
juuri tätä Wikipedia-tarkistusriviä vai jotain muuta (esim. kuvan
omaa erillistä kuvalähde-mainintaa, jota en nähnyt tässä kohteessa).
Jos tämä oli tarkoituksella jätetty (akateeminen jäljitettävyys), ei
ole vika — pyydän vahvistusta ennen kuin tätä käsitellään korjattavana.

## 4) Gironde — yksi viiva

`gironde-yksi-viiva.png`: Girondenjokisuun rannikko (Dune du Pilatin
kohdalla, Biskajanlahti) piirtyy yhtenä yhtenäisenä ääriviivana koko
matkalta — en löytänyt kaksinkertaista tai limittäistä viivaa
suistoalueella millään zoomilla, jota tällä laitteella pääsin
tarkastelemaan.

## Yhteenveto

| Kohta | Tulos |
| --- | --- |
| Nimiöt Marseille/Bordeaux | OK, ei reunaleikkautumista |
| Karusellilaskuri + isompi kuva | OK, näkyy oikein |
| Karusellin pyyhkäisy/nuolet | Ei testattavissa (työkalurajoite) |
| Lähderivi pois | **EI TOTEUTUNUT** — rivi näkyy yhä (vakavuus 2, varmistusta vaille) |
| Gironde yksi viiva | OK |
