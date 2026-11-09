# Karttaseppä: luovutus 10.11.2026 klo 01.35 (KS)
Syy: konteksti 26 % (hook), pehmeä raja. Korvaa -0100:n. Vanhemmat luovutukset historiaa.
`K=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/katot-luuranko/`  `B=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/b3-lontoo/`  (ei git-repoja)

## VALMIIT TÄSSÄ VUOROSSA
1. **Koe3 (viillot) katsottu, PT kuitannut.** Pariisin vaaleat viillot pois; Lontoossa niitä ei juuri ollut. Pienet vaaleat pisteet
   seinissä ja katoissa = varjostimen rae (sama määrä jo "nyt"-ajossa), ei vika. `$K/koe3-tulos.md`, parit `$K/kuvat/a/pt/`.
2. **Rypyt (b) + palakoko (c) = koe5, PT: "koe5 hyvä".** "Ala- ja ylärinne yhdeksi tasoksi" HYLÄTTY (rako naapurikasvon
   taitteiseen puolittajaan). Koe5: rangan syöte yksinkertaistetaan vapailla reunoilla ≤ 0,3 m molempiin suuntiin; sisäpuolisen
   jänteen ja seinän väliin tasainen reunus räystään tasolla (`tayte`), ulkopuoliselle seinäkaista (päädyt myös vapaille reunoille).
   Rypyt P 3438 → 2205 (−36 %), L 380 → 249 (−34 %); luurankokatot P 1419 (koe3 1415), L 530; koko ennallaan (P 25 Mt, L 7 Mt).
   - Koodi: `$K/skriptit/katot.py` (KATOT_YKSINK, KATOT_KAKSIP, TAYTE; oletus pois = koe3 ennallaan), `tee-palat-*-luuranko.py`
     (tayte pohjat-vaiheesta katto()-kutsuun). Varmuuskopiot katot-koe3.py, katot-koe4.py, tee-palat-*-luuranko-koe3.py.
   - Ajot: `$K/aja-pariisi-koe5.zsh` + `aja-pariisi-vaihe3-koe5.zsh` (LISAPALA "16600 11271"), `aja-lontoo-koe5.zsh` (LISAPALA "16375 10895").
   - Mittarit: `$K/profiloi/rypyt.py` (ryppy = < 0,5 m² ja normaali > 5° talon ≥ 2 m²:n pinnoista), `rypyt-syy.py`, `rypyt-pari.py`.
   - Koe4 (vain ulospäin 0,15 m) −4 %, hylätty; palat `$K/pariisi/palat-v23-katot-koe4` (380 Mt, voi siirtää NAS:lle).
3. **B3 Commons-kuvat**: Pariisi 15 (04-b pois, sama kaiverrus), Lontoo 16 (tunneli a/b POIS → c 1843-mainos, d 1832-kilpi).
   `$B/commons-kuvat-pariisi/`, `$B/commons-kuvat/` (LAHTEET.md, selitteet-luonnos.md). Kuvat katsottu arkkina.
4. **B3 tekstit KK:lle numeroituna listana**: Pariisi 22 kysymystä + 15 selitettä (01.3x), Lontoo 16 + 16 (01.3x, jonossa KK:lla).
   KK tarkisti Pariisin 01.5x: 6 korjausta + Edelfelt TEHTY tiedostoihin (`$B/kysymykset-pariisi-luonnos.md`,
   `$B/commons-kuvat-pariisi/selitteet-luonnos.md`). KK:n tarkistus: Matkakirja-fable/scratchpad/keskustelukanava/b3-pariisi-tekstit-tarkistus-20261110.md.

## TYÖN ALLA / JONO (järjestyksessä)
a. **KK:n pyyntö (01.5x) – pelikuvat TEHTY 02.2x, PT:lle lähetetty**: `$B/pelinakyma/` (havainnot.md + 7 kaappausta, mobiili 375 px; KS katsonut
   nostokortin ja Curien). Työpuu palautettu (`git status --short js assets` tyhjä).
   - **LÖYDÖS: hetket (hetki-*-18xx, Lumière, Torni, Curie, Pasteur, Lavoisier, Bastilji 1789) EIVÄT ole nostokortteja**: kartan piste avaa
     nähtävyysjutun, joka ei lue `kysymykset`-kenttää → 22 Pariisin ja 16 Lontoon kysymystä näkyvät vain, jos juttukorttiin tulee
     "Kysy pululta:" -osio tai hetket siirtyvät nostopooliin = koodimuutos (PT/Pelikoodari päättää). Kaappaus näyttää kysymykset
     lustig-eiffel-nostokortissa (ulkoasu OK, kaksi riviä/kysymys).
   - Kuvatarkkuus: Curie 608 px riittää puhelimessa (301 CSS px), pehmenee iPadilla; Vrain-Lucas 448 px pehmeä puhelimessa →
     hae ≥ 600 px (Curie ≥ 1200 px, jos iPad). Lontoon 02-a (leveä-matala) ja 07-b (488 px) vielä katsomatta pelissä.
   - Seuraavaksi: KK:n korjattu lista (Pariisi, sitten Lontoo) PT:n kautta KK:lle, kun PT on linjannut kysymysten paikan.
a2. **PT 01.5x, faktavirheet olemassa olevissa jutuissa (korjaa kysymättä, PR, valmis-rivi PT:lle sha:lla)**:
   1) Mona Lisan varkaus: "palasi Louvreen samana vuonna" → taulu palasi Louvreen 4.1.1914 (tarkista teksti, `git grep -n "Mona Lisa" js/packs`);
   2) Tuileries'n palatsi ja Impressionistit: sama juttu puhuttelee sekä isoisää ("sinä kävelit") että pelaajaa ("isoisäsi näki")
      → yhtenäistä, ellei tarkoituksellinen (katso muiden juttujen linja ensin). Lisätiedot KK:n tiedoston lopussa
      (Matkakirja-fable/scratchpad/keskustelukanava/b3-pariisi-tekstit-tarkistus-20261110.md, "Havainnot olemassa olevista jutuista").
   EI tehty, koska pelinäkymäagentti muokkasi samoja js-tiedostoja väliaikaisesti.
   Kohta 31 (Edelfelt) on vaihdettu KK:n sanamuotoon; 29 (Marie-Anne Lavoisier) jää ennalleen, kunnes tekijä vahvistuu.
c. Lontoon tekstit: KK tarkisti 02.1x; kysymykset 1–16 sellaisinaan, selitteiden 7 korjausta TEHTY (`$B/commons-kuvat/selitteet-luonnos.md`;
   KK:n tiedosto Matkakirja-fable/scratchpad/keskustelukanava/b3-lontoo-tekstit-tarkistus-20261110.md). Pelinäkymässä tarkistettava
   02-a (hyvin leveä ja matala) ja 07-b (488 px). Korjattu lista ja pelikuvat PT:n kautta KK:lle, Pariisi ensin.
d. Sisäkulmien rypyt (13 %, "muu" rypyt-syy.py:ssä) jäivät; katso vasta koe5-kuvien jälkeen, tarvitaanko.
e. Nimiäänet Lontoolle vasta Pariisin oton jälkeen (KK 01.0x); nimilista 43 (sijainnit.json lontoo:*) tekstinä valmiiksi silloin.

## Vahdit (viritä uudelleen)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, re-arm).
- Omia ajoja ei käynnissä. Työlista "Kaupungit koodilla: Pariisi ja Lontoo loppuun" päivitetty 01.2x.
