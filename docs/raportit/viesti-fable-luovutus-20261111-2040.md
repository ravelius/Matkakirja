# PT:n luovutus 11.11.2026 klo 20.40 (konteksti 30 %)

Korvaa -1722:n (d4691173b) juna- ja roolikohdat. Viestit: mcp__ccd_session_mgmt__send_message session-id:llä (osoitekirja).
Pt-ok-tiedostot: /Users/Shared/Claude/julkaisija-tyokalut/linkki-224-uutta/.

## Omistajan päätökset tällä vuorolla (lokissa + Raamatussa: PR 6580 ja 6581, main)
- 18.44 Soundly-haku huomenna 12.11. (työlistarivi "Kenkäleiman ääni Soundlysta", este, KK kysyy).
- 19.16 "Lukitaan": Pariisin lukittu loppulista, KK lukitsi 19.20: scratchpad/keskustelukanava/suunnitelmat/20261111-pariisi-lukittu-loppulista.md
  (8 avointa; uudet löydöt toiselle kierrokselle, jarjestys.md 19). Raamattu 2.215.
- 19.16 "Työkalut ensin": kolme kaupunkityökalua ennen Lontoota; tehtävänannot KK 20.5x suunnitelmat/20261111-kolme-tyokalua-tehtavananto.md,
  JAETTU 20.38 (JU työkalu 3, NUI kohdeluettelo, NS lokirivit + kaupunkitaulu, KS tee-palat + työkalu 2 luonnokset). Roolit vastaavat ensin KK:lle.
- 19.58 A–D (suunnitelmat/20261111-omistaja-1958-saapuminen-ja-tekstit.md), 20.11 + 20.17 tekstiohjeet ja rajat 250/150 → Raamattu 3.6 (PR 6581).
- 20.31 Pariisin isoisän + pulun lopulliset tekstit (suunnitelmat/20261111-pariisin-tekstit-lopulliset.md).

## Juna 224
- Linkissä: 224.75 (17.29), .76 (17.58), .77 (18.15), .78 muste (18.47), .79 napautus + sulku (19.09), .80 KS pallo + NUI kyltti (19.26),
  .81 NUI rungon rajat (19.56).
- 224.82 = NUI napautus yhdelle etäisyydelle 14d331f06 (MR77, KK 20.26): käännös käynnissä; ehto junan Mac-arkki sk-yksi-etaisyys-2 (12 kohdetta 6 s) KK:lle.
- TEKEMÄTTÄ: yhteenveto 224.76–224.81 KK:lle (Riemukaari-lähin lokit/juna-riemukaari-lahin-5d382cb02 6/6 valmis). Pallon lisäehto (KK 19.20):
  224.80:n Mac-tallenne lokit/juna-pallo-tallenne-a48f8ee33 ajettu 19.30, JU:n tulos ei tullut PT:lle; pallo pieni, PT ei voinut varmistaa.
  Tarkista JU:lta, sitten yhteenveto KK:lle.

## Avoimet PT:lle
1. PR 6579 (NUI Petit Palais nosto + juttu): taustavahti yhdistää kun testit vihreät (gh run 43078601687). Tarkista: gh pr view 6579.
   Yhdistyksen jälkeen rivi NUI:lle "PR yhdistetty + äänet mediassa" → NUI tekee PP:n Mac-ajon kertojan kanssa → KK. PP-luenta mediassa (v10, 20.33),
   NUI kytkee ManifestiOletus v10 + natiivi 50ea00f74 samaan versioon.
2. Raamattu 2.6: "saapumisesittely alkaa itsestään" → oikein-merkin jälkeen + uusi kohta aarrekysymyksestä (suunnitelmat/20261111-aarrekysymys-saapuessa.md, KK).
3. KK:n vastaus Petit Palais'n uusinnasta (kieli pakotettu payloadissa, ei elevenlabs_kieli.pyynto; PT suositti ei uusintaa).
4. Pariisin uudet tekstit samaan versioon: SK tekstit fokusvirta-pariisi.js + pulun Commons-kuva (pyydetty), Codex isoisän kuva
   (tilaus postilaatikossa 03e25f092, kuittaus posti/codex-pt-isoisa-pariisi-kyyhky-*), äänet mediassa aanet/kaupunki-intro-v3/{isoisa,pulu}-pariisi.mp3
   (JU 20.37), NUI sivukuva baf16f90d + ecf7c28a6 (ajo sk-sivukuva-1 JU:lla). KK katsoo kuvat ennen käyttöä.

## Roolit
- NUI: A intro-nimet ed3045d1e (KK hyväksyi yhteisen ajastuksen), näyttö intro-nimet-1 JU:lla; erän 1 introrivit SK:n JSON f2680ef27 (6 katsomatonta pois);
  sääntö 9; sitten ohjaussauvat, D. Petit Palais odottaa PR 6579:ää.
- NS: latausjono katko-3 ee10425ff + palkki-2 34b73284a JU:lla; pala 3; NS odottaa nollausta (luovutus lisäys 22, 32d14960f).
- KS: KJ47c (5f44f5325) JU:lla → KK; 90b66a261 samaan erään KJ47b/c:n kanssa; Montmartre 01.00 maastovienti; Seine-katsaus.
- LAV: leivonta v5 + pala 3.1b tapa B koe yhdestä alueesta (KK 18.31).
- SK: nollaukseen (luovutus 7a736d17c, Postivahdille ilmoitettu 20.3x); jatko Pariisin tekstit → erä 2 vuodet → kuvatekstivirheet.
- Äänittäjä: jono tyhjä (Soundly huomenna).
- JU: 224.82, työkalu 3, T7→NAS C + A:n loppu seuraavalla JU-vuorolla.

## Työlista
Siivottu 19.2x (20 valmiiksi, 15 toiselle kierrokselle = myöhemmin + este, 4 Lontoo/Overture odottaa työkaluja). Varmuuskopio ennen siivousta:
PT:n scratchpad tyolista-ennen-siivousta.json (vain tämä sessio). Sivuvaikutus: NUI:n "Nähtävyys paisuu hetkeksi… (koe)" nousi työn alle; KK:lle kerrottu.
Huom: PR 6580 yhdistyi ennen checksejä (race), main-testit jälkikäteen vihreät; käytä gh run watch, ei gh pr checks --watch heti pushin jälkeen.
