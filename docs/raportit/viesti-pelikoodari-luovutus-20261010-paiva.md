# Pelikoodarin luovutus 10.10.2026 klo 10.4x (nollausraja 50 %)

Lue ensin CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-pelikoodari-aloitus.md (säännöt ennallaan).
Natiiviseppä: ccd send_message local_bf20055b-d582-4812-ba2b-b59c37a5e7b8. Julkaisija local_22b29f10-7af8-43fc-a974-1d666f716c97,
PT local_593b89a1-2514-4d74-b956-2a73db862382, Siirtoseppä local_b50bb32e-18e2-47c5-a597-8a18d56874e1.

## 1. Valmiit tänään (odottavat muita)
- **Jäätymiskoe**: EI koske peliä/TF:ää; 0/4 toistoa (A–D), aamun 3/3 todennäköisesti coreaudiod-jumi. Raportti
  docs/raportit/jaatymiskoe-20261010.md. Korjaukset proto `pelikoodari/mittaa-aikaraja` **dad7ae249** (pohja a4c6539e5, worktree
  `wt/proto-pelikoodari-mittaa`): AaniIstunto.TilaAikarajalla + todistusajo.sh jäätymisvahti → junan 176 rungossa natiiviseppa/juna-176 f88915efb (6.7: L1299/P449/K453, unity 0).
  Proton origin ei ota pushia (haarat paikallisia). Skenaariot ja käynnistimet `proto-3d/tyokalut/pelikoodari-ajot/sk-jaatyminen-{a,b,c,d}.txt`, `jaatyminen-*.pl`.
- **IP-suola** PR #4335 (Matkakirja, haara pelikoodari-ip-suola e6f4ba6d1, worktree wt/pelikoodari-ip-suola): HMAC-SHA-256(IP_SUOLA, ip),
  8 heksaa; pollo-julkaisu.yml asettaa IP_SUOLA:n GitHubin POLLO_IP_SUOLA:sta. npm test 5422/0. Odottaa Julkaisijaa + secretin luontia.
- **Kertoja v2** seikkailu/olavinlinna/vaihe-esittely-v2 ämpärissä (Siirtosepälle 176: kestot 16,64/15,12/11,62/6,14 s).
- **Musiikkilista** docs/raportit/musiikit-pelissa-20261010.md (PT merkitsi äänisivulle). Äänisivun lisäraidat _tyo/aanisivu-20261010/.
- **ISS-äänierä 1** `proto-3d/_tyo/aanisivu-iss-20261010/` (40 ääntä: 18 NASA PD + 22 Soundly Pro; kuuntelu/ −16, peli/ −23,
  ääniportti 0 hylättyä; EHDOTUS.md, LAHTEET.md, raidat.tsv, kasittele.py). PT vie äänisivulle; omistajan kuuntelun jälkeen vienti
  uusiin polkuihin aanet/iss-v1/ (SHA256SUMS viimeisenä) ja kytkentä (CupolaAani, OhjaamonAanet, KavelyAanet). Huom: iss-tarranauha
  peli-TP −0,8 dBTP → hiljennä ennen vientiä. Soundly-lähteet NAS soundly/eraiss1 (tyolista.tsv iss1-rivit, tehty.txt).

## 2. SEURAAVA ERÄ: workerin kuratoitu live (Raamattu ALLE 18 KURATOITU, PT 10.3x)
- **TEHTY 10.55**: vaihe 1 PR #4337 (785b9c94e, wt/pelikoodari-kuratoitu-live), npm test 5432/0; PT ja NUI tietävät. NUI:n otsake
  natiivi-ui/ikakysely-176 12d671ef1. Vaihe 2 = PULU_PUUTTUVA_KURATOITU=1 vasta vanhan TF-apin todennuksen jälkeen (PT päättää).
  Tekemättä: Ilmoita ongelmasta -reitti (sovi muoto NUI:n kanssa) ja webin ikäkysely (UI-pohja → kysy PT:ltä).
- NUI valmis: natiivi-ui/ikakysely-176 4c05f443e (Ikaraja.Kuratoitu/Aikuinen/Muuttui; kortti ennen 1. live-kysymystä; testikomento
  ui ikaraja kysy|aikuinen|kuratoitu|nollaa). Sovittu NUI:n kanssa: OTSAKE `x-matkakirja-aikuinen: 1|0` (1 = aikuinen), NUI lisää sen
  PuluChatin live-pyyntöihin itse.
- Sinun osuutesi: tools/pollo/worker.js: otsake 1 → live kuten nyt; 0 tai puuttuu → kuratoitu: oma kehote (vain pelin paikat ja aiheet,
  ikätasolle sopiva; pohja alaikäisosio + JAETTU_TURVAPROFIILI) + kysymys- ja vastaussuodatus + seuranta ilman henkilötietoja, SAMA
  vastausmuoto (vanhat appit eivät rikkoudu); merkintä "Vastaukset tuottaa tekoäly (Claude)"; /opas/seuraava alle 18:lle alaikäisprofiililla.
  Luonnos ja PT:n vastaukset proto-3d/_tyo/kuratoitu-live-luonnos-20261010.txt. Järjestys: worker vaihe 1 (kuratoitu otsakkeella 0) →
  natiivi/web otsake (176) → puuttuvan otsakkeen kuratointi päälle vasta TF-todennuksen jälkeen. Kehittäjäkoodi ohittaa kuten nyt.
  Testit npm test, PR → SHA PT:lle ja NUI:lle.

