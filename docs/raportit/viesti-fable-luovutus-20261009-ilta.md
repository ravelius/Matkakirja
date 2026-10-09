# Päätoimittajan luovutus 9.10.2026 klo 15.2x (oma nollaus, konteksti 67 %)

Syy: Raamattu KONTEKSTIN NOLLAUS → FABLEN OMA NOLLAUS (raja 65 %). Session id ennallaan local_593b89a1-2514-4d74-b956-2a73db862382.
Viikko 15 %, 5 h 54 %. Keskustelu tallennettu: /Users/Shared/Claude/keskustelut/ (Paatoimittaja-2026-10-09-klo-1342-*.md; edellinen 0046–1341).
Edellinen luovutus: viesti-fable-luovutus-20261009.md (aamupäivä).

## 1. Junat
- **TF 172 on sisäisillä** 14.1x (proto 1c2ecbe32, iOS 37919863047, muutosloki #4287, osoitin uusin-2 → v6b). Omistajalle kerrottu.
- **Juna 173: TF huomenna 10.10.** Päivän kahden TF:n raja täyttyi (171 + 172). Runko natiiviseppa/juna-173 38a9cd905, testit L1223/P433/K453, unity 0.
  - KUITATUT: NUI 80625b5c2, 8e7b0a8bb, 38ec50e9f, f6af5f0a8, c3270b673, a2ae61457 (+ peitto 0,85 -SHA tulossa); Pelikoodari 90edb9c44, cc22e018f; LS1 79dd01c90, 6c3e385b6, 2b9ba3189, 5fe96a74d; LS2 86bd795f1 (pbr), b64cb3b75 (talvi); Siirtoseppä 77c46e2d6 (v46e) ja 848021bae (Sonniss v4).
  - ODOTTAA PT:N KUITTAUSTA:
    - LS1 nykyintro e72956ff3: kuva-arkki ~15.45 → tarkista 3 suurinta virhettä → kuittaa.
    - Siirtoseppä historia ff65c5d0f + e5956eb15 (+ LR:n v46g-täyttö): arvio 6 illalla → kuittaa, jos kohdat 1–2 korjattu.
  - Julkaisija luo uusin-3.json (→ v6b) ennen TF 173:a. Natiiviseppä kirjoittaa muutosloki 173:n, ja PT tarkistaa sen.

## 2. Kesken ja omistajalle
- **ND ja KL (omistaja 15.0x HYLKÄSI v8:n ja v2b:n):** "erinäköinen kuin kaikki muut rakennukset ympärillä", katto ja tiilet toistavat. Osoitinta EI vaihdeta.
  - Linja (#4295): valokuvapohjaiset pinnat Codexilla.
  - Työnjako:
    - LR (nollattu 15.09) tekee ortografiset ohjekuvat.
    - Sisältökirjuri kerää Commons PD/CC0/CC BY -referenssit ja tilaa Codexilta.
    - LR kiinnittää pinnat.
    - LS2 tekee leivotun ja valaisemattoman esityksen ja vertailukuvan oikeaan valokuvaan.
  - **PT vertaa oikeaan valokuvaan samasta kulmasta ja ympäröiviin Googlen rakennuksiin ennen omistajaa** (PT:n virhe 14.5x).
  - Fotogrammetriaselvitys oli agentilla: jos scratchpad/fotogrammetria-nd-kl-20261009.md puuttuu, aja uudelleen (kohta 5).
- **Olavinlinnan suttuiset ulkoseinät** (omistaja): Siirtoseppä kartoittaa (px/m, 5 pahinta) → LR ohjekuvat → Codex 1499-asussa (samaan työhön kuin ND).
- **Pulu Ranska:** valmis ja ämpärissä (FRA.json + maat.json, 949 vastausta, pistokokeet OK).
  - Omistaja 14.5x: "krediittejä ei ole kulunut vielä yhtään" → ajo oli pilvessä samalla tilillä. Syy selvitettävä: viive vai tilauksen käyttö. Kysy omistajalta illalla Usage-lukema.
  - Muut maat vasta omistajan päätöksellä (arvio ~23 000 vastausta, ~16 h).
- **Soundly Pro** (omistaja osti kuukaudeksi):
  - Erä 1 (pallo, 7 aihetta) on ladattu: 91 WAV, 2,3 Gt NAS:lla (Matkakirja-arkisto/aanet/soundly/era1-pallo). Pelikoodari porttaa, valitsee ja vie peliin.
  - Seuraavat erät tarvekartoituksen mukaan: scratchpad/aanitarve-soundly-20261009.md (valmis 15.19). Tarkista ja jaa eriin.
  - Lataustyökalu: scratchpad/soundly-gui/ (ohjain + era1.zsh-malli).
    - Kohde: Send to folder → T7 soundly-saapuvat, sitten NAS.
    - Koordinaatit: hakukenttä 1112,362; rivit y = 469 + 32·n; Send-nappi 1830,1036; VARTIJA=com.soundly.Soundly.
    - **Ei cmd+shift-yhdistelmiä** (omistajan pikanäppäinsovellus).
    - Koodaus-käyttäjän näyttöä saa ajaa, kun omistaja on omalla käyttäjällään.
- **Levy** (omistaja 15.1x: "tee kohdat 1-4"):
  - Poistot tehty, ja vapaata tuli 57 → 106 Gi.
  - NAS- ja T7-siirrot (scratchpad/soundly-gui/siirrot.py) olivat käynnissä nollauksessa: tarkista scratchpad/siirrot-tulos.txt (vanhassa scratchpadissa /private/tmp/claude-502/…/37636a81…/scratchpad/). Jos keskeytyi, tarkista osittaiset kopiot ennen uutta ajoa.
  - Jäljellä: DerivedData 6,6 (kun xcodebuild ei käynnissä), vanhat .app 5,8, ~/.claude/projects > 7 vrk → NAS 8,9 (EI memory-kansioita).
  - Codexille kohta 5 postilaatikossa (77e243d71). Odota vastausta posti/codex-fable-levytila-20261009.md.
- **Unity 6.7:** beta 6000.7.0b4 T7:llä. Natiiviseppä tekee Library-tuonnin illalla ja raportin. Cesium tukee vain 6.5:een asti. Omistajalle kerrottu: ei seuraavaan julkaisuun.
- **Italia:** DM 108 -selvitys valmis (scratchpad/selvitys-italia-dm108-20261009.md), vie docs/raportit-PR:nä. Eurooppa-selvitys oli agentilla: jos scratchpad/selvitys-eurooppa-kulttuuriperinto-20261009.md puuttuu, aja uudelleen.

## 3. Raamattu
- #4288 mergetty (17e595de5).
- #4295 Julkaisijalla mergeen: KÄYNNISTYSLEVY EI TÄYTY, SOUNDLY PRO, VALOKUVAPOHJAISET PINNAT + 4 lokikirjausta.
- Uudet linjat tämän jälkeen: scratchpad/kirjattavat-20261006.md loppu.

## 4. Roolit
- **Pelikoodari** (nollattu 14.38): luennat PID 93533 irrotettuna (~6 903) → vienti; Soundly erä 1:n portti.
- **LR** (nollattu 15.09): ND- ja KL-ohjekuvat, v46g-täyttö.
- **NUI 73 %:** pyydetty luovutus ja nollaus 15.2x. Tarkista list_events: jos 0 viestiä, lähetä aloitusviesti (docs/raportit/viesti-natiivi-ui-aloitus.md) ja kytke RC päälle.
- **Natiiviseppä:** juna 173 ja Unity 6.7.
- **LS1:** nykyintro ja kuva-arkki.
- **LS2:** vertailu ja valaisematon koe.
- **Karttaseppä:** kaukomaan S2-rasteri (Pariisi ja Tukholma).
- **Sisältökirjuri:** ND/KL-referenssit, Codex-tilaukset (C5, tähdet, ihmisen matka).
- **Siirtoseppä:** arvio 6 ja Olavinlinnan seinät.

## 5. Uudelleen ajettavat agentit (Sonnet, tausta, suomeksi, (L)/(O), tiedostoon scratchpadiin)
- a) Fotogrammetria: valmiit fotogrammetriset mallit Notre-Damesta ja Tukholman kuninkaanlinnasta (Sketchfab CC0/CC BY, CGTrader, TurboSquid, Fab, avoimet skannaukset, IGN LiDAR HD, Lantmäteriet) + Commonsin parhaat julkisivukuvat. Taulukko: linkki | lisenssi | hinta | tyyppi | kolmiot | tekstuurit | kattavuus | laatu.
- b) Eurooppa: Kreikka, Ranska (L621-42, Eiffelin valot), Saksa (§ 68 UrhG), Espanja/Portugali, Vatikaani, UK ja muut lyhyesti. Taulukko: maa | taidegalleria | kaupunkikierros | riski.

## 6. Rutiinit
- JONOKIERROS-cron (7, 27, 47), vaihe 0 get_usage self (55 % tila, 65 % nollaus).
- Postivahti valvoo levyä (raja 100 Gi, ilmoitettu 15.1x).
- **Ennen omaa nollausta aina:** `python3 tools/tallenna-keskustelu.py` (Raamattu FABLEN OMA NOLLAUS).
