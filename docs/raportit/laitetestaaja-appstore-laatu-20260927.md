# App Store -laatukierros, TF 1.0.31 (juna/b13 8096bae5, käännös a86e4eb6), 27.9.2026 ~17.3x-18.4x

Laitteet: iPhone 18 Pro (1572C658) pysty+vaaka, iPad Pro 13" M5 (3B4CDACB) pysty+vaaka.
Vain Eurooppa-kaupungit. Vakavuusluokat: **VAKAVA** (estää käytön/kaatuu/data menetetty),
**NÄKYVÄ** (haittaa käyttöä, huono ensivaikutelma), **PIENI** (kosmeettinen).
Kuvat: docs/raportit/kaappaukset/appstore-20260927/, versio+laite+kulma merkitty kuvaan.
0 poikkeusta kummallakaan laitteella koko session ajan.

## Yhteenveto

**1 NÄKYVÄ löydös omistavalle roolille (Natiivi-UI):** iPhonen vaakatilassa "Näytä yläpalkki"
-nappi rikkoo asettelun (sisältö kiertyy sivuttain kapeaan pystykehykseen), toistettu 2/2.
Muu kierros pääosin PASS: kylmäkäynnistys 8,0 s, lehden vieritys sujuvaa, tekijätiedot täydelliset,
iPad-vaaka toimii hyvin omalla sivupalkillaan. 2 pientä/epävarmaa huomiota kirjattu alle. Ei
ehditty: 10 min muisti/lämpö-seuranta, offline-tila jäi osittain todentamatta (chat vastasi silti
simuloidussa verkottomassa tilassa), iPadin täysi läpikäynti (vain pikatarkistus).

## Löydökset

### 1. NÄKYVÄ — iPhone: vaakatilan "Näytä yläpalkki" -nappi rikkoo asettelun (Natiivi-UI)

**Toistettavuus: 2/2.** iPhone 18 Pro, `ui kierto vaaka`. Heti kierron jälkeen yläpalkki (raha/
päivä-HUD) on oikein piilossa tilan säästämiseksi, ja oikeassa yläkulmassa on "≪"-nappi
(`mk-vakasnappi`, Ylapalkki.cs, tooltip "Näytä yläpalkki"). Napautettaessa tätä nappia koko
näkymä KIERTYY SIVUTTAIN KAPEAAN PYSTYKEHYKSEEN — laite raportoi pystyorientaation (kapea
dynaaminen saari ylhäällä) mutta pelin koko sisältö (kartta, tekstit, HUD) on käännetty 90°
vaakaan tämän kehyksen sisällä, täysin lukukelvottomana. Tila on pysyvä, ei korjaudu itsestään.
Palautuu vain `ui kierto pysty` -komennolla (debug-konsoli), ei havaittua tapaa korjata pelin
omasta UI:sta.

**HUOM testausvaraus:** testattu `ui kierto vaaka` -debug-komennolla simuloidun kierron kautta
(ei fyysistä/todellista laiterotaatiota — simulaattorityökalussa ei ollut suoraa "käännä laite"
-toimintoa). On mahdollista että tämä on erityisesti tämän debug-komennon ja Ylapalkki.Avaa()-
kutsun yhdistelmän artefakti eikä toistu oikealla laitteen kierrolla. **Suosittelen Natiivi-UI:lle
varmistamaan sama Simulator-sovelluksen oikealla laitekierrolla (Cmd+Vasen/Oikea) ennen kuin
merkitään varmaksi VAKAVAKSI App Store -esteeksi** — jos toistuu oikealla kierrolla, nostan
luokan VAKAVAKSI (sisältö täysin lukukelvoton).

Kuvat: `03-kartta-iphone-vaaka.png` (siisti vaaka heti kierron jälkeen, HUD piilossa oletuksena),
`04-vaaka-hud-puuttuu.png` (sama, toinen ajo), `05-vakasnappi-kiertobugi.png` (rikki napautuksen
jälkeen, 2. toisto).

### 2. PIENI — Kaupunkilehti: pulu-kuvake peittää viimeisen tekstirivin (Natiivi-UI)

