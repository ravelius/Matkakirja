# Linssisepän luovutus 24.9.2026 klo 04

*Linssiseppä (Opus) porttaa web-linssit natiiviin (Unity 6.3 + Cesium). Jatkaja lukee tämän ja
tarvittaessa edellisen luovutuksen viesti-linssiseppa-luovutus-20260923-ilta.md sekä inventaarion
natiivi-linssit-inventaario-20260923.md (päivitetty 23.9. yöllä).*

## Sitovat säännöt (Fable 23.–24.9.)

- **Web on oletus.** Linsseihin ei tehdä mitään, mitä webissä ei ole (myöskään poikkeamia), ilman
  Fablen/omistajan lupaa. Todisteena iPad-kuva webin kuvan rinnalla.
- Fablen käskyt ovat sitovia Raamatun sisällä; omistajalta kysytään vain Raamatun listaamat asiat.
  Lupajärjestelmän estot raportoidaan Fablelle täsmällisesti.

## Työtilat ja testit

- Proto `/Users/Shared/Claude/proto-3d/Matkakirja-proto` (master = Natiiviseppä, hän mergeää ja kääntää).
- Oma worktree `/Users/Shared/Claude/wt/proto-linssiseppa`; uusi erä `git checkout -B linssiseppa/<aihe> master`.
- Web-lukuun `/Users/Shared/Claude/wt/linssiseppa-webmain` (`git pull --ff-only`).
- Testit: `Linssit-testit/kaanna.sh` (199/199), `Linssit-testit/unity-tarkistus.sh` (0 virhettä).
- Laitetesti (iPad-vuoro Natiivisepältä, lopuksi "iPad pois"): `Linssit-testit/laitetesti.sh
  kontakti|radio|isoisa|… <kansio>`. **Tarkista kuvien päiväys**: devicectl kopioi Documentsin
  vanhatkin kuvat. `kontakti` käynnistää nyt sovelluksen itse. Webin vertailukuvat:
  `proto-3d/lokit/kontakti-web/`.
- Linssiloki (Documents/linssi-loki.txt) kirjaa nyt kamera-ajot sekä ihmisen matkan musta/valot-kutsut.

## Masterissa (kärki 3afad75)

| Erä | Sisältö |
|---|---|
| radio-avplayer, radio-syy, radio-toimii, radio-tauko, radio-omistaja | Radio soi iPadilla (RaBe → Vostok, ei PFS). Diagnoosi virheessä, toimii-kenttä (v24), tauko, webin näyttörivit, RadioVirta-omistajalukko (linssi voittaa lehden mediarivin) |
| isoisa-1873, isoisa-rajaton | Isoisän linssi erä 1 (rajat, nimet, GPL-aineisto ämpärissä), rajaton 23a-pohja. **Erä 2 puuttuu: ei webissä, odottaa omistajaa** |
| astro-oletus, pelikerrokset | Astronautin reliefi 0,8; nappula ja pisteet piiloon linssiportin ajaksi. Astronautti = web iPadilla |
| lentopilvet | LentoPilvet.Instanssi (Natiiviseppä kytkee lennon vaiheisiin) |
| linssiportti, portti-kytkenta | Web linssikarttaEstaa: Liiku/Matkusta/Tutki/lehdet kiinni ihmisen matkan, keksintöjen, topografian ja satelliitin ajan |
| linssimusiikki | ILinssiYmparisto.LinssiMusiikki/Himmennys → Pelikoodarin Aanisoitin (hän kytkee) |
| maakayrat-kytkenta | Vertailun maakäyrät geometriana (550 osaa = web), Natiivi-UI piirtää |
| tiedeliite, tiedeliite-sisallys | Keksintöjen tiedeliitteen sisältö ja koukut, Sisallys(), Pysakkeja |
| ui-toiveet | AloitaAlusta, LinssiTiedot.Kesken |
| kaarikamera, aikajana-web, esitys-hyppy, esitys-loki, kuvan-piste, aikaselain | Webin sovitaKaareen (perspektiivi), kamera-ajot lokiin, hyppy sytyttää valot, IhmisenMatkaKerros.KuvanPiste, aikaselaimen moottori |

