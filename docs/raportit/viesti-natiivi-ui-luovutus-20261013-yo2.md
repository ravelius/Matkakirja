# Natiivi-UI: luovutus 13.10.2026 klo 21.3x (tilinvaihto, PT:n pyyntö)

Natiivi-UI (Opus, high) → seuraava Natiivi-UI-sessio (uusi tili). Edellinen: viesti-natiivi-ui-luovutus-20261013-yo.md
(ISS-Pulu siluetti aloitettu). Pysyvät säännöt -20261012-ilta.md ja -20261010-aamu.md. Ajoskriptit:
/Users/Shared/Claude/proto-3d/lokit/natiivi-ui-ajoskriptit-20261012.

## ERÄ 1 (kesken, simua vaille): ISS-Cupolan Pulu siluettina — juna 188
Omistajan palaute 13.10. klo 20.3x sanatarkasti: "Pulu ja varsi pitäisi olla ihan musta siluetti paitsi pulun oma kypärävalo.
Pulu voisi olla aavistuksen pienemmällä ja varsi pidemmällä kuin avaruus kävelyllä. Kun pulua painaa se voisi hilautua lähelle
ruutua ja sitten valaistua samalla paremmin."

Haara natiivi-ui/pulu-siluetti-188 (proto-git, pohja natiiviseppa/juna-188 f9170af15), worktree
/Users/Shared/Claude/wt/proto-natiivi-ui-pulusiluetti188. Commitit: c8058b597 (siluetti, pienennys, varsi, hilaus),
2c4012925 (pulu-kosketus ui-puuhun), d99798c9a (hilaus myös Minne katsotaan -taululla; visiiri musta siluetissa; kypärälamput
siluetissa täysinä), 56de0538a (taulu Pulun hilauksen perillä olevan paikan mukaan, ei hypi). Tarkistus 0 virhettä, pohjavahti ok.
Käännös 24420556f (56de0538a) appikopiossa natiivi-ui-app-siluetti188.

Simuhistoria: 20.58 (8caebc5fe) napautus ei hilannut + visiiri hehkui → d99798c9a. 21.19 (d6901b78c) iPhone + iPad OK:
lepo täysin musta, vain kypärälamput; napautus → Pulu lasin keskelle ~1,5× ja valaistuna; paluu siluetiksi. MUTTA taulu hyppäsi
kahdesti Pulun liikkuessa → 56de0538a (ei vielä simussa).

PÄIVITYS 21.5x: simu 24420556f (56de0538a) iPhone + iPad OK, taulu ei hypi. Kuva-arkit (kuva-arkki-iphone/-ipad.png) ja
ruutusarja-iphone.png toimitettu PT:lle kansiosta lokit/natiivi-ui-siluetti188-toimitus. ODOTTAA PT:N KUITTAUSTA → SHA 56de0538a
Natiivisepälle (pohja juna-188). Vaiheet 1–4 alla on tehty.
VANHA SEURAAVAKSI:
1. SIMU NYT Julkaisijalta (jonossa ~21.50, LS2 → LS1 palaute188 → NUI) → `zsh siluetti188c.sh` (UUSI iPhone + iPad, sammuttaa simut
   lopuksi) → SIMU VAPAA Julkaisijalle.
2. Tarkista ruutusarjasta, ettei taulu hypi: `python3 ruutusarja.py <todistus>/hilaus.mp4 <ulos.png> 260 "<otsikko>" <napautus−0,15 s> 12
   <paluu−0,15 s> 8` (napautuksen aika: ffmpeg fps=2 tile -yleiskuvasta; iPhone 21.19-ajossa 3,0 s ja 10,0 s). iPad-video on
   pystyssä (simulaattori tallentaa kiertämättä).
3. Kuva-arkki PT:lle: `python3 siluetti-arkki.py <NYK lepo> <UUSI lepo> <UUSI napautettu> <ulos> "<laite>" <sha-nyk> <sha-uusi>`;
   NYKYINEN lepo: iPhone lokit/todistus-siluetti188-iphone-20261013-2027/kuvat/c1-lepo.png, iPad -ipad-20261013-2101 (76c30d37).
   Toimituskansio lokit/natiivi-ui-siluetti188-toimitus (ruutusarja-iphone.png = 21.19-ajo, taulu vielä hyppää).
4. PT:lle kuva-arkki + ruutusarja ennen kuittausta; rivi: webin vastinmuutosta ei tarvita (Cupolan ikkunan takana -asettelu on
   natiivin oma, NATIIVI ON MALLI). Kuittauksen jälkeen SHA Natiivisepälle (pohja juna-188).
