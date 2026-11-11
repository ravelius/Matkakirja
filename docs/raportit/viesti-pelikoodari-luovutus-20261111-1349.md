# Pelikoodari: luovutus 11.11.2026 klo 13.49 (konteksti 25 %, Raamattu 7.37)

Edellinen: viesti-pelikoodari-luovutus-20261111-1320.md (125f97bac). TÄMÄ KORVAA SEN KOKONAAN.

## 1. v133c 漱芳斋-ovi — TEHTY 14.0x (lisäys): JU vei taustan 13.52, uusinta tarkastelukuvat-904715425-135609 katsottu, ovi seinässä,
##    pari PT:lle ja kopio LAV:lle lähetetty 14.0x (TULOS.md). Jäljellä vain PT:n pt-ok → MR (PT pyytää). ÄLÄ toista.
- Syy löytyi: kielletty-tausta-v133c PUUTTUU mediasta (https://media.matkakirja.app/juoksupeli/maailma-v4/kielletty-tausta-v133c/tausta.json = 404;
  v133b ja v132 200). Paketti paikallisesti proto-3d/_valmiit/juoksupeli-kk-lavastaja-tausta-v133c-vienti-20261111. Siksi a0eaa2d8b- ja
  904715425-ajoissa ei rakennuksia (ovet ja koristeet leijuvat). Ei häivytys, ei ovenhaun vika.
- Ovi (−97,69; 490,03) on pienen rakennuksen (x −105…−92, z 490…493) eteläseinässä (pinnat: umpiseinä 3,25–10,25 m), EI reunuksella.
- Selvitys + parit: proto-3d/_tyo/pelikoodari/kulkukartta/v133c/ovipari-aukio/TULOS.md. Lista tyokalut/koekuvat-ovi-shufangzhai-aukio.txt
  (commit 904715425, haara pelikoodari/tausta-v133, proto-repo paikallinen, ei pushia).
- Lähetetty 13.4x: JU (vienti + uusinta-ajo 904715425 samalla listalla), PT (3 riviä), LAV (kopio).
- TEE: kun JU antaa uuden kansion → katso 3 kuvaa (vertaa v132-kansioon tarkastelukuvat-17fbf3e35-133051, pari.py:n tapaan rinnakkain)
  → pari PT:lle (3 riviä), kopio LAV. MR vasta PT:n pt-ok:lla.

## 2. KAMERALAITE PALA 2 (KK:n päätökset: tehtävänannon loppu, luku "KK:n päätökset" — LUE KOKONAAN)
Tehtävänanto: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-kameralaite-pala2-tehtavananto.md
Haara kameralaite/pala-2, wt /Users/Shared/Claude/wt/proto-pelikoodari-kameralaite. JÄRJESTYS (KK 13.29): E → A ja C → B:n mittaus → kytkentä + Mac.

Commitit tällä vuorolla: cede375d9 (T10b syymittari SYY=1), fda4db16a (kytkentä peliin, vanha ruututapa: UusiKamera, S_enn, KameraMittari,
komento "kamera uusi|vanha"; unity 0 virhettä) — KYTKENTÄ TEHDÄÄN UUDELLEEN E:n mukaan, 710e80733 (E KESKEN, ks. alla).

E (KK 13.29, sitova): kamera kulkee pelin kiinteällä askeleella.
(a) ohjaaja + laite 1/120 s kerran per pelin askel, syötteenä säännön paikka sillä askeleella; JuoksupeliNakyma.cs yhteensä ≤ 10 riviä
    (askelsilmukka rivit ~1392–1397: saanto.Askel(Askel):n jälkeen yksi kutsu, esim. jv.KameraAskel(saanto)).
(b) ruudun kamera = talletettu tila + osa-askel jäännöksellä kopiosta (sama jäännös ja S_enn kuin pelaajan näkyvä paikka), ei talleteta.
(c) laitteen taaksepäin-ekstrapolointi pois (Kameralaite.cs vain tältä osin). (d) palan 1 testit 13/13, T10 ≤ 2 cm 30/38/60/120 pysähdys + käännös.

