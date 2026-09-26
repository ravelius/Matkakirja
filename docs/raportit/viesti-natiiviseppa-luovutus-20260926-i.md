# Natiivisepän luovutus 26.9.2026 (i), klo 17.xx

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: konteksti yli 70 % (Fablen pyyntö). Edellinen: -h.md.

## Tila

- **BUILD 22** = proto-master **f81b8acb** (juna 1b9f193b, käännös 82d805ba, puu 6cfb561b) = **TF 1.0.22** (16.39).
- **BUILD 23** = juna **2e6e6648** (tagi `build23-juna`), käännös **7210f166** (master f81b8acb + juna). Laitetestaaja tarkistaa
  vain karusellin + myllyt + C/D (muu PASS 7533a651:llä, raportit 1cb59546c, 6b6eec040, 02297a704). PASS → master-merge
  TAGISTA (`git merge --no-ff build23-juna`, tarkista puu = käännöksen puu 3fdd7ef1) → SHA Julkaisijalle (TF 1.0.23).
  **TEHTY: BUILD 23 = proto-master af558ba6** (puu 3fdd7ef1 = käännös 7210f166; PASS 1cb59546c + 1cd630d3b), SHA
  Julkaisijalle klo 17.4x → TF 1.0.23 (odota Julkaisijan "vienti valmis" ennen junamergejä; vientilippu /tmp/natiiviseppa-vienti-tulossa).
- Juna/b13 (2e6e6648) jatkuu nyt 1.0.24:ksi: mergeä jono (alla) TF 1.0.23 -viennin jälkeen.
- **POLTTO (Karttaseppä Z10, 26.–27.9.)**: junavahti ja ajastin tauolla lipulla `/tmp/matkakirja-juna-tauko` (lisätty
  juna-ajo.sh:iin). Käännökset käsin: `JUNA_PAKOTA=1 tyokalut/juna-ajo.sh` (juna Laitetestaajan simulaattoreihin) tai
  proto-kaanna.sh. Yksi Xcode/Unity-käännös kerrallaan, vain todennettavaan tarpeeseen, rivi Karttasepälle ennen ja jälkeen.
  Poista lippu, kun Karttaseppä ilmoittaa polton päättyneen.
- Viestit: SendMessage-raja ~10/vuoro → varakanava `mcp__ccd_session_mgmt__send_message` (Fable
  local_5df52e10-10e4-4b72-9554-0049db300dfe; muut id:t list_sessions).

## Tänään tehty (build 22–23)

- **Laattaesilatauserä 1** (aloitus): avausnäkymän lähialue aloitusnäytössä Esilataaja.Tehtava/SeuraavaRuutu, kiila lennon
  alussa/Nakyva (KarttaKerrokset.EsilataaAvaus, AvausLaatat). Pallo mustan lähtiessä 46–57 % → 83–85 %. Raportti
  proto-3d/lokit/laatta-esilataus/RAPORTTI.md. Virtuaalikamerat (additionalCameras-kiilat) mitattuna huonompia → poistettu.
- **163** (pallo ei piirry): ElavaKerros sammutti pääkameran → Cesium ilman näkymää (käyty 0). Korjaus: pääkamera
  CesiumCameraManager.additionalCamerasiin KERROS-ajaksi + VARTIJA 163 (ElavaKerros ja Ruudunpaivitys). Laitetestaaja PASS.
- **163b**: kohdemaan kartta puuttui = 165 (maakuntatila jäi päälle, Natiivi-UI korjasi). Lisäksi kiirejono (Laattapalvelin:
  näkyvä jono ensin, kiire ≤ puolet paikoista, VARTIJA 163b, `palvelin`-rivillä nälkä163b) — simulaattorissa ei nälkää,
  LAITETODENNUS PUUTTUU.
- **166**: nappula ilmassa kallistettaessa → jalka kaupungin pisteen korkeudelle (KaupunkiMerkit.PisteenKorkeus). PASS.
- Diagnostiikka: PyyntoLoki (Documents/pyynnot.tsv, lippu matkakirja-pyyntoloki), mustan katto -lippu, verho-täysi-taajuus.
- Mittausskriptit (scratchpad, kopioi tarvittaessa): musta-mittaus.sh, n166.sh, hyppy.sh, mk165.sh, b23tarkistus.sh.

## 1.0.24-JONO (SEURAAJALLE)

1. **Aloitusverhon ensikäynnistyksen katto** (Fablen päätös, tärkeä: omistaja näkee ensimmäisen käynnistyksen):
   - oma osuus VALMIS: `natiiviseppa/verho-96` **e76df4bb** (ValmiusEhto: ≥ 96 % ja heilunta ≤ 2,5 %-yks / 300 ms; testit 321/321)
   - Linssiseppä VALMIS: `linssiseppa/fonttilammitys` **e33d184b** (lämmitys vasta verhon jälkeen, ≤ 4 ms/kehys; merge-pyyntö tehty). Hänen
     lokinsa 8,0 s / 29 % johtui komennosta verhon aikana (uusi-peli 2,5 s:ssa), ei laatoista
   - mittaa yhdessä 5 × tuore boot + kylmä (valmius-auto), tavoite ≤ 3,5 s. Syy ja lokit: proto-3d/lokit/aloitusverho-katto.
2. **167** Natiivi-UI `natiivi-ui/nostot-kalusteet` **42183d7d** (nostomerkit piiloon kalusteiden alta) — katselmoi kuvapari
   proto-3d/lokit/natiivi-ui-loydos167/kuvapari-167.png ja mergeä.
3. **Karusellin aito 3D + valot** (Linssiseppä jatkaa, omistajan palaute).
4. **160 arkkityypit** tasoille 1 ja 2–3: suunnitelma proto-3d/lokit/suunnitelma-160-3d-symbolinostot.md kohta 11 (omistaja
   16.5x): koot 0,6/0,45, löytämätön musteisena, RenderMeshInstanced, LOD0 ≤ 600/LOD1 ≤ 150/siluetti < 18 pt, ≤ 0,4 ms.
5. **Laattaesilataus erä 2**: kohdekaupungit Z7–Z10 tasolla Kohdekaupungit (PeliOhjain.KaupunkiEnnakoitu, Assembly-CSharp);
   mitoita ensin pyyntölokilla matkasaapumisesta (ei arvausmallia — erä 1:n geometria yliennusti 1,7×). Satelliittilinssin
   musta 1,8 s myös laattaerään.
6. **Kiirejonon laitetodennus** (iPhone, normaalitila, huntu päällä, GRC-saapuminen, `palvelin`-rivi ja VARTIJA 163b).

## Käytännöt (uutta tänään)

- Pysyviä poistoja (levynvapautus) ei tehdä itse: skripti + koeajo, Fable/omistaja ajaa (tyokalut/vapauta-levy-natiiviseppa-20260926.sh).
  Omistajan sallinta (main #3329) worktree remove/prune ja simctl erase koskee omia mergettyjä worktreitä ja simulaattoreita.
- Merge-pyyntö, joka muuttaa toisen roolin tiedostoa → sen omistajan kuittaus ensin (esim. UiNakymat.cs = Natiivi-UI).
- Master-merge tagista (build22-juna/build23-juna), kun juna on jatkunut; puu = käännöksen puu.
- Simulaattorissa ei `pkill` console-pty-kääreeseen: ensin `simctl terminate`, sitten kill.
- Komennot vasta "aloitusverho: pois" -rivin jälkeen (muuten verho osuu kattoon).