Huom: Kysy Pululta -chat avaa myös hilauksen (Chat.Auki), mutta chatin ankkuri seuraa Pulun nykyistä paikkaa (ChatinAnkkuri) → tarkista
simussa, hyppiikö chat; korjaus samalla tavalla kuin taululle (Pulu.TaulunAnkkuri).

## ERÄ 2 (kesken, löydöslista tulossa): KESKITYS-tarkistus asettelutestiin — juna 188
PT:n välittämä omistajan pyyntö 13.10. klo 21.0x sanatarkasti: "Peliin pitäisi saada edottomasti joku toiminto, mikä aina
tarkistaisi, että kaikki nappien sisällä olevat elementit, symbolit tai tekstit olisivat aina keskitettyjä, koska ne tulevat joka
kerta ensin vain vähän sinne päin." PT: ≤ 0,5 pt vaaka ja pysty, kaikki näkymät, neljä kokoa, testi kaatuu, korjaukset
tyylikirjan arvoilla, LÖYDÖSLISTA PT:LLE ENNEN KORJAUKSIA, sitten kuittausrivi. Esimerkki museon Astu sisään (LS1 korjaa napin).

Haara natiivi-ui/keskitys-188 (pohja juna-188 f9170af15), worktree /Users/Shared/Claude/wt/proto-natiivi-ui-keskitys188:
a1381238b (AsetteluTesti.Keskitys.cs + Jatka-kutsut kaikkiin tarkistuskohtiin + ui-asettelutesti.sh `<h> <osa> keskitys`, ilman
osaa 4 varausta), 0306e99e8 (PROTO_LINJA=2), d2e397de7 (napin nimi lapsen tekstistä), e309de773 (kerrokset vain nappien kohdalta,
kolmas kuva tunnistaa liikkuvan napin, tekstin pysty optisesti peruslinjasta versaalikorkeuteen glyyfimitoista).
Mittaus: kuva sisällön kanssa / sisältö piilossa / taas sisällön kanssa; erotus = muste. Editorikoodin käännöstarkistus:
`bash <ajoskriptit>/ut-editori.sh` (keskitys-worktreen kopio Peli-testit/unity-tarkistus.sh + Editor-kansion käännös; 28 CS0433-riviä = työkaluketju, ei vika).
tarkista.sh ei käännä Editor-kansiota!