TEHTY 710e80733 (Kameralaite.cs): Vaihe(x, t, y, h, tyonto) askeleen pituudella, ip = Paikka + PaikkaNopeus × 2·S·ennakko (ei taakse);
Askel(tavoite, tyyli, dt) askeltaa h:lla ja antaa ulos Esikatso(tavoite, tyyli, kertyma, out v, out a, tyonto) = Vaihe kopiosta osa-askeleella.
Palan 1 testit nyt 9/13: T06, T09, T10, T11 kaatuvat, koska ne syöttävät ruudun lopun tavoitteen ruudun dt:llä (1/60, 1/30).
SEURAAVAKSI:
1. KameralaiteTestit: ajotapa kiinteään askeleeseen (tavoite askeleen hetkeltä, analyyttinen t:n funktio; ruudun ulostulo laite.Esikatso
   jäännöksellä). Väitteet ennallaan. Tarkista T06:n "ei lähde levosta" (Esikatso osa-askeleella ensimmäisellä askeleella).
2. Seurantaohjaaja: Syota → Askel(V3 paikka, double kuvakulma) (yksi h-askel: hyppytarkistus, Vaihe(paikka), edRuutu = paikka, Tavoite = Laske(0));
   Esikatso(V3 paikkaEnn, double osa) = Laske(osa) katse paikkaEnn:stä (Laske käyttää nyt edRuutu → parametriksi). kertyma pois.
3. SeurantaohjaajaTestit: Pelaaja.Askel instanssikenttä (Jatkuvuus h/2), Ruutu(dt, Action<V3> askeleella) kutsuu askeleella Polku(S, SivuNyt);
   Aja: per askel oh.Askel + laite.Askel(h); per ruutu tav = oh.Esikatso(pEnn, pel.Kertyma), a = laite.Esikatso(tav, …, pel.Kertyma); mittarit
   askelten maksimina. Sama apuluokka T12:lle; T11 Tyontoero ja T13 (sovitin) samoin. T10b (SYY=1) näyttää eron.
4. JuoksuSeurantaKamera: Askel(jalat, fov) per pelin askel, Kuva(jalatEnn, jaannos) per ruutu. Sitten A (τv 0,5, Te 1,0, D_min ahtauden mukaan
   1,5 → 2,5 m) ja C (katseen ennakko v̂ × jäljen tangentti samasta ikkunasta, T7 mittari uusiksi: ylitys ≤ 1,5° yli atan(sivu/etäisyys),
   yksi suunnanvaihto, rulla ≤ 2°) → B:n mittaus (T5/T6 a = 2,5 / 3,25 / 4,0 säännöllä a = min(4; D − 0,5; (ikkunan pienin seinäet. − 0,3)/0,24),
   ≥ 1 m; luvut KK:lle) → kytkentä uudelleen (fda4db16a:n pohjalta: frame-osa jää, askel-osa JuoksupeliNakymaan) → Mac-tallenne (JU).
E-selvitys ja Hermite-koe (hylätty): proto-3d/_tyo/pelikoodari/kameralaite/E-ruutunopeus-syy.md, E-hermite-koe.patch.

## 3. JONOSSA
- Kohdekartta: kuvahaut ilman kattoa (NS: Esilataajan Nakyva ohittaa katon; KohdekarttaNakyma.cs:237 ja NostotKartalla.cs:2991 Kuvat.Hae)
  — ensin toisto Macilla rajoitetulla nopeudella, sitten ehdotus KK:lle ennen koodia. Tiedot proto-3d/_tyo/natiiviseppa/latausjono/vastaus-ii.md.
  v133c ensin loppuun.
- LAV:n aja-a2.zsh (JU) → vertaa m1-varmistus-kuviin. B1 (bcf32314c) junaan vain PT:n päätöksellä.

Huom: tyokalut/tarkista.sh päivittää tyylikirjan (Tyylikirja.uss/.cs, tyylikirja.json) → palauta git checkoutilla, älä committaa.
Ei agentteja käynnissä. Ei uusia lupia.

