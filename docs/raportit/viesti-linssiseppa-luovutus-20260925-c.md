# Linssisepän luovutus 25.9.2026 myöhäisilta (c)

*Linssiseppä (Opus, max). Kirjoitettu Fablen käskystä klo 23.0x (konteksti 71 %). Edellinen: viesti-linssiseppa-luovutus-20260925-b.md.
Jatkaja lukee tämän ja viesti-linssiseppa-aloitus.md:n.*

## Linjaus

Uusia linssejä ei aloiteta ennen pariteettia. Poikkeus on Ihmisen matka II (omistaja 25.9., vain natiivi, vapaat kädet).
Linssipariteetti on valmis (kierros 4: 0 avointa). Fable 25.9.: attribuutio kulkee aina aineiston mukana, joten CC BY -nimet
kirjataan lahteet.js:iin samassa muutoksessa kuin aineisto.

## Ihmisen matka II eräittäin (proto-haara linssiseppa/ihmisen-matka-2, worktree /Users/Shared/Claude/wt/proto-linssiseppa)

| Erä | Commit | Tila |
|---|---|---|
| 0–2 | 7e1d7480, f387c824 | junassa, build 16 |
| 4 äänimaisemat | 6d16dbe1 + korjaukset af3be0bb (kertojan poisto ei vaienna maisemaa, web sfx.enabled) ja 795c6629 ("Aloita alusta" soittaa, lopetus nollautuu, loki vaihdosta/saumasta/virheestä) | junassa 3506a19c (Natiiviseppä), todennettu af9515b5: 15 maisemaa, sauma ja ristihäivytys |
| 5a | 0ccd41da + 768783c0 (rintaman hehku näkyväksi) | junassa; aamunkoitto todennettu; hehku silti hillitty |
| 5b v2 | 65456d2f: kohteen jaksossa laskeutuminen 0,45 × saapumiskorkeus (2 200–4 000 km) ja 28°, kääre Ydin/Aikajana/IhmisenMatka2Ymparisto | junassa, 16/16 kohdetta 28° (iPhone) |
| loppukuva | ed684ce7: kaikki vanat hehkuvat (_Hehku.w) | junassa |
| 3 sumu | 8c3befc8 + 005ba109 (tasainen usvapohja, ei seutusumua avauksessa) | JUNASSA 49945738 (build 17), todennettu 5b92be07 |

**Erä 3, sumu** (Natiiviseppä hyväksyi Linssit-puolelle ehdoin: ei KarttaKerroksia eikä laattavarjostinta, vain II:n aikana,
kevyt, merge-pyyntöön A/B-kehysajat ja video). IhmisenMatka2Sumu + Pilvikuori + Pilvet.shader (_Hamara, _Keila*, _Tasainen,
oletukset pitävät astronautin ja lennon pilvet ennallaan) + Ydin IhmisenMatka2Sumukuva (3 testiä).
- Avaus: kolme kuorta (12 000 / 8 000 / 5 000 km), näkyvät vain lähestyessä; kamera syöksyy läpi (video 323fe559 ✓).
- Seutu: matala kuori 350 km jakson sävyllä, valokeilan valossa. 323fe559:ssä liian ohut (pilvikartan aavikoilla ei pilviä) →
  005ba109: _Tasainen 0,55, peitot ylös, avauksessa ei seutua (enintään kaksi kuorta).
- A/B levantti 30 s (323fe559): sumu päällä mediaani 16,7 / p95 18,2 / p99 50,0 ms / yli 33 ms 2,8 %; pois 16,7 / 18,2 / 49,3 /
  1,6 % (yksi näyte kumpaakin, simulaattori). Lokit proto-3d/lokit/ihmisen-matka-2-era3-sumu/ (mp4 4,8 Mt, kuvat).
- 005ba109 todennettu 5b92be07 (23.10–23.13): avauksessa seutu 0 ja enintään kaksi kuorta, kuoret ohittuvat laskeutuessa;
  seutu näkyy nyt (levantti 0,34 merisumu, beringia 0,42 jää-usva, chile 0,38 sadeusva), URP 0. Beringian usva on väkevä:
  omistaja arvioi TestFlightissa, säätö IhmisenMatka2Sumukuva.Seutu / SeutuPohja. Kuvat ja video: ihmisen-matka-2-era3-sumu-b/.

