# Natiivi-UI: luovutus 20.10.2026 klo 16.22 (kova raja)

Korvaa -1438:n. Omistaja 15.11: vain voimassa oleva tila; historia docs/raportit/viesti-natiivi-ui-luovutus-20261020-1438.md ja
natiivi-ui-museo-1437-erat.md. Id:t /Users/Shared/Claude/osoitekirja.md. SIMU HARVOIN (omistaja 11.45, PT 16.1x): tähän erään EI
simukuvia eikä kuvapareja; automaattiset testit → NS runkoon → iso iPad, omistaja katsoo pelistä.

## TILA: Louvre 15.40 -erä (kohdat 1, 5, 6) VALMIS JA LÄHETETTY NS:lle
Proto-haara natiivi-ui/museo-siirtyma-209, kärki d89496ea8 (pohja natiiviseppa/juna-208 02d5ce390), worktree
/Users/Shared/Claude/wt/proto-natiivi-ui-museo-teoskortti-208 (puhdas). tarkista.sh puhdas, linssitestit kaikki läpi, kameratesti 32/32.
Viesti NS:lle (local_fcc10552) lähetetty jonoon 16.2x: "runkoon"; VALMIS-rivi PT:lle lähetetty 16.2x.
- 1 TASAINEN ZOOM: MuseoKierros.KavelyV2.cs ZoomNyt – liu'un aikana kameran korkeus suoraan alusta loppuun (yLiukuAlku→yLiukuLoppu,
  liukuEf); syy simulokista monalisa207v: lähikuvasta ulos 1,82 → 1,60 → 1,80 m. Testit AutoZoomRauhallinen (korkeus), AutoZoomRataTasainen
  (Kameratarkastus).
- 5 ALUN AVAUS POIS: MuseoSovitin.cs – museokäynnin 1. pysähdyksellä näyttelyn avaus ei soi (Louvre ranska-sali1-avaus-3 "Tässä salissa…"),
  loki "kertoja avaus … ohitettu".
- 6 MUSTA SIIRTO: ydin MuseoKierros.Musta.cs (häivytys 0,6 s → musta 1,6 s + latausodotus KohdeValmis ≤ 4 s → nousu 1,0 s ja lähestyminen
  ≥ 2,4 s peruutuspisteestä; MustaSiirto-kytkin, QA "museo siirto musta|kavely"), sovitin MuseoSovitin.Musta.cs (kalvo, loki), UI
  MuseoTaulu.Siirto.cs + OpasMetrolinja (Yksin, VaihtoS, Siirros, Juuri): metrokartta nimikyltin paikalla, merkki kulkee mustan alkaessa,
  perillä muut pysäkit häipyvät, sitten nimikyltti ristihäivytyksellä ja alarivi perään. Kävelytestit ajetaan MustaSiirto=false.

## JÄLJELLÄ / AVOIMET
1. (TEHTY) VALMIS-rivi PT:lle. Jono tyhjä uusien erien osalta → odota PT:n/NS:n viestejä (NS:n kysymykset erästä).
2. JU käänsi jo museo-siirto-209-appin (_tyo/natiivi-ui) ja kysyi PT:ltä simuluvan; peruutus JU:lle lähetetty (jonossa). Jos PT kieltää
   simun, app jää käyttämättä: _tyo/natiivi-ui saa olla enintään 2 appia → poista vanhin (juoksu-nimet-208e-app, jos NS ei enää tarvitse)
   tai museo-siirto-209-app. Skenaario valmiina tarvittaessa: tyokalut/natiivi-ui-ajot/ajo-museo-siirto-209.zsh + sk-museo-siirto-209.txt.
3. Omistajan pelipalautteen jälkeen mahdolliset viritykset: pysäkin nimi → nimikyltti -vaihto (eri teksti, jos ListaNimi lisää tekijän;
   vaaleassa salissa nimikyltti tumma, metro vaalea), siirron kestot (MuseoKierros.Musta*S, MuseoTaulu.Siirto*S), kertoja katkeaa häivytyksen
   alussa (ennallaan, kuten kävelyssä).
4. Juoksunimet natiivi-ui/juoksu-nimet-208 e6238c958 NS:n pidossa palatsin kanssa (ennallaan).
5. Kohta 4 (valoläikkä) Valosepällä, katsojat Lavastajalla – ei minun.

## Opit (uudet)
- Yli 8192 px:n teoksissa datan px ≠ paketin mitat → teos.json totuus (7904d8982).
- Liu'un siirtymä rajautuu RajaaZoomissa, jos näkymä on kehystä leveämpi → liikkumavaran osuus (9692e6e2d).
- Uusi kamera-/UI-liike: liikevahti hylkää Mathf.Exp-seurannan → Liikepohja.Jousi / Kayrat.Pehmea.Arvo.
- Saavu() asettaa katseluasennon korkeuden ja V2 laskee silmälle vasta seuraavassa ruudussa (yhden ruudun notkahdus): mustassa siirrossa
  korjattu perillä; kävelyssä ennallaan (testit odottavat sitä).
