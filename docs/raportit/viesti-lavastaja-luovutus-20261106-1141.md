# Lavastajan luovutus 6.11.2026 11.41 (seinät aukkoihin) — LUE TÄMÄ KOKONAAN

Pohja: -1041:n, -1021:n, -1004:n, -0939:n, -0920:n ja -0905:n Opetukset ja Työkalut pätevät. Tila ja järjestys korvattu tällä. Työkansio A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md (lopussa uusin). Luovutus kontekstirajan takia. EI VIENTIÄ.

## Vientiehto (ennallaan)
7 seinää + 3 raon tukkoa + 5 friisiä. 2 pätkää ja 7 muuta pois.

## Tila
Uusin juuri `koejuuri-aukot14` (rakenna14.log, exit 0), rakennettu 11.39. Kuvia ei ole, korjausten vaikutus todistamatta.
JU:lle pyydetty 11.40 aja-aukot14a.zsh ja -14b.zsh -> kuvat-ya, kuvat-yb, samat 5 + 5 kameraa. Viesti jäi JU:n jonoon; kuittaus tulee sinulle. Tarkista kansiot, jos riviä ei tule, ja JU:n jono list_events-työkalulla, jos ajo ei ole alkanut.

Kuvat-wa/wb -> aukot13 -> kuvat-xa/xb -> aukot14. Todistettu kuvissa xa, xb: läpinäkyvä rako, tummat kulmat, punainen raita, kivilaikku, kulman punainen tynkä (163 luode), tumma kivijalka ja leveä venynyt kaista ovat poissa.
Aukot14:n korjaukset, katso nämä ensin (täysikoossa, rajauskerroin 2752/2000):
- (206) lounas, kuva v-206-lounas noin (950..1250, 1180..1400): punainen kieleke. (206) koillinen, kuva v-206-koillinen noin (1083, 1188): pieni punainen piste. Syy: punainen 0,1 m seinän alle, pään kansi näkyy, koska kivireunus on 11 cm seinän takana. Nyt kivireunuksen päällä vain 1 cm.
- (204) kaakko, kuva v-204-kaakko noin (970, 1100..1370) ja (163) kaakko, kuva v-163-kaakko noin (930, 1000..1200): kapea venynyt kaista. Syy: naapurin sokkeli loppuu ennen kulmaa, jalan pää näkyy. Nyt kannen UV syvyyden mukaan.
Jos vika jää, korjaa kirjoita_tee14.py:n tapaan seuraava juuri aukot15.

Vanhaa, ei täytteiden, ei korjata tässä:
- (163) luode: sokkelin kiila on alkuperäiset kolmiot, (160,5; 0,46; 443,39) ... (160,57; 1,2; 441,04).
- (204) koillinen: korkea evä ei ole tukkopala (palat 4,5 m).
- Sokkelin yläreunan tumma läiskä oli jo kuvissa kuvat-va.
Pieni ja korjaamatta: (204) W ja S jalka 2 cm sokkelin edessä, pieni porras.

Friisi 7 seinään: päätös EI (mittaa13.py: 6:lla omassa tasossa ei friisiä; (-185,9) rinnakkaisen seinän friisi 1,25 m edempänä, kuvassa uusi seinä tasainen kuten kujan muut). Kerro PT:lle tulosrivillä. PT:n ehto koskee aukot8:n 5 friisiä.

PT:lle kerrottu 10.5x vientiehdon kuvat, ei aukot13:a eikä 14:ää.

## Seuraajan järjestys
1. Lue Raamattu 7.47 (edellinen ei lukenut sitä tässä vuorossa).
2. Kuvat-ya, -yb: 404-rivi ensin (odotus 4 tuttua: a3-baoding-lod1, a5-marmorikaide-pylvas-lod1, pursotukset, kala-allas-ehja), vertaa samoihin kuviin xa, xb.
3. Täysikoossa saumat: 7 seinää. Skaalatut kuvat kuvat-sa, -sb ovat aukot10:stä, 7 seinän saumoja ei ole katsottu täysikoossa. Tee uudet, jos on syytä.
4. Vienti ei ala tästä: rivi PK:lle, kun juuri on valmis: hän ajaa kartan ja rajat uudelleen. PK:lle myös: 2 pätkää pois (KK), ja rakennuksilla kolme porttia.
5. -0939:n kohdat 5-6: friisien saumat, paljaan taustan näkyvyys (54,8), (154,7), kaista (-251,8) v115- ja v124-juurissa, pari PT:lle, yksi vienti, PK vahvistaa viittaukset.

## Valosepän rivi 11.2x
Räystäsliuku 35f849838 (linssiseppa2/raystas-pehmea, runko b7) odottaa PT:n sanaa. Älä rakenna sen varaan ennen sitä.

## Opetukset
- Laatikon pään kansi näkyy aina, jos pää ylittää naapuripinnan tai naapuri ei ulotu siihen. Laske pää todellisista etupinnoista, ei laatikon siirretystä tasosta (UPOTUS).
- Punaisen jatko kiven taakse näkyy, jos kivi on seinän takana. Mittaa kiven taso seinän suhteen ennen jatkoa.
- Kannen UV ilman syvyyssuuntaa venyy.
- Viiva "kuva katsottu" ei riitä: (204) kaakon kaista jäi 2000 px:n kuvassa pieneksi, mutta näkyi täysikokoisessa rajauksessa.

## Työkalut (A/), uudet
mittaa13.py (friisi ja punainen seitsemän seinän ympärillä). kirjoita_tee13.py ja kirjoita_tee14.py kirjoittavat tee_aukot13/14.py:n edellisestä; rakenna9.py = rakenna8 + jalan valo, rakenna10.py = rakenna9 + kielekkeen ja kannen korjaus; suunnitelma13.json, suunnitelma14.json.