**Erän 5 loput (vapaat kädet):** hiukkaset (pöly valossa, lumi, soihdun lepatus: keilan kirkkaus värisemään), Amerikkojen
saattolento rintaman takana, Ken Burns havainnekuvaan (Natiivi-UI:n UI), tasatehoinen ristihäivytys maisemiin (nyt −3 dB
keskellä), rintaman hehkun halo (nelikulmio rajaa), aikahypyn pyörre näkyy vain hetken (lyhyt jakso). iPad-video puuttuu
kaikista II:n eristä.

## Linssien esilataus (Pelikoodarin Esilataaja erä 4, kohdat 6 ja 4; lupasin kytkeä itse)

Proto-haara linssiseppa/esilataus adca3817 (worktree /Users/Shared/Claude/wt/proto-linssiseppa-esilataus), junan ac0aaadc päällä,
yhdistyy II-haaran kanssa ilman konflikteja. LinssienEsilataus (Ydin, 4 testiä): Ihmisen matka I/II, keksinnöt ja astronautti.
LinssienEsilataaja: rekisterin Vaihtui → Kuvat.Esilataa koko kaarelle (SeuraavaRuutu), Kuvat.Hae kahdelle 1,5 s jälkeen;
Esilataaja.Joutilas → Ihmisen matkan kaari (TamaKaupunki). Todennettu 5b92be07: II kaari 20/täysinä 2, keksinnöt 26/2,
satelliitti 64/2, joutilaana kaari 20; kuvavälimuisti 263 → 346. JUNASSA 49945738 (build 17), kopio Pelikoodarille.
Jäljellä: radion nykyinen ja seuraava asema puskuroituna, avaruuslinssin topografia ±1 (Laattapalvelin.Esilataa), radiomastot
ja yövalot joutilaana. Merge-pyyntö Natiivisepälle, kopio Pelikoodarille.

## Seuraavaksi

1. Sumu (005ba109) ja esilataus (adca3817) ovat junassa 49945738 (build 17, Natiiviseppä 23.2x; Fablelle ilmoitettu).
2. Esilatauksen loput (radion puskurointi, topografia ±1, mastot ja yövalot) Pelikoodarin rajapinnalla.
3. Erän 5 loput (yllä) ja iPad-video II:sta (linssiseppa-iPad11 903C2B91).

## Muut

- Attribuutio #3244 mainissa: Ihmisen matka II:n 6 CC BY -äänitystä nimeltä lahteet.js:ssä ja README:ssä. Havainto: README:n
  kahdessa vanhassa Äänet-rivissä lukee yhä "CC BY-NC" (Siirtosepän inventaario).
- CC-nappi (build 16 -savu): savu avasi Ihmisen matka I:n, ei vika. Laitetestaaja ajaa II:lla uudelleen (0a8ba628a).
- Radiouudistuksen jono: uudistus vietiin loppuun build 13:ssa; odottavat linnut radion hämärään (uutta visuaalia, Fable) ja
  pariteettirivi 37 radio (121 px, hyväksytty poikkeama). Uusi: asemien puskurointi (esilataus yllä).
- Omistajalle: proto-3d/vapauta-levy-linssiseppa-20260925.sh (raa'at simulaattorivideot 1,7 Gt).

## Työtavat ja opit

- Ajoskriptit (session scratchpad): im2-apu.sh (UDID, APP, L; k/p/l-komennot odottavat edellisen kulutusta), ajo2/3/4.sh.
  Kertojan asetus kontin plistiin: `defaults write <kontti>/Library/Preferences/app.matkakirja.proto3d matkakirja-kertoja
  -string ei` sovellus kiinni (pelkkä verkkotunnus ei tavoita konttia; muisti natiivi-kehittajatila-defaults-write).
- Testikäännös vasta junan KÄÄNNETTY-rivin jälkeen (odottaja: vertaa `juna/b13`:n kärkeä juna-viimeisin.txt:hen).
- Kopioi .app heti KÄÄNNETTY-rivin jälkeen ja varmista metadatasta (grep -a uusi tunniste global-metadata.dat:ista).
- Esitys, joka avautuu muistista tutkimusvaiheeseen, kutsuu Loppua: pysyvät lopetusliput nollattava jaksossa.
- `git merge-tree --write-tree` ottaa commitit, ei puita: kolmen haaran koe väliaikaisessa worktreessä.
- Simulaattorit: linssiseppa-iPhone D0D2CD1E, linssiseppa-iPad11 903C2B91; vuoro Julkaisijalta, enintään 2 päällä, sammutus UDID:llä.
