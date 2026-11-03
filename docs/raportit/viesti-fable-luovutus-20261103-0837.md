# PT:n luovutus 3.11.2026 klo 08.37

Edellinen: viesti-fable-luovutus-20261103-0530.md. Osoitteet: /Users/Shared/Claude/osoitekirja.md. Syy: konteksti 30 %.
Vahdit Monitorilla 30 min: /Users/Shared/Claude/hooks/codex-posti-vahti.sh ja odottajat-vahti.py (viritä uudelleen).
`date` ennen aikaleimoja. Levy 73 Gi (omistaja tyhjensi CoreDevicen 06.55; PT siirsi proto-3d/lokit vanhat T7:lle 06.3x,
skripti siirra-lokit.zsh: yli 90 min vanhat → T7 + symlinkki).

## OMISTAJAN PÄÄTÖKSET (KK 07.22 + 07.23, lokissa PR 6093 / 714c22931)
- Saapuminen: "Lataa jo siirtymän aikana ja silloin pelkkä sisään zoomattu kartta. Siinä ei voi kestää 30sek";
  07.23: lataus alkaa, kun pelaaja valitsee kohdekaupungin nopanheiton jälkeen. Työlistan rivi "Saapuminen ilman odotusta".
- Muistivika: juna 218 riittää (TF 217:ää ei korjata erikseen). Codexin jatkopyyntö tehty.

## SAAPUMINEN (tärkein kesken)
- NS esilataus valinnasta bf15af5a6 KUITATTU LOGIIKKANA (kylmä Lontoo 9,9 s, ei odotusta). EI junaan ennen beigen korjausta.
- Matkan beige (kamera jäi lähikorkeudelle) → NUI korjasi fc424d7c3 (nosto reitin mittakaavaan); NUI:n ilmaisin 3ff9b80e6
  (simussa nimi näkyi, PALKKI EI → uusi NUI jatkaa). NUI nollattu 08.3x (f77f26606, PR 6106).
- NS (nollattu 08.2x, 2129ab322): loppubeige 6–9 s (loppu-6-11s.jpg) pinon päälle → yhteinen kylmä Lontoo -video KK:lle
  (beigen aikaleimat viestiin) + rivi PT:lle. Sitten junaan 218 (NS-esilataus + NUI-ilmaisin + nosto).

## KARTTA
- Delta-perus 2026-09-30-pohja-20261015 oli poistettu 31.10. säästöpaketissa → julkaistun TF 217:n Z6–Z9 404. JU palautti
  08.05 (577 838, curl 200), KK:lle kerrottu. JU:lle oppi: ennen säästöpoistoa grep delta.perus-viittaukset.
- Tasangot: resepti 2026-11-03 {8, 0,06, pohjaM 3000, tavoite 0,05, maaM 400} KUITATTU (PR 6089 b4e622969); KS:n polttoketju
  käynnissä → delta → välitaso uudelleen → JU vie → NS vaihtaa osoitteen.
- Pariisi (Codex): hyväksytty 00, 03, 05 (v3), 06, 07, 10, 11. Palautettu 09 v2 (Champ de Mars katko) ja 15 (Vincennes
  litteä). Saumaliukuma (KS tarkistus/saumaliukuma.py) KUITATTU koonnin vakiovaiheeksi. Codexin jono 09 → 15 → 02 → 14.
- Välitason zoomikoe (Z10 + ristihäivytys) KORVATTU omistajan päätöksellä.

## LAVASTAJA (nollattu 08.4x, baa10ca31, PR 6103 JU:lla)
- Pronssit KUITATTU ja viety 07.40 (rakennukset v118, esto v38; kullatut leijonat Qianqingmen/Yangxinmen/Ningshoumen +
  Qianqingmenin vesiastiat). Junarivi 218 kirjattu. PK kytkee.
- Rivi 52 (havainne-erot) järjestys 1→3→2→4→5, jokainen pariksi PT:lle. Kohta 1 friisi (tausta v115 + osasarja v7) KUITATTU,
  punainen rako friisin ja konsolin välissä samaan pakettiin → leivonta → JU → editoripari → kohta 3. Kohta 4 ensin PK:n kanssa.

## PELIKOODARI (nollattu 08.1x, 7ea29506e)
- 218v paras (190/466). 218x hylätty. Runko 218y (218v + bf0e08217 + pronssit, alun napsautus 1a7c390e2) JU:lla.
  Syy yk s~35 + xf-alku: matalien salien varakorkeus 3,9 m katon sisällä → 218z 9cf0c1c2c koko sarja 218y:n perään.
  Mittari ei laske kiinni-odotusta. Odotetaan taulukko 218v/218y/218z.

## VALOSEPPÄ (nollattu 07.5x, 749506a97)
- Sauma ed80de917 ja tähdenlento tl6-b e49ac8999 (+ magenta bd3daf198) KUITATTU kokeina. Umbra: koko oikein, valotus väärin
  (_Log 0,003 kirkastaa penumbraa) → pim11 (_Log 0,003|0,03|0) JU:n jonossa → pari PT:lle, päätös kuvakäyrästä.

## TYÖLISTA
Aamukierros tehty 06.1x (26 pidossa-riviä; CLAUDE.md-karsinta valmis). Päivitetty: saapuminen, tasangot, Pariisi, pronssit,
juoksupeli, ISS, valo.
