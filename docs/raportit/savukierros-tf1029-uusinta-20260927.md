# 1.0.29-uusinta (TF 1.0.29 / c567fa57), 27.9.2026 ~12.3x-13.1x

Jatkokierros edellisen (savukierros-tf1029-20260927.md) puutteisiin: koordinaattibugi korjattu
(löydös alla), pulu+puhevirta uusittu oikealla äänenmittauksella (`aani mittaa`, ei play()),
UI-kohteet ajettu, iPad-kierros tehty. 0 poikkeusta koko session ajan (molemmat laitteet).

## Korjattu sudenkuoppa: tap-koordinaatit

`ui puu` -komento (UiKomennot.cs) dumppaa koko UI-puun tarkoilla laitepiste-koordinaateilla
`Documents/ui-puu.json`:ään. Tämä on OIKEA tapa löytää napautuskohteet — ei kuvakaappauksen
silmämääräinen arviointi. Kalibroitu ja vahvistettu toimivaksi (esim. "Laita äänet päälle"
-painike osui täsmälleen ui puu:n antamilla koordinaateilla). Lisätään reseptiin pysyvästi.

## Tulokset

- **Pulu ilman äänikytkimiä: PASS, todistettu äänimittauksella.** `puhe pois` (Paalla=false) +
  `ui chat` + kaiutinvipu ON (`ui puu` löysi `mk-chat__kaiutin-pois`-ikonin, napautettu oikein) +
  `ui chat <kysymys>` (Kysy-metodi ottaa parametrin suoraan komennolla, ei tarvitse napauttaa
  kysymyspalikkaa). Pollon vastauksen aikana `aani mittaa 3`: **rms 0,10647, huippu 0,7577,
  soivia 3 [MatkakirjaPuhe:@1,00, ...]** — MatkakirjaPuhe-kanava soi täydellä voimakkuudella
  vaikka yleinen puhe on pois. Todistettu kolmesti onnistuneena (virta pois -tilassa).
- **Puhevirta: FAIL, toistettu 3x samalla virheellä.** `puhe virta paalle` + `ui chat <kysymys>`:
  **"ei latautunut (virta): Data Processing Error, see Download Handler error 200"** — striimaus
  epäonnistuu johdonmukaisesti HTTP 200:sta huolimatta (DownloadHandlerAudioClip ei pysty
  jäsentämään dataa). `puhe virta pois` samalla kysymyksellä TOIMII (`puhe: alkoi 16933 ms
  pyynnöstä (verkko)`, ei virhettä, ääni soi mitattuna `aani mittaa`:lla rms 0,10647). Bugi on
  spesifisti streaming-polussa (SoitaVirtana/DownloadHandlerAudioClip), ei yleisessä TTS:ssä.
  **Natiivisepälle: ei kuulostaisi haittaavan pelattavuutta (fallback toimisi jos virta oletuksena
  pois), mutta jos virta on oletuksena päällä 1.0.29:ssä, KAIKKI pollo-chat-vastaukset ovat
  äänettömiä käyttäjälle.**
- **Nostokortin ylärivi + luennan säätimet (ratas, kaiutin tauko/jatko, VU-kaaret): iPhonella
  PUUTTUU KOKONAAN, iPadilla TOIMII — laitekohtainen layout-bugi.** Testattu kahdella nosto-
  tyypillä iPhonella (`ui nosto kohde:pompeji@ITA` ja `ui nosto skandaali:shakkiturkkilainen`):
  `ui puu`-dumppi (115-122 elementtiä) ei sisällä YHTÄÄN `mk-nosto__ylarivi`-luokan elementtiä
  kummassakaan, ei myöskään `mk-lukija__ratasikoni`/`mk-kaiutin`-elementtejä kortin sisällä. Sama
  testi iPadilla (`ui nosto kohde:pompeji@ITA`) NÄYTTI ylärivin täydellisenä: symboli+"HISTORIA"-
  teksti, `mk-lukija__ratasikoni` (ratas) JA `mk-kaiutin__osa mk-lukija__kaari` (VU-kaaret/kaiutin)
  — kuvakaappauksella vahvistettu (rataskuvake + kaiutinkuvake otsikon "Pompeji" vieressä). Ei
  poikkeuksia lokissa kummallakaan laitteella — todennäköisesti Ylarivi()-rivin flex-layout
  romahtaa nollaleveydeksi kapealla iPhone-ruudulla (402 pt) mutta ei iPadin 1032 pt:llä.
- **Maailma auki (mannerlennot): PASS.** `koetila mannerlento` → lokissa "koetila mannerlento
  (europe), mannerlentoja 6" — mannerlento-järjestelmä aktivoitui oikein ehtojen täytyttyä.
- **Nimiöt väistävät erikoismalleja / pienten maiden lähitason kynnys: EI EHDITTY tälläkään
  kierroksella** (aikaa kului koordinaattibugin ratkaisuun ja äänitestien toistoon). Suosittelen
  seuraavalle kierrokselle.
- **iPad-kierros: PASS ydinkohteille.** `uusi-peli 1 ateena` + meri (purjelaiva/merihirviö/
  delfiinit GRC:ssä, sama kuin iPhonella), lähitaso LOD0 (10 instanssia kerroin≥3,34:llä), nostot
  heti/tila — kaikki konsistentteja iPhone-tulosten kanssa. 0 poikkeusta. Sammutettu turvallisesti.

## Yhteenveto

Kaksi todellista löydöstä korjattavaksi 1.0.30:aan: **(1) puhevirran striimaus epäonnistuu
Data Processing Error -virheeseen** (fallback virta=pois toimii), **(2) nostokortin ylärivi
(ratas/kaiutin/VU-kaaret) puuttuu iPhonella mutta toimii iPadilla** — todennäköisesti
kapean-ruudun flex-layout-bugi. Pulu ilman äänikytkimiä ja maailma auki/mannerlennot PASS
todistettuina. iPad-ydinkierros PASS. 0 poikkeusta molemmilla laitteilla koko session ajan.
Jäljellä: nimiöt väistö, pienten maiden kynnys.
