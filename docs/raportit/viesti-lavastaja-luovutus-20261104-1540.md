# Lavastajan luovutus 4.11.2026 klo 15.40 — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen: 19713c0e1:docs/raportit/viesti-lavastaja-luovutus-20261104-1449.md (kohdat 3 ja 4 ja "Muuta" voimassa, muu korvattu). M = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri, Y = M/yleinen, N = M/jalustat, K = M:n vieressä katot-v125. Python: /opt/homebrew/bin/python3. Tausta: M/LESHOU-PORTAAT.md (loppu) ja M/KORJAUS.md.

## 1. KK:n tilaus 15.3x (sitova): TEE ENSIN
Ehdotukseni hyväksytty: g-jalusta-etu takaisin kaiteineen, siitä pois vain musta lattia. Musta kolmio pois ja kaiteet ehjinä ovat yhtä tärkeät. Kaide kuvataan läheltä ja kaukaa.
Ennen kuvia:
1) Valomittaus mallista, joka pelissä oikeasti näkyy; selvitä, miksi uudelleen leivottu lod0 ei näy.
2) Kiinteät kamerat kaikkiin vertailuihin, myös alku, taihemen ja h01–h06. 03 ja 03b osoittamaan kohdetta, ei lattiaa.
3) Kaikki 120 saumaehdokasta läpi: luku, kuinka moni aito, pahimmat täysikoossa.
Sitten kuvat KK:lle JU:n vuorolla, ilman tekstikaistaa. Ei vientiä, junaa eikä laajempaa kolmiotasoa ennen KK:n sanaa.

Lähtötieto kohtaan 1 (koodista luettu, Matkakirja-proto-esikatselu/Assets/Matkakirja/Scripts/Juoksupeli): JuoksuSokkeloMaailma.Palatsi.cs rivi 423: kun lod == 0 ja malli on c2Lahteissa, peli lataa MuurikateC2Kansio + nimi + KaiteetonLiite, eli kielletty-c2-v37/g-jalusta-lod0-kaiteeton.glb. Siksi Y/terassi/C:n leivonta ei näy LOD0-etäisyydellä. Vahvista, että g-jalusta on c2Lahteissa, ja mittaa valo tästä tiedostosta. Terassin mittaus 0,00 → 0,75 (mittaa.py) koski väärää tiedostoa.
g-jalusta-etu EI ole c2Lahteissa koodihaun mukaan (ei osumia nimellä; varmista), joten sen lod0 piirtyy omana. Kaiteet: Osasarja.cs rivit 22–30 (C2:n LOD0-instanssit alle Lod1-rajan, kielletty-halli-kaiteet-v4 g-jalustan LOD1:n lapsena). LOD-rajat Palatsi.cs: 150 / 450 m, malliin lähimmästä pisteestä. Nykyisen kaiteen kermavärin ja katkeamisen tarkka syy on päätelty, ei mitattu.
Mallit: g-jalusta-etu lod0 V4_lattia 26 kolmiota y 3,10–8,13, V4_marmori 55 960 ja g-jalusta lod0 V4_lattia 50. Lähde koejuuri-ulkomuuri/kielletty-rakennukset-v122/. koejuuri-yleinen: g-jalusta-etu pois rakennukset.jsonista (155 mallia, ulkomuuri 156) ja lod0–2-tiedostot pois, tormays jäljellä. Vanhaa juurta ei muuteta.

Kamerat: Y/tee-sk.py; alku, taihemen, h01–h06 käyttävät testikamera 0 = seurantakamera, joka heilahtaa. Vain arkki x 6, terassi ja h07 ovat kiinteitä. h03/h03b osoittavat lattiaan.
Saumaehdokkaat: Y/kuvat-parit, erot-skripti N:n vieressä ei ole; skripti scratchpadissa katoaa, joten tee uudelleen tai kopioi: ero > 24, 2 px laajennus, yhtenäiset alueet, ohut = pitkä sivu ≥ 40 ja (sivusuhde ≥ 6 tai täyttö < 0,12). Tulos 8 kiinteästä parista 120 ehdokasta: 110ala 11, 110yla 56, 80ala 17, 80yla 13, m15ala 6, m15yla 6, h07 9, terassi 2. Kuvat muuttuvat uusilla kameroilla ja korjauksella, joten KK:n "120" lasketaan uudelleen samasta säännöstä uusista pareista; kerro molemmat luvut.

Muu löydös: aukion vaalea levy poissa terassikuvissa, Taihemenin kaiteet ja portaat ehjät (kamera eri, silmämääräinen). Y:n kuvista katsottu: alku, taihemen, terassi, m15yla parina; 80yla, 110yla, h01, h03 vain jälkeen. Muita ei.

## 2. Portaat ja levy (PT): rinnakkain, koskee koejuuri-jalustat
PT 15.3x: jatka levyä; selvitä askelmien läikät ja korjaa samalla kierroksella, ennen kuin parit menevät PT:lle. Parit eivät ole menneet PT:lle.
Tila: portaat ja kivijalka maassa neljässä hallissa. Uudet viat samasta O:n leivonnasta: tummat läikät ja kiilat vanhoissa askelmissa, tummat vaakaviirut kaikkien neljän hallin katoissa (N/kuvat/jl-*-koko-jalkeen). Yihexuanin lahi-kameran etuala on harmaa, kamera kelpaa vain yläosaan.
Levy leikattu (N/levy.py), vain lod0; lod1/2:ssa levyä ei ole. Koejuuren tausta on nyt oma kansio (N/oma_tausta.py). JU ajaa N/aja-levy.zsh (pala 3-4 leivottu, kuvat kesken 15.40; loki /Users/Shared/Claude/julkaisija-tyokalut/lav-levy.log), kuvat N/kuvat/jl-levy-*-jalkeen ja jl-leshou-*-levy. KATSOMATTA.
Läikkien koe: JU ajaa perään N/aja-koe-o.zsh (vanha geometria, sama resepti, tulos N/koe-o/ulos). Vertaa: muokkaa N/o_kolmiot.py:n ja N/o_uv.py:n polut. Jos koe on puhdas, syy on uusi geometria tai atlaksen pakkaus; korjaa sinne. Jos samat viirut tulevat, syy on resepti tai kohtaus. Vanhan O:n leivontalokia ei löytynyt. Tiedot M/LESHOU-PORTAAT.md loppu.
O leivottiin levyn ollessa paikalla: jos portaissa näkyy levystä jälki, O uudelleen.
Ovilista N/kulku/: ei lopullinen, kärki oli a26aca8f5; PT:lle kerrottu.

## 3. Viestit
KK sai 15.17 tuloksen, korjauksen 120:stä. PT sai 15.2x ja 15.3x rivit. Sanoin KK:lle ja PT:lle, että jatkan; tästä nollauksesta ei ole erikseen kerrottu. PT odottaa yhä vastausta 弘义阁-palkista (edellisen luovutuksen kohta 3). Ovi: ei odoteta minulta.

## LISÄYS 16.1x: JU valmis, koe-o tulos
Levyn kuvat valmiit 16.03 (katsomatta). Koe-o valmis 16.07. Numerot M/LESHOU-PORTAAT.md loppu: katon viirut seuraavat uutta geometriaa tai pakkausta (tummuneita 16 → kokeessa 2, UV1 sama kuin vanhassa); askelmien läikät ainakin osin reseptistä tai kohtauksesta (marmori 13 kokeessa). Tummien tekseleiden kasvu ei selitä viiruja (kokeessa 58,1 %), PT:lle oikaistu. Koetta ei ole katsottu pelissä. Vertailu: N/o_kolmiot.py polku vaihtaen.