## Merge-pyynnössä

- **linssiseppa/korkeussovitus 0896ad4**: keksintöjen loppukamera sovittaa kapean ruudun korkeuteen
  (web korkeuteenSovitus): 9 065 km → 4 940 km. iPadilla vielä todentamatta.

## Aikaselaimen sopimus Natiivi-UI:n kanssa

Web `js/linssit/aikaselain.js` on pelkkä pinta, joten nauha (viivat, aallonTaso, veto) on Natiivi-UI:n.
Moottori on minun (masterissa 95dd4d9):
- `IhmisenMatkaLinssi.AikaselaimenPisteet()` → (Id, Otsikko, Vuosia) jaksojärjestyksessä.
- Veto: `Esitys.Esikatsele(osuus 0…1)` (hiljainen tauko, pito pois, kello ja vanat seuraavat).
- Irrotus/napautus: `Esitys.Valitse(id)` (käynnissä → jatkuu, tauolla → pysyy tauolla, lopun jälkeen kelaus).
- Vuositeksti: `Esitys.SelaimenVuositeksti(vuosia)`; nykyinen `Esitys.I`, veto kesken `Esitys.Selataan`.
- Webissä nauha vain ihmisen matkalla; ◀▶ poistuu sieltä, kun nauha on valmis.

## Kesken

1. **Aikajanalinssit = web** (Fablen jono): iPad c04167c:llä keksintöjen loppu on lähellä webiä
   (palkki, loppusanat, valot, karuselli); kamera oli vielä 1,4× kauempana → korkeussovitus 0896ad4.
   Ihmisen matka Levantissa on nyt vaalea ja kuva soikiona (tumma oli Natiivi-UI:n aloituslaatikko).
   Seuraavaksi uusi kontaktiajo, kun 0896ad4 ja Natiivi-UI:n aikaselainnauha ovat laitteella, ja
   vertailu webin kuviin (keksinnot-1873, keksinnot-loppu, ihmisen-matka-levantti).
2. Pysakkiajo.Pelaaja (X-toive kapealle ruudulle) on kytkemättä: web käyttää pelaajan kaupunkia.
   Kytke LinssiOhjaimesta, jos kuvassa kaaren X-keskitys poikkeaa webistä.
3. Linssien taustaäänten väistö AaniTilasta (Pelikoodarin erä 3 masterissa?) ja tiedeliitteen raita
   Natiivi-UI:n näkymästä (JuttuSuljettu kutsutaan).
4. Ihmisen matkan tutkimusvaihe ja muisti porttaamatta (web ihmisen-matka-tutkimus.js, -muisti.js),
   ihmisen matkan tiedeliite (nostot, lyhytAjoitus, väripilkku).
5. Isoisä 1873 erä 2 odottaa omistajaa (ei webissä).

## Seuraavat

Fablen järjestys: aikajanalinssit loppuun (kohta 1), sitten linssit yksi kerrallaan samalla kaavalla
(web on oletus, iPad-kuva todisteena): topografia, vesistöt, vertailu/maatiedot, radio UI:n kanssa.

## Tila 24.9. klo 07 (tauko, Fable)

Kesken 1–4 tehty: aikajanalinssit = web iPadilla (tummennus, valot, reikä, pistekerroin, X-toive), tutkimusvaihe + muisti + ihmisen tiedeliite + `ihminen tutkimus` masterissa; topografia ja vesistöt = web (vesistöt: natiivin yhtenäinen uoma, Fablen päätös); vertailu/maatiedot = web, MaaKartta korjattu (7aca1d5, varmistuskuvat lokit/maat-20260924-7aca1d5 katsomatta); radio: web- ja iPad-kuvat otettu (kontakti-web2/kontakti-radio-*, maat-20260924-7aca1d5/kontakti-radio-*), vertailu aloittamatta (iPadin kaksi radiokuvaa samankokoisia → tarkista). Webin vertailukuvat: Linssit-testit/kontakti-web.mjs (KIINTEA=topografia|vesistot|maat|radio).