## 2b. TAIDEMUSEON ÄÄNET (PT 10.4x; tehdään ennen kuratoitua liveä, jos PT ei toisin sano)
- 1) **EPÄONNISTUI 10.5x** (väärät vanhat tiedostot → NAS eramuseo1/_vaara-osumat, museo1 pois tehty.txt:stä, ajo pysäytetty;
  omistaja käytti näyttöä). Aja uudelleen joutilaalla koneella, tarkista nimet. Alkuperäinen ohje: Salin äänimaisema Soundly Prosta: Soundly-haku `museo1` (6 hakua, NAS soundly/eramuseo1, loki _tyo/soundly-erat/ajo-museo1.log)
  käynnistetty 10.4x. Tarkista nimet (sokea top-N), valitse, käsittele `proto-3d/_tyo/aanisivu-iss-20261010/kasittele.py`-mallilla
  (kopioi kansioon `_tyo/taidemuseo-aanet-20261010/`): peli −23 LUFS + ääniportti, kuuntelu −16 LUFS → rivi PT:lle (äänisivu).
- 2) VALMIS: luentasuunnitelma `proto-3d/_tyo/taidemuseo-aanet-20261010/LUENTASUUNNITELMA.md` (A ≈9 000 merkkiä ≈600 kr, B 5 564 ≈370 kr)
  → lähetetty PT:lle omistajan korttia varten. Ei generointia ennen lupaa.
- 3) LS1 VASTASI 11.0x: polku aanet/taidemuseo-v1/ ok. Salin silmukka y.Taustaaani(...)/o.Silmukka(...) (ISilmukka.Voimakkuus),
  sorina voi olla huoneittain NykyinenHuone.Id:n mukaan (aula, m1–m3, kg, kg-komerot, yv, leiden). LS1 lisää MuseoSovitin.Askel-
  tapahtuman (~0,75 m). Kertoja: kertoja/<Teos.Id>.mp3 (Rijks objnr, esim. SK-C-5). Lähetä LS1:lle manifesti, niin hän kytkee.
  Vanha kohta:ytkentäkohdat LS1:n kanssa (MuseoSovitin): kysy LS1:ltä, mihin salin silmukka, askeleet ja sorina sekä teoskohtainen kertoja kytketään.

## 2c. PT 11.0x
- Kertojan luenta: omistaja "Ei vielä" → museo ensin ilman kertojaa, ei testiottoa. Ääntämisohjeet (Sisältökirjuri) liitetty LUENTASUUNNITELMA.md:hen.
- #4337 Julkaisijalle vihreänä; PULU_PUUTTUVA_KURATOITU pysyy pois. Webin ikäkysely kysytty PT:ltä (ehdotus <dialog class="dialog"> -pohja).
- Webin ikäkysely TEHTY: PR #4341 (e1c656444, haara pelikoodari-web-ikakysely samassa worktreessa), merge vasta #4337:n ja
  workerin julkaisun jälkeen (web lähettää otsakkeen aina, vanha worker hylkää esilennossa). PT tietää.
- Museon Soundly-haku ILLALLA näytön ollessa vapaa → käsittely → manifesti LS1:lle.
- ISS-erä 1 valmis valintaan: huiput korjattu (RAJA=0.75, kasittele.py), ääniportti 40/0.

## 2d. Musiikkisääntö ja Peking (PT 11.1x / 11.4x)
- KARTALLA VAIN KAUPUNGIN OMA KAPPALE: web PR #4342 (f11c2e8a1, wt/pelikoodari-kartta-musiikki), natiivi proto
  pelikoodari/kartta-vain-kaupunki d6a8e0139 (juna-176:n päälle, natiivi-backup, Natiivisepällä), kaanna.sh 453/453, kultainen jälki
  samaksi. Kytkin KARTTA_VAIN_KAUPUNKI / AaniTaulut.KarttaVainKaupunki; vanhat ketjutestit kytkin pois. Kysytty PT:ltä: aloituslennon
  vaskimarssi (06) jäi ennalleen.
- Kaupunkikappaleiden suunnitelma proto-3d/_tyo/kaupunkikappaleet-20261010/SUUNNITELMA.md (44 uutta, 0,08 $/kpl ≈ 3,50 $, 1. erä 16) → PT:n kortti.
- Peking kokeilukohteeksi PR #4343 (8618f8101, wt/pelikoodari-peking-kokeilu); ilmoita LS2:lle, kun worker julkaistu.
- Julkaisijalle lähetetty järjestys: #4337, #4343, #4342; #4341 vasta #4337:n workerjulkaisun jälkeen.

## 3. Odottaa
- Freesound-lataaja käynnistetty uudelleen 09.46 (perl setsid, aja-originaalit.zsh), odottaa ~/.freesound-tokenia (OAuth). Aikakatkaisu
  ~12 h; käynnistä uudelleen samalla kaavalla, jos token puuttuu yhä.
- Siivous mergen jälkeen: wt/proto-pelikoodari-pisteet, wt/proto-pelikoodari-pulu, wt/proto-pelikoodari-mittaa (git -C proto worktree remove),
  wt/pelikoodari-ip-suola (tools/uusi-worktree.sh --poista).

## 4. Opit
- loudnorm putoaa dynaamiseen tilaan, kun huippuvara ei riitä, ja jättää tason alle; stereon mittaus + mono-tallennus = −3 dB.
  Käytä mono-PCM → mitattu LUFS → vahvistus + alimiter (kasittele.py).
- Soundly-haku tuo sokeasti N ensimmäistä: tarkista nimet ennen käsittelyä (rautatieasemat "space station interior" -haulla).
- Jäätymisessä ota pinonäyte (`sample <pid>`), ei arvailua; simulaattorin appi on Macin prosessi.
