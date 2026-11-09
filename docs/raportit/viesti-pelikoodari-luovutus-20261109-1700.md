# Pelikoodari: luovutus 09.11.2026 klo 17.00

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (26 %). Edellinen: `git show 5ecf89424:docs/raportit/viesti-pelikoodari-luovutus-20261109-1642.md`
(sen kohdat hoidettu tai alla). Kuvat ≤ 1000 px (PIL-arkki scratchpadiin), laajat haut Sonnet-agenteilla.
Unity-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu (remote natiivi-backup), nyt haarassa pelikoodari/liiketappi-2.
Natiivin päähaaraa ei ole natiivi-backup/main-nimellä; Pariisin data HEADissa (UI/Resources/Kohdenostot/piirros-pariisi.json, 42 nostoa).

## 1. PARIISIN NIMIÄÄNET (OMISTAJAN PÄÄTÖS 16.34) – ODOTTAA OMISTAJAN OK:TA TESTILLE
- Työkansio /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/pariisi-nimet-20261109/: generoi.mjs <alikansio> (aja: `zsh aja.zsh <alikansio>`;
  William, eleven_v4_turbo (Raamattu 5.7 voittaa luovutuksen "eleven_v4"), fi, style 0, with-timestamps, raaka ämpäriin + kuitti), pilko.py <kansio>
  (5.11. välilauseiden pilkonta; lista.json:n 1. rivi = suomenkielinen alku id "*-alku", jätetään pois), tee-video.py <kansio> <nimi> (5.28),
  kuuntele.py (Gemini EI kuule ääntä: vastaa "en voi kuulla" – älä luota).
- TESTI tehty: testi/ (6 nimeä, 185 merkkiä, 45 krediittiä; raaka aanet/opas/raaka/pariisi-nimet-3a68fcd50b4ffb4d3800/otto1.json),
  video testi/pariisi-nimet-testi-20261109.mp4 → PT → KK omistajalle. Prompti: "Tervetuloa kaupunkikierrokselle. Kuljemme kohteesta toiseen,
  ja kerron jokaisen paikan nimen." + nimet omina kappaleinaan pisteellä.
- KUN OK: koko otto PT:n listasta /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/pariisin-kohdenimet-aanitys-20261109.md
  (~135 nimeä; nostojen nimet täsmälleen piirros-pariisi.json-avainten mukaan), alikansio koko/ samalla tavalla (prompti.txt + lista.json, id:t
  esim. pariisi:<Nimi>), pilko, video omistajalle, vienti uuteen polkuun (ei ylikirjoitusta) + merkit/krediitit KK:lle.
- KYTKENTÄ (PT 17.0x hyväksynyt, toteuta vasta testin OK:n jälkeen): nimiääni soi kyltin/merkin napautuksessa kohteille ILMAN juttua
  (Tietokortit.Avaa -polku, NostotKartalla.TietoNapautus ~2222–2236); nostoilla ei tuplana (nimi on luennan alussa). Soitto mallina
  OpasSovitin.SanoNimi/SoitaNimi (Linssit/Unity/OpasSovitin.cs ~2548–2560, nimiKlipit-välimuisti, silta-AudioSource); hakutaulu kuten
  OpasNimiaanet (avain "pariisi:<Nimi>" → NimiLeike), lataus kuten LataaNimiaanet (rivi ~2584).

## 2. LUENTOJEN ALUT – KK-KORTILLA, EI OTTOA ENNEN PÄÄTÖSTÄ
- Lukijaaani.LuennanPalatJaTagit yhdistää otsikon 1. kappaleeseen → luennan 1. pala "Nimi. <koko 1. kappale>" alkaa ranskalaisella nimellä.
- 26 luentoa (19 juttua + 7 kadonnutta ihmettä), 15 534 merkkiä ≈ 3 700 kr: …/pariisi-nimet-20261109/luentojen-alut.json (ekapala, v7-tagi).
  Avain v1|eleven_v4_turbo|William|1.15|<tagi>|teksti; v7-manifestissa 15/26 ("[pause]" tai ""), loput 11 striimataan.
- KUN OK: yksi putkiotto (suomenkielinen alku, jokainen pala omana kappaleenaan, loppuun sama tagi kuin avaimessa), pilkonta, uusi manifesti v8
  (v7 + korvatut avaimet; Valmisluennat.ManifestiOletus v7 tai asetus osoitteet.luennat-manifesti). Lähteet: web js/packs/nahtavyysjutut.js
  (main) ja paketti v1028 moduulit/js/packs/hahmotelma-fra.json – tarkista tekstit pakettia vasten ennen ottoa.

## 3. LIIKETAPPI – JU-AJO JONOSSA
- 678376fbb (natiivi-backup pelikoodari/liiketappi-2) = temple-orbit 755a52fab + 8cdb4549c + zoom NUI:n KierronZoomilla (oma kerroin pois,
  sivusiirto yhä AjonLiikeSiirto) + kartussin väistö (pieni iPad: tappi oli RANSKAn päällä, ajo 8cdb4549c). unity-tarkistus 0, LiikeTappiSuunnat ok.
