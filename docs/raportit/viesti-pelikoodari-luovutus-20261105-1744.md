# Pelikoodari: luovutus 5.11.2026 klo 17.44: ovilehdet ja kuvakenttä nähty pelistä, jahtaavan eunukin korjaus odottaa katselua

Korvaa -1706:n tilan. -1638:n kohdat 2.3 ja 2.5 sekä kohta 3 pätevät edelleen, samoin -1602:n kohta 3, -1413:n kohdan 3 kohdat 3–4, -1337:n kohta 3 ja -1225:n kohdat 1, 2 ja 5. Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `fb9811afd` (pushattu natiivi-backupiin). `unity-tarkistus` 0 virhettä. Kärjen muutos on `JuoksuV4Maailma`:ssa, jota Peli-testit eivät kata. Ei iPad-ajoja, ei junaan mitään.

Päätilin id:t (osoitekirja): PT `local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc`, KK `local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe`, JU `local_b4a7e82a-2522-437f-84ff-813401120931`, LAV `local_beb68834-6c4f-4839-ac75-7876b45052c3`. Vanhojen luovutusten id:t ovat vanhentuneita.

## 0. Vuoro pyydetty, ajo ei käynnissä
JU:lta pyydetty 17.44 vuoro: `fb9811afd`, `_tyo/pelikoodari/vapaa-1/sk-i.txt`, noin 11 min. Aja vasta "ESIKATSELU NYT" -viestin jälkeen, `PROTO_LINJA` JU:n viestistä: `zsh tyokalut/esikatselu.sh fb9811afd /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/vapaa-1/sk-i.txt`. Rivi JU:lle, kun valmis. Malli: `/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-pelikoodari/fc121624-1580-4c13-b2f7-a434fab73374/scratchpad/ajot.sh`. L2-ajot 172348 ja oviajo on ilmoitettu JU:lle päättyneiksi.

## 1. Nähty pelistä (4c4cf9d8d, ajo `lokit/esikatselu-20261105-172348`; 62 kuvaa arkkina, e14, e22, e26, e36 täysikokoisina)
- **Ovilehti ei täytä kuvaa:** e22, e24, e27 ja e32 ovat kunnossa. Yksi jäänne: e26:ssa lehti peittää keisarin oikean reunan, kun kamera on aivan seinän vieressä (`sivu −0,1`). Lyhyt hetki, ei korjattu.
- **Keisari kokonaan kuvassa:** kaikissa kuvissa e01–e41. -1638:n kohta 2.2 on poissa. Todettu arkista, täysikokoisina vain edellä mainitut neljä.
- **Kenttä:** juoksussa 60°, avauksessa 38–40° (lokin arvot).
- **Oviajo** `lokit/tarkastelukuvat-4c4cf9d8d-173744`: lehti ei puhkaise kehystä eikä pilaria, mutta kummankin lehden yläosa peittää noin puolet viereisestä ikkunasta. Tumma kaista seinällä vasemmalla oli jo vanhassa kuvassa `vapaa-1/ovi-yihe.png`. **Kerro KK:n rivillä,** että ovien ulkonäkö muuttui (omistaja 5.11.: ovet kelpaavat).
- **Aukio:** e12 ja e36: keisari noin 15 % kuvan korkeudesta, kujilla enemmän. En säätänyt korkeuden käyrää; näytä KK:lle osana tasoa.
- **Ei nähty:** rikkoutuminen ja kiinniotto. Taso päättyy 240 s:ssa kuvan e41 kohdalla, joten `sk-h.txt`:n lisäykset osuivat loppukorttiin. `sk-i.txt` korjaa sen: törmäys e11–e20, kiinniotto e38:n jälkeen.

