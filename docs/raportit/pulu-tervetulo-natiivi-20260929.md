# Pulun ISS-tervetulo natiivissa (web #3575): merge-pyyntö

*Linssiseppä 29.9.2026. Speksi: docs/raportit/pulu-tervetulo-natiivi-speksi-20260929.md. Päätoimittajan käsky 29.9.: tervetulo
natiiviin webin mukaan, taulu tervetulon jälkeen; Raamattu #3602 (avaus ja sulku animoiden) koskee myös taulua ja tervetuloa.*

## Haara

Proto `linssiseppa/pulun-tervetulo` **5b3acd53** (laitekäännös bab6ba34 = master 634be415 + haara, 29.9. klo 10.10). Pohja on master c7c5b8e7 + linssiseppa/pulun-taulu 9750340f (nyt masterissa)
+ natiivi-ui/avaukset 3621d00d (Ponnahdus-apuri). Yhdistyy masteriin 634be415 puhtaasti. Avaukset on mergettävä ensin, tai
samassa junassa.

| Tiedosto | Muutos |
|---|---|
| Linssit/Ydin/Astronautti/PulunTervetulo.cs (uusi) | Tilakone A1–C2 webin aloitaPulunTervetulo mukaan: repliikit, äänitteet, kestot ja vakiot (PulunIss). Ajastimet kulkevat ympäristön kellosta, joten testit ajetaan ilman Unityä. |
| UI/Linssit/PulunTervetuloNakyma.cs (uusi) | Unity-kytkennät: Pulu.Sano versioiduin äänittein, ohitus napautuksesta tai näppäimestä joka ruudussa (Input System, UI-juurten kaappausvaihe, pallo), muisti PlayerPrefsissä, mykistys, esilataus ja testikomento. |
| Linssit/Ydin/Astronautti/AstronauttiLinssi.cs | Aloitustila (laskeutumisen aikana sen päätepiste), KatsoKohteeseen (B2) ja PalaaAloitukseen (C2 ja ohitus). |
| Linssit/Unity/AstronauttiKerros.cs | KohdeRuudulla: havaintopiste ruudulla, josta kuvanäkymä kasvaa esiin. |
| UI/Linssit/PulunTauluNakyma.cs | Taulu odottaa tervetulon, ja Pulun napautus ohittaa sen (web liviaPuhuu). Avaus ja sulku Ponnahduksella avaajan (Pulu, minipulu, Näkymät) suunnasta; sulkeutuva taulu ei enää toimi. |
| UI/Linssit/Kuvanakyma.cs | Avaus ja sulku Ponnahduksella kohteen pisteestä. Sulkeutuva kuva ei ota kosketuksia. LuentaEste: selitettä ei lueta Pulun puheen päälle. |
| UI/Linssit/LinssiKomennot.cs | `ui linssi tervetulo [tila\|aloita\|ohita\|pura\|nollaa]` |
| Linssit-testit | PulunTervetuloTestit (10) ja AstronauttiLinssiTestit.TervetulonKamera…; kultaiset/pulu-iss.json webistä (tee-pulu-iss.mjs). |

## Mitat webistä (kultaiset/pulu-iss.json, origin/main c911053ee)

- Jakso A1 14,32 s · A2 12,16 · B1 8,32 · B2 6,96 · C1 10,32 · C2 11,12 (kesto sisältää 1,0 s:n lopputauon). Äänitteet ovat
  versioituja ämpäriavaimia (erä pulu-16f2c04e9e19bef41d64; A2 ca095f4d3132/pulu-ad4d6fcc55d7dd86e8ac).
- Musta verho pois + 900 ms → A1 (kysely 250 ms, katto 20 s). Repliikkien väli 400 ms. Toimien varakello 1500 ms äänitteen
  alusta. Repliikin varakello kesto + 2000 ms.
- B2: pyöräytys Venetsiaan (45,44, 12,332) 2000 ms äänitteen alusta, liuku 2600 ms. C1: Saharan silmän (richat) kuva 250 ms:n
  kohdalla. C2: kuva kiinni ja paluu 3080 ms:n kohdalla, liuku 2780 ms. Ohituksen paluu 700 ms (vähennetyllä liikkeellä 0).
