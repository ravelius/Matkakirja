# Linssisepän luovutus 28.9.2026 (r) — Linssiseppä (Opus) = myös Mallinseppä

*Kirjoitettu klo 12.5x Fablen käskystä (konteksti 70 %, nollaus). Edellinen: -q.md.*

**Session id:t:**
- Fable (nimi "Päätoimittaja (Opus, xhigh)") local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31
- Julkaisija local_24e63224-112c-449a-b6a3-e10e4ed43f4b
- Pelikoodari local_11aca9cd-eda6-4db9-9019-8a153c8b8795
- Siirtoseppä local_6cef0cb2-ae2e-4677-b85c-2eeb192f10c4
- Karttaseppä local_16f80454-5b30-4180-ae9b-8c6d1edb6779
- Natiiviseppä local_fcc10552-5810-49bf-b0cf-188456f1231c
- Natiivi-UI local_c6d63773-0270-4873-96f8-63c66cf52794
- Postivahti local_0a4f4c68-d24d-4b1f-83d7-d3c098cec96b

SendMessage nimellä ei aina tavoita. Toimii: `to` = session id (local_…) tai viestin `from`-osoite (uds:/tmp/cc-socks/….sock).

**Tämän session scratchpad** S = /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa/c188e12a-0e2c-4c72-b018-3772406e15a2/scratchpad.
Siellä ovat ajo-cl3.sh, kaynnista-cl3.sh, cl3-app ja esikatselu_cupola.py. Työkansiot:
- yovalot/: Black Marble -laatat ja kootut kuvat
- vesi/: reliefilaatat, vesimaskit ja luokittelija
- tahdet/: BSC5-JSON:n tekijä

## 1. KESKEN NOLLAUSHETKELLÄ (tee ensin)

**Laiteajo cl3 on käynnissä itsenäisesti.**
- Alkoi 12.44 Julkaisijan "laite NYT" -merkistä, paikalla A D0D2CD1E, ainoana booted-simulaattorina.
- Käännös cl3 = master + linssiseppa/iss-kyyti 8d791254 + linssiseppa/symbolit-lippu → 2a9f8c08.
- Kuvat kansiossa /Users/Shared/Claude/proto-3d/lokit/linssiseppa-laite-20260928-cl3/.
- Ajon lopuksi peli poistetaan ja simulaattori sammutetaan itse. Kun ajo.log:ssa on "sammutettu", kerro Julkaisijalle
  "D0D2CD1E sammutettu" (Natiivi-UI on seuraava). ÄLÄ tapa ajoa.

**Tulokset ja toimet ajon jälkeen:**
1. **Cupola ja LIVE** (seuranta-uusi, ikkuna-uusi, ikkuna-vanha, ikkuna-3d, cupola-raw.mp4):
   - usva 0,00 ja tausta oikein (todettu)
   - LIVE-pilleri näkyy seurannan kuvassa
   - Cupola 2 -kuvia ei vielä ole, joten "uusi" on 3D-varakehys hiottuna (paneeli perspektiivissä, naarmut hiusviivoina)
   - Rajaa pilleri ja 3D-kehyksen yksityiskohdat talteen. Cupolan kuvapari omistajalle vasta Codexin kuvilla (kohta 3).
2. **Kaupunkien valot** (yo-seuranta-valot/-ilman, yo-ikkuna-valot/-ilman, yo-raw.mp4):
   - Tässä ajossa testikello EI löytänyt yöylitystä: "ei yöylitystä Euroopan yllä 36 tunnin sisällä" (rajat lat 42–60,
     lon −5…30, aurinko < −12°). Kuvat ovat siis päivältä, ja valot on todennettava uudelleen.
   - Rajat on laajennettu (c025e3a9): lat 35–65, lon −15…45, aurinko < −8°, 72 h.
   - Seuraavassa käännöksessä: kuvapari yö ilman | valoilla (kulma ja SHA kuvaan) → Fable.
   - Arvot Pelikoodarille webiin (suunnitelma, osio "Kaupunkien valot").
