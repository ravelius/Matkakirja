# Pelikoodari: luovutus 5.11.2026 klo 22.15: KK:n sitova ovipari ajossa sk-s kesken, rajaviesti koodattu, kynnysviesti nähty uudella ovella

Täydentää -2142:ta; sen kohdat 0, 3 ja 4 ovat tässä korvattu, muut pätevät. Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `35140432d`, viety `natiivi-backup`iin. Ei junaan. **Taso 1 on yhä pääasia.**

7.47: tässä sessiossa Raamattua luettu vain Remote-kohta hakuna; muu luovutuksista.

## 0. Seuraavaksi (sitova, KK 5.11. 22.0x)
**JU:lta pyydetty 35140432d, sk-s, 6 kuvaa.** "ESIKATSELU NYT <linja>" jälkeen:
`zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/vapaa-1/ajo-sks.sh <linja> 35140432d`, sitten LUKKO VAPAA, kesto, kuvamäärä JU:lle. Tarkista ensin, onko ajo jo tehty: `ls -td lokit/esikatselu-*`, loki `sk-s.txt`.

**Sha ei ole koskaan kääntynyt Unityssä** (varjostin, kuva, rajat; vain Peli-testit 201/201). Tarkista loki.

Kuvat ja KK:n käsky:
1. **Ristikko ja renkaat:** `o1`/`o2` sama hetki sisään/ulos (q1), `o3`/`o4` sama kamera sisään/ulos (q7/q6), `o6` edestä sisään. KK: sisäänpäin aukeavan lehden pitää näkyä hämärässäkin tunnistettavasti samana ovena (omistajan Kyllä 4.11. 14.46 koski ovimallia ristikolla ja renkailla). **Jos ei näy, säädä `valo` varjostimessa** (`JuoksuOviHamara.shader`: 0,30 + 0,65·exp(−0,9·m)).
2. **Laikut:** `o5` = sama kamera kuin `o4`, ovet pois (`ovikoe pois`). Jos tummat laikut näkyvät yhä, ne ovat vanhoja (tausta), eikä niitä korjata. Ajon 220320 `x3`:ssa samanlaisia suorakaiteita on seinässä ilman ovea, joten **vanha on todennäköisin (päätelty, varmista o5:stä)**. Koodin `ovi täyte valo` (`b0cbcfa3a`, 5.11. 07.53) on myös ehdokas: se on haarassa, mutta ei `dc38e2ddc`:n tuoma. KK: korjaa vain, jos tämä muutos toi ne; karmin kulman tumma suorakaide samalla, jos syy on sama. Kerro alkuperä KK:lle.
3. **KK:lle:** sama ovi ja kamera sisään ja ulos, q1 ja q7, katsottuina täysikoossa, ei leikkauksia. KK vie kortin omistajalle vasta niiden jälkeen. q1:n karmi ja seinä: KK kertoo omistajalle, älä korjaa. Ei mittauksia eikä junaan.
- **Peukalokohdat:** ei vika (KK kuitannut, kohta 1 pois). x 14 % ja 86 %, y 70 %, `Peukalokohta`. Syy puuttumiselle ajossa 212358 on päätelty lämmitykseksi, ei mitattu.

**Lisäys 22.1x: `sk-s` käynnissä L1:llä, JU antoi vuoron.** Tuloste `/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-pelikoodari/1c8f51a9-6803-454d-a6bd-47a4a1524352/scratchpad/ajo-sks.log`. Jos seuraaja aloittaa ennen sen loppua, tarkista `lokit/esikatselu-*` ja LUKKO VAPAA JU:lle (linja 1).

## 0b. KK:n päätös 22.1x (sitova, muuttaa kohtaa 2)
**Seinä kujan kohdalle: aukot suljetaan** (linja kuten omistajan 4.11. 13.00 "suljetut pihat kiinni"; kohde: ulkoa näkyy umpinainen rakennus, ei kuja, ja pelaaja saa viestin **vain oikean oven kohdalla**). Jos rakennukselta puuttuu sen jälkeen ovi, sama ovi samalla säännöllä, ei uutta sääntöä.
1. **Lista koneella:** montako yhtä avointa katettua aukkoa näkyy tason 1 kulkualueelta; luku ja lista KK:lle; sama korjaus kaikkiin. Lähtötieto `kosketukset.json`: 172 kohtaa ei ole talon pohjalla (rajaa näistä oikeat aukot, kuistit erikseen; 321 talon pohjalla ei ole tätä tapausta ilman tarkistusta).
2. **Seinät LAV:lle ohjeena, ei omaa mallia.**
3. **Kuva sama kamera ennen ja jälkeen KK:lle täysikoossa katsottuna** (ennen: ajon 220320 `x1-kuja-pohjoisesta.png`; sama kamera sk-r:ssä). Ei junaan, ei erillistä ajoa pelkästään tähän.
- **Ristiriita selvitettävä PT:n kanssa heti:** PT hyväksyi 22.0x rajaviestin (kohta 2), KK nyt "viesti vain oikean oven kohdalla". KK:n päätös on uudempi ja omistajan kanavalta: **älä vie rajaviestiä mihinkään ilman KK:n ja PT:n kuittausta**, ja kerro PT:lle, että `35140432d`:n rajaviesti todennäköisesti poistuu, kun seinät ovat paikallaan. Ei ole vielä kerrottu.

