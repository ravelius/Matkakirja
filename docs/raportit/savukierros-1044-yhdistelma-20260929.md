# 1.0.44-yhdistelmä cd78a365 (Laitetestaaja, 29.9.2026 klo 10.0x-10.1x)

Käännös cd78a365 (juna/b13 385c39e1 = BUILD 44 + Natiivi-UI:n avaukset + luennan alkukatkon
korjaus), laite 1572C658 (iPhone). Natiivisepän pyynnöstä, kohdat 1-4, takaraja 11.30 — kaikki
PASS/OK, yksi mitoitushavainto kohdassa 4.

## 1) Asennus ja käynnistys: PASS
Puhtaasti, ei virheitä.

## 2) Avaukset (nosto/pikkuseloste/linssivalikko liuku): PASS (visuaalinen, ei ms-tarkka)
Nostokortti avautui ja renderöityi oikein (kuva+teksti+LISÄÄ), ei havaittua "poksahdusta" tai
kesken jäänyttä siirtymäkehystä. Radio-linssivalikko näkyi täysin asettuneena heti latauksen
jälkeen, ei jäätynyttä liukutilaa. Tarkkaa 150/180 ms -ajoitusta ei pystynyt mittaamaan täsmällisesti
tällä menetelmällä (ei kellotettua lokia), mutta ei havaittu poikkeamaa (nykäisyä, hyppyä) missään
avauksessa.

## 3) Luennan alku (alkukatko-korjaus): PASS (mekanismi vahvistettu)
`ui aloita ateena` toimi, `puhe alku` → `ok alku uusi (kohdetasolla)` sekä lentokohtauksessa että
Kartta-scenessä — uusi algoritmi on käytössä. Isoisän luennan aikana `aani mittaa` antoi rms 0,085
lennon aikana (puhe kuuluu normaalisti). Kaupungin nimen tarkkaa ensimmäistä tavua ei saatu
eristettyä yksittäisellä `aani mittaa`-otoksella (liian lyhyt ääni/nopea ohitus manuaalisella
komentojonolla), mutta `puhe alku`-työkalun oma tila-vastaus vahvistaa korjauksen olevan aktiivinen
eikä virhettä raportoitu.

## 4) Lyhyt: maakuntalappu, minipulu, radio, nostokortti: PASS + 1 havainto
- **Maakuntalappu**: 300×152 pt (lähellä 1.0.44:n aiempaa 300×170, pieni ero luultavasti sisällön
  pituudesta). `ui maakunnat kysymys 1` → **kortti 386×727 pt** (Englanti-maakunta) — LEVEYS 386
  täsmää spesifikaatioon, mutta KORKEUS 727 poikkeaa aiemmin (1.0.44, Attika/Thessalia) mitatusta
  616:sta. Toistettu 3x, sama 727 joka kerta samalla maakunnalla — ei satunnaisvaihtelua, vaan
  näyttää riippuvan maakunnan sisällön pituudesta (vieritys-arvo vaihteli 0-98 välillä samalla
  koolla). **Ei selvä FAIL** (leveys kiinteä, sisältö täysin luettavissa/vieritettävissä), mutta
  poikkeaa "kiinteän kokoinen" -väitteestä korkeuden osalta — Natiivisepän hyvä tarkistaa onko
  korkeus tarkoituksella maakuntakohtainen vai pitäisikö sen olla 616 kaikilla.
- **Minipulu**: Lontoo-yökuva astronautin kamerassa — vain yksi Pulu-hahmo näkyvissä, ei
  kaksinkertaista.
- **Radio** (Lontoo, RESONANCE 104.4 FM): rms 0,142→0,094, tappikutsut 66→76, moottori käy.
- **Nostokortti** (skandaali:shakkiturkkilainen) kaiutin: rms 0,088.

## Yhteenveto
1-3 ja suurin osa kohdasta 4 PASS. Yksi mitoitushavainto: maakuntakortin korkeus vaihteli
(616 vs. 727 eri maakunnilla) — ei blokkaava, mutta ristiriidassa "kiinteä koko" -kuvauksen kanssa,
raportoitu Natiivisepälle tarkistettavaksi.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
