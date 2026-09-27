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
- **Nostokortin ylärivi + luennan säätimet (ratas, kaiutin tauko/jatko, VU-kaaret): PASS, EI BUGI
  — oma virhearviointi korjattu (kiitos Natiivi-UI:n huomiosta).** Alun perin raportoin nämä
  puuttuviksi iPhonella, koska `ui puu` listaa vain NÄKYVÄT elementit ja ylärivi jää LISÄÄ-
  napautuksen jälkeen vierityksen yläpuolelle (löydös 131: kuva pysyy paikallaan, kortti vierittää
  ali). Vedin korttia alas (swipe y 300→750) → SKANDAALIT-otsikko + ratas + kaiutin ilmestyivät
  näkyviin täsmälleen odotetusti. Kuvat: proto-3d/lokit/laitetestaaja-ylarivi-puuttuu/
  (vaihe1-*, vaihe2-*-ei-ylarivia [vierimättä, siis normaali], korjaus-ylarivi-nakyy-vedettyna-*).
  iPadilla kortti on korkeampi eikä vieritä yläriviä pois, siksi näkyi heti ilman vetämistä.
  EI vaadi korjausta 1.0.30:aan tämän löydöksen osalta.
- **Maailma auki (mannerlennot): PASS.** `koetila mannerlento` → lokissa "koetila mannerlento
  (europe), mannerlentoja 6" — mannerlento-järjestelmä aktivoitui oikein ehtojen täytyttyä.
- **Nimiöt väistävät erikoismalleja / pienten maiden lähitason kynnys: EI EHDITTY tälläkään
  kierroksella** (aikaa kului koordinaattibugin ratkaisuun ja äänitestien toistoon). Suosittelen
  seuraavalle kierrokselle.
- **iPad-kierros: PASS ydinkohteille.** `uusi-peli 1 ateena` + meri (purjelaiva/merihirviö/
  delfiinit GRC:ssä, sama kuin iPhonella), lähitaso LOD0 (10 instanssia kerroin≥3,34:llä), nostot
  heti/tila — kaikki konsistentteja iPhone-tulosten kanssa. 0 poikkeusta. Sammutettu turvallisesti.

## Yhteenveto

Yksi todellinen löydös korjattavaksi 1.0.30:aan: **puhevirran striimaus epäonnistuu Data
Processing Error -virheeseen** (fallback virta=pois toimii). Nostokortin ylärivi osoittautui
EI-bugiksi (oma virhe, korjattu yllä — kiitos Natiivi-UI:lle nopeasta huomiosta). Pulu ilman
äänikytkimiä ja maailma auki/mannerlennot PASS todistettuina. iPad-ydinkierros PASS. 0 poikkeusta
molemmilla laitteilla koko session ajan. Jäljellä: nimiöt väistö, pienten maiden kynnys.

## BUILD 29b -tarkistus (master 20ce6a28, käännös b29b-49ea64ee), 27.9.2026 ~13.3x

Natiiviseppä korjasi: Puhe.Virta oletus pois. Vahvistettu: uudessa pelissä (`uusi-peli 1 pariisi`,
ei asetettu mitään puhe-komentoa) `puhe virta` → "virta pois, 1. ääni -1 ms" (oletusarvo, ei minun
asettamani). Käyttäjän oikea polku: `puhe pois` (yleinen kertoja pois) + kaiutinvipu ON napautuksella
(EI komentoriviltä) + `ui chat <kysymys>` — vastaus alkoi "puhe: alkoi 14833 ms pyynnöstä (verkko)"
IHAN ILMAN Data Processing Error -riviä. `aani mittaa 3`: **rms 0,13432, huippu 0,7061, soivia 1
[MatkakirjaPuhe:@1,00]** — puhtaasti puhekanava soi täydellä voimakkuudella, ei virhettä.

**PASS.** Bugi korjattu BUILD 29b:ssä. 0 poikkeusta.
