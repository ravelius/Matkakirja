# Natiivisepän luovutus 5.11.2026 klo 19.24 (konteksti yli 25 %, pehmeä raja, 7.37)

Korvaa -1855:n tilan. Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Cron "4 9 * * *" unity-julkaisut.py uudelleen (nollaus vie sen; tilinvaihto.md kohta 2). Remote Control jätettiin kytkemättä: työkalu sallii sen vain käyttäjän pyynnöstä, ja pyyntö tuli Postivahdilta.

## Tila
Haara natiiviseppa/pallo-aloitus-219, työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto, peili natiivi-backup peili/proto/natiiviseppa/pallo-aloitus-219. Kärki d1867a55a. Työpuu puhdas. Ei junaan, ei iPad-ajoja. Ajoja ei jonossa.

## Odottaa
PT:n vastausta d1867a55a:n pariin (viesti jonossa 19.24, ei kuitattu). PT oli hyväksynyt 520cae03f:n ja perunut sen napeista, joten hyväksyntää ei ole tällä hetkellä. Ääni odottaa KK:n kuittausta ja Valosepän vientiä; sen jälkeen puhe.py.

## Commitit tässä erässä
- 265fa7a20: avaustauko pois tervehdyslaskusta (vain Pariisi), rinnakkainen esilataus.
- 520cae03f: rinnakkainen esilataus pois (ei lyhentänyt latausruutua), latauskuvan häivytys 1,1 s → 0,2 s vain tervehdyslaskussa (OpasSovitin.SiirtymaNopeaHaivytys), mitattu kesto lokiin "latauskuva häipynyt".
- d1867a55a: nappirivin porras vaihtuu vasta yli 3 pt:n muutoksesta (PysahdysKatse.NappiAlaPortaittain, testi NappirivinPorrasEiVariseRajalla).
Testit kaanna.sh "Pallo|Opas|Pysahdys|LahtoLaatat|Kierros|Museo" 522/522, unity-tarkistus 0 virhettä. Koko testisarjaa ei ajettu.

## Mittaukset (Mac, yksi ajo kustakin, aika valinnasta, lokit/natiiviseppa-pallo-*)
| ajo | koko | data | latausruutu | lasku | perillä | napitala-vaihtoja |
| esilataus2-d12a5d046 | 2752×2064 | Google | 15,8 s | 8,70 s | 26,86 s | 180 |
| nopea2-265fa7a20 | 2752×2064 | Google | 16,15 s | 8,68 s | 24,9 s | 51 |
| haivytys-520cae03f | 2752×2064 | Google | 15,71 s | 8,68 s | 24,45 s | 171 |
| napit-d1867a55a | 2752×2064 | Google | 20,0 s | 8,63 s | 28,7 s | 2 |

Ajon d1867a55a latausruutu on 4,3 s pidempi (yleiskuvan laatat ≥ 95 %: 9,52 s, edellisessä 6,71 s). Viimeinen commit ei koske latausta, mutta syytä ei varmistettu; ero voi olla verkon tai palvelun vaihtelua. Siksi yhden ajon perillä-lukua ei voi pitää luotettavana. PT:lle kerrottu.

## Nappirivi (omistajan 17.52 vika 2)
Syy on ruudun koko, ei Google eikä commit. 2752×2064: raakaluku noin 46 pt on 4 pt:n pyöristysrajalla, ja korin levon pieni väre vaihtoi 44 ↔ 48 (40–228 vaihtoa, myös Ionilla nopea-265fa7a20: 166). 2420×1668: 24 pt, 2 vaihtoa (korjaus-7d719ae76, lauseet-6fc1cda8b). Vian korjatuksi todenneet ajot oli ajettu vain pienemmässä koossa. Väreen tarkkaa lähdettä ei selvitetty.
Ajossa d1867a55a napitala 48 pt, 0 vaihtoa Puhuu-vaiheessa. Napit samalla korkeudella a1:ssä, g1:ssä ja g2:ssa (katsottu 2000 px leveinä, alkuperä 2752). Mittari: _tyo/natiiviseppa/pallo-aloitus/korjaus.py.

## Muut selvitykset (kerrottu PT:lle)
- Haamu: lasku alkoi 1,1 s:n häivytyksen alla. Korjaus luovutuksen -1855 väitteeseen: limitys ei johdu tauon poistosta, vaan sama 1,1 s oli aiemmin tauon sisällä. 0,24–0,25 s:n limitys jää, eivätkä kuvat näytä sitä; täysi poisto (häivytys mustan kautta tai pallo pois ensin) odottaa PT:n sanaa, ei tehty.
- dt-piikit noin 1 s: kaikki kolme alkavat heti kuvanoton jälkeen (a1, g1, g2), eli ne tulevat ajon kuvista.
- ArgumentOutOfRangeException skenaarion alussa: Unity-editorin haun käynnistysindeksointi (SearchInit.IndexationOnStartup), ei pelikoodia eikä ajotyökalua; ei korjausta.

## Ei todennettu
- iPad: hystereesi ja häivytys nähty vain Macilla koossa 2752×2064. Mac valitsee kartan tasot 640×480:sta, joten laitteen latausajat voivat olla pidempiä.
- Tervehdyksen äänipolku: ajot kulkevat tekstipolkua (ääni 404).
- Häivytyksen liike-tuntuma: kuvat ovat pysäytyskuvia.
- Nappirivin yksi hyppy ilmestyessä (68 → 48 pt, ensimmäisessä ruudussa rivin leveys ei ole tiedossa) jätettiin; sama hyppy oli jo 7d719:ssä (48 → 24). Ei korjattu.

## Mittarit ja skenaariot
_tyo/natiiviseppa/pallo-aloitus/: portti.py, puhe.py, valinta.py, korjaus.py; skenaariot sk-pallo-haivytys.txt, sk-pallo-napit.txt. Ei omaa ajoa ilman JU:n vuoroa.