- JU FB: pk-liiketappi2-{ipad-pieni,iphone}-678376fbb. TEE: l-0 tappi kartussin yläpuolella (tila "kartussin väistö kyllä" iPadilla),
  o-2…o-4 kierto jatkuu → PT:lle ≤ 3 riviä + arkit → junaan 678376fbb (vaatii temple-orbitin). 8cdb4549c-arkit: _tyo/pelikoodari/liiketappi/.

## 4. PULU
- Mallinostot 4c49da614 iphone JU:n jonossa KS-ajon jälkeen (sk-pulu-mallinostot.txt; TEE kuten edellisen luovutuksen kohta 2).
- Lähde 3 (e31921ac7) diagnosoitu: asiakas toimii, pollo-worker vastaa 200 tyhjällä "ehdotukset"-listalla nähtävyyskontekstilla → kysytty
  PT:ltä, kenen worker (lähde ei main-repossa). Odota PT:n vastausta.

## 5. MUUT
- Kun kaikki kuitattu: rivi PT:lle "JONO TYHJÄ: Pelikoodari". Testit `cd Peli-testit && sh kaanna.sh <osa>`, `sh Peli-testit/unity-tarkistus.sh`.

## LISÄYS 17.0x (PT)
- Liiketappi 678376fbb kuitattu PT:llä: junaan JU:n kuvien jälkeen (kartussin väistö näyttävä kuvassa).
- PÖLLÖ-WORKER ON PK:N OMA: lähde haaroissa origin/pelikoodari-pollo-* (kv, valimuisti, natiivi, natiivi-chat, pallot-worker); hae
  `git log --all -- '*worker*'` / wrangler-tiedosto. KORJAA ehdotukset-tehtävä nähtävyyskontekstille ("Pelaaja katsoo kartalla (kysymykset
  tästä): nähtävyys Eiffel-torni (Pariisi)" → nyt 200 + tyhjä lista). Julkaisu PK:n kaavaa (ei korttia); rivi PT:lle, kun vastaa ei-tyhjänä.

## LISÄYS 17.2x: OMISTAJAN PÄÄTÖS 17.01 "Kyllä kumpaankin" – OTOT TEHTY (kohdat 1 ja 2 yllä päivittyvät)
Järjestys PT:ltä: otot → v8 + kytkentä → vasta sitten pöllö-workerin korjaus.
- NIMIOTTO TEHTY: koko/ (130 nimeä, 2 845 mrk, 690 kr, raaka aanet/opas/raaka/pariisi-nimet-4038ff50e7145d71a06d/otto1.json), pilkottu
  koko/mp3/n001…n130.mp3 (lista.json: id n###, nimi = kartan nimi, teksti = sanottu; vuosiluvut sanoina), video koko/pariisi-nimet-koko-20261109.mp4 → PT.
- ALUT TEHTY KAHTENA OTTONA (ElevenLabs max 10 000 mrk/pyyntö): alut1/ (17 palaa, 8 488 mrk, 2 058 kr, raaka …/pariisi-nimet-db9e5f20a4dbbebd180a/)
  ja alut2/ (9, 7 458, 1 808, …/pariisi-nimet-787dcaf424b323331f3e/); pilko ALIMIT=0.79 (luentojen ääniportti). Yhdistetyt alut/mp3/a01…a26.mp3 +
  alut/pilkonta.json; lista.json:issa nimi + loppuTagi (20 × "[pause]", 6 × ""). Videot alut/pariisi-luentojen-alut-{12s,kokonaan}-20261109.mp4 → PT.
- TEE 1: MANIFESTI v8: v7 (https://media.matkakirja.app/aanet/luennat/v7/manifest.json, u = TÄYDET osoitteet, esim. …/luennat/v1/k/<avain>.mp3)
  + 26 avainta (v1|eleven_v4_turbo|oae6GCCzwoEbfc5FHdEu|1.15|<loppuTagi>|<teksti NFC>, sha256[:32]; ks. esigeneroi-luennat.py avain()) →
  uusi polku aanet/luennat/v8/ (k/<avain>.mp3 + manifest.json, kesto "s"), vientipaketti _valmiit/:iin SHA256SUMS + LAHTEET.md → JU.
  Natiivi: Valmisluennat.ManifestiOletus v7 → v8 (Peli/Valmisluennat.cs:23), tai asetus osoitteet.luennat-manifesti. Tarkista ensin 15 v7-osumaa
  korvautuvat, 11 uutta lisätään (tekstit tarkistettava pakettia v1028 vasten: jos natiivin teksti eroaa, avain ei osu).
- TEE 2: NIMIEN VIENTI uuteen polkuun (esim. aanet/opas/pariisi-nimet-v1/: mp3 + nimet.json avain "pariisi:<nimi>" → {teksti,url,kesto_s}) →
  JU; KYTKENTÄ natiiviin (kohta 1 KYTKENTÄ) – omistaja hyväksyi. Kuvat/ajo JU:lta, PT:lle katsottuna.
