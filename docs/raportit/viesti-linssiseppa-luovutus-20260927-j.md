# Linssisepän luovutus 27.9.2026 (j) — Linssiseppä (Opus, max) = myös Mallinseppä

*Sessio 7ea9f18e (session id local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4), 26.9. klo 23.1x – 27.9. klo 01.5x. Edellinen -i.md
(historia), -h.md. Fable local_5df52e10-10e4-4b72-9554-0049db300dfe, Natiiviseppä local_674b9ec4-e2f3-48e9-a810-a129f20a4f03,
Natiivi-UI local_44392b3c-86ee-4873-9d76-82f9aaa6b832, Karttaseppä local_eec7f158-d9f3-4b93-9368-c50935bd19ab.
SendMessage-raja (10/vuoro) täyttyy → varakanava mcp__ccd_session_mgmt__send_message session id:llä.*

## REBASE 01.4x (Natiiviseppä: natiiviseppa/kategoriamallit ddd9b867 = juna 52ea3d10 + liioiteltu perspektiivi + maastokorjaus)

Uudet kärjet: mallinseppa/pohja **2b8f6dcd**, mallinseppa/kategoriat3d **cc235dd5**, mallinseppa/kategoriat3d-b **5a51c3e1**,
mallinseppa/tiger-moth **7b1bf9b9** (kaikki unity-tarkistus 0; merge juna/b13 + merikoristeet puhdas). Alla mainitut vanhat
SHA:t (d7a38f75, 43ce36bd, dba69a3c, f7db782d) ovat ennen tätä rebasea. Klo 02 käännös ottaa uudet kärjet (haaranimillä).

## OMISTAJAN PÄÄTÖKSET 27.9. klo 01.4x (Fablen kautta) = JONO

1. **Erikoismallit MSM + Stonehenge + Colosseum HYVÄKSYTTY → 1.0.28-junaan.** Merge-pyyntö Natiivisepälle, KUN 1.0.27 on
   TF:ssä: proto-haara `mallinseppa/pohja` d7a38f75 (worktree /Users/Shared/Claude/wt/proto-mallinseppa; pohja
   natiiviseppa/kategoriamallit 24c40888; sisältää Nostokortti.Avattu-mergen 1a46986d, ajajan ErikoismalliElavat ja liikeytimen
   ErikoisLiike + testit). Rajapinta §4 puhuu mallikohtaisista haaroista — kysy Natiiviseppä, riittääkö yksi haara.
   Kun Natiivisepän maastokorkeus (alla) on junassa, maatason osien 0,006-nosto (MsmMaataso, ShMaataso) voi palata nollaan.
2. **Seuraavat 3 erikoismallia samalla tyylillä** (3 kerrallaan omistajan tarkastukseen, kuvat + video kulma ja versio
   kuvaan): listan (docs/raportit/arkkityypit-paletti-animaatio-20260926.md §3, "ensimmäinen sarakkeessa") seuraavat maat
   Italian jälkeen: **Espanja = Segovian akvedukti, Saksa = Brandenburgin portti, Alankomaat = Kinderdijkin myllyt.**
   Kaava: speksi docs/raportit/erikoismallit/<avain>.md (pohja erikoismalli-speksi-pohja.md, kohta 0 ELÄMÄNIDEA, viitekuvat
   Commonsista PD/CC) → malli Kartta/Erikoismallit/<Avain>.cs (ErikoismalliApurit, Rekisteroi, KokoKerroin 1.5f, osat
   LiikkuvaOsaMaaritys, liikeydin ErikoisLiike tarvitsee avaimen tapaukset) → esikatselu → käännös → laitekuvat.
   Tarkista noston id ja paakartalla-tieto proto-3d/lokit/loydos160-karttavalot-main.json (Colosseum-opetus: paakartalla false
   → Kaupunki = "<kaupunki>" maamerkiksi).
