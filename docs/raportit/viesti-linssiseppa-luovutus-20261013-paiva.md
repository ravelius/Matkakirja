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
3) **kehys187b** = linssiseppa/museo-palaute-187 **ca49d720d** (käännös KÄÄNNÖS NYT linja 2), iPhone + iPad kehysvertailu (sk-kehys187-*.txt)
   + iPad museon nimi (sk-nimi187-ipad.txt). Lokit `lokit/todistus-<era>-<laite>-*`. Ilmoita SIMU VAPAA kun kaikki ajettu.

## 2. MUSEO (juna 187) – linssiseppa/museo-palaute-187, wt /Users/Shared/Claude/wt/proto-linssiseppa-palaute187
Sisältää: kävelyn korjaukset (seinä ei pylvään taakse 831300260, lattia → luonteva näkymä 3b1c68559; PT EI vielä kuitannut kävelyä,
odotti uusia iPhone-kuvia + videon), omistajan 5 kohtaa 07.5x (lähestymiskuvasarja 8 Commons + 2 Codex, nimi ylhäällä, ☰-lähteet, ei
automaattista sisäänmenoa; näyttely ovensuulta; alareuna → taakse; nimi + selite kahdelle riville; i-kohdat 64 teosta/176 kohtaa, PT hyväksyi),
renkaat läpikuultaviksi/hohtaviksi (08.2x), KatsottuTeos-raja kapealle ruudulle (1ff67c5a9), nimen tummennus (4c8bef083 → ca49d720d).
**Kesken:** kehyksen vaalennus (omistaja 10.4x "kehys liian tumma"): 9950c7b23 musta kehys 78/58/42 + puu × 3,7, kulta × 1,5.
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
**Erä 3 agentilla kesken** (nollaus voi katkaista): Vilna + Valletta f6ee654cf, kippi 430bf8946; Ateena + Košice muutokset työpuussa
commitoimatta (ElavaKaupunki, KaupunkiVesi, KaupunkiYovalot, PuuRuudukko, testit) → tarkista `git -C … diff`, aja testit, commitoi tai jatka.
Jäljellä Luxemburg, Venetsia (vesi 09.02 jälkeen, saaret), Sisilia, Kreeta, Islanti; Bergen raitiopoikkeukseen. Vesi **index-v14**
(vientipaketti _valmiit/elava-lontoo-praha-vienti-20261013) → Julkaisija vie ämpäriin ENNEN käännöstä. Valletta liikenne vasemmalla.
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
