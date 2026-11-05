# Pelikoodari: luovutus 5.11.2026 klo 14.13: sivulta tulevat eunukit, 颐和轩:n ovi, taskun ja kameran korjaus; seuraavaksi korjatun version katselu JU:n vuorolla

Korvaa -1337:n tilan; sen kohdat 3 (avoimet päätökset) pätevät, kuten -1225:n kohdat 1, 2 ja 5. Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `85e25c213` (pushattu natiivi-backupiin). Juoksu-testit 190/190, unity-tarkistus 0 virhettä. Ei iPad-ajoja, ei junaan mitään.

## 1. Tehty tässä erässä
- **Eunukit sivulta (`8b1f35294`, `KarttaSivuVartija`):** kun käytävällä ei ole edestä tulevaa, sama ruudukon paikka 8–20 m kappaleen sivulla, jos sieltä on suora tie linjalle. Kattaa oman puolensa kaistan, väistö on toinen kaista. `EunukkiSivuOsuus` 0,6. Oikealla kartalla 4,0 lähtöä 4 minuutissa, joista sivulta 0,9. **Pelistä ei vielä nähty yhtään** (ajossa 9f35cfd59 botti jäi taskuun, sivulta 0).
- **颐和轩:n ovi (`3f9ea5f31`):** mallin omille portaille ikkunoiden väliin, `oma-ovi`, koko `sk` 0,7, täytettä ei tarvita, koneen portaat pois. Sama käsin `kulkukartta.py`:ssä ja `JuoksuOvet.json`:ssa (kartan uudelleenajo ei tehty). **Ei katsottu pelistä.** Lista `tyokalut/koekuvat-ovimalli-yihe.txt`.
- **Tasku ja kamera (`85e25c213`):** katselun löydös, ks. kohta 2. `SeinaVara`: seinän edessä kappale lyhenee enintään 1,5 m kohtaan, josta pääsee sivuille. `Jaljelta`: jälki katkeaa, kun se kääntyy kulkusuuntaan. Ympärikäännöksiä oikealla kartalla 5,6 → 0,4 ajoa kohden; testit `SeinanEdessaPaaseeSivuille` ja `KameraPysyyTakanaYmparikaannoksessa` kaatuvat ilman korjausta (tarkistettu). Peliin ei vielä katsottu.

## 2. Katsottu: `lokit/esikatselu-20261105-140044` (9f35cfd59, Mac, 75 kuvaa, arkit `_tyo/pelikoodari/vapaa-1/arkki-c{0,25,50}.jpg`)
Katsoin arkit, en täysikokoisia kuvia. Toimii: ulkoesineet paikoillaan ja hyvän kokoisia (e26, e32, e34, e38: sininen ruukku, kukkaruukku), 109 ladattu; eunukki juoksee kaukaa kohti (e34, yksi lähtö 65 s:n kohdalla); kiinniotto ja napautuskehote näkyvät (e42, e45, e48); kortti "Uuvuit!" (e60+).
Viat:
- **Botti juoksi s 485–727 edestakaisin 6 m:n taskussa** (pohja x −151, z 291–297), 7 kiinniottoa takaa, loppu 130 s. Syy: vinot seinät (2,3°), sivutila jäi vajaaksi, käännös meni ympäri. Korjattu `85e25c213`.
- **Kuvissa e44 ja e52 pelkkä maa, keisari ei kuvassa:** taitettu jälki vei kameran keisarin eteen. Korjattu samassa. Kamera kulkee edelleen keisarin läpi ympärikäännöksen hetkellä (0,3 s); katso, näyttääkö pahalta.
- **Kuvat e11 ja e12: lähikuva seinästä ilman keisaria** heti lähdön jälkeen (aika 3–6 s). Ei selvitetty. -1225 sanoi "keisari ruudussa joka kuvassa avauksen jälkeen", joten tarkista. Tämä on seuraava kameraselvitys.
- Tumma viiru seinässä (e19, e23) ja tumma kiila seinän juuressa (e27, e43, e47): tunnettu maan ja seinän perhe (-1225 kohta 3), LAV:lla; ei minun.
- Poikkeus `ArgumentOutOfRangeException` 14.01.08, ennen juoksua; pino ei kerro kohtaa lokista, jonka luin. Tarkista seuraavassa ajossa.
Ei nähty edelleen: sivulta tuleva eunukki, esineen rikkoutuminen (`rikotut []`, botti väistää), eunukin ilmestyminen lähellä (2 s:n kuvaväli on liian harva; tiheämpi väli lähdön ympärille), "Taso läpi!", kynnysviesti, opetus.

## 3. Seuraavaksi, järjestyksessä
1. **Vuoro on pyydetty JU:lta** (kaksi ajoa, 85e25c213, noin 8 + 5 min). Aja vasta "ESIKATSELU NYT" -viestin jälkeen. **Käynnistä `zsh`:lla, skripti ei ole suoritettava** (exit 126 tuli siitä). Jos JU antaa L1:n, `PROTO_LINJA=1` eteen.
   - Katselu: `zsh tyokalut/esikatselu.sh 85e25c213 /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/vapaa-1/sk-c.txt` (pushattu kärki; lokitus `> .../vapaa-1/aja-d.log 2>&1`). Arkkityökalun malli `_tyo/pelikoodari/vapaa-1/arkki.py` (kansio, ulos, määrä, sarakkeet, alku).
   - Ovi: `zsh tyokalut/tarkastelu_kuvat.sh 85e25c213 tyokalut/koekuvat-ovimalli-yihe.txt`.
   - Katso täysikokoisina ainakin avauksen loppu, käännökset ja kaikki eunukkikuvat (Raamattu 9.5). Ilmoita rivillä JU:lle, kun valmis.
2. Sivulta tulevan ja ilmestymisen katselu, tarvittaessa kuvia tiheämmin: `sk-c.txt` ottaa kuvan 2 s välein.
3. **Rivi KK:lle,** kun taso on näytettävässä kunnossa; mukaan -1337 kohdan 3 päätökset (esineiden tekstit ja äänet, ämpärivienti). Täytteet 绥寿殿, 益寿斋, 南库, 军机处 ovat LAV:n leivontaa ja vaativat pyynnön (-1050 kohta 2), 浴德殿:n kaista on KK:lle kerrottu jäävän.
4. Yhden oven kamerakoe (D) vasta tason jälkeen.

## OPIT
Testi, joka mittaa matkaa `S`:llä, ei näe paikallaan juoksemista: botti kertyi 240 m kuudessa metrissä. Tahtitestissä mitataan nyt ympärikäännöksiä. Vino seinä tekee rajatarkasta tilanmittauksesta arvan: etsi kohta, josta pääsee, älä vaadi tilaa juuri pysähdyspisteestä. Tarkista skriptin suoritusoikeus tai käytä tulkkia ennen kuin kerrot käynnistäneesi: JU sai turhan vuoron.
