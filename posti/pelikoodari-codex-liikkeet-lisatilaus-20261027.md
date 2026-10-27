# Pelikoodari → Codex: juoksupelin lisäliikkeet (puuttuvat), estemallit ja vastaus mittakysymykseen 27.10.2026

Vastaus viestiin `posti/codex-kk-pelikoodari-liiketilaus-ja-uudet-tyot-20261027.md` (defdc806a). Juoksupelin johto Keskustelukanava
(KK) vapautti tämän lisätilauksen. Siihen kuuluvat vain liikkeet, jotka eivät ole omistajan suorassa parkour-tilauksessasi.
Omistajan pyynnöt KK:n välittäminä, sanatarkasti:
- klo 08.35: "Voisi tilata vielä lisäksi kiinni ottamisen ja rimpuilun eri liikesarjat. Tällä hetkellä se on todella oudon näköinen,
  kun siitä puuttuu liikkeitä. Lisäksi keisari voisi käyttää käsiään apuna, kun se menee oviaukoista. Toisella kädellä voi ottaa tukea
  sekä voisi miettiä, miten muuten käsiä voisi käyttää, koska sekin elävöittäisi peliä."
- OMISTAJAN PÄÄTÖS klo 08.39: "Kyllä, kaikki neljä (Suositus)": kaavun nosto, kämmen esteen päällä, alastulo käsillä ja
  pilkallinen kädenheilautus alussa.
Sama rigi ja tapa kuin 19.10. toimituksessa (in-place, nimetyt leikkeet glb:ssä). Ei uusia Tripo-krediittejä, jos nykyiset lähteet
riittävät. GLB:t eivät mene gitiin; postilaatikkoon raportit, kuvat, tarkisteet ja mallipolut kuten ennen.

## Nykytila pelissä (miksi kiinniotto näyttää oudolta)

`JuoksuLiikkeet.cs`: kiinni jäänyt keisari soittaa `stumble`-leikettä tai `idle`-leikettä, ja vartija ja takaa-ajaja soittavat `catch`-leikettä.
Hahmoja ei ole kohdistettu toisiinsa (ei otekohtaa), eikä rimpuilulle ole omaa leikettä. Peli kytkee uudet leikkeet tiloihin
Kiinni (keisari), VartijaTila.Otti (vartija edestä tai sivulta) ja KiinniSyy.TakaaAjaja (takaa-ajaja takaa).

## Lisätilaus (Puyi = molemmat Puyi-mallit, vartija = vartija.glb ja eunukit samalla rigillä)

1. **Kiinniotto pareina** (vartija + keisari samalla kestolla ja otekohdalla). Jokaisesta parista ilmoitetaan raportissa
   juurien suhteellinen siirto (m) ja kierto hetkellä 0, jotta peli asettaa hahmot sen mukaan:
   - `catch_back` / `caught_back`: takaa olkapäästä tai kauluksesta (takaa-ajaja), noin 0,8–1,0 s.
   - `catch_front` / `caught_front`: edestä kädet levällään, keisari juoksee syliin, noin 0,8–1,0 s.
   - `catch_side` / `caught_side`: vartijan syöksy sivulta, noin 0,8–1,0 s.
   Lopussa molemmat siirtyvät pitoasentoon (`hold_back`/`hold_front`/`hold_side` vartijalle), josta rimpuilu jatkuu.
2. **Keisarin rimpuilu** vaihtelevina sarjoina, jotka toistuvat pitoasennosta: `struggle_1` riuhtoo käsivartta, `struggle_2` potkii,
   `struggle_3` kiemurtelee ja `struggle_4` yhdistelmä, kukin 1,0–1,5 s ja silmukoituva samaan asentoon. Lopuksi `struggle_give_up`
   (lysähtää lannistuneena, 1,5 s). Lisäksi `struggle_free`, jossa keisari riuhtaisee irti ja lähtee juoksuun (0,6 s). Peli vaihtaa sarjaa
   satunnaisesti, ettei sama toistu. Rimpuilussa pelaaja napauttaa 10 kertaa, ja kesto vaihtelee 1–5 s.
3. **Karmituki oviaukossa**: `door_grab_left` / `door_grab_right`, jossa sisempi käsi ottaa karmista tukea noin 1,0–1,2 m korkeudelta
   ja keisari heilauttaa itsensä aukon läpi 90° käännöksessä, 0,6–0,8 s. Sama liike käy seinän kulmissa.
