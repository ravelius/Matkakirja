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
