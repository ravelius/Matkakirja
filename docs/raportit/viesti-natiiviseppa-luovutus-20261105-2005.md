# Natiivisepän luovutus 5.11.2026 klo 20.05 (konteksti 28 %, pehmeä raja, 7.37)

Korvaa -1924:n tilan. Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Cron "4 9 * * *" unity-julkaisut.py uudelleen (nollaus vie sen; tilinvaihto.md, roolitaulukko). Remote Control jätettiin kytkemättä: työkalu sallii sen vain käyttäjän pyynnöstä, ja pyyntö tuli Postivahdilta.

## Tila
Haara natiiviseppa/pallo-aloitus-219, työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto, peili natiivi-backup peili/proto/natiiviseppa/pallo-aloitus-219. Kärki fcba229ca (Valosepän b720cd2f2 poimittu d1867a55a:n päälle: siltalauseet-v5, kuittaukset-v3, nimet-v4, Pariisin kaupunki-intro-v2). Työpuu puhdas. PT 19.48 kuittasi fcba229ca:n junaan; kuittaus ei kattanut ääntä, siksi äänet todennettiin erikseen (alla). Ei iPadia, ei junaa nyt (omistaja 19.26: TF, kun Pariisi on valmis). Ajoja ei jonossa.
Testit kaanna.sh "Pallo|Opas|Pysahdys|LahtoLaatat|Kierros|Museo|Aloitusintro" 532/532, unity-tarkistus 0 virhettä. Koko testisarjaa ei ajettu.

## Äänet, todennettu Mac-ajoista fcba229ca (2752×2064, lokit lokit/natiiviseppa-*-fcba229ca, PT:lle kerrottu 20.0x)
- pallo-aani (Google): tervehdys äänipolulla, klippi 6,1 s (VS ilmoitti 5,911 s; ero selvittämättä), lasku 8,75 s, kerronnan ääni 6,15 s lähdöstä, ei tervehdyksen 404:ää. a1 ja g1 katsottu.
- pallo-lauseet2 (Ion): kuittaus kysymys-46 "Totta kai.", siltalause kuittaus-02 (@valinta) "Selvä, suunnataan sinne.", odotus-04 ja odotus-06. "Oppaan siltalause" oli aani: soivat -rivillä kysymyksen ja valinnan jälkeen. PUUTE 1 oli skenaarion: nimi on tarkoituksella hiljaa yli 30 km:n vaihdossa (SanoNimi, Siirtymassa).
- nimi: Rooma → Vatikaani alle 30 km: maa-VA "Vatikaani." ja jatko-alku-yhteinen-21 "Se odottaa meitä jo.".
- william (bussi Lontoo → Pariisi, oletus): intro EI lauennut, PUUTE 3. Sama Lontoossa uuden pelin alussa.
- william2 ("ui nousukoe pois" vain tässä ajossa): "William alkaa" v2-osoitteesta, klippi 3,9 s (tiedosto 3,801 s), loppui 3,96 s kuvien alusta. Lyhyys on odotettu, ei vika.
Ei todennettu: kuulokuva (ajo ei kuuntele; soivat-rivi ja lokit vain osoittavat lähteen).

## ODOTTAA PT:N SANAA (kerrottu 20.0x)
1. William ei laukea oletuskulussa: AloitusintroTulossa vaatii alkulennon tai !NousuKoe tai ettei SaapumisZoomausta ole (PeliOhjain.Aloitusintro.cs:22); NousuKoe = true (TraileriLiike.cs:182). 250 viime ajon unity.log:ssa 0 riviä "aloitusintro tulossa", ainoa on william2. Omistajan "kaikki äänet peliin" ei siis kata Williamia, ellei PT toisin päätä. Ei muutettu.
2. "opas kysy Mikä tämä rakennus on?": kysy-vastaus Ei (2,6 s) ja "kappale tekstinä (ei ääntä vastauksessa)". Syy selvittämättä. Ei muutettu.
3. Puhekuvake oranssilla päällä-napilla: kontrasti 1,34:1 (a1 ja g1 mitattu), ohut musteviiva. Sääntö on kaikille linsseille yhteinen: ohjausnappi.uss, .mk-valittu > .mk-ikoni, kirjain, --tk-paperi-muste, omistajan linjaus 20.10. Suositus PT:lle: päällä-tilan kuvake ja kirjain vaaleaksi paperivärillä; tekijä PT tai NUI. Ei muutettu.
4. Musta kartta lokit/julkaisija-pariisi-kyltit-013655981/kyltit-eurooppa.png: lähes varmasti kuvanoton harha, ei latausviive. Kuva otettu ElavaKameralla kerros-tilassa (ElavaKerros: pääkamera pois, Esikatselu valitsee ylimmän käytössä olevan Base-kameran). Saman näköisiä: tikkaat p-z13, aloituslento-b2 k79; tikkaat4 (komento pallo kerros pakota taysi) s5-z13: kartta näkyy. Ei todistettu: miksi pohjavaihe ei piirrä kuvanotossa, eikä laitteen ruutua kerros-tilassa. Varmistus seuraavaan Pariisin ajoon: "komento pallo kerros pakota taysi" ennen aja 48.853 2.335 18 2, yksi kuva.

## Avoinna edelleen (-1924:stä)
Latausajan vaihtelu 15,71 vs 20,0 s (PT 19.2x). Haamu: 0,24–0,25 s:n limitys, täysi poisto odottaa PT:n sanaa. iPad: hystereesi, häivytys ja äänet nähty vain Macilla.

## Mittarit ja skenaariot
_tyo/natiiviseppa/pallo-aloitus/: puhe.py, portti.py, valinta.py, korjaus.py; uudet skenaariot sk-pallo-aani.txt, sk-pallo-lauseet2.txt, sk-nimi.txt, sk-william-intro.txt (oletus, intro ei laukea), sk-william2.txt. Ei omaa ajoa ilman JU:n vuoroa.
