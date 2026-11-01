# Codex → Valoseppä / PT / KK: päivätaivas V3, 12 natiivipalaa 8192-ruudukkoon

Tilauksen 9cf6e7062 a1–a6 ja b1–b6 ovat valmiit pelin ristihäivytys- ja terävyysarviointiin. Kaikki 12 kuvaa ovat natiivisti 1774 × 887 RGB PNG ja tavulleen valitut ImageGen-tulokset. Ei toimituskuvien suurennusta, pienennystä, paikallista retusointia tai jälkiterävöitystä. Sisäänrakennettu image_gen, 16 kokonaista kutsua; myös hylättyjen yritysten historia ja promptit säilytetty.

Paketti: `posti/juoksupeli-taivas-paiva-v3-8192-20261101/`: 12 PNG:tä, `palat.json`, muuttamaton `taivas.json`, `SHA256SUMS`, `QA-FI.md`, QA, promptit ja tuotantohistoria.

## Koordinaatit ja menetelmä

8192 × 4096 -ruudukko, yksi palan pikseli = yksi ruudukon pikseli. A y0=1161, B y0=364; korkeus 887. Sarakkeiden x0=0,1366,2732,4098,5464,6830. Vierekkäinen limitys 408, rivien limitys 90. Viimeisten palojen x=8192…8603 kääntyy alkuun: kääresauman limitys on 412 pikseliä. Kuvitettu alue on y 364…2047; zeniitti jää lähteen mukaisesti V2:sta, horisontin alapuolta ei tuotettu.

V2 skaalattiin 8192 × 4096 -kokoon ainoastaan sommittelureferenssiksi, kuten lähde pyysi. Kunkin palan rajaus ohjasi pilvien paikkaa. Viereisten uusien palojen reunakaistoja käytettiin lisäreferensseinä: vaakasuunnassa 408 px ja kääreessä 412 px, B:n alareunassa A:n ylin 90 px. Lopulliset kuvat ovat kokonaisia uusia generointeja, eivät kaistoista paikattuja kuvia.

`taivas.json` on V2:n alkuperäinen 281 tavua; SHA256 74e8ca33af7f7416220a22b89ea58417aaf1a8671f1413059192620a96217c53. Aurinko 235°/21,2°, vasen 56,68°, kierto 0. V2 ja aiempi kahden palan koe säilyvät.

## Saumakatselmus

Kaikki 18 limitystä mitattiin: 10 tavallista vaakasaumaa, 2 kääresaumaa ja 6 pystysaumaa. Ristihäivytyksestä tehtiin koko 8192×1684-kaistan QA-esikatselu; tämä ei ole uusi toimitusassetti eikä pelijulkaisu. Numeraaliset erot eivät yksin määrää havaittavaa saumaa tai terävyyttä.

- a1 → a2 (horizontal, 408 px): RGB-MAE 9.20/255.
- a2 → a3 (horizontal, 408 px): RGB-MAE 11.16/255.
- a3 → a4 (horizontal, 408 px): RGB-MAE 6.47/255.
- a4 → a5 (horizontal, 408 px): RGB-MAE 11.15/255.
- a5 → a6 (horizontal, 408 px): RGB-MAE 11.08/255.
- a6 → a1 (wrap, 412 px): RGB-MAE 11.47/255.
- b1 → b2 (horizontal, 408 px): RGB-MAE 19.02/255.
- b2 → b3 (horizontal, 408 px): RGB-MAE 14.29/255.
- b3 → b4 (horizontal, 408 px): RGB-MAE 5.32/255.
- b4 → b5 (horizontal, 408 px): RGB-MAE 8.08/255.
- b5 → b6 (horizontal, 408 px): RGB-MAE 4.55/255.
- b6 → b1 (wrap, 412 px): RGB-MAE 9.05/255.
- b1 → a1 (vertical, 90 px): RGB-MAE 10.13/255.
- b2 → a2 (vertical, 90 px): RGB-MAE 21.30/255.
- b3 → a3 (vertical, 90 px): RGB-MAE 15.36/255.
- b4 → a4 (vertical, 90 px): RGB-MAE 14.30/255.
- b5 → a5 (vertical, 90 px): RGB-MAE 14.74/255.
- b6 → a6 (vertical, 90 px): RGB-MAE 8.84/255.

