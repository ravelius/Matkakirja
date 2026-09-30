# Natiivi-UI:n luovutus 30.9.2026 (ai), nollaus noin klo 13.5x

Jatkaa luovutusta (ah). Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto, master 191dbe8b (BUILD 71). Kaikki erani
ovat masterissa, eikä minulla ole avoimia merge-pyyntöjä. Omat worktreet on poistettu (proto-natiivi-ui-* ja natiivi-ui-pariteetti).
Simulaattorit: oma iPhone 17 FB234D08 ja jaettu iPad Pro 11 503000D1, molemmat sammutettu. PÄIVÄLLÄ 1 booted (Julkaisija 30.9.).
Käännös- ja simulaattorivuorot antaa Julkaisija NYT-viestillä. Kopioi .app talteen heti käännöksen jälkeen, sillä kopio ylikirjoittuu.

## Tänään tehty (kaikki BUILD 71:ssä, Laitetestaaja 2fd0e852b)

| Erä | Haara ja kärki | Sisältö |
|---|---|---|
| Pillerivalikko 1.0.56-palaute | pilleri-palaute-1056 8d00b0a0 | Napit kiinni ja 38 pt, äänet ylimpänä, [Matka, Aarteet, Linssit], 300 pt, Linssit ja Aarteet 232 pt, esikatselu omana ikkunanaan vasemmalla kuvan tai kuvakkeen kanssa, vaalea paperi (Kuviot.PergamenttiVaalea), tummempi teksti, Matkan muotokuva 64 pt, iPadin palkki 72 pt, valikkonapin nimen fonttisovitus |
| Matkakirjan kaistale | matkakirja-kaistale d8722953 | Linssiseppä 2:n 292a3d32 ja lisäksi: pikkukuvat heti (web renderFact) myös ilman luentaa, kermavalon alfa lineaarisesti kompensoituna (kartta kuultaa kuten webissä) ja lehden sääriviä rivittyy |
| Yläpalkki (omistaja klo 12.28) | ylapalkki-saari 71b327d9 | Dynamic Islandin kohta musta ja liukuma nahkaan (AsetaSaariMusta), pilleri ja logo 6 pt alemmas, palkki korkeampi, "1/80, aamu" ja rahat oikealla, iPadin palkki näkyy vaakana (pilleri yhdellä rivillä) |
| Kaupunkinimet (pariteetti 5) | kaupunkinimet 90779682 | Kapiteeli 0,14 em, koko × karttakerroin (NostoKerros.ZoomKerroin), nimibudjetti 40 → 6, nostonimien kaukoharvennus (Opus-agentti; Pallo.unity kirjain 13,5) |

Kuvaparit: proto-3d/lokit/natiivi-ui-p1056/parit, natiivi-ui-kaistale, natiivi-ui-ylapalkki/parit (lähetetty omistajalle).
Pariteettiraportti: docs/raportit/pariteetti-paapolku-20260930.md sisältää Päätoimittajan päätökset. Kohdat 1 ja 3 jätetään (natiivi
ensin ja tietoinen poikkeama), ja kohdat 2, 4 ja 5 on tehty. EI VERRATTU (kaappausongelma, uusittava): kohtaaminen ja visa
(`etsi-katko marseille` + `aloita` ei avannut), nostovisa ja kaupunkikortti (`napauta barcelona` kokeilematta). Webin
pariteettityökalussa ei ole kauppanäkymää.

## AUKI

- Ei avointa erää. Seuraavan kärjen antaa Päätoimittaja.
- Pariteetin uusinta: kohtaaminen, visa, nostovisa ja kaupunkikortti natiivista oikeilla komennoilla (skripti paapolku.sh).
- Silmänappi: EI tehdä. Se on webin kehittäjän maailmatilan "Pelaajan näkymä", ja omistaja siirsi sen natiivissa Asetuksiin.
- Linssit/-kansion hyppäävät pinnat (IhmisenNostokortti, Keksijakaruselli, Muut-paneeli) ovat Linssisepän jonossa linssitauon takia.

## TYÖKALUT (proto-3d/lokit/natiivi-ui-1035/skriptit/, kaikissa booted < 1 ja sammutus lopuksi)

- p1056.sh <UDID> <nimi> [app]: pillerivalikon näkymät.
- mk-kaistale.sh <UDID> <nimi> [app]: matkakirjan kaistale Pariisissa (uusi-peli 5 pariisi), auki, pieni ja auki.
- paapolku.sh <UDID> <app>: pääpolku kahdessa ajossa (aloitusruudut ja Marseille), 18 näkymää.
- ylapalkki.sh <UDID> <nimi> <app> [vaaka-only]: palkki pysty, kuvat, lehti, kaukaa (nipistys) ja vaaka.
- Web: Matkakirja-fable-checkoutissa `node tools/pariteettikuvat.mjs --koot 393x852 --kaupunki marseille --nakymat ...`.

## OPIT

- Lineaarinen väriavaruus: webin sRGB-alfa peittää natiivissa enemmän (0,70 näkyy noin 0,85:nä). Kompensoi kuten Matkakirjakortti.LineaarinenAlfa.
- UI Toolkitin ellipsis katkaisee, vaikka tilaa on. Käytä flex-shrink 0 ja laskennallista fonttisovitusta. Leveyssiirtymä ja labelin oma GeometryChanged
  aiheuttivat asettelusilmukan: aseta fontti seuraavaan ruutuun (memory uitk-fonttisovitus).
- zsh-funktiossa $2 on funktion oma argumentti. Tallenna laitteen nimi muuttujaan ennen K()-funktiota, muuten kuvat ylikirjoittuvat.
- iPadin vaakakaappaus tallentuu pystyraakana: käännä 90° kuvapariin.
- proto-kaanna.sh hyväksyy haarat +-merkillä, joten yksi käännös riittää usealle erälle.
