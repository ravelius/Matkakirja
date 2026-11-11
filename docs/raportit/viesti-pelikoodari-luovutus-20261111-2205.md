# Pelikoodari: luovutus 11.11.2026 klo 22.05 (konteksti 25 %, Raamattu 7.37)

Edellinen: viesti-pelikoodari-luovutus-20261111-1349.md + lisäykset 1–5 (haara pelikoodari-luovutus-20261111-1127, 435e8fda1).
TÄMÄ KORVAA NE KOKONAAN.

## 1. v133c 漱芳斋-ovi — tehty ja PT:lle 14.0x. Jäljellä vain PT:n pt-ok → MR (PT pyytää). ÄLÄ toista.
Selvitys: proto-3d/_tyo/pelikoodari/kulkukartta/v133c/ovipari-aukio/TULOS.md (commit 904715425, haara pelikoodari/tausta-v133, proto paikallinen).

## 2. KAMERALAITE PALA 2 — haara kameralaite/pala-2, wt /Users/Shared/Claude/wt/proto-pelikoodari-kameralaite (proto paikallinen, ei pushia)
Tehtävänanto + KK:n päätökset: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-kameralaite-pala2-tehtavananto.md
TEHTY tällä vuorolla:
- 7f0571ef9 E: Seurantaohjaaja.Askel(paikka, fov) per pelin askel, Esikatso(paikkaEnn, osa) ruudulle; sovitin Askel/Kuva; testiajuri pelin tapaan.
  T10 0,00 cm kaikilla ruutunopeuksilla.
- 0cd9b9e33 A (τv 0,5, Te 1,0, D_min 1,5→2,5 ahtaudesta) + C (katseen ennakko v̂ × ikkunoidun jäljen suunta) + B-sääntö (a = min(4,0; D − 0,5;
  (seinä − 0,3)/0,24) ≥ 1, seinätermi suodatettu 0,15 s) + s_kam implisiittisesti (D jäi v·h = 5 cm vajaaksi). Testit 4:3, T7 uusi mittari.
- ad27cdad6 kytkentä uudelleen: JuoksupeliNakyma askelsilmukassa jk.KameraAskel(vk.S) (yht. 3 riviä), JuoksuV4Maailma SaannonJalat (säännön paikka
  kartan lattialla) + KameraAskel + ruudulla seuranta.Kuva(SaannonJalat(s, sEnn), jaannos), Aloita viimeisen askeleen paikasta (+32/−1). Unity 0 virhettä.
TESTIT: palan 1 14/14; SeurantaohjaajaTestit 13/15: T06 vasen–vasen pelaaja 23,6° sivussa (raja 21,9), T07 katse ylittää 8,42° (raja 1,5),
  2 suunnanvaihtoa, rulla 2,08° (raja 2). Ajo: cd wt/Linssit-testit && ./kaanna.sh Seurantaohjaaja
MITTAUS + EHDOTUS: proto-3d/_tyo/pelikoodari/kameralaite/BC-mittaus.md (koe-diff BC-koe-tangentti.patch). B: a 4,0 riittää seinäehtoon.
  C on ristiriidassa T7:n kanssa: mikään tangentti ei täytä T7:ää ja käännösten kuvassa pitoa yhtä aikaa (taulukko tiedostossa).
LÄHETETTY KK:lle 22.0x (send_message, jonossa): tulokset + ehdotus "kytkentä nyt, Mac-tallenne JU:lle nykyisellä C:llä ennen C-päätöstä".
ODOTTAA KK:n vastausta:
- Jos KK hyväksyy tallenteen: tilaa JU:lta (id osoitekirjasta) tehtävänannon "Todiste pelistä": sama botti/rata/siemen, `juoksu kamera vanha` ja
  `juoksu kamera uusi` 60 s kumpikin samalla ruutukoolla, lokista mittaririvit (MATKAKIRJA juoksupeli kamera … 1 s / kierros) + 3 × 10 s uudesta
  (käännös kujassa, äkkipysähdys seinään, kompastus). Kuvat + mittaritaulukko KK:lle, PT kopiona (3 riviä). Kartan ajot JU:n jonossa edellä.
  JU tarvitsee haaran kameralaite/pala-2 (ad27cdad6) käännökseen — proto paikallinen, ei pushia: kysy JU:lta tapa (aiemmin JU on kääntänyt
  paikallisesta haarasta).
