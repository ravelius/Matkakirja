# Linssiseppä: luovutus 9.10.2026 klo 16.1x (konteksti 71 %, PT:n nollauskäsky)

Rooli: Linssiseppä (Opus, high). Proto-worktreet:
- `/Users/Shared/Claude/wt/proto-linssiseppa-astro-auto`: ajotyökalut, todistusajo.sh. Haara vaihtelee, nyt `linssiseppa/esilataus-173`.
- `wt/proto-linssiseppa-kaupunkiaanet`: haara `linssiseppa/soundly-173`.
- `wt/proto-linssiseppa-nykyintro`: haara `linssiseppa/nykyintro-173`.

Pääreposta käytössä on `wt/linssiseppa-intro-arvio` (PR #4300 auki, poista mergen jälkeen `tools/uusi-worktree.sh --poista linssiseppa-intro-arvio`). Simulaattori on 00CF62C2 (T7). Simuvuoro pyydetään aina Julkaisijalta. Kuva-arkit ajetaan aina tuoreella .app-kopiolla: `proto-3d/lokit/linssiseppa-app/<nimi>.app`, ja kaannos.txt tarkistetaan.

## Junat

- **172** (julkaistu): kamerakorjaukset `alue-esittely-172` 11408f46f (viisto katse, alueiden esittelykorkeus, nopea lento kaaressa, Orsay, avauksen kierto, kohdekaari ≥ 30°) ja Steam Audio -testi a13a6bac8. Kaikki BUILD 172:n masterissa (1c2ecbe32).
- **173** kuitattu:
  - `diag-siivous-173` 79dd01c90
  - `tukholma-muodot` 6c3e385b6
  - `esilataus-173` 2b9ba3189 (nopean lennon esilataus samalta radalta)
  - `kaupunkiaanet-173` 5fe96a74d (pallon kaupunkiäänet v1 + satamavesi; kellot ja kahvila vain lähellä lähdettä; tasotesti kertojan alla)
- **173, odottaa PT:n kuittausta** (lähetetty PT:lle 16.0x):
  - `linssiseppa/nykyintro-173` bf0017f1b: Pariisin nykyintro. Mukana Pelikoodarin 2ae1b0e1a ja NUI:n NytRivi c3270b673. Kori pois nykyotoksista. Linssit 1219, Peli 432, unity 0.
  - `linssiseppa/soundly-173` f5088ce94: Soundly-erä 1 kaupunkiaanet-173:n päällä, korvaa 5fe96a74d:n. 1224/1224, unity 0. Ei vielä kuunneltu.
  - **Kun PT kuittaa:** SHA:t Natiivisepälle yhdellä viestillä.

## Docs

- Mergetty: #4282 (kuva-arkki 1), #4286 (nykyintron kuvakäsikirjoitus), #4292 (C5 OSM-referenssi, kuva-arkki 2 ja arvio 2).
- Auki: #4300 (intron kuva-arkki beb3fe9d, arvio ja musiikkilinjaus). PT mergeää.

## Kesken ja seuraavaksi (jono)

1. **C5 v2:** odottaa PT:n päätöstä. Codexin C5 on eri rajaus kuin pelin kamera (noin 2,5× lähempänä, lännestä). Jos PT hyväksyy, Sisältökirjuri tilaa uuden referenssillä `proto-3d/_tyo/linssiseppa/nykyintro-20261009/c5-sommittelu-osm.png`. Ohje: koko kuva-ala kuten referenssissä, Notre-Dame pienenä keskellä alhaalla. Linjaus: Googlen laattoja sisältävää pelikuvaa EI anneta generoinnin pohjaksi (PT kirjasi).
2. **Pelikoodarin puhdas tuuli** `aanet/pallo-tuuli-soundly-v1/` (tuuli-puhdas-01/02, 50 s stereo, −23 LUFS, Voima-säädin): kytke, kun se on 200. Nykyinen tuuli tulee kaupunkiäänimaisemasta (KaupunkiAanimaisema.TuuliMaa/TuuliYla). Kaksi kerrosta eri vaiheeseen. Tasotesti `AanitasotKaikissaKaupungeissa` (tuuli + sade ≥ 10 dB kertojan alla).
3. **Simulla kuunneltavaa:** Soundly- ja kaupunkiäänet (agentin lista: `opas tunti 11.99` kirkon vieressä, Tukholman laiturit, pariisilainen aukio). Ääni vain natiivikaappauksella, ei kaiuttimia.
4. **Uusi intron kuva-arkki** korin korjauksen (bf0017f1b) jälkeen ja, kun C5 v2 tulee, skenaario `proto-3d/tyokalut/linssiseppa-ajot/sk-nykyintro-pariisi.txt`. Erillinen ajo: ohitus noin 10 s:ssa.
5. **Tukholman kuva-arkki** korjatulla skenaariolla (`sk-kohtaus-tukholma.txt`: nimetyt odotukset ja "Puhuu → Lentaa", 6 pysähdystä): Vasa ja Skansen tarkistamatta.
6. Notre-Damen lähilento (kohtaus 4b), kun LR:n malli on hyväksytty. Kuninkaanlinna myöhemmin.
7. Steam Audio -mittaus vain laitteella (simulaattorikäännöksestä poissa, MATKAKIRJA_EI_STEAMAUDIO) ja AirPods-päänseuranta: vaatii omistajan luvan iPad-testeihin.
8. Avoinna PT:lle: `vaki-sisatila-sorina` myöhemmin (taidemuseo ja sisätilat). Soundlyn torvet 01–02 soivat lähilaiturissa, vaikka ne on äänitetty kaukaa.

## Tärkeät havainnot tältä päivältä

- **Lentoaikoja ei pidennetä** kuvan nopeuden takia (omistaja 13.1x). Nopea lento nousee kaaressa (`OpasKuvaus.NopeusRho`, ≤ 1 rad/s), ja rampit ovat 9 s:n S-käyrät.
- **Pelin kehysluokka** tulee workerin luokasta. Tuntematon luokka ja koko ≥ 300 m tarkoittaa aluetta.
- **Opas-linssi pitää musiikin pidossa.** Intro soi pidon ohi (Pelikoodari 35393b309). Hidas kappale soi loppuun, minkä jälkeen musiikki palaa pitoon (PT).
- **Kuva-arkkiskenaarioissa** yleiset regex-odotukset ("opas: saapui") täyttyvät heti vanhoista riveistä. Käytä nimettyjä odotuksia.

## Omat ajot

- Skenaariot: `proto-3d/tyokalut/linssiseppa-ajot/`. Vanhat yövalodiagnoosit ovat alikansiossa `vanhat/`.
- Ajo: `ajo-yovalot-diag.sh <app> <sha8> <skenaario>`. Käännös: `proto-kaanna.sh <haara>[+haara] 00CF62C2-2FE6-4993-8475-5786CC40A7A3`.
- Simu on sammutettu (16.0x), eikä taustalla ole ajoja tai agentteja.