## 1. Lehden pinta (`af4a8fc82`)
`Resources/JuoksuOviLehti.png` 512×1024 on leivottu `mallit-v1/ovi-lehti-vasen.glb`:n etupinnasta (Codexin kuva ennallaan, ei uutta grafiikkaa), työkalu scratchpadissa `leivo-lehti.py`. Bake katsottu: sama ristikko ja rengas. Sijoitus varjostimessa u 0 sarana, 1 keskisauma. Kuva tulee sovelluksen mukana, ei mediasta.

## 2. Rajaviesti (`35140432d`, PT hyväksyi 22.0x)
PT: sama viesti 493 rajalle, kartta ennallaan, sääntöä ei väljennetä, ei junaan.
- `tyokalut/kulkukartta-rajat.py` → `Resources/JuoksuKulkuRajat.bytes` (66 kt, 16 574 pistettä kartasta v19); `JuoksuKulkuKartta.RajaEdessa`; `KynnysViesti`; testi `KynnysViestiYltaaRajoille`: 399/408 pysähdystä. **Kartta muuttuu → aja rajat uudelleen.**
- PT:lle kerrottu: ei vientiä, julkaistu ei saa mitään; kulkee sovelluksen mukana.
- **Ei nähty pelistä.** sk-s ei sitä näytä, ellei keisari satu rajalle: seuraavan ajon mukaan. Mahdollinen virhe: viesti tulee seinällä, joka on 3 m:n sisällä rajasta (ei mitattu).

## 3. Mitä ajo 220320 osoitti (`7293ed891`, sk-r, 559 s, 7 kuvaa, L1)
- **Kynnysviesti nähty uudella säännöllä:** `r1-kynnys.png`, ovi 107, keisari (−108,9; 441,7), väli 1,93 m, vanha 1,5 m:n säde ei yltäisi. PT:lle viety. `r2` katsomatta.
- **Ontto talo:** `x3`, `x4` katsottu täysikoossa, viety KK:lle PT:n rivillä; `x1`, `x2` katsomatta. Tyhjä huone, katossa rako, josta näkyy taivas. **KK päättää seinästä LAV:lta, ei PT.** Oma suositus: seinä.
- **Ympärikäännös ei todistettu:** suunnat (0,1) → (−1,0) → (0,−1) oikein, s 19,6 → 24,9. Kaikki `paikka`-rivit odotusten välillä näyttivät saman ajan 23,9: `odota-peli 0.1` ei edennyt peliaikaa. Kamera tunnetaan vain ennen ja jälkeen. **Älä toista odota-peli-tiheänä;** tarvitaan lokirivi koodista tai näyttöajo. `y3` katsomatta. Ei pyydetty lisää.

## 4. Este: lopputulos
Täysi perustelu `docs/raportit/viesti-pelikoodari-nakymaton-este-20261105.md` (`5bc3c2f30`). "Kuja" 86 m², aukot 1,55 m, ei pohja.json:ssa; 493 rajakohtaa. -2142:n räystäsraja ja leveysraja ei auta: mitattu 4 m:iin.

## 5. Avoimet, -2142 kohta 5 ja vanhemmat pätevät
Koonti KK:lle kuvien jälkeen, rikkoutuminen ja omena, LAV:n koristeet, `huuto yleinen ""`, lattian valkoiset katkoviivat, kaiteen raidoitus (ei kirjattu valmiiksi).

## 6. Työkalut
Scratchpad `/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-pelikoodari/1c8f51a9-6803-454d-a6bd-47a4a1524352/scratchpad/`: `leivo-lehti.py`, `kuja-ruudut.py`, `kuja-kartta.py`, `kuja.png`, `kuja-kate.py`, `este-leveys.py`, `kosketukset.py`, `kosketukset.json`. Oviväliaikainen testi (polkuhaku mid-käännöksillä) poistettu; jos tarvitset, lähde -2142 `mittaus-ovet.cs.txt`, polku ovelle 107: `sk-r.txt`.

## OPIT
- Väite "kuja" ja "kuisti" pitää tarkistaa ruudukosta ja kuvasta: tässä kuja oli ontto talo, eikä mikään leveysraja auttanut.
- Tiheä `odota-peli` ei etene peliaikaa komentojen välissä: alle sekunnin ilmiö lokiin koodista.
- Vuoroviestit menevät ristiin: odota JU:n vastausta ennen peruutusta, tai kumoa heti, kun viestit risteävät.
