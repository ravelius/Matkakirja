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

SEURAAVAKSI:
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
SEURAAVAKSI: lue VIKA KESKITYS -rivit (grep "KESKITYS\|keskitys " kaannospalvelu/*keskitys*.unity.log), ryhmittele luokittain
(mk-linssivalikko__kohta, mk-chat__siru, mk-ohjausnappi, mk-issohjaamo__lcdnappi …), tarkista epäilyttävät (esim. "⟨Huoneet⟩"
muste 56×30 = ohjausnappi--iso, "⟨Linssit⟩" 3×5) ja lähetä PT:lle löydöslista ennen korjauksia. Korjaukset tyylikirjan arvoilla
(UI-POHJAT: puuttuva pohja → PT). Tavoite: testi läpi ja pysyvä osa ui-asettelutesti.sh:ta.

## Opetukset
- Taulu sijoittuu PulunTauluNakyma.PulunLaatikko → Pulu.TaulunAnkkuri; liikkuva Pulu siirsi taulua.
- Simulaattorin iPad-video tallentuu pystyyn; kuvaruudut (c1–c3) ovat oikein päin.
- Taustaskriptin tappaminen: tapa vain oma ulompi zsh (kill -9 <pid>), lapsiprosessi (käännös) jatkuu.
