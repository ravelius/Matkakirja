# Natiivisepän luovutus 5.11.2026 klo 23.29 (konteksti yli 26 %, 7.37)

Korvaa -2222:n. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Cron "4 9 * * *" unity-julkaisut.py uudelleen (7.41).

## PT JA KK 23.3x (sitova; AINOA VOIMASSA OLEVA Ateenan kamerasta)
Yötila: omistaja nukkuu, kysymykset PT:lle. Ateenan kamera PIDETÄÄN (omistaja 21.02 poisti vain luennan, Raamattu 2.136 pitää muun). Aiemmat "suljettu, älä palauta" -viestit ja tämän luovutuksen alkuversio ovat vanhentuneita.
TEHTY: 388742104 palautti 37fa268e4:n yhdellä commitilla (natiiviseppa/pariisi-aloitus-219, työpuu wt/proto-natiiviseppa-kierto, peilissä), mukana Alkuosan ajastinkorjaus; Linssit 2249/2249; SHA kerrottu PT:lle. Tila ei muutu ilman viestiä, joka mainitsee 388742104:n.
AJO PYYDETTY JU:lta: Ateena (5 kuvaa), Tukholma (5), esityskuva 30fdefd98 (3), Mac, lokit natiiviseppa-ateena-, -tukholma- ja -esityskuva-388742104. Kun valmis: mittarit skenaarioiden alussa, kuvat täysikokoisina, tulos KK:lle katsottuina, ei junaan.
Marais ei keskeydy tästä. Aamulla Marais'n kuvat KK:lle omistajaa varten (KK nollautui: seuraava KK).

## SEURAAVA TYÖ: katso JU:n ajo 30e34cc9e
Lokikansio natiiviseppa-marais-30e34cc9e, skenaario _tyo/natiiviseppa/marais/sk-marais-korjaus.txt, 3 kuvaa (k1 kauko, k2 keski-0, k3 keski-180). JU kertoo polun. Ei iPadia, ei junaan.

KUN LOKI TULEE:
1. `grep "MATKAKIRJA talot\|Shader\|shader" unity.log`: varjostinvirheet ja `talot tila` -arvot kolmesta kohdasta.
2. Katso kuvat täysikokoisina. Mittaa sävy: /opt/homebrew/bin/python3 _tyo/natiiviseppa/marais/savy.py <kansio> (kuvien nimet skriptissä; numpy ja PIL löytyvät ilman -I:tä).
3. Sävy: seuraavatko talot karttaa? Tumma kartta ei välttämättä toistu; jos toistuu ja talot eivät seuraa, syy ei ole valossa eikä tummennusglobaaleissa, ja `talot tila` todistaa sen. Kerro arvot KS:lle joka tapauksessa (KS:n yötumma Riemukaari, luovutus karttaseppa/luovutus-20261105-2207).
4. Nimet: Hôtel de Soubise ja République kokonaan. Tarkista, ettei jono 2994 tuonut muuta talojen päälle: PiirrosKerros (3050, ZTest Always) voi piirtyä talojen päälle, jos KaannettyStriimi on tosi (PiirrosKerros.cs:406). Katso k3.
5. Reuna: talot painuvat litteiksi, väri lähellä kartan taloja, ei laattaa eikä tyhjiä tontteja maskin kohdalla.
6. Kuvat KK:lle VAIN katsottuina, rivi PT:lle. Sitten osa C.

## KK:N PÄÄTÖS 22.4x (omistajan valtuutuksella "Saat hyväksyä puolestani kaikki"; sanat 22.09 "Myös tavalliset talot")
Marais hyväksytty jatkoon. Ennen koko Pariisia korjataan, ja kuvat KK:lle katsottuina:
1. Sävy: talojen pitää seurata kartan sävyä samassa kuvassa. Kartan tummumista EI ratkaista itse, se on KS:llä. Varmista sama reitti, ja kerro KS:lle, jos syy löytyy.
2. Nimet: nimi näkyy kokonaan tai ei ollenkaan.
3. Reuna: alue ei saa erottua laattana. Häivytys kaukana litteään karttaan; nähtävyysalueen rajalla talot loppuvat siististi.
Sitten koko Pariisi paloina vain lähellä (osa C); 550 Mt kerralla ei käy. MUISTIA EI MITATA (omistaja 4.11. 22.41). Ei iPadia, ei junaan, sarja ei saa hidastua. Pienin kuvalista, JU:n vuorolla.
Ateena: KK oikaisi tämän, katso ylin luku.

