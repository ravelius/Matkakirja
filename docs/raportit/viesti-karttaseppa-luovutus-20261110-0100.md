# Karttaseppä: luovutus 10.11.2026 klo 01.00 (KS)
Syy: konteksti yli 25 % (hook), pehmeä raja. Korvaa -0010:n. Vanhemmat luovutukset historiaa.
`K=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/katot-luuranko/`  (ei git-repo; skriptit `$K/skriptit/`)

## VALMIIT TÄSSÄ VUOROSSA
1. **Lontoon valkoiset talot (PT:n kiireellinen) = EI taantuma.** Automaattiajossa opas vaihtaa Googlen Ioniin (unity.log
   "automaattiajo True → Ion"): valkoiset laatikot = Cesium OSM Buildings, harmaat aukot = lataamattomat Bing-laatat. Sama näkymä
   jo 7.11. 12.01 (talopalat silloin puuttuivat Macilta kokonaan) → b804a87d6-ajoa ei tarvita. Parit ja selvitys
   `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/lontoo-valkoiset/` (pari-a1, pari-a6, havainto.md). PT:lle 3 riviä 00.3x (jonossa).
2. **Viillot (T-liitokset) korjattu, koe3 tehty.** Jumi EI ollut hitaus vaan kierre: reuna jaettiin kolmion omasta kärjestä tai
   suikaleen kärjestä → nolla-alaiset kolmiot jakoivat toisiaan (vahti 200 000 täyttyi, sadattuhannet kolmiot/talo). Uusi `katot._tliitokset`
   (numpy-reunahaku, välimuisti, jako vain jos kummallekin puolikkaalle jää pinta-alaa todellisella kopiokärjellä, < 1 cm reunoja ei
   jaeta, piste ≥ 5 mm päistä, kierre tai katto → talo ennalleen). Koealueen 1416 taloa 7,9 s; 82 taloa (6 %) palaa ennalleen
   (kierre: lähes yhtenevät kärjet, 2,5 mm), pinta-ala säilyy (2 taloa ±4 mm²). `katot.TLIITOKSET = True`.
   - Profilointi: `$K/profiloi/` (keraa.py + keraa-pariisi.zsh keräävät verkot `pariisi-verkot.pickle`; kierros.py, vertaa.py, jaljita*.py).
   - Vanha versio talteen: `$K/skriptit/katot-koe3-vanha-tliitos.py`.
   - Koe3-palat (LISAPALA mukana): Pariisi 7 palaa 25 Mt (koe2 24), kolmioita 525 589 (+2 %); Lontoo 5 palaa 7 Mt, 166 893 (+1 %).
   - JU:lle ajopyyntö 00.5x (viesti + `$K/ajopyynto-mac.md` LISÄYS, ajot 7–8 → lokit/karttaseppa-katot-a-{pariisi,lontoo}-koe3).
3. **B3 Lontoon nostot ja esittelyt**: muoto on jo sama kuin Pariisissa; puutteet ja määrät (kysymykset, Commons-kuvat 8, generoitavat
   kuvat 10 + 5, nimiääniä 43) `docs/raportit/karttaseppa-b3-lontoo-nostot-20261110.md`, taulukko `_tyo/karttaseppa/b3-lontoo/matriisi.json`.
   Commons-kuvien haku 8 jutulle odottaa PT:n sanaa (selitteet = tekstiä).

## PT 01.0x (KK tarkisti omistajan päätöksiä vasten) — LUE ENSIN `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/b3-lontoo-nostot-tarkistus-20261110.md`
- **Commons-kuvat 8 juttuun (PT 00.5x: hae nyt, aineistoksi)**: Sonnet-agentti haki 01.0x (Wikimedia API sallittu, omistaja 5.11. 17.59,
  Raamattu 2.183) → `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/b3-lontoo/commons-kuvat/` (kuvat, LAHTEET.md, selitteet-luonnos.md).
  Tarkista kansio: jos tyhjä tai kesken, tee haku itse (ensin robots.txt erikseen, sitten API peräkkäin). Ei peliin ennen omistajaa.
- **EI Codexin kuvia Lontooseen** (omistaja 6.11. 20.41): saapumisen esittelykuvat ensin PELISTÄ (piirroskaupungin / kaupunkinäkymän
  kuvakulmat Mac-ajolla JU:n vuorolla); jos heikkoja, pari PT:lle. Generoitavat 10 + 5 pois listalta.
- **Nimiäänet Lontoolle Pariisin oton perässä**: nimilista (43) tekstinä valmiiksi ennen ottoa (sijainnit.json lontoo:*).
- **Tekstit kirjoitetaan ilman lupaa**: kysymykset (2 kirjoitettua / nosto, 2.218) ja kuvaselitteet luonnoksina NUMEROITUNA LISTANA
  KK:lle (local_d5f31591-21fa-4cb0-bab3-bcd3435d075a tai osoitekirjan mukainen tili), **Pariisi ensin** (11 nostoa 0+0, kadonneet 7,
  nostottomat jutut 11; ks. matriisi.json), sitten Lontoo (8 + 5 + 5). Raamatun tekstisäännöt: tekstit viestinä listana, ei korttiin.

## TYÖN ALLA / JONO (järjestyksessä)
a. **Koe3-kuvat JU:lta** → vertaa koe2:een samoilla rajauksilla (lähikuvat: viillot poissa?); parit PT:lle (≤ 1000 px) + 3 riviä.
   Jos viiltoja jää: ne ovat 6 %:n palautetuissa taloissa tai eivät ole T-liitoksia (vaihtoehto: alle 1 cm:n leikkausjäämät tai
   katon ja päädyn väli → lähikuvasta). Palautettujen talojen kierteen syy auki (`jaljita4.py <pickle> 1377`: (18,127,26) toistuu).
b. **Rypistymät sisäpihojen kulmissa**: koe3-ajo kirjoitti `$K/pariisi/palat-v23-katot-koe3.katot.pickle` (osm → kolmiot, päädyt, muoto);
   etsi talot, joilla eniten < 0,5 m²:n pintoja / eri normaaleja, piirrä ylhäältä varjostettuna (PIL), päätä korjaus.
c. Palakoko loppuun (lyhyiden < 2 m reunojen ala- ja ylärinne yhdeksi tasoksi), mittaa taulukolla kuten palakoko-koe2.md.
d. Uudet kuvat samalla rajauksella → parit PT:lle.
e. B3: PT:n vastaus määrälistaan (Commons-kuvat 8 juttuun; piirros-lontoo.json vasta kun Lontoon piirroskerros tulossa).

## Vahdit (viritä uudelleen)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, re-arm).
- Omia ajoja ei käynnissä. JU:lta odotetaan koe3-kuvat (ajot 7–8).
- Työlista: "Kaupungit koodilla: Pariisi ja Lontoo loppuun" tilanne päivitetty 00.5x.