- C:n linja (a/b/c BC-mittaus.md:ssä) on KK:n; ÄLÄ toteuta ennen päätöstä. Ei junaan ennen KK:n sanaa; junaan kytkin pois päältä.
KK lukee Seurantaohjaaja.cs:n ja kytkennän diffin (7355d8ab3..ad27cdad6 pelitiedostoille) kokonaan.

## 3. JONOSSA
- Kohdekartta: kuvahaut ilman kattoa (NS: Esilataajan Nakyva ohittaa katon; KohdekarttaNakyma.cs:237 ja NostotKartalla.cs:2991 Kuvat.Hae)
  — ensin toisto Macilla rajoitetulla nopeudella, sitten ehdotus KK:lle ennen koodia. Tiedot proto-3d/_tyo/natiiviseppa/latausjono/vastaus-ii.md.
- LAV:n aja-a2.zsh (JU) → vertaa m1-varmistus-kuviin. B1 (bcf32314c) junaan vain PT:n päätöksellä.

Huom: tyokalut/tarkista.sh päivittää tyylikirjan (Tyylikirja.uss/.cs, tyylikirja.json) → palauta git checkoutilla, älä committaa.
Ei agentteja käynnissä. Ei uusia lupia.

## LISÄYS 22.1x: KK:N VASTAUS 22.04 — SITOVA, KORVAA KOHDAN 2 "ODOTTAA" (koko teksti: tehtävänannon viimeinen osio, polku kohdassa 2)
E (7f0571ef9) ja s_kam:n implisiittinen askel HYVÄKSYTTY. B PÄÄTETTY: a:n yläraja 4,0 m.
C UUSI LINJA (13.26 kumottu): katseen ennakon VAAKASUUNTA = SÄÄNNÖN KULKUSUUNTA (PisteKaarella(S, Sivu, out suunta)), ei jäljen tangentti.
1. Ohjaajalle Askel(paikka, kulkusuunta, fov); sovitin antaa säännön suunnan samalta askeleelta laitteen kehyksessä (SaannonJalat heittää sen
   nyt `out _`; reitin kehys → peli: z käännetty kuten uKulku = (kulku.x, 0, −kulku.z)). Ohjaaja pysyy puhtaana.
2. Suunta talteen jäljen kärkiin (uusi rengastaulukko jx/jy/jz/js:n rinnalle); ennakon suunta SAMALLA painolla kuin nyt (puolikolmio viimeisen
   a metrin yli, eli Tangentti()-painotus), mutta säännön suunnista. Nollaa: kärjille nollauksen kulkusuunta.
3. Pystysuunta (nousu) yhä ikkunoidusta jäljestä. `suunta` (lepoennakko, edessä-näytteet) ja KatseNopeus = v̂ × uusi suunta. Ei muita lakimuutoksia.
4. Testien keinopelaaja antaa säännön suunnan erikseen: T7 suora sivuaskeleen ajan; käännökset kaarena kuten pelissä (alkaa kulmasta, 2 × 1,6 m)
   → Murto-polulle kaariversio + suunta.
JÄRJESTYS: C-korjaus ENSIN, sitten kytkentä (KameraAskel välittää suunnan) ja Mac-tallenne. EI tallennetta nykyisellä C:llä.
SAA JATKAA KYSYMÄTTÄ kytkentään ja tallenteeseen, jos T7 ylitys ≤ 1,5° ja 1 suunnanvaihto JA T5/T6 sivukulmat eivät kasva yli 0,5°
(nyt L 18,7 / VO 19,0 / VV 23,6°); muuten luvut KK:lle ensin.
AUKI, EI PAIKATA, rajoja ei muuteta:
(i) T06 vasen–vasen 23,6°: lisää tulosteeseen pahimman hetken erittely: kulma pelaajan ja TAVOITEkatseen välillä laitteen paikasta, kulma laitteen
    katseen ja tavoitekatseen välillä (laitteen viive) ja kameran–pelaajan suora väli. KK päättää luvuista.
(ii) T7 rulla 2,08°: mittaa uudelleen korjauksen jälkeen; KK arvioi tallenteesta.
TALLENTEESEEN 3 pätkän lisäksi: kaistanvaihtoja suoralla ja kaksi samansuuntaista käännöstä peräkkäin, jos radalla on.
Valmis-viesti KK:lle kuten tehtävänannossa (sha, testit, tallenteiden polut, mittaritaulukko); PT kopiona ≤ 3 riviä.