3. **Lippu kallistettuna 45°** (ruotsi-z{1.25,2.5,5}-{ennen,jalkeen}.png, ruotsi-zoom-raw.mp4):
   - `python3 proto-3d/tyokalut/linssiseppa-ajot/koosta_koko.py <L> <U> "sl ba0a245f" "ruotsi:Ruotsi (lippu kartussin reitillä)" 45`
   - Tarkista, että lippu on Ruotsin 1873-lippu ja pysyy kuvassa kertoimella 5. Ylhäältä (cl-ajo, 0°) lippu näkyi vain
     sinikeltaisena nauhana.
   - Kuvapari → Fable. Merge-pyyntö Natiivisepälle vasta Fablen tai omistajan hyväksynnän jälkeen.

**Seuraava käännös cl4:**
- Pyydä vuoro Julkaisijalta ja odota "NYT".
- Sisältö: linssiseppa/iss-kyyti c025e3a9 + linssiseppa/symbolit-lippu. Mukana kohdat 1, 2, 3a, 3b, 4b ja 4c sekä
  laajennettu yökello.
- Käännä `nice -n 15` (EI `taskpolicy -b`: jumivahti tappoi -b:llä kuristetun Unityn).
- Kopioi kaynnista-cl3.sh → cl4 (APPNIMI cl4). Tee ajo-cl4.sh ajo-cl3.sh:n mallilla; siinä on laitevuoron portti:
  lupatiedosto $S/laite-nyt ja 0 booted.
- ajo-cl4.sh:n A/B-kuvat:
  - `astro kyyti kello yo-eurooppa`: valot 0|1
  - `astro kyyti kello kiilto`: kiilto 0|1 ja varjo 0|1
  - hämärä- tai yökohdassa: hehku 0|1
  - taivas 0|1 (tähdet ja Kuu yöllä)
  - paivanpilvet 0|1 ja revontulet 0|1, jos Julkaisijan data on ämpärissä
- Käännöksen jälkeen kopioi Unityn luomat .metat ($S/cl4-metat/) haaraan. Uusia tiedostoja: Kuu.cs, KyydinTaivas.cs,
  Revontulet.cs, KyydinTahdet.shader, KyydinKuu.shader ja Revontulet.shader. Tee se proto-worktreessä ja committaa.

## 2. SÄÄNNÖT TÄNÄÄN (omistaja Fablen kautta)

- **Klo 17 asti:** koko Macilla enintään yksi booted-simulaattori; käännökset yksi kerrallaan `nice -n 15`; järjestys
  Julkaisijan mukaan.