iPhone pysty, `ui lehti pariisi`, ensimmäinen sivu: kelluva pulu-kuvake (oikea alakulma, kiinteä
sijainti) peittää osittain tekstikappaleen viimeisen rivin ("Samalla saarella seisoo Notre-Dame,
jota alett[aa]..."). Vieritys itsessään toimii sujuvasti (testattu useita sivuja), pulu vain
peittää tekstiä satunnaisissa kohdissa kun kappale loppuu juuri sille kohdalle missä pulu on.
Kosmeettinen, ei estä lukemista (voi vierittää hieman lisää nähdäkseen koko rivin).

### 3. HUOM/PIENI — Valuuttamerkin sijainti ja ulkoasu vaihtelee laitteittain

iPhonella koko session ajan (kaikki aiemmat 1.0.29-1.0.31-kierrokset): "400£" (luku ennen
merkkiä). iPadin pystytilassa (`06-ipad-pysty.png`): "£400" (merkki ennen lukua), ja £-glyyfin
oma vaakaviiva näyttää zoomattuna kulkevan lähes kiinni seuraavaan numeroon — TODENNÄKÖISESTI
pelkkä fontin oma £-merkin muotoilu (£:ssä on aina vaakaviiva), ei aito "yliviivattu 400"
-tyyli — tarkistin CSS:stä (`mk-pilleri__raha--rahaton` vaihtaa vain väriä, ei tekstityyliä).
EI merkitty bugiksi, mutta kannattaa Natiivi-UI:n silmäillä `06-ipad-pysty.png` pikaisesti,
onko £-merkin ja luvun järjestys (400£ vs £400) tarkoituksellinen laitekohtainen ero.

### 4. Kylmäkäynnistys ja verho: PASS

iPhone 18 Pro, tyhjä asennus: aloitusverho poistui 8,0 s kohdalla ("aloitusverho: pois 8,0 s
(pallo 100 %)"). Päävalikko asettuu siististi, ei leikkautumista, safe area kunnioitettu
(dynaaminen saari ja kotipainikealue vapaana). Kuva: `01-paavalikko-iphone-pysty.png`.

### 5. Asettelu ja safe area (pysty, molemmat laitteet): PASS

iPhone ja iPad pystytilassa: HUD-elementit (rahapilleri, kaupunkipilleri, ☰-nappi, elämäpalkki)
pysyvät turvarajojen sisällä, ei leikkautumista dynaamisen saaren tai kotipainikkeen alueella.
Kuvat: `02-kartta-iphone-pysty.png`, `06-ipad-pysty.png`.

### 6. iPad vaakatila: PASS, oma toimiva ratkaisu

iPad Pro 13", `ui kierto vaaka`: pelillä on OMA erillinen vaaka-asettelu (pystysuuntainen
sivupalkki oikealla: MATKAKIRJA-otsikko, raha/päivä, ☰), täysin toimiva, ei vastaavaa
kiertymisongelmaa kuin iPhonella. Kuva: `07-ipad-vaaka.png`. Ei havaittu tarvetta erilliselle
"näytä yläpalkki" -napille tällä laitteella, koska tiedot ovat aina näkyvissä sivupalkissa.

### 7. Lehden vieritys: PASS

Kaupunkilehti (Pariisi), useita sivuja/kappaleita vieritetty pystysuunnassa: sujuvaa, ei
nykimistä, kuvat/tekstit asettuvat oikein, "Lehden osiot" -lista renderöityy siististi.

### 8. Tekijätiedot ja lähteet: PASS

☰ → Tekijätiedot: copyright, VVI, Claude (Anthropic) -maininta, lisenssitiedot (Natural Earth,
GSHHG) kaikki näkyvissä ja luettavissa, ei leikkautumista.

### 9. Äänet (luenta/Äänimaisema): PASS, jo vahvistettu tässä kierroksessa

Ks. savukierros-tf1031-20260927.md: nostokortin lukija soi ilman Äänimaisema-kytkintä
(rms 0,118, ei virhettä) — sama koodi käytössä tässä käännöksessä, ei uusintatestiä tarvittu.

### 10. Offline-tila: OSITTAIN TESTATTU, epävarma tulos

`ui offline verkoton` (UiKomennot.cs debug-lippu) simuloi verkottoman tilan sisällölle, mutta
Pulun tekoälyvastaus (`ui chat <kysymys>`) TOIMI SILTI täydellisesti verkottomassa simuloinnissa
(täysi, johdonmukainen vastaus Tuileries'sta). Tämä voi tarkoittaa: (a) `verkoton`-lippu vaikuttaa
vain laatta-/sisältölataukseen eikä chat-API-kutsuihin, tai (b) todellista verkkokatkoa ei
saavutettu (simulaattorissa ei ole erillistä lentotila-kytkintä asetuksissa, koska simulaattorilla
ei ole oikeaa radiota — Asetukset-sovelluksesta puuttui Lentotila-rivi kokonaan). **En pystynyt
todentamaan aitoa offline-käytöstä tällä kierroksella.** Suosittelen Pelikoodarille: jos oikea
lentotila-testi tarvitaan, se vaatii joko Mac-tason verkkoeston simulaattorin prosessille tai
fyysisen laitteen.

### 11. Muisti ja lämpö 10 min pelissä: PASS (jälkikäteen täydennetty)

Ajettu erikseen tilinvaihdon yhteydessä, ks. docs/raportit/savukierros-tf1031-lampo-20260927.md:
11 min 1 s, lämpötila "Normaali" koko ajan (22/22 mittauspistettä), fps vakaa 30,0-32,6, ei
poikkeuksia. Muisti RSS ~1,54 Gt (yksi mittapiste, ei trendiä pidemmältä ajalta).

## Ei ehditty / rajaukset

- Offline-tilan aito todentaminen (ks. kohta 10).
- iPadin täysi läpikäynti (nostokortit, chat, avauskortti jne. — testattu vain pysty/vaaka-
  peruskartta ja tiedettiin jo toimivaksi 1.0.29-1.0.31 muilla kierroksilla samalla käännöksellä).
- iPhonen vaakatilan bugi (kohta 1) ei varmistettu oikealla fyysisellä/simulaattorin laitekierrolla,
  vain debug-komennolla — Natiivi-UI:n suositellaan varmistamaan ennen VAKAVA-luokitusta.