Ajo 1 (a1381238b, 21.07): pallo aikarajassa (koko ruudun yhdistäminen hidas), linna 53 VIKAA. Tyypillisesti tekstinapit
+1,2…+1,8 pt (muste alempana), mutta "Äänet" −1,5 / "Kertoja" +1,5 samassa tyylissä (ä-pisteet) → optinen tekstimitta e309de773:ssä.
☰ +10 pt = nappi häivytyksessä → kolmas kuva. Lokit kaannospalvelu/20261013-2107*-pallo-keskitys.log(.unity.log), -2113*-linna-keskitys.
Ajo 2 (e309de773) käynnissä linjalla 2 (Julkaisijan LUKKO NYT 21.26): `keskitys188.sh` → keskitys188b-pallo.log / -linna.log,
lopuksi "LUKKO VAPAA keskitys188b" → ilmoita Julkaisijalle LUKKO VAPAA linja 2.
AJO 2 VALMIS 21.36 (LUKKO VAPAA lähetetty): linna 20 VIKAA, pallo aikarajassa (iPhone pysty, iPhone vaaka ja iPad pysty ehtivät).
LÖYDÖSLISTA LÄHETETTY PT:LLE 21.4x: lokit/natiivi-ui-keskitys188-loydokset.md (A aidot luokittain, B mittausepäilyt). Seuraavaksi
listan kohdat 1–3 (B-mittausviat testiin, pallo kahteen varaukseen MATKAKIRJA_ASETTELU_KOOT=iphone / ipad, sitten A-korjaukset).
VANHA OHJE: lue VIKA KESKITYS -rivit (grep "KESKITYS\|keskitys " kaannospalvelu/*keskitys*.unity.log), ryhmittele luokittain
(mk-linssivalikko__kohta, mk-chat__siru, mk-ohjausnappi, mk-issohjaamo__lcdnappi …), tarkista epäilyttävät (esim. "⟨Huoneet⟩"
muste 56×30 = ohjausnappi--iso, "⟨Linssit⟩" 3×5) ja lähetä PT:lle löydöslista ennen korjauksia. Korjaukset tyylikirjan arvoilla
(UI-POHJAT: puuttuva pohja → PT). Tavoite: testi läpi ja pysyvä osa ui-asettelutesti.sh:ta.

## PÄIVITYS 22.00 (uusi tili)
- Siluetti 56de0538a KUITATTU (PT) → SHA lähetetty Natiivisepälle junaan 188. ERÄ 1 VALMIS.
- Keskitys: A/B-yhteenveto PT:lle 21.5x (odottaa kuittausta ennen A-korjauksia). B-mittausviat testiin 659a27065: kuvat, taustakuvat,
  oma piirto ja väritetyt lehdet (radion valo, palkki) mitataan laatikostaan; SvgIkonin reuna 0,25 × huippu (ohut viiva); monen osan
  rivi ilman keskitystä ei ole keskitetty (Untuvikko); tekstin muste < 60 % leveydestä tai < 40 % koosta = "?? peitossa", ei vikaa
  (mylly vaaka); vika- ja peittokuvat (sisällön kanssa | ilman | erotus) tulokset/asettelukuvat/keskitys → kopioidaan
  lokit/natiivi-ui-keskitys188c-kuvat. ui-asettelutesti.sh ilman osaa: keskitys pallo kahtena varauksena (iphone, ipad).
- Ajo 3 linjalla 2 (Julkaisijan LUKKO NYT 22.00): `keskitys188c.sh` → keskitys188c-<osa>-<koko>.log; lopuksi LUKKO VAPAA Julkaisijalle.
  SEURAAVAKSI: lue VIKA- ja ??-rivit, katso kuvat, sitten PT:n kuittauksen jälkeen A-korjaukset luokittain.

## PÄIVITYS 22.3x
- PT KUITTASI suunnitelman 22.0x (B testiin, A vain tyylikirjan arvoilla, kuva-arkki ennen/jälkeen iPhone + iPad ennen junaan 188
  kuittausta, Astu sisään = LS1). Ajot 3 (22.00, L2) ja 4 (22.15, L1) tehty, LUKKO VAPAA ilmoitettu. Kuvat
  lokit/natiivi-ui-keskitys188c-kuvat ja -188d-kuvat (vasen sisällön kanssa | ilman | erotus); vikariveillä nyt "osat <tyyppi> <laatikko>".
- Testi: a53cc2f78 (peitto vain sanoille), 6aaf6dc59 + 10b4e302b (peitetty nappi ohitetaan, kun päällä näkyvästi piirtävä osa;
  PickAll + näkyvyys). A1-korjaukset 49a687747: pelkän kuvakkeen napit (⏸ pulu.uss, mikserin ‹ .mk-pikkunappi, mikserin avausnappi
  MikseriPaneeli.cs) kuvakkeen margin-right 0; .mk-linssivalikko__kohta flex-shrink 0.
- JUURISYYT (ajo 4, lähetetty PT:lle 22.3x, ODOTTAA PÄÄTÖSTÄ): (2) kuvake+teksti-napit 0,7–1,5 pt = kuvakkeen oma 1/12-reunus,
  asettelu tarkalleen keskellä → suositus: testi mittaa SvgIkonin laatikosta; (3) tekstin pysty 1,0–1,8 pt = kirjasimen ylä-/alatila
  → suositus: uusi tyylikirja-arvo (kirjasinkohtainen optinen siirto napin tekstille), vaatii PT:n/omistajan luvan.
- Avoimet: Ohita opastus iPad shakki −6,5 pt (Label alkaa 1 pt napin reunasta, padding 7,2 ei näy; selvittämättä), Pro-rivin ⓘ
  (ajossa 4 "toinen osa päällä"; katso uudessa ajossa), mylly-napit/LAAJA/TELE peittona ajossa 4 → 10b4e302b korjaa todennäköisesti.
  Peli-asettelutestin omat viat (aarretehtävä ei avautunut ×2, metrolinja päällekkäin iPhone vaaka) eivät ole keskitystä.

## Opetukset
- Taulu sijoittuu PulunTauluNakyma.PulunLaatikko → Pulu.TaulunAnkkuri; liikkuva Pulu siirsi taulua.
- Simulaattorin iPad-video tallentuu pystyyn; kuvaruudut (c1–c3) ovat oikein päin.
- Taustaskriptin tappaminen: tapa vain oma ulompi zsh (kill -9 <pid>), lapsiprosessi (käännös) jatkuu.
