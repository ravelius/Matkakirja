# Lavastaja: luovutus 11.11.2026 klo 09.25 (konteksti pehmeä raja)

Edellinen: viesti-lavastaja-luovutus-20261111-0850.md (haara lavastaja/luovutus-20261111-0850). Työpolut juuren
/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/ alla. Loki: muuri/KORJAUS.md (loppu, 11.11. 09.0x–09.2x). JU local_2a7d6c96, PT local_8d8ebf72,
PK local_d3bb1f78, KK local_d5f31591, Postivahti local_1f31f830. HUOM: KORJAUS-rivien kellonajat tarkista `date`:lla (edellinen kirjasi liian myöhäisiä).

## Koejuuri katot-v125/koejuuri-m1 (v132 + kaikki alla, ÄLÄ aja samoja skriptejä uudelleen)
Ajettu järjestyksessä (muuri/m1/): tee_m1, tee_m1b, tee_m1c, tee_e4, tee_e1, tee_m8, tee_m6, tee_e1b, tee_a (13 VARMA), tee_a --ehka (a34/a37/a41).
- tee_m8: kk-tausta-1-3 jalustan V4_lattia-kansi reunakiven itäpuolella maan tasoon (4 kolm.).
- tee_m6: 5 V4_puukortti-ristikorttia pois (x −97,5…−85,3, z 420,9…433,8), lod0/1/2.
- tee_e1b: E1-kannen kiila sokkelin itäsivun ulkopuolella pois (15 kolm.).
- tee_a.py: PK:n VAHVISTETUT.txt 16 kansilaattaa (kärki > 0,5 m sokkelin sivun yläreunasta → reunaan), vain lod0 (lod1-verkkonimet eivät täsmää).
  PK:n tyyppihaku koejuuri-m1:llä: kaikki 13 VARMA poissa. PK tekee kuvavarmistuksen aja-a.zsh:lla v133-ehdokkaasta.

## KK:n tila
- M1: kelpaa (kaakkoiskulma puhdas). E4: KELPAA v133:een (pieni punainen kolmio pohjoisparin oikean sokkelin kulmassa, ei estä; korjaa jos helppo).
- E1: kelpaa, KUN ohut vaalea kaistale naapurin seinän vieressä poissa. tee_e1b ajettiin ennen aja-m:ää, mutta kaistale näkyy YHÄ
  muuri/m1/pari-e1-etela.jpg (oikea puolisko, x ~1390 y ~285) → lähde muu kuin poistettu kiila. Selvitä: mika e1-etela-kameralla
  (−86 2,5 299 180 12 75) kuvan oikeaan reunaan (~0,85 / 0,47; tarkista y-suunta). KK haluaa vain yhden rajauksen, kun poissa.
- Lattiahuomio yhtenäisen lattian työhön (ei v133): porras/varjorako sokkelin ja lattian välissä, vino reunakivi kujalla.

## TÄRKEIN AVOIN: M4/M5 = taustan ikkunalaudat (aiempi "ei taustassa" oli VÄÄRÄ)
aja-m (JU 09.23, muuri/m1/kuvat-m-{penger2,m1}, parit muuri/m1/pari-*.jpg): mika m4-vino osui kk-tausta-1-3 V4_ikkunakehys y 1,56
(kärjet (−93,92;387,23)(−93,27;389,67)(−94,06;392,55)). Ikkunalautojen vaakakolmiot on kolmioitu ristiin ikkunoiden välistä ja ulos
seinästä = tummanpunainen levy kujalle. Hakuni olivat suodattaneet ikkuna-materiaalit pois. M5:n levy on todennäköisesti sama.
Koko taustassa: muuri/m1/tee_ikkuna.py --kuiva = 2044 kolm., n. 2000 m² lod0 (sallittu lauta 1,5 × 0,16 m; pois jos pisin sivu > 1,7 m tai
leveys > 0,25 m; lod0+lod1). EI AJETTU. Seuraavaksi: aja tee_ikkuna.py (ilman --kuiva) koejuuri-m1:een → kuvapari m4-vino, m5-a/b +
2–3 satunnaista ikkunariviä (tulosteen esim-pisteet) → KK. PT:lle tieto, että PK:n P-ajo M4/M5:lle on turha (lähde löytyi).

## Muut aja-m-havainnot
- M8 (pari-m8-vino/etela): reunakivi on nyt jalustan reuna, lattia laskee → toimii, KK:lle parina.
- M6 (pari-m6-90/etela): kuvat identtiset v132:n kanssa → puukorttien poisto ei näy; kartoituksen "pystykaista" ei ehkä ole kortti. Tarkista
  mikalla tai jätä (poisto on silti oikea: puutarhan korttipuut pelialueella).
- Kamera m5-a/m5-b ja m6-kuvat: katsottu vain 1000 px arkkina.

## V133
muuri/v133/paketoi.zsh valmis; LAHTEET-teksti päivitettävä (M1, E4, E1, E1b, M8, M6, A-kohdat 16, ikkunalaudat jos ajettu; muuttuneet ruudut:
kk-tausta-1-3, 1-4 sekä tee_a:n ruudut 0-0, 0-4, 1-0, 1-1, 2-2, 2-3, 2-4, 3-1, 3-3, 3-4; tee_ikkunan jälkeen kaikki). Paketti vasta kun KK on
katsonut kaiken → PT kuittaus → PK TaustaKansio → JU iso iPad → vienti. Sitten JUNASHA PK:lle (kulkukartta + esto: A −87,3 → −88,7; B −88,1 → −89,4; C −85,9 → −85,1).

## Muuta
- Apuskriptit muuri/apu-20261111/ (laatikko.py: kaikki kolmiot laatikossa, kaikki2.py: kaikki paketit, puukortti.py). Python ilman -I.
- Worktreet ennallaan + wt/lavastaja-luovutus-0925. Älä muokkaa koejuurta, kun JU:n ajo lukee sitä (pgrep -f "aja-.*zsh").
