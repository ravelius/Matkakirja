# Pelikoodari: luovutus 12.11.2026 klo 10.12 (Raamattu 7.37)

Edellinen: viesti-pelikoodari-luovutus-20261112-0935.md (3f7bb0f9e). Sen kohta 1 (PisteKaarella) on TEHTY, kohdat 3–4 ennallaan (alla).

## 0. TEHTY TÄSSÄ VUOROSSA (älä toista)
- PisteKaarella-hyppy korjattu.
  - Juurisyy: vapaalla kartalla kaari laski alkupisteen edellisen osan päästä uudella sivulla, eli väärässä kehyksessä.
  - Commitit: natiivi-backup kameralaite/pala-2 4772f33fe + laskuri 15a8c19f9.
  - Raportti: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kameralaite/TULOS-pistekaarella-0945.md. KK hyväksyi juurisyyn ja näytön 09.52.
- Kaistanvaihto liukuvasta lähtökohdasta (KK 09.52 päätös 1): pala-2 0b29976fb.
  - AloitaVaihto / vaihtoLahto, kesto VaihtoS per kaista. Toiston laskuriin C3_VARA ja HYPYT_SIEMEN: e82e9a78a.
  - Hyppyjä yli 0,25 m 558 → 11, yli 1 m 302 → 2.
  - Risteysten 11 jäävät KK:n päätöksellä (KK:lle selitetty 10.1x). Jalan todellinen paikka käännöksessä rikkoi LinjatOikeallaKartalla, joten se ei ole mukana.
- JUNAHAARA: natiivi-backup pelikoodari/pistekaarella @ e429412e5 (juna-224 ad2d2d02f + a552d1db8 + e429412e5). Peli 931/931, Linssit 2293/2293.
  - Odottaa KK:n junasanaa, kun KK on katsonut JU:n Mac-parin.
  - JU:lle annettu: ENNEN ad2d2d02f, JÄLKEEN e429412e5, siemen 1942463309, toiston t 30,69 / 33,36 / 53,07 s + avauksen kesto.
  - Skenaario JU:lla: _tyo/pelikoodari/kameralaite/sk-pistekaarella-kaannokset.txt.
- KK:n korttivastaus (kamera.md, juoksupeli.md) lähetetty. KK korjasi kortit (PR 6598).

## 1. SEURAAVA TYÖ: kameran toisto (KK 09.30 kohdat 3–4 + KK 09.53 päätös 1), pala-2-työkopiossa
- Työkopio: /Users/Shared/Claude/wt/proto-pelikoodari-kameralaite (kameralaite/pala-2 @ e82e9a78a).
- Ajot (Linssit-testit):
  - `C3_VARA=0.3 sh kameratoisto.sh T14UKaannosToisto` ja sama arvolla 0.6
  - `MITTAUS=c3 C3_RIVI=2 C3_VARA=0.3|0.6 sh kameratoisto.sh C3Mittaus` (noin 10 min / ajo)
  - Valmis skripti, joka ajaa nämä peräkkäin: `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kameralaite/lattia.sh` (tulosteet samaan kansioon: t14-0.3.txt, c3-vara-0.3.txt jne.).
- Viimeisin C3 (vara 0,3, PisteKaarella-korjaus, ilman kaistanvaihtokorjausta), tiedosto c3-pistekaarella-jalkeen.txt:
  - L-rikkeet 36 (kaikki (b)): 20 leikkauksen jälkeen ≤ 0,5 s, 16 tavallista
  - pisin peitto 0,48 s; U-leikkauksia 421
- Raportoitava KK:lle:
  - (a) / (b) -jako kuten ennen
  - YKSI TAULUKKO lattioilla 3,3 / 3,6: T14, pisin peitto + siemen ja hetki (tulostuu nyt rivillä "pisin peitto … siemen … t …"), laite, huiput
  - selitys pisimmän peiton kasvulle 0,55 → 0,84 s (vara 0,6)
  - ETUSIJA: pelaajalle näkyvä peitto ≤ 0,6 s voittaa T14:n sisäisen rajan
- UUSI (KK 09.53 päätös 1): jaa leikkaukset kahteen lukuun, U-käännös / tavoitteen hyppy (Seurantaohjaaja: U-leikkaukset vs muut).
  - Ehto "kytkin pois" -sanalle: hyppyleikkauksia 0, tai syyt luetellaan.
  - Leikkaukseen liittyvä tunnettu tapaus: siemen 18 t 100,25, jossa laite on 0,74 m jäljestä ei-kuljettavalla (LeikkausAsento = tavoitteen paikka).
- "tarkka < 0,3" -kasvusta (2661 / 2011 → 5000 / 3465) yksi selittävä rivi raporttiin (KK 09.52 päätös 3).

