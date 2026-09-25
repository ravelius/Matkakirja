# Natiivi-UI:n luovutus 25.9.2026 (o), klo 15.06 (päivitetty 15.2x)

Jatkaa luovutusta (m). Proto-git: `/Users/Shared/Claude/proto-3d/Matkakirja-proto` (paikallinen). Build 14 kulkee
juna/b13:n kautta, ja Natiiviseppä mergeää. Työkopio: `/Users/Shared/Claude/wt/proto-natiivi-ui-sisallys`. Merge-pyyntöjen
selostus on yhdessä tiedostossa: `proto-3d/lokit/pariteetti-b12/merge-pyynto-natiivi-ui-b13-11-41.md` (osio per erä), ja
kuvat ovat kansiossa `proto-3d/lokit/pariteetti-b12/b13o/`.

Omistajan build 13 -löydökset: `docs/raportit/omistajan-loydokset-b13-20260925.md` (haara claude/bold-ride-vow4ki).
Merkitse valmis rivi sinne ("→ KORJATTU <sha>"), jos Fable ei tee sitä. Tätä ei ole vielä tehty.

## Mergetty juna/b13:een (build 14)
- avauskaaro-11, maapilleri-41, vaakunat-72, mittajana-63 (kohdekartan mittakaavajana)
- linssipuhelin-k3 (virtanapit piiloon esityksen ajaksi ≤ 600 pt, selitteen nimilappu ✕:n vasemmalle)
- linssi-ipad-k3c (vertailun pilleri keskelle, linssi kutistaa päiväkirjan lapuksi ja palauttaa)
- avaruus-96 (astronautin chatin portti, minipulun sarake/koko/leijunta, näppäimistö, ↑ pois käytöstä, otsikkopilleri
  turva-alueen alle)

## Merge-pyynnössä Natiivisepällä (todennettu iPhonella, merge-tree ok)
- natiivi-ui/nimiolukko-106 4f79430d: Natiivisepän patch ja mittari "MATKAKIRJA nostot: kylkivaihdot vedossa N" (5 vetoa, 0).
  Sisältää pelikoodari/nosto-nimio (93), koska samaa tiedostoa muutetaan. Video b13o/video-b13-nimiolukko106-iphone-pieni.mp4.
- natiivi-ui/matkakirja-86 c931ab2b: 86 (tunnelmarivi pois), 87 (lappu "Ateena, elokuussa 1873 🔊" → "Ateena 🔊",
  tekstin levyinen kaikilla laitteilla), 97 (kutistus rivi kerrallaan, myös astronautin selite tekstin kokoiseksi) ja
  iPadin lapun kaiutin.
- natiivi-ui/ylapalkki-88 3aca5217, natiivi-ui/chat-91 02c9a50d, natiivi-ui/avaruus-96b fe98c37e.
- natiivi-ui/liuska-92 19e6dd53 (kaupunkiliuska 1,4 ×), natiivi-ui/kehittaja-103 1da2bfc7 (Maailma-kytkin myös KEHITTÄJÄ-osaan,
  Kehittäjä-osaa ei kuvattu), natiivi-ui/maakunnat-105 6ef4985c (lista vain nykyisestä maasta).
- natiivi-ui/paljastus-c16b 30db4207 (C16 regressio: Saapui seuraavaan ruutuun Perilla → AsetaLykkays -kutsun jälkeen,
  Pelikoodarin havainto). EI KÄÄNNETTY. Pelikoodari todentaa ja lähettää merge-pyynnön.

## Seuraavaksi (omistajan löydökset, Fablen jako)
- 81/83 (aloitusnäytöllä ei yläpalkkia/logoa/☰; lennolla yläpalkki ja pulu pois + Ohita-nappi alareunassa) yhdessä
  Natiivisepän 84–85:n kanssa (haara natiiviseppa/aloituslento-84). Olen pyytänyt häneltä API:n
  `PeliOhjain.OhitaAloituslento()`: ++ajoTunnus, Lentoaani(false) ja sitten AloituslentoPerilla(saapumisKaupunki). Odota
  sha:ta. Kuuntele AloituslentoAlkoi/AloituslentoPaattyi (PeliOhjain.Aloitus.cs). 85: paperikortti ja teksti "Ateena,
  päivä 1" ovat Saapumiskortti (ui saapumiskortti).
- 82 (valinnassa yläpalkki pois), 89 (matkakirjan väri oikea alusta asti), 90 (isoisän kuvat isommiksi iPadilla,
  kaiutin näkyy), 94 (koko ruutu -nappi toimimaan, ulkoasu webistä; todennäköisesti kohdekartan KOKORUUTU), 102 (noston
  kuva koko ruudulle liian pieni).
- Lennon alapalkin teksti ("Kone nousee. Isoisän kirja aukeaa sylissäni…") jää ruudun alareunaan laskeutumisen jälkeen
  (Pelikoodarin havainto, Aloitus.LentoKirjoitus). Tämä kuuluu erään 81/83.
- Avustat: 85, 101 (maalehtien tahmea vieritys), 108.
- Linssisepän havainto 96 b: minipulun käytetty pilleri jää virran yläpuolelle. Webissä pillerit vierivät pois (web
  ankkuroi kysymyksen yläreunaan tyhjällä tilalla ja vapauttaa sen, vapautaTila). Tämä on tekemättä.
- Sisältökirjuri 95: miniatyyrit ovat alfallisia. Uudet 6 kohtauskuvaa sisältävät tarkoituksella taustan. Jos vanhat
  rakennusleikkaukset (esim. ateena-akropolis.webp) näyttävät natiivissa taustallisilta, vika on ImageIO-purussa
  (Kuvat.cs). Tarkista.

## Hyväksytyt poikkeamat (Fable)
Rivit 40 ja 31/41 Liiku (turva-alue), 31 iPhonella (löydös 73: lappu pelkkä nimi), 13 ja 40 (löydös 74: palkki), 13 iPad
(ei webin karttakehystä), ✕ (löydös 32), radiopaneeli peittää iPadin maakyltin (sama kuin webissä), C11 = SAMA.

## Opit
- Linssikomennot kulkevat linssi-komento.txt:n kautta ("linssi keksinnot", "esitys alusta", "ihminen tutkimus"), ja
  UI-testit ui-komento.txt:n kautta ("ui linssi matka aloitus", "ui linssi kuva pulu", "ui lippu ROU", "ui nahtavyydet
  bukarest", "ui chat <kysymys>", "ui matkakirja auki", "ui linssi selite kiinni").
- Käännöspalvelun lukko on hakemisto (kuka, pid). Välimuistin kanssa käännös kestää 2–4 min, ja jonossa odottavan saa
  tappaa ja jonottaa uudelleen yhdistetyillä haaroilla.
- `git rebase` toisen roolin haaran päälle, kun oma haara on juna/b13:ssa, kopioi junan commitit. Käytä
  merge + cherry-pick.
- Ylakerroksella (LinssiUi.Ylakerros) ei ole turva-aluetta, joten UiKerros.Reunat palauttaa 0. Käytä LinssiUi.Kerros-reunoja.
- rgba-teksti vaalenee UITK:ssa (lineaarinen sekoitus), joten käytä läpinäkymätöntä sekoitettua väriä.
- Simulaattorin launch heti bootin jälkeen voi epäonnistua ("No such process"): yritä uudelleen 5 s:n välein.
- Simulaattori FB234D08 on sammutettu, ja ääni on Scarlett, kun kukaan ei käännä.