3. **Kategoriasymbolit oikeina 3D-esineinä: suunta oikea → hio kaari + vuori loppuun ja tee loput 12 samoin**: Tahti,
   Tiimalasi, Salama, Tulivuori, Vesi (aallot), Tassu, Kellotorni, Ruoka (malja + leipä), Vaaka, Ratas, Ankkuri, Kiekko
   (enum Kategoriasymboli). Proto-haara `mallinseppa/kategoriat3d` 43ce36bd (A: kärkiväri) ja `mallinseppa/kategoriat3d-b`
   dba69a3c (B: kärkialfa 0 = seepiaramppi). Tiedostot Kartta/Kategoriamallit/{Kaari,Vuori,KategoriaApurit}.cs, rekisteröinti
   RekisteroiKategoria (rajapinta proto-3d/lokit/mallinseppa-rajapinta.md §5: Runko ≤ 800, Lod1 ≤ 200, ei jalustaa, ei
   liikettä). Kolmiot kaari 410/196, vuori 338/60. Kuvamerkit assets/nostotyypit/merkki-*.png (ilme ja yksityiskohdat).
   - **A/B KÄYNNISSÄ klo 02.00** (ajastettu taustalle): käännös `juna/b13+mallinseppa/kategoriat3d-b+linssiseppa/merikoristeet`
     (.app $S/mallit3-app) → ajo VAIHEET 1,4,5,3
     → kuvat /Users/Shared/Claude/proto-3d/lokit/mallinseppa-laite-20260927-c/ (lahi-<olympos|parnassos|taygetos|thermopylai|
     sounion>-<40|75>-<0|27|55>.png, kat-*.png). Vertaa A-kuviin mallinseppa-laite-20260927-b/ (laitteella A-kivet
     harmahtavia, kuvamerkki lämmintä seepiaa). Valitse A tai B ja kerro Fablelle yhdellä rivillä.
   - Vuori ei näkynyt Olympoksella: Natiiviseppä korjasi (natiiviseppa/maastokorkeus c581b2ba, `symbolit maasto 0|1`), mutta se
     menee ristiin kategoriamallit-haaran kanssa (Komennot.cs, Tasot23.cs, Symbolimallit.cs) → hän yhdistää ensin; rebasetaa
     mallihaarat sen jälkeen.
   - Kivet ja saumat: erilliset kivet välein (KsSauma 0,022) + musteydin sisällä → tummat saumat; kaarikivien kavennus
     kiven keskustaa kohti (bugi korjattu a91fe51c/693cb7d0).
4. **Meri: isompi koko — valas ja laiva noin 1,5–2 × nykyisestä, suihku näkyväksi pelikoossa → uusi kuvasarja omistajalle.**
   Proto-haara `linssiseppa/merikoristeet` (worktree /Users/Shared/Claude/wt/proto-linssiseppa): TEHTY 68560569 (laiva 39 pt,
   valas 50 pt, reitti ±0,35, siirrot 170 / −110 pt, suihku 0,026), mukana klo 02 käännöksessä ja ajossa (VAIHE 3) →
   kuvat mallinseppa-laite-20260927-c/meri-* → koosta ja toimita omistajalle (merikuvasarja v3). Jos suihku ei vieläkään
   erotu, harkitse tummempaa reunaa tai isompaa pilaria.
5. **Lento v3** (1.0.28): mallinseppa/tiger-moth f7db782d odottaa Natiivisepän integraatiota (viesti lähetetty 01.4x:
   TigerMoth.cs, TigerMothKone.cs, LennonV3.cs + 11 testiä). Vastaa hänen kysymyksiinsä.

## Työkalut ja käytännöt

- Käännös: /Users/Shared/Claude/proto-3d/tyokalut/linssiseppa-ajot/kaanna-jono.sh <nimi> "<haara+haara>" (proto-kaanna.sh
  jonottaa lukkoa, .app kopioidaan $S/<nimi>-app/; S = session scratchpad — päivitä polku). Natiivisepän lupa ajaa itse;
  yksi käännös kerrallaan, ikkuna :00–:15, rivi Karttasepälle ennen ja jälkeen.
- Laiteajo: ajo-mallit.sh (APPNIMI, VAIHEET 1 käynnistys, 2 erikoismallit, 4 kategoriat Kreikassa, 5 kategoriat lähellä,
  3 meri, 9 sammutus; L-kansio skriptin alussa). Booted < 2 ennen aloitusta, omat UDID:t D0D2CD1E (iPhone) ja 903C2B91 (iPad).
- Kuvat omistajalle: koosta.py <kansio> <ulos> <versio> (kulma ja versio kuvaan, omistajan sääntö 27.9. klo 00.2x).
- Esikatselut ilman Unityä: tyokalut/mallinseppa-esikatselu/ (erikoismallit), tyokalut/kategoria-esikatselu/ (kaanna.sh
  kategoriat → kat.py/kat2.py; W-polku skriptissä osoittaa proto-mallinseppa-lento-worktreehen), tyokalut/meri-esikatselu/,
  tyokalut/tigermoth-esikatselu/.
- Worktreet: proto-linssiseppa (merikoristeet), proto-mallinseppa (pohja), proto-mallinseppa-lento (nyt kategoriat3d-b /
  tiger-moth vuorotellen). Enintään 3.
- Toimitettu omistajalle: /Users/Shared/Claude/proto-3d/lokit/mallinseppa-toimitus-20260927/.