## 2. SITTEN: otteen pito (KK 09.53 päätös 2, omistajan päätös 27.10.)
- Kiinniotossa ja Uuvuit-ruudulla tavoite = vanhan kameran juoksun yläkulma siinä kohdassa.
  - Runko vie kameran sinne pehmeästi; ahtaus ei laske kameraa otteen aikana.
  - Seurantaohjaajalla ei nyt ole otteen tilaa: korkeus seuraa ahtautta (Korkeus(): 2,4 m ahtaassa → 9 m).
- Vanha yläkulma: JuoksuV4Maailma.cs noin rivi 3237 (kiinnioton sivukuva pois, omistaja 27.10. 15.41).
- Näyttö: Mac-pari vanha / uusi otteesta ahtaassa paikassa KK:lle (JU).

## 3. TAUSTA v133d → v133e (LAV 09.57, JU 09.59): EI VIELÄ JUNAAN
- v133e on palvelimella: juoksupeli/maailma-v4/kielletty-tausta-v133e (PT 09.58 pt-ok). Vaihda TaustaKansio v133d → v133e haarassa pelikoodari/tausta-v133d (wt proto-pelikoodari-v133d, b16fc5818).
  - Muutokset ovat vain lod0:ssa (sokkelin kulmat, päätysokkelit, koholattian reunojen pystypinnat). Tarkista silti, muuttuuko kulkukartta, jos esto lukee pystypintoja.
- Vanha avoin kohta: LinjatOikeallaKartalla kaatuu v133d:llä (siemen 1, osa 26 → 27, 6,2 m sivulle).
  - LAV:n mukaan syy tuli jo v133d:n kivireunuksen alapään laskusta (K1), ei v133e:stä.
  - Selvitä ennen junasanaa: muuttiko kulkukartta reittiä vai onko kyse botin uudesta polusta. Kerro LAV:lle.

## 4. B1 (botti maali) ennallaan: natiivi-backup pelikoodari/seinat-taso1-v133c @ a405aeb07, odottaa KK:n junasanaa.

Ei agentteja käynnissä. Työkopiot (/Users/Shared/Claude/wt): proto-pelikoodari-kameralaite, -pistekaarella, -v133d, -b1, pelikoodari-luovutus-1012.

## LISÄYS 10.2x: KK 10.14 ja JU 10.2x
- KK kuittasi e429412e5:n (27 → 0). Junasana tulee, kun KK on katsonut JU:n Mac-parin.
  - JU ajaa parin: sk-pistekaarella-kaannokset-2.txt, 0–104 s (avaus kestää 41,1 s), lokit/pelikoodari-pistekaarella2-*.
- RISTEYKSET (11): ei korjata nyt eikä jousella. Kohdan 1 toiston jako (U-käännös / hyppy) näyttää, aiheuttaako jokin niistä leikkauksen.
  - Ehto: tavoitteen hypystä johtuvia leikkauksia 0.
  - Jos jako näyttää hypystä johtuvan leikkauksen, korjaa lähteestä omana committinaan: 1,60 m (kaista aukolle ja käännös samassa askeleessa) ja 1,37 m (paluu seinän edessä) ensin.
  - 9 pientä (alle 0,4 m) saavat jäädä, jos ne eivät leikkaa. Jalan paikan koe pysyy poissa.
- JÄRJESTYS: toisto jaolla → otteen pito + Mac-pari otteesta ahtaassa → kolme pahinta (a)-ikkunaa KK:lle.

## LISÄYS 10.4x: KK 10.40
- JUNASANA e429412e5:lle annettu PT:lle. Mac-pari: /Users/Shared/Claude/proto-3d/lokit/pelikoodari-pistekaarella2-pari/ (JU:n leikkeet 69,5–77 s ja 92–96,5 s, avaus 41,1 s; botin reitti eroaa koodien välillä).
- Seuraava työ ennallaan (kohdat 1–2 ja lisäys 10.2x).
- HAVAINNOT OTTEEN PITOON (mittaa, älä korjaa erikseen). KK haluaa YHDEN kootun viestin: ovatko nämä otteen pidon mittarissa mukana ja mitkä luvut ne saavat.
  - Pari-2, jälkeen: käännös noin 90° kuudessa ruudussa (0,2 s), ja pelaajan jalat ruudun ulkona 4 ruutua (ruudut 54–57 = 93,8–93,9 s).
  - Pari-1, jälkeen: 74–75 s rakennuksen kulma täyttää vasemman kolmanneksen noin 0,5 s (pelaaja näkyy koko ajan).

## LISÄYS 10.54: JU
- PisteKaarella a552d1db8 + kaistanvaihto e429412e5 LINKISSÄ 224.110 = 2f62c309e (kartta 787/787, linssit 2293/2293, peli 931/931, unity 0). Junahaara pelikoodari/pistekaarella on käytetty.