- **GPU-väistö** (main #3545): ennen simulaattoria, Unity-renderöintiä tai Metal-Chromiumia aja tools/gpu-vapaa.sh
  (`git show origin/main:tools/gpu-vapaa.sh`; lippu /tmp/matkakirja-kevyt). Exit 1 → odota.
- **Levy:** simulaattorista poistetaan peli ajon lopuksi. `simctl erase` on luokittimen estämä, ja Fable päätti jättää sen
  pois (omistaja voi ajaa itse).
- **Luokitin esti** omien odottavien käännösjonojen tappamisen (Interfere With Workloads). Älä kierrä; anna niiden
  aikakatketa.

## 3. CUPOLA JA CODEX

- **Omistajan päätös klo 11.0x** (sanatarkasti luovutuksessa -q:n jälkeen, suositus docs/raportit/iss-kyyti-suositus-20260928.md
  osio 6): Codex tekee uuden tumman Cupolan valoineen ja varjoineen sekä ISS:n ulko-osat mustina siluetteina. Lisäksi
  LIVE-merkki.
- **Codex-tilaus** postilaatikossa: posti/linssiseppa-codexille-cupola-20260928.md (1ac968bc9).
  - Tiedostot: karttanostot/20260928/iss-cupola2-{kehys,heijastus,ulkoosat}-{iphone-1206x2622,ipad-1536x2732}.png
  - Aukot nykyisessä geometriassa (mittataulukko tilauksessa)
  - Vastaus tulee tiedostoon posti/codex-linssiseppa-cupola2-20260928.md. Tarkista `git fetch origin claude/postilaatikko`.
- **Natiivi valmiina** (0562a69b, d144b3c4): IssKyytiNakyma hakee Cupola 2:n kolme kerrosta jo seurannassa (ulko-osat,
  heijastus, kehys takaa eteen; ulko-osat ja heijastus liikkuvat hitaasti vastakkain).
  - Jos kehys ei lataudu, valaistu 3D-kehys (CupolaKerros) on varalla.
  - A/B `astro kyyti cupola uusi|3d|vanha`.
  - Kun Codexin kuvat tulevat: laiteajo, kuvapari ennen (vanha) | jälkeen (uusi) Fablelle ja ilmoitus Pelikoodarille (web
  vaihtaa yhdellä vakiolla).
- **LIVE** (853259ec): "● LIVE · ISS · 436 km · 27 530 km/h", punainen piste sykkii 0,9 s. Webissä valmis.
- **Pelikoodarin ISS-nopeutus webissä** (pelikoodari-iss-kyyti 891958e17, natiivi seuraa):
  - SIMUKELLO LIVE · 10× · 100× · 1000×; nopeutettuna pilleri "● 100× · …" ilman LIVEä
  - "Lennä kohteen ylle": 25 Euroopan NASA-kohdetta, SGP4-haku 48 h, 500 km; uusi tila 'kohde'
  - Turva-alue
  - Kuvat: proto-3d/lokit/iss-kyyti-web/. NASA-kuvakoe odottaa omistajaa. Natiivi on jonossa realismin jälkeen, ellei
    Fable toisin päätä. IssNyt.Kello on jo yksi aikalähde kaikille kerroksille.

## 4. KAUPUNKIEN VALOT JA ISS-REALISMI 1–4

Koko suunnitelma, kaavat, vakiot ja tila: **docs/raportit/iss-realismi-suunnitelma-20260928.md** (a3f3ca21a).

| kohta | natiivi (linssiseppa/iss-kyyti) | data | laitteella |
|---|---|---|---|
| Kaupunkien valot | 8d791254 | ämpärissä: iss-yovalot-2026-09-28/ | cl3 ilman yötä → cl4 |
| 1 heijastus ja varjostus | 34a5a5d5 | ämpärissä: iss-vesi-2026-09-28/ | cl4 |
| 2 päivän pilvet | f81345f0 (Pilvikuori.VaihdaKuva) | Julkaisija: data/pilvet/uusin.png (PR tekeillä) | kun data on |
| 3a hämärä ja ilmahehku | 4e7f3b1d (Ilmakaari) | – | cl4 |
| 3b revontulet | 497c06b8 (Revontulet.cs) | Julkaisija: data/revontulet/uusin.png (PR tekeillä) | kun data on |
| 4a kuukauden pinta | ei vielä: kyyti vaihtaa pohjan julisteet/pallo/bmng/<kk>/ | Karttaseppä polttaa klo 17.05 alkaen | – |
| 4b Kuu | 1c3fcaa9 (Kuu.cs + KyydinTaivas) | laskenta | cl4 |
| 4c tähdet | 1c3fcaa9 | ämpärissä: tahdet-bsc5-2026-09-28.json | cl4 |

- Ämpärin polut (kaikki linssit/astronautin-kamera/ alla):
  - iss-yovalot-2026-09-28/{eurooppa,maailma}-2048.jpg
  - iss-vesi-2026-09-28/{eurooppa,maailma}-2048.png
  - tahdet-bsc5-2026-09-28.json
- Lataus aws-komennolla: `source ~/.zshrc` (AWS_*, PAATE, AMPARI=matkakirja), `aws s3 cp … --endpoint-url $PAATE`.
- Testikomennot (`astro kyyti …`):
  - valot, kiilto, varjo, hehku, taivas, paivanpilvet, revontulet 0|1
  - kello yo-eurooppa|kiilto|+H|pois
  - cupola uusi|3d|vanha
- Aurinko, ISS ja taivas seuraavat IssNyt.Kelloa.
- Kuvapari kustakin kohdasta Fablelle.
- Webin arvot suoraan: valot Pelikoodarille; 1–4 Siirtosepälle, joka odottaa haaraa, SHA:ta, URLeja, kaavaa, vakioita ja
  laitekuvaa kulmineen.
- 4a natiivi puuttuu: kun Karttasepän syyskuu on ämpärissä, kyyti vaihtaa astronautin reliefipohjan
  (matkakirja/reliefipyramidi/20260924/pallo) kuukauden BMNG-pyramidiin. Rasterin vaihto tehdään linssin
  KarttaKerrokset.LisaaRasteri-kutsulla tai Natiivisepän rajapinnalla; selvitä ja sovi Natiivisepän kanssa.

## 5. MUUT AVOIMET

- **Geysir:** tarkistettu. Natiivi toimii kuten web: Islannin 34 nostosta 28 ovat Islanti-kaupungin sisäisiä
  (luoSisaisyysTesti). Fable hyväksyi poikkeuksen maan nimisille kaupungeille. Web tekee ensin, ja natiivia tekee
  Natiivi-UI (natiivi-ui/maan-niminen-kaupunki näkyi käännöslokissa). Ei Linssisepän työtä.
- **Natiiviseppä, merge-pyynnön yhteydessä:**
  - KarttaKerrokset.Taustavari lukee Camera.mainin, joka on null, kun pääkamera on pois (elävä kerros tai peitto).
    Avaruus kiertää sen tarkistamalla taustan joka kehys (d06d0eb2 ja a0245a0b). Ehdotus: käytä PalloKierron kameraa.
  - Tason 1 "brandenburgin-portti" on symbolit-tilan listassa myös DNK:ssa, SWE:ssä ja NOR:ssa.
- **Natiivin astroselite** odottaa Pelikoodarin webin mallia (Raamattu PR #3527, auki).
- **Junassa jo:** erät 5+6 (mallinseppa/era6 9ff18d16), astro-selain c15d2c04 ja joet 582d149c. Kun ne ovat masterissa,
  poista era5-worktree.
- **Merge-pyynnöt Natiivisepälle:**
  - iss-kyyti vasta, kun omistaja on hyväksynyt Cupolan ja realismin kuvaparit (haara sisältää astro-selaimen)
  - symbolit-lippu, kun lipun kuvapari on hyväksytty

## 6. WORKTREET (3/3) JA OPIT

- **Worktreet:**
  - /Users/Shared/Claude/wt/proto-linssiseppa-era5 → mallinseppa/era6 (junassa)
  - -symbolit → linssiseppa/symbolit-lippu ba0a245f
  - -astro → linssiseppa/iss-kyyti c025e3a9
- **zsh:** `$c:r…` on muunnin, joten kirjoita refspec aina `"${c}:refs/heads/…"`.
- **Varjostimet:** derivaatat (fwidth) aina ennen haarautumista. Alipikseliviivat piirtyvät pisteriveinä; käytä
  reunanpehmennystä pikselin leveydestä.
- **Esikatselu:** Python-esikatselu ilman numpya puhtaalla PIL:llä ($S/esikatselu_cupola.py) säästää käännöskierroksen.
- **ISS-kuoret:** kuoren (76 km) lat/lon ≠ maan piste. Leikkaa katsesäde ellipsoidiin (Yokuori.shader), muuten valot
  siirtyvät 60–200 km.
- **IssKyytiNakyma.Aseta** kutsutaan joka sekunti (tietorivi). Kaikki animaatiot käynnistetään vain tilan vaihtuessa
  (Heilu, Syke).
- **Koordinointi:**
  - Julkaisija: käännösvuorot ("NYT") ja laitevuorot ("laite NYT"); ilmoita "käännös valmis" ja "sammutettu".
  - Postivahti: GPU-tila.
  - Fable: vain valmis erä, jumi tai kysymys, ≤ 8 riviä.