- Muisti `matkakirja-pulu-astro-tervetulo`. Mykistys = Kertoja pois tai Pulun taso 0. Vähennä liikettä → vain A1–A2.
- Avaus ja sulku (Siirtosepän webin arvot, Ponnahdus): mittakaava 0,92 ↔ 1. Auki 220 ms cubic-bezier(0.22, 0.9, 0.24, 1) ja
  läpinäkyvyys 180 ms cubic-bezier(0, 0, 0.2, 1). Kiinni 200 ms cubic-bezier(0.4, 0, 1, 1) + 40 ms.

## Poikkeamat webistä

1. **Selitettä ei lueta Pulun päälle.** Webissä C1:n väärä kuva käynnistää selitteen luennan (satelliitti.js lueSelite) Livian
   puheen päälle, ja C2:n ääni estyy (soitaLivianAani vaista, puhujaAanessa). Omistaja 8.9.: äänet eivät saa mennä päällekkäin.
   Natiivissa luenta on estetty tervetulon puheen ajan (Kuvanakyma.LuentaEste). Webiin sama korjaus (Pelikoodari; ilmoitettu
   Päätoimittajalle). Webin savuke ei näe tätä, koska se katkaisee puhepalvelun.
2. **Aloitusnäkymä.** Web seuraa ISS:ää avauksesta asti, joten C2 palaa asemaan seurannan kanssa. Natiivin avaus ei seuraa asemaa
   (vanha ero, ei tämän erän), joten C2 palaa avauksen lepokorkeuteen samaan kohtaan kuin laskeutuminen.
3. **Kuvanäkymä kasvaa kohteen pisteestä** (Raamattu #3602). Webin kuva avautuu vielä ilman animaatiota.

## Testit

- Linssit-testit 423/423 (uusia 11) ja unity-tarkistus 0 virhettä (ios ja editori).
- Laitekierros 29.9. klo 10.11–10.21 (ajo-tervetulo.sh, iPhone D0D2CD1E ja iPad 903C2B91, Kertoja päällä): **9/9 PASS
  molemmilla, 0 poikkeusta.**
  1–5. Koko jakso A1–C2 ja toimet [pyorayta rappaise palaa]; lopuksi kuva kiinni ja kamera aloitusnäkymässä. Taulu avautuu
     itsestään tervetulon jälkeen (avaa:automaatti), eikä selitettä luettu jakson aikana (lokissa ei "kuvaselite luetaan").
  6. Toinen avaus: tervetulo ei ala (muisti kuultu), ja taulu avautuu heti paljastuksen jälkeen.
  7. Napautus kuvaan C1:n aikana: tervetulo Ohitettu [pyorayta rappaise ohitus:napautus], kuva kiinni ja kamera takaisin.
  8. Pulun napautus A1:n aikana: tervetulo Ohitettu ja taulu avautuu Pulusta (kehykset iphone-8b/8c: kasvu ja sulku avaajaan).
  9. Kertoja pois: tervetulo ei ala eikä muistia kuluteta (mykistetty).

## Havainnot (eivät estä mergeä)

- Natiivin avaus on Marseillen (pelaajan paikan) yllä, joten B2:n pyöräytys Venetsiaan on lyhyt. Webissä avaus seuraa ISS:ää,
  ja pyöräytys on pitkä (vanha ero, sama kuin poikkeamassa 2).
- iPadilla Pulun kuplat ovat piilossa kuvanäkymän ajan (Natiivi-UI:n Pulu.Peita, minipulu-korjaus). Webissä ne näkyvät
  himmeinä kuvan takana, joten C1:n kupla ei näy natiivissa kuvan ollessa auki. Ratkaisu kuuluu Natiivi-UI:lle.
- Kuvanäkymän kehys kasvaa esiin heti, mutta NASAn kuva latautuu noin 0,4 s myöhemmin (verkko). Tämä on vanha käytös.

## Kuvat

Kansio proto-3d/lokit/linssiseppa-laite-20260929-tervetulo/. Siellä ovat web | natiivi -parit `pari-<laite>-<n>-*.png` (1 A1,
2 B2 Venetsia, 3 C1 väärä kuva, 4 C2 paluu, 5 taulu), natiivin lisätilanteet 6–9 ja videot (B2–C2, taulu Pulusta).
Webin kuvat on otettu ajo-tervetulo-web.mjs:llä (sama avaus kuin webin savukkeessa astro-pulu, Marseille).