## LISÄYS 15.4x (PT 15.38 herätys: jatka palaa 2)
Palan 1 testit 710e80733:lla 9/13. Mittaus (ei committia): kun tavoite annetaan oikein joka askeleella (dt = h), laite on 6 m/s:ssa 2,67 cm EDELLÄ
(T10 dt 8,3 ms: jättämä −2,67 cm; T11 edellä 2,67 cm, raja 1 cm). Syy = KK:n E(1): suotimet ovat puoli-implisiittinen Euler, tavoite askeleen
loppuhetkeltä pidettynä koko askeleen → O(h)-etumatka ≈ v·h/2. Vanha toteutus peitti tämän antamalla ulos edellisen askeleen tilan (ed).
Koe KOE_KESKI (ip −= PaikkaNopeus·h/2 = askeleen keskihetken tavoite): etumatka 0,17 cm, T11 läpi, 10/13. Oikea toteutus = edellisen ja
nykyisen askeleen tavoitteen keskiarvo (ei ekstrapolointia). KYSYTTY KK:lta 15.4x — älä toteuta ennen vastausta. Muut kaatuvat:
T06 (Esikatso levosta: tarkista), T09 (LaitePeli-rajat = 1,25 × viitehypyn huiput, huiput muuttuivat hieman: a 20,29, j 107,85 → rajat
kalibroitava, KK:n päätös), T10 dt 1/60 ja 1/30 (testi syöttää ruudun lopun tavoitteen → ajotapa kiinteään askeleeseen).

## LISÄYS 15.4x: KK:N PÄÄTÖS 15.39 (E(1)) — HYVÄKSYTTY neljällä ehdolla, TOTEUTA
Laite käyttää askeleella tavoitteena (edellisen askeleen tavoite + nykyinen) / 2 (keskihetki; poistaa v·h/2-etumatkan, muuten osa-askel värisisi 0…2,7 cm).
1. Sama sääntö ruudun osa-askeleessa (Esikatso): kopion tavoite = (askeleen alun tavoite + ruudun hetken tavoite) / 2; jäännös = koko askel →
   täsmälleen sama kuin täysi askel. LISÄÄ TESTI: jatkuvuus askelrajalla.
2. Leikkaa, siirto ja aloitus: edellinen tavoite = nykyinen (ei vedä vanhaan paikkaan).
3. Kaikki laitteelle menevät tavoitteet samalla säännöllä (paikka JA katse, myös nopeudet).
4. T11:n raja pysyy 1 cm.
T09: LaitePeli-rajat saa laskea uudelleen (kerroin 1,25 pysyy). Kirjaa raporttiin vanhat (rajat a 25,4, j 138,5 ↔ huiput ~20,3/110,8)
ja uudet huiput (a, j); JOS jompikumpi muuttuu yli 5 %, kerro KK:lle ENNEN rajan muutosta.
Sitten T06/T10 ajotapa kiinteään askeleeseen, ohjaaja Askel/Esikatso, A + C, B-mittaus, kytkentä ja Mac-tallenne. KK lukee Seurantaohjaaja.cs:n
ja kytkennän diffin kokonaan ja arvioi tallenteesta etäisyyden ahtaassa käytävässä.

## LISÄYS 16.2x (PT 16.1x herätys): E(1) TEHTY b2b0325c7 (haara kameralaite/pala-2)
Keski() laitteessa (askel ja Esikatso, kaikki kentät, Leikkaa nollaa = ehdot 1–3); T11 edellä 0,17 cm (raja 1 cm, ehto 4); T10 kiinteällä
askeleella kaikilla dt 0,17 cm; T09 huiput a 20,32 → 20,29, j 110,8 → 107,85 (< 5 %) → Nykays 138,5 → 134,8. Palan 1 testit 12/13.
AUKI: T06 "ei lähde levosta" v 0,0173 m/s (raja 0,01) 3 askeleen jälkeen; vanha ulostulo = askelta vanhempi tila (2 askelta) → KYSYTTY KK:lta
16.2x (raja vai mittaushetki). EI VIELÄ: ehto 1:n testi (jatkuvuus askelrajalla: Esikatso(osa = h, seuraavan askeleen tavoite) == täysi askel)
→ lisää KameralaiteTestit:iin. Sitten ohjaaja Askel/Esikatso + SeurantaohjaajaTestit-ajuri (kohta 2.2–2.4 yllä).
