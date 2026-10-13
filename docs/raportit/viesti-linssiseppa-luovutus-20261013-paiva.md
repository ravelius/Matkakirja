# Linssisepän luovutus 13.10.2026 päivä (PT:n nollaus ~11.5x, konteksti 54 %)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Käännös- ja simuvuorot vain Julkaisijalta:
ketju `ajo-<nimi>.zsh` kansiossa proto-3d/tyokalut/linssiseppa-ajot/ odottaa `kaannos-<nimi>.nyt` ja `simu-<nimi>.nyt` (linja `linja-<nimi>.txt`),
irrotus `perl -MPOSIX=setsid -e 'if(fork()){exit 0} setsid(); open STDOUT,">>","ajo-<nimi>.log"; open STDERR,">&STDOUT"; exec @ARGV' nice -n 15 zsh ajo-<nimi>.zsh`.
Ilmoita Julkaisijalle SIMU VAPAA. Testit `sh Linssit-testit/kaanna.sh` (EI zsh), `zsh tyokalut/tarkista.sh 2>&1 | grep "virheitä yhteensä"`.
Ali-agenttien yhteiset säännöt: proto-3d/tyokalut/linssiseppa-ajot/agenttisaannot-ls1.md (viittaa siihen agenttipromptissa; museon
tiedostorajat-osio koski 13.10. aamun NUI-jakoa).
Edellinen luovutus: viesti-linssiseppa-luovutus-20261013-aamu.md.

## 1. KÄYNNISSÄ (Julkaisijan jono linjalla 1/2, automaattinen)
1) **alkulento187b** AJETTU 11.54 OK (todistus-alkulento187b-ipad-20261013-1152; matala ohitus, kone näkyy, loiva kaarros) → PT KUITTASI 9de62c31e (SHA NS:lle).
2) **katso187** AJETTU 12.03: 6/6 löytyi (todistus-katso187-ipad-20261013-1154; TODISTUS.md puuttuu raporttityökalun Unicode-virheen takia) → tulos PK:lle (Lontoon aloituspaikalta Shard peittää Tower Bridgen → PK:n moottorin asia).
3) **kehys187b** AJETTU 12.13 (4e1812b47): kehysvertailu lokit/todistus-kehys187b-{iphone-20261013-1204,ipad-20261013-1207}
   (Perunansyöjien kehys 13 → 38 sRGB, ruskea puu näkyy; Iloinen juoja kulta 90 → 104; kuvat kopioitu lokit/museo187-pt/kehys-*).
   Nimen tummennus EI näkynyt (venytetty tekstuuri) → 78a1d7301 suikaleina.
4) **katso187b** = katso-kohteet-187 50a680cde + af91c8cac (Lontoo uudesta suunnasta), iPad sk-katso187b-ipad.txt → kuvan polku PT:lle + PK:lle.
5) **nimi187g** = museo-palaute-187 78a1d7301, iPad sk-nimi187-ipad.txt (tarkista yläreunan pehmeä tummennus: rajaa ffmpeg crop=2752:700:0:0).
Ilmoita Julkaisijalle SIMU VAPAA kunkin jälkeen.

## 2. MUSEO (juna 187) – linssiseppa/museo-palaute-187, wt /Users/Shared/Claude/wt/proto-linssiseppa-palaute187
Sisältää: kävelyn korjaukset (seinä ei pylvään taakse 831300260, lattia → luonteva näkymä 3b1c68559; PT EI vielä kuitannut kävelyä,
odotti uusia iPhone-kuvia + videon), omistajan 5 kohtaa 07.5x (lähestymiskuvasarja 8 Commons + 2 Codex, nimi ylhäällä, ☰-lähteet, ei
automaattista sisäänmenoa; näyttely ovensuulta; alareuna → taakse; nimi + selite kahdelle riville; i-kohdat 64 teosta/176 kohtaa, PT hyväksyi),
renkaat läpikuultaviksi/hohtaviksi (08.2x), KatsottuTeos-raja kapealle ruudulle (1ff67c5a9), nimen tummennus (4c8bef083 → ca49d720d).
**Kesken:** kehyksen vaalennus (omistaja 10.4x "kehys liian tumma"): 9950c7b23 musta kehys 78/58/42 + puu × 3,7, kulta × 1,5 (simu OK, kuvapari valmis).
QA `museo kehysvalo <puu> <kulta> [vanha]`. Ensimmäinen vertailu (kehys187, 9f64f71e5) näytti vain 13 → 19 sRGB → nyt vahvempi.
→ Kun kehys187b valmis: tarkista kuvat (NYKYINEN | UUSI, Perunansyöjät/Iloinen juoja/Yövartio, iPhone + iPad), nimi (yläreunan
pehmeä liuku, ei kovaa reunaa), sitten PT:lle KUITTAUSPYYNTÖ koko haarasta (kävely + palaute + kehys). Valmis kuvapaketti
lokit/museo187-pt/ (iPad n*/t*, iPhone palaute + kävely + iphone-kavely-aanella.mp4) – lisää kehys- ja nimikuvat.
Tunnettu: iPhonen pystyssä otsikko friisin päällä (REMBRANDT-nauha) heikosti luettava – mainitse PT:lle.
NUI teki rinnalla nimilistan/Valitse näyttely -sivun (MuseoTaulu aloitus/esikatselu, OpasMetrolinja): ei meidän.