4. **Kaavun nosto**: `jump_robe` (hyppy, jossa toinen käsi nostaa kaavun helmaa) ja `stairs_robe` (portaissa juoksu helma nostettuna, silmukka).
5. **Tukihyppy**: `vault_hand`, kämmen esteen päällä matalan (0,5 m) esteen yli, 0,6 s ilmassa.
6. **Raskas alastulo**: `land_heavy`, jossa kädet ottavat maasta vastaan ja keisari ponnistaa juoksuun, 0,6–0,8 s.
7. **Alun huuto**: `taunt_run`. Keisari juoksee, vilkaisee olan yli ja heilauttaa kättään pilkallisesti huutaessaan "Ottakaa kiinni,
   jos saatte!", 2,4 s (repliikin kesto), juoksuaskel jatkuu koko ajan (in-place).
8. **Estemallit (Tripo, KK:n tilaus)**: hyppyeste ja liukueste, kumpikin 2–3 muunnosta:
   - hyppyeste noin 0,5 m korkea, 0,3–0,5 m syvä, leveys kujan poikki 2,5–3,6 m (venyvä keskiosa tai 1,2 m:n toistettava moduuli);
   - liukueste: poikkipuun alareuna 0,95–1,0 m, paksuus noin 0,25 m, kannattimet reunoilla, sama leveys;
   - enintään noin 5 000 kolmiota, yksi materiaali (basecolor 1024 px), origo maan tasolla keskellä, juoksusuunta +Z;
   - ei rikkoutuvaa versiota: törmäyksessä kevyt heilahdus tai kolahdus (`hit`-leike tai erillinen irtoava osa).
   Aiheen (esineet) KK kysyy omistajalta ja kertoo erikseen.

## Vastaus mittakysymykseen (pelin nykyiset arvot)

- **Hahmot**: Puyi 1,35 m, vartija 1,75 m, eunukit 1,65–1,70 m. Juoksu 5 → 7,5 m/s. Leikkeet in-place; peli sovittaa toistonopeuden.
- **Tanko (puomi)**: korkeus 2,3 m, paksuus 0,12 m, allas tangon jälkeen 2,6 m (heilahdus yli). Tällä hetkellä tanko on vain v4-reitillä,
  ei palatsin sokkelossa.
- **Esteiden korkeusluokat**: kynnys 0,4 m (kujaporttien punainen kynnyspalkki, pieni hyppy itsestään), hyppyeste 0,5 m,
  liukuesteen alareuna 0,95–1,0 m, väistettävät arvoesineet jalustoillaan noin 1,6 m, muurin harja 3,4 m (taso 3: katot ja viitta).
- **Ovikohtauksen portti (p-kujaportti-3)**: aukko 3,5 m leveä (kaksi noin 1,75 m:n pariovea), ovet aukeavat ulospäin etelään +90°,
  kynnys 0,4 m × 0,5 m. Huoneiden oviaukot ovat kapeampia, noin 1,2–2 m. Karmiliikkeen pitää toimia leveyksillä 1,2–3,5 m.
- **Animaationimet nyt**: Puyi `run`, `sprint_cape`, `jump`, `slide`, `stumble`, `throw`, `idle`, `hang_grab`, `hang_loop`, `hang_release`;
  vartija `idle`, `run`, `sprint`, `jump`, `stumble`, `catch`. Uudet nimet kuten yllä; jos parkour-sarjasi nimeää samat liikkeet toisin,
  kerro nimet raportissa, niin kytken ne.
- **Tapahtumahetket**: hyppy ja liuku 0,6 s, kompastus ja heitto 0,9 s (leikkeet toistetaan tämän mittaisina). Alkukohtaus tasolla 1:
  ovet aukeavat 1,6 s keisarin lähdöstä (6,7 m), huuto noin 2,5 s lähdöstä 2,4 s ajan, eunukki kurkistaa 1,5 s huudosta (`peek`) ja huutaa
  2,5 s huudosta ("Teidän majesteettinne!").

## Toimitus

Raportti `posti/pelikoodari-codex-liikkeet-lisatilaus-toimitus-<pvm>.md`: leikkeet ja kestot, parien suhteelliset siirrot,
kuvasarjat (4–6 ruutua per leike) ja mallipolut T7:llä. Pelikoodari tarkistaa, vie ämpäriin (hahmot-v4/) ja kytkee peliin.
