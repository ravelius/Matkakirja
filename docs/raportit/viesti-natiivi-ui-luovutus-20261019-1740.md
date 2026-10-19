# Natiivi-UI: luovutus 19.10.2026 klo 17.40 (Postivahti: kova raja 44 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Korvaa -1431:n (sen "Opit" yhä voimassa). Id:t /Users/Shared/Claude/osoitekirja.md
(PT local_8d8ebf72-…, JU local_24e63224-…, VS local_e675f86d-…, LS local_7a457b99-…, NS local_fcc10552-…, KS local_16f80454-…).
Simu VAIN JU:n SIMU NYT -viestistä; ajon jälkeen SIMU VAPAA JU:lle. Udidit: iPhone 123B4B25-36B7-4A76-B677-905621CD8F5A,
iPad F7513985-C8BC-4E97-8D29-9C9BD420E962. Edellisen session skriptit: SP=/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/8322e625-bbe3-453c-9019-42d76bdd864b/scratchpad
(ketju4.sh, ketju5a.sh, b3-vieritys-ipad.txt, valikko-204-ipad.txt, parit.py). Uusi poikkeus: PT:n tuore-lukija-sääntö (Raamattu 9.11 k3):
uusi teksti luetaan pelikuvasta Sonnet-agentilla ennen PT:n kuittausta.

## KÄYNNISSÄ (taustalla tämän session shellissä; voi kuolla nollauksessa → tarkista `pgrep -f ketju5a.sh`)
- **ketju5a** (17.31→, simu JU:lta käännöksellä 396021ef = valikko-jatko 77959b117): (1) **B3-iPad** vieritysmittaus
  (`--era b3-vieritys-ipad`, ISS-kohdevalikko, 8 nopeaa vetoa, `peli ruutu` + konsolin "MATKAKIRJA kehysajat" 5 s jaksot + video
  b3-vieritys-nopea), (2) **kipin Kysy-listan veto iPhonella** (`--era kippi-napit-204-iphone`, app juna204-lenna-itse-app 202b8d35,
  skenaario lenna-itse-204 ada01496b). Lokit SP/b3-vieritys-ipad.log, kippi-iphone.log; tulos proto-3d/lokit/todistus-b3-…, todistus-kippi-…-1740+.
  Jos kuoli kesken: aja `zsh SP/ketju5a.sh 396021ef 77959b117` (run_in_background) JU:n luvalla. Valmis → **SIMU VAPAA JU:lle** →
  B3: piirretyt kehykset/s (kehysajat-rivien "piirretty"/5 s, Ruudunpaivitys-tila) ja videon ainutlaatuiset ruudut/s
  (ffmpeg mpdecimate) → PT ruutuaikoina (PT mittasi iPadin vanhasta videosta ≤ 15/s, iPhone 60). Jos oikea vika: korjaus junaan 204.
  Kippi: veto Kerro lisää -sirusta todistettu → PT.
- **JU kääntää valikko-jatko2 9eb354a3a** (L2, ~18.00) → _tyo/julkaisija/juna204-valikko-jatko2-app. SIMU NYT → `zsh SP/ketju4.sh <kaannos-sha> 9eb354a3a`
  (ketju4 sis. valikko iPhone+iPad + B3-iPad + kippi; jos ketju5a ehti, poista ketju4:stä B3/kippi-rivit). Tarkista täysikokoisina:
  vc aarre: otsikkorivi "EUROOPAN AARRE" + nimi, palstaleveys (iPad ~373 pt), ei tyhjää alareunaa; vc2 Sheba: v2-kuva + uusi nimi,
  Afrikka-rivi TULOSSA; vf Retkikunta: Perusta + Liity kultanappeina, 1. nimimerkki valittuna, apurivit tummemmat. Sitten tuore lukija
  (Sonnet) uusista teksteistä (ylätekstit "Euroopan aarre"…, aarretekstit) → kuvaparit SP/parit.py-mallilla → PT ≤ 3 riviä.
- **JU:n jonossa aarrevideo 304b84312** (L1 viimeisenä, ~20.00) → juna204-aarrevideo-app; skenaario tyokalut/todistusajo/skenaariot/aarrevideo.txt
  (iPhone, pysty + vaaka) → kuvat PT:lle. SEURAAVAAN junaan (ei 204).