## Tehty 30e34cc9e (natiiviseppa/marais-talot, työpuu wt/proto-natiiviseppa-marais, peili natiivi-backup peili/proto/natiiviseppa/marais-talot)
Testit TaloAlue 4/4. EI nähty ajossa, varjostin muuttui.
- Sävy: TaloKerros asettaa _KarttaValo = Aurinko.TasamaaNyt(ylös) / Aurinko.TasamaaPerus (TaloAlue.Suhde, 0–2). Varjostimen KartanSavy lukee _pallonTummuus, _keilaHamaryys, keilat ja _radioHamara samalla kaavalla kuin Pohjapallo.shader. EI mukana: _aurinko, _pohjaSavy, _pohjaPatina, _s2Savy (`talot tila` lokittaa _aurinko ja _pohjaSavy). Lisää vain, jos mittaus osoittaa niiden tummentavan.
- Komento `talot tila`: valon suhde, globaalit, ambientti.
- Nimet: Jono 3080 → 2994. Nimikerros.jono on 2995 ja ZTest Always, joten nimi tulee talon päälle. Valittu piilottamisen sijaan, koska koko Pariisissa nimet muuten katoaisivat. Kohteet (3080) testaavat syvyyttä kuten ennen.
- Reuna: varjostimen ReunaKerroin: korkeus × smoothstep(0, 200 m, etäisyys alueen rajaan), väri kohti mitattua kartan talon väriä (sRGB 175, 144, 109). Maskin (RengasPois) alla ei jää tyhjää tonttia, koska litteä katto korvaa kartan talon.

## MITTAUS AJOSTA 1a03b85fc
Vain m2 on tumma: kadut 180/153/116, kun muissa 238/206/158 (noin ×0,75 sRGB, lineaarisena noin ×0,5, lähes neutraali). Talot pysyvät kaikissa lähes samoina (p50 noin 185/150/116). KK luki eron m2:n ja m6:n väliseksi; m6 on normaali, poikkeus on m2. Yksittäinen hetki, ei paikka: m2:ta ennen ei lokissa ole selvää syytä. Elävä kerros (kaappaus) ei selitä, koska talot olisivat tummuneet mukana. PUUTE "oleta (aikaraja) talot: luotu" oli väärä hälytys: rivi tuli heti `aja`n jälkeen, ennen `oleta-uusi`-kohtaa. Uudessa skenaariossa ei ole sitä.

## OSA C: rakenne (koodi kirjoittamatta, suunnitelma Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261105-pariisi-rakennukset-ohjelmalla.md)
Mittarit: 5,1 Mt/km², 1667 taloa/km², noin 550 Mt jos kaikki kerralla (179 000 taloa). Omistajan mittarit: ei katkennutta taloa, ei tyhjää aukkoa, ei selvää rajaa.
1. Aineisto: tee-talot.py koko Pariisille paloihin. Tarkista OSM-ote (Geofabrik T7:llä, Overpass kielletty robots.txt:ssä) ja IGN-haku (hae-ign.py; robots ensin). shapely puuttuu, älä asenna; oma earcut on tee-talot.py:ssä.
2. Nähtävyysalueet: talo pois keskipisteestä alueiden v7 sisällä, koko talo kerrallaan (siisti loppu). Omistaja 08.52: nähtävyyden läheisyyteen ei jää striimikartan rakennuksia. Temple-torni on koealueella, tarkista sen alue.
3. Lataus: palat vain lähellä, vapautus kauempana, ei saa hidastaa sarjaa eikä vaikuttaa sarjan ajoihin. Palat ämpäristä (Media-vienti = julkaisu: PK/JU, ei viedä ennen lupaa) tai kokeessa Resources. ODbL tarkistettava ennen julkaisua.
4. Reuna kaukana: ReunaKerroin saa myös etäisyyden kamerasta (_Keski, säde). Nyt vain alueen laatikko.
5. Maanpinta: MaanpintaH 90 on kiinteä. Montmartre ja Belleville eivät ole 90:ssä: maanpinta palakohtaisesti (IGN altitude_min_sol, KorkeusKerroin.Sovita). Tarkista kuvalla.
6. Maski: nyt z ≥ 16 laatikon sisällä. Koko Pariisissa z16-palat ilman taloja näkyisivät tyhjinä ladatun alueen ulkopuolella. HAVAINTO, varmistamatta: 3D-talo peittää oman pohjansa kaikista kuvakulmista, jos ääriviiva on sama, joten maskia ei ehkä tarvita lainkaan. Kokeile ensin: `talot 1` ilman maskia, kuva. Jos kartan talot eivät näy alta, poista maski, jolloin palojen välimuistikin säilyy.
7. Kuvat: pienin lista, JU:n vuorolla, "ratkaisee"-rivi. KK:lle katsottuina.

## Haara natiiviseppa/pariisi-aloitus-219
Kärki 388742104, peilissä, ei junassa, junaan vain PT:n kautta. Skenaariot _tyo/natiiviseppa/pariisi-aloitus/. Alkuosan ajastinvika on korjattu tässä kärjessä.

## Avoimet
Avoimet 2 (vahdit) ei NS:lle; pystysauma KS:llä. NUI:n e4b376546 ja aloitushaara törmäävät Nimikerros.cs:ssä (PT tietää). KK:lle ja PT:lle kerrottu ajon tila 23.2x.

## Työtapa
kaanna.sh sh:lla, ei zsh:lla. zsh:ssa "$R:Assets" tulkitaan muuntimeksi: käytä "${R}:polku". JU palauttaa pyynnön ilman ratkaisee-riviä tai yli noin 5 kuvalla ilman perustelua. Peili: `git push natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/marais-talot`, remote `peili` ei ole olemassa. SendMessage vaatii rivin ref-osan; varakanava session id:llä toimii aina.