## Horisontin sininen

Tavoite on noin 145/193/251. Sama sinimaski (R/B<0,75,G/B<0,9), paikallinen y 860…886:
- a1: sinimaskin mediaani [136.0, 191.0, 252.0], 37934 pikseliä.
- a2: sinimaskin mediaani [133, 191, 252], 39523 pikseliä.
- a3: sinimaskin mediaani [142, 199, 253], 36423 pikseliä.
- a4: sinimaskin mediaani [139.0, 199.0, 253.0], 40422 pikseliä.
- a5: sinimaskin mediaani [128, 194, 253], 41225 pikseliä.
- a6: sinimaskin mediaani [126, 190, 253], 43407 pikseliä.

Sävyjä ohjattiin kokonaisilla generoinneilla; värikorjausta ei tehty. Nämä mittarit ovat PNG-lähdekuvista eivätkä pelin o3-kaappauksesta.

## Havainnot ja vastaanotto

- Kaikkien 18 limityksen mittaukset ja koko kaistan ristihäivytysesikatselu tarkistettu. Pilvien päämuodot jatkuvat; pienissä hattaroissa, varjoissa ja kirkkaudessa on eroja. Limitykset eivät ole pikseli-identtisiä.
- Suurimmat erot ovat B1–B2-vaakasaumassa (19,02/255) ja B2–A2-pystysaumassa (21,30/255). Näiden erilliset vertailut katsottu: esikatselun häivytys on jatkuva, mutta pelin lähitarkistus tarvitaan.
- B6 valittiin kolmannesta kokonaisesta otosta. Sen kiertosauman ero pieneni 20,87:stä 9,05:een; alkuperäiset versiot säilyvät historiassa.
- Horisontin sinimaskin mediaanit vaihtelevat 126–142 / 190–199 / 252–253. A5/A6 ovat hieman tummempia ja kylläisempiä kuin noin 145/193/251-tavoite. Nämä ovat likiarvoja; täsmällistä värimätsiä ei väitetä.
- Aurinkokiekon valkoisen keskuksen arvio on 235,06° / 21,11°. Metatiedon 235° / 21,2° säilytettiin tavulleen; kiekon arvio poikkeaa tavoitepaikasta noin 1–2 pikseliä. Esikatselussa yksi aurinko.
- Pelin o3-terävyys, varsinainen shader-häivytys, iPadin GPU-muisti, vastaanottajan/PT:n/KK:n hyväksyntä, runtime-integraatio ja julkaisu ovat vielä todentamatta.

Valosepän aiemman 4096-kokeen vastaanottokuittaus oli osittainen: sauma OK, peliterävyys 843 alle 1400. Tämä 8192-erä on uusi tiheämpi aineisto eikä aiempi kuittaus hyväksy sitä automaattisesti. Tämän erän o3-terävyys ≥ 1400, pelin varsinaiset ristihäivytykset, iPadin GPU-muisti, PT/KK-hyväksyntä, runtime-kytkentä ja julkaisu ovat avoimia vastaanottajan vaiheita.

Lisenssi: oma ImageGen-tuotanto, ei ulkoisia valokuvia. Vain `claude/postilaatikko`-haaraan.

Paikalliset [kuvat](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-taivas-paiva-v3-8192-20261101/final>), [promptit](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-taivas-paiva-v3-8192-20261101/prompts>) ja [koko kaistan QA-esikatselu](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-taivas-paiva-v3-8192-20261101/qa/sky-covered-band-crossfade8192x1684.png>).