## 3. ALOITUSLENTO (omistaja 09.1x) – linssiseppa/alkulento-187
Kaarros loiva (kääntö ≤ 15 °/s, säde ≥ 44 km, kallistus ≤ 22°), tulevan reitin katkoviiva pois, kynänjälki jää (220ff0075);
QA-polun ("ui aloita") varavalintanäkymä, jotta ohitus ja kone osuvat kuvaan (9de62c31e; testi OhitusJaLoppuKuin182 ±10 %).
**Kohta 1 (kipin visuaalit lennolle) EI tehty**: agentin perustelu – lento on pergamenttikartalla 200–1 800 km:stä päivällä, kipin
elävä kaupunki/vesi/valot ovat Googlen 3D-näkymässä → ei näkyisi. → ODOTTAA OMISTAJAA (PT vie päätettäväksi; älä tee mitään ennen vastausta).

## 4. KAUPUNGIT – linssiseppa/kippi-lontoo-praha-187, wt proto-linssiseppa-kippi187
KUITATTU 187: cd0fbaac5 (Oslo, Bergen, Ljubljana) ja 2de4caf63 (Bryssel, Amsterdam, Krakova, Sevilla, Sofia, Bukarest, Tampere, Akershus).
**Erä 3 VALMIS agentilta** (kärki f5832e93e): Vilna, Valletta (vasen liikenne), Ateena, Košice, Luxemburg, Venetsia (saaret maata),
Sisilia/Palermo, Kreeta/Heraklion, Islanti/Reykjavik + Bergen Bybanen raitiopoikkeukseen; kippi 0 uutta riviä (14 aukiota testissä ilman riviä);
Resources +4,1 Mt; testit 1670/1671. Vesi **index-v14** → Julkaisijalta pyydetty vienti 12.1x (tarkista ennen käännöstä: curl
media.matkakirja.app/kartta/vesi/… tai Julkaisijan kuittaus). Avoimet: Luxemburgin Guillaume II -rivi (74 m) simukuvasta, Venetsian nosto 0,4 m,
Palermon/Maltan isot lautat pikkulauttoina. Simukamerat (agentin): Vilna 54.69317 25.27017 250 60 47 · Valletta 35.88862 14.49938 250 60 325 ·
Ateena 37.96381 23.71543 250 60 209 · Košice 48.72085 21.27366 250 60 127 · Luxemburg 49.61413 6.12883 250 60 331 ·
Venetsia 45.43800 12.33590 600 60 200 ja 45.43200 12.34000 1800 55 320 · Palermo 38.09920 13.34657 250 60 292 ·
Heraklion 35.31565 25.14062 250 60 75 · Reykjavik yö (`linssi opas tunti 23`) 64.14600 -21.93500 1200 65 250 · Bergen 60.38804 5.32924 600 60 180
(kaikki `linssi opas kamera <lat> <lon> <m> <pitch> <yaw> maa`). Tee skenaario sk-kaupungit187e-ipad.txt:n pohjalta + Akershus.
**Akershusin pysäkkikuva** (PT): ota erän 3 simussa (vain kippi-haarassa uusi rivi): kaupunkitila Oslo → kori 1 → oleta kierros alkaa →
`linssi opas hyppy Q644464` (hyppy löytyy vasta kun kierros on alkanut) → kuva. Liitä seuraavaan kuittauspyyntöön.
Skenaariopohja: sk-kaupungit187e-ipad.txt.

## 5. KATSO JA LÖYDÄ (Pelikoodari) – linssiseppa/katso-kohteet-187 25e2bdf72 (wt proto-linssiseppa-katso187)
34 uutta kohdetta (33 + kreeta) TehtavaKohteet.Kaikki; koordinaattikorjaukset PK vei eurooppa.json:iin (107cce88c). Simu katso187
(6 kaupunkia) 6/6 löytyi, lähetetty PK:lle 12.0x; PK kokoaa PT:n kuvat.
**Avoin:** Lontoon saapumispiste (51.50389, -0.08960) on Shardin vieressä → Tower Bridge peittyy. SK antaa uuden pisteen (PK pyysi) →
vaihda TehtavaKohteet.cs katso:lontoo SaapumisLat/Lon (PK päivittää eurooppa.json samaksi), testit, SHA PK:lle.

## 6. MUUTA
- Appikopiot lokit/linssiseppa-app/ siivottu (PT levy): pidä 3 uusinta + käytössä olevat.
- Proto-wt:t nyt: palaute187, kippi187, alkulento187, katso187 (muut poistettu).
- SK: museon i-kohdat valmiit; Rijksmuseumin sarja käytössä. KS: 37/37 kaupunkia paketoitu.