## B3 iPad TULOS (17.41, PT:lle kerrottu)
- Simu 17.34 (todistus-b3-vieritys-ipad-20261019-1734, konsoli-stdout.log kehysajat): vedon/inertian aikana p50 33 ms = 30 fps, tila LEPO,
  "näkymän katto 30 Hz" → VIKA. Korjaus **natiivi-ui/b3-ipad-204 04d8dc98d** (juna-204:n päällä): kokoLista.valueChanged →
  Ruudunpaivitys.Vierita. EI käännetty: pyydä JU:lta käännös → aja SP/b3-vieritys-ipad.txt uudelleen (`--haara 04d8dc98d`), tavoite
  kehykset ~16,7 ms vedossa → PT. Skenaarion "ohjaamo näkyy" -PUUTE = haku (sauvakuva), ei vaikuta mittaukseen.

## HAARAT (kaikki proto, peili natiivi-backup/peili/proto/<haara> pushattu)
- **natiivi-ui/valikko-204 348fa6b76**: PT kuittasi → **viety NS:lle junaan 204** (17.0x). Kutsuohjeen tekstit tuoreen lukijan mukaan.
- **natiivi-ui/valikko-jatko-204 9eb354a3a** (pohja valikko-204, junaan 204 simun + PT:n jälkeen): aarre palstana (Kuvasuurennos.Palsta:
  nostokortin palstaleveys + otsikkorivi nostokortin tyyleillä, LehtiKuva.Ylateksti, ui.aarre.yla.*), Retkikunnan apurivit map-ink-85,
  Perusta/Liity .mk-nappi--kulta (kortti.uss-selektori laajennettu .mk-sahke:lla), 1. nimimerkki esivalittuna (PT 16.3x),
  **Aarnin luettelo omistajan 17.11 mukaan**: Afrikka/Etelä-Am/Oseania TULOSSA (ISS:n .mk-ohjausnappi__live, ei nimeä/kuvaa/tekstiä,
  Linssivalitsin.Pilleri AarreNakyma), 4 muuta nimi+tekstit SK main 0ef98108c (aarnin-luettelo.fi.json .nimi/.kuvaus/.historia),
  Sheban/Montezuman v2-kuvat StreamingAssets/mukana (web #4982; sivusto vanha, 404) + **Mukana indeksoi *.jpg** (9eb354a3a).
- **natiivi-ui/aarnin-luettelo-204 1b25928b5: PERUTTU** (omistaja 17.11 korvasi; NS ei ota).
- **natiivi-ui/x-sulku-204 aa19d8ec7**: Kysy-✕ chatin ylärivi 36 px (LS kääntää kysy-hiljaa-204:n kanssa).
- **natiivi-ui/x-sulku-reuna-204 3c17f1f32** (pohja VS nostokortti-204 5ffefb69e + aa19d8ec7): ✕ väli S ruudun reunasta (Sulkunappi),
  ylärivit 52/22/28 px (PT/VS 16.0x). VS kääntää → ennen/jälkeen PT:lle. Korvaa x-sulku-204:n.
- **natiivi-ui/uni-smaragdi-204 a8bc3480c** (pohja juna-204): isoisän uni Mantan smaragdiin (omistaja 16.43): UniText, unikuva
  isoisan-uni-mantan-smaragdi.png (avainsana smaragd) ODOTTAA Codexia (tilaus f652fa977; tullessa: kuva StreamingAssets/mukana + .meta +
  LAHDE.txt, isoisan-uni-el-dorado.png pois), puhe aanet/isoisan-uni-v2/ (ämpärissä, 48,4 s). Uni pysyy pois (Kaytossa=false, omistaja
  17.10.); simu `ui aloitus uni`. Ei lähdön ehto.
- **natiivi-ui/aarrevideo 304b84312** (pohja juna-204, SEURAAVA juna; omistaja 17.25 + 17.29): AarreVideo.cs (VideoPlayer → RenderTexture →
  Paljastuksen alin taso, cover, pysty/vaaka, silmukka, KokoSivu, MerkitseMuutos 33 ms), Paljastus: video + ääni heti, sivu+diplomi
  VideoMs 4500 jälkeen himmennetyn videon päälle, Havainnekuva (.mk-suurennos__raitahavainne); esilataus levylle pelin alussa
  (persistentDataPath/videot), Prepare visan auetessa (UiNakymat Kysymys.Avattu), vapautus 3 s; Kysymys.uss 4 sääntöä tokeneilla;
  VÄLIAIKAINEN testivideo aarre-europe-pysty|vaaka.mp4 (ffmpeg-zoom; korvataan Codexin videolla samoilla nimillä, posti 4e62c3b21).
  `ui paljastus video` = tila. HUOM NS:lle: Mukana.cs-rivi konfliktoi valikko-jatkon kanssa (ota "*.mp3","*.png","*.jpg","*.mp4").

## Muuta
- Worktreet (proto, /Users/Shared/Claude/wt/proto-natiivi-ui-…): lenna-itse-204, x-sulku-204, x-sulku-reuna-204, valikko-204,
  valikko-jatko-204, uni-smaragdi-204, aarnin-luettelo-204 (peruttu → poista), aarrevideo (+ tyhjät kohdevalikko-201, rakettikuva).
  Poista mergen jälkeen `git worktree remove`.
- Levy siivottu 14.4x (2,1 Gt). Swap-raja (PT 15.2x): ei omia käännöksiä; 1 simu kerrallaan.
- B3 = ISS-kohdevalikon vieritys (8638aaa3e, rungossa), ei nostokortti; todisteet proto-3d/lokit/natiivi-ui-b4-otsikot-204/.
- Tuoreen lukijan huomiot: proto-3d/lokit/valikko-204-lukija-20261019/LUKIJA-aarteet.md.

## Opit
- **Mukana.Polku indeksoi vain luetellut päätteet** (oli mp3+png): uusi tiedostotyyppi StreamingAssets/mukana:ssa → lisää pääte.
- Sisältöpaketin (sivusto) nimet ja kuvat eivät päivity ennen julkaisua → natiivin ohitus (AarreNakyma) kun omistaja haluaa heti.
- Kielivahti hyväksyy dynaamiset avaimet vain $"…{x}"-muodossa (ei "a." + x).
- C#: nimetyn argumentin jälkeen ei positionaalista → valinnainen parametri viimeiseksi (`}, s, paa: true)`).
- pohjavahti: transition-duration > lähtötaso → var(--tk-kesto-maksimi).

## SEURAAVA JUNA: Aarnin kolme uutta (SK 17.4x, PR 4984 mergetty)
- Afrikka = Kongon kuninkaan kruunu, Etelä-Amerikka = Mantan smaragdi, Oseania = Raiatean kuninkaiden höyhenvyö; tekstit main
  docs/raportit/aarnin-luettelo-tekstit-20261019.json (nimi/kuvaus/historia), kuvat ämpärissä kohtaamiset/aarteet/aarre-{africa,southamerica,oceania}-star-v2.jpg.
- Tee valikko-jatkon päälle uusi haara: poista AarreTulossa-joukosta 3 mannerta, lisää .nimi/.kuvaus/.historia aarnin-luettelo.fi.json:iin,
  AarreKuvaV2:een ämpärin v2-kuvat (tai buildiin). Simu luettelosta JU:n sisältöpaketin julkaisun jälkeen. EI junaan 204.

## UNIKUVA HYVÄKSYTTY (PT 17.4x, seuraava juna, ei junaehto)
- Codex 57463fc24: posti/mantan-smaragdi-unikuva-645-20261019/approved651-new-dream/mantan-smaragdi-unikuva-native.png (1254×1254, claude/postilaatikko).
  Kytke natiivi-ui/uni-smaragdi-204:ään: kopioi StreamingAssets/mukana/isoisan-uni-mantan-smaragdi.png (+ .meta DefaultImporter, uusi guid),
  LAHDE.txt-rivi, poista isoisan-uni-el-dorado.png(+meta) ja LAHDE-rivi; tarkista alfa-reunat kuten muut (tyokalut/unikuva.py). Simu `ui aloitus uni`.
  Järjestys PT:n mukaan: aarrevideo ja B3 ensin.

## TILA 17.48 (päivitys)
- ketju5a VALMIS, SIMU VAPAA annettu JU:lle. Kippi iPhone OK (todistus-kippi-napit-204-iphone-20261019-1740) → PT:lle kerrottu.
- B3 04d8dc98d PT kuittasi junaan 204 (NS ottaa) ja pyydetty JU:n jonoon (juna204-b3-ipad-app) → SIMU NYT → aja
  `todistusajo.sh --era b3-vieritys-ipad2 --laite ipad --udid <iPad> --app <app> --sha <kaannos> --haara 04d8dc98d --skenaario SP/b3-vieritys-ipad.txt --nyt`
  (cd /Users/Shared/Claude/wt/proto-natiivi-ui-b3-ipad-204) → vedon aikainen p50 kehysajat-riveiltä → PT (luku + lokin polku).
