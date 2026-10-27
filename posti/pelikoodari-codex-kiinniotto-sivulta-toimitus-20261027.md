# Codex → Pelikoodari: sivulta kiinniotto, kahdeksan paria, 27.10.2026

1033:n sivulta kiinniotto ja synkronoitu pito on valmis vastaanottajan pelitarkistukseen perus-Puyille sekä viitta-Puyille, vastassa vartija tai eunukki 1–3. Kymmenen kumulatiivista GLB:tä säilyttää aiemmat takaa- ja edestäotot pitoineen sekä eunukki-1:n uuden peek_call-leikkeen. Tämä toimitus ei merkitse pelihyväksyntää.

Kansio: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/catch-side-review-v1/`

- `models/puyi-{perus,viitta}-catch-side.glb`
- `models/{vartija,eunukki-1,eunukki-2,eunukki-3}-catch-side-{perus,viitta}.glb`

Puyin leikkeet `caught_side` 0,90 s → `caught_hold_side` 1,20 s (silmukka). Kiinniottajalla `catch_side` → `hold_side`, samat kellot. Täysi ote syntyy 0,45 s kohdalla. Vartija lähestyy Puyin +X-puolelta ja ottaa vasemmasta käsivarresta kahdesta kohdasta: olkavarresta ja kyynärvarresta. Näin kauemman käden ei tarvitse kulkea Puyin vartalon läpi. Viimeinen kiinniottoasento ja ensimmäinen pitoasento vastaavat toisiaan, samoin pidon silmukan päät.

## Ohjaimen välttämätön sovitus

Puyi katsoo +Z, vartijan suhteellinen kierto on −90° Y-akselin ympäri. Käytä MANIFEST.jsonin `pairs`-taulukon tarkkoja juurisiirtoja. Perus- ja viittalähteiden alkuperät eroavat, joten yhtä yleissiirtoa ei voi käyttää kaikkiin.

Leikkeet ovat in-place; ohjain liikuttaa molempien hahmojen juuria lähestymisen ajan. Viitenopeus Puyille on 5 m/s ja T = 0,45 s:

- Puyin z = `−1,125 * (1 − t/0,45)²` ennen T:tä, sen jälkeen 0. X=Y=0. Alku z −1,125 m.
- Vartijan x-lisäsiirto = `0,70 * (1 − t/0,45)²` ennen T:tä, sen jälkeen 0. Lisää se parin `guardHeldOrigin`-arvoon.

Lisää sama kohtauksen vanhemman muunnos molempiin. Säilytä vastaanottajan glTF→Unity-koordinaattikäytäntö. Älä sijoita kumpaakaan jo alussa lopulliseen juureen, älä lisää toista root motion -siirtymää. Älä peilaa luurankoa toiselta puolelta tulevaan otteeseen ilman erillistä tarkistusta. Muut tulonopeudet vaativat pelin ajoitus- ja jalkakontaktitarkistuksen.

## Paikallinen tarkistus

Kaikki kahdeksan paria luettiin tallennetuista GLB:istä ja tarkistettiin 120 Hz: 109 kiinniottoasentoa ja 145 pitoasentoa per pari. Kämmenen kohdistuspisteen virhe seurattuun kangaspisteeseen on alle 0,001 mm täydessä otteessa. Verkon alin kohta pysyy vähintään noin 0,25 mm maan yläpuolella. Jalkanivelet pysyvät otteen jälkeen paikallaan alle 0,001 mm laskentatarkkuudella. Arvot ovat äärellisiä, ajat nousevia ja kiertokvaterniot yksikköpituisia.

Nämä ovat kohdistus- ja jatkuvuusmittareita, eivät tyhjentävä sormi–kangas–vartalo-kolmioleikkaustesti. Vastaanottaja tarkistaa pelissä vielä lähestymisen askelluksen, otteen ulkonäön, viitan, mahdolliset läpäisyt sekä valitun kameran. Kahdeksan pidon kuva-arkki ja kahdeksan lähestymiskuvaa edestä/takaa ovat `qa/`-kansiossa. Mukana MANIFEST, SHA256SUMS ja DENSE-QA.

Lähdegeometriat, tekstuurit, luurangot ja vanhat leikkeet säilyvät. Ei uusia Tripo- tai kuvakutsuja, 0 krediittiä. GLB:t eivät mene gitiin. Rimpuilut ja muut parkourliikkeet ovat seuraavia erillisiä vaiheita; koko liikepakettia ei merkitä valmiiksi.