## 2. Tehty: `fb9811afd` jahtaava eunukki (ei vielä nähty pelistä)
Vika ajossa 172348: e22:ssa eunukki juoksee rakennuksen sisällä, e24:ssä, e26:ssa ja e39:ssä sivuttain tai poispäin keisarista. **Selitys on päätelty koodista, ei mitattu:** jahti säilytti alun sivuetäisyyden (sivulta tulevalla enintään 20 m), joten hahmo kulki reitin rinnalla seinien läpi, ja katse luettiin reitin suunnasta kuvan sijaan. Nyt kartalla sivu palaa nollaan 3 m/s ja katse on kulkusuuntaan. Vanha peli ennallaan (`r.Kartta != null`). Uusi lokirivi `eunukki jahtiin kontakti … sivu …`.

**Tarkista seuraavasta ajosta:** rivien `sivu`-arvot. Jos ne ovat pieniä, selitys oli väärä, ja e22:n sisällä juokseva tulee muualta (esim. katettu portti, jota kartta pitää kuljettavana). Eunukkien e23/e28 vanha kysymys kuuluu tähän.

## 3. Seuraavaksi, järjestyksessä
1. Ajo ja katselu (kohta 0): eunukit, rikkoutuminen `r`-vaiheessa (e11–e20), kiinniotto `k01–k08`. `tormaa` ja `kiinni` ovat vanhoja QA-komentoja, joita ei ole kokeiltu kartalla; jos ne eivät laukea, tutki ennen seuraavaa ajoa.
2. **Mätä omena:** v2 on kuitattu postiin, ja v3 on tilattu Codexilta (`295d366c1`, `posti/pelikoodari-codex-omena-mata-v3-tilaus-20261105.md`), koska `RakennaSolmut` ei ota `COLOR_0`:aa mukaan ja v2 näkyisi valkoisena (koodista ja mallin tiedoista, ei pelikuvasta). **Kun v3 tulee:** `KerattavaMallit` uuteen nimeen, hehku haarasta `pelikoodari/mata-omena-218` (`7cfac9ee6`, `HehkuMata` ja `Hehku`-rivi, ei sen `_BaseColor`-tummennusta eikä nimivaihtoa), ja Macilla paikallinen juuri, koska ämpärivienti vaatii luvan. Mallin puuttuessa pelissä jää pallo: pidä vanha nimi varalla viennin ajaksi.
3. **Kynnysviesti** on yhä näkemättä (botti ei pysähdy ovelle). Tarvitsee pakotetun kohtauksen: kääntö seinälle oven kohdalla.
4. **Ympärikäännös** (-1706 kohta 2.3): kamera lentää keisarin läpi noin 0,4 s:n kohdalla, mitattu testissä. 2 s:n kuvaväli ei näytä sitä; ota tiheä kuvasarja tai pakota käännös.
5. -1638:n kohta 2.5: rivi ja kuvat KK:lle, kun taso on näytettävässä kunnossa. Mukaan -1337 kohdan 3 päätökset, -1602:n seinäodotus, ovien ulkonäkö ja e26.

## 4. Avoimet
- **LAV:lle viety 17.44:** e14:n iso tummansininen vino laatta ja raidallinen pinta, (−87,5; 302,5), sekä punainen terä seinän vieressä. Vastausta ei vielä ole. Vanha -1602:n rivi on myös auki.
- `origin/main` yhdistetty kotihaaraan (31 committia, ei ristiriitoja).
- Luvut 2 ja 4 sekä luvun 12 komentosäännöt on lukematta tässä sessiossa (7.47): lue seuraavalla aloituksella.

## OPIT
- Mittaa kohtauksen ajoitus ennen kuin lisäät sen käsikirjoituksen loppuun: tason aikaraja söi 18 kuvaa.
- Luovutuksessa oli väärä kuvakansio (`170630` oli toisen roolin ajo): ota kansio ajon `aja-*.log`:sta, älä `ls`-listasta.
- zsh: `$C:refs` tulkitaan muuttujan muunnokseksi. Käytä muotoa `"${C}:refs/..."`.
- Toimituksen muoto tarkistetaan ennen kytkentää: katso, lukeeko pelin rakennuskoodi sen, mihin malli nojaa.
