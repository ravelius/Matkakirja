# Pelikoodari: luovutus 1.11.2026 klo 16.25 (konteksti 25 %, pehmeä raja)

Edellinen: -20261101-1415 (sen Kesken 1 ratkesi: PT valitsi leivotun valon). Muistin tila: pelikoodari-tila-20261018-aamu.md.
Proto-worktree (ei originia): wt/proto-pelikoodari-kivi-216, haarat pelikoodari/kivi-216 (a1de2563d) ja pelikoodari/kivi-216b
(kärki **ad98dfc8f**, nyt checkoutattuna). Vanhat: wt/proto-pelikoodari-reitti-216 (5b77eee6a), wt/proto-pelikoodari-yhd-216 (f9e39c9a7).
Työkansio /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kivi-216/ (savykoe.zsh = sama jäädytetty kamera usealla QA-sävyllä + pintatieto).

## Valmista tässä vuorossa
- KIVETYS (PT 15.1x, VS:n jono 3): kujan lattia ruskea → havainteen vaalea harmaa. JuoksuKujaKiviSavy 0,58/0,50/0,45 → 1,06/0,98/1,00
  (kivijalka, jalusta, kujakiven pystypinnat kompensoitu ennalleen). a1de2563d, PT kuittasi, NS niputti runkoon 65ceff743.
  Leivotussa valossa 02: 169/144/121 → 231/203/187 (havainne 227/200/182). Aukio 03 ei ole kujakiveä (f-taihemen, Lattia) → ennallaan ±5 %.
  Kuvat: proto-3d/lokit/havainne-editori-20261101-152108/kivi-*.jpg, kivi-varimittaus.txt.
- RUNGON VALKOISET LATTIAT (PT 15.5x): 65ceff743:n koonti oli vertailuvalossa (oletus), jossa v6 leikkautui 255/251/245. Korjaus
  kivi-216b (65ceff743:n päällä): cc8b5ad92 kujakiven sävyt valotilan mukaan (Valopohja.PaivitaLeivonta: leivottu v6, vertailu v5 =
  ValoKohteet.*Vertailu), b92c7e398 JuoksuVertailuValo = false (PT:n päätös: leivottu valo oletukseksi), ad98dfc8f kommentti.
  tarkista.sh vihreä. 02 oletus (164 atlasriviä) 231/203/187, `valo vertailu 1` 206/179/161. Kuva havainne-editori-20261101-155731/
  kivi-02-leivottu-vertailu.jpg. NS:lle ja PT:lle ilmoitettu 16.2x.
- Marmorisuonitus (kujakiven kuvan ruskeat juovat) kirjattu LAV:lle havainnoksi, PT: ei nyt.
- VS: `valo vertailu`/`lattiavarjo` (PaivitaLeivonta) kirjoittaa QA:n `valo savy kujakivi` -ohituksen yli → savy skenaariossa niiden jälkeen.

## Kesken / seuraava
1. Odota NS:n kuittausta kivi-216b:n merge runkoon (juna 216). Jos NS raportoi ristiriidan (esim. Valopohja.cs), korjaa kivi-216b:ssä.
2. UUSI TALLENNE PT:lle, kun leivottu valo on rungossa (kivi-216b mergetty): zsh _tyo/pelikoodari/reitti-216/tallenne/aja-tallenne.zsh
   (taustalla Monitorilla, ~11 min). TARKISTA KAARI samasta kulmasta kuin 20261101-131815 (PT 15.4x; havainnot.md:n loppurivi); jos kaari
   yhä näkyy → rivi PT:lle. VS:n suukuvat leivotulla valolla (esikatselu-20261101-151221/suu-koonti.jpg) eivät näyttäneet kaarta.
3. RAKENNUKSET-V92 (LAV: v91 + edusta-v3), kun LAV toimittaa → RakennusKansio JuoksuSokkeloMaailma.Palatsi.cs.
4. Vanha: botin uupuminen / elinvoima-apu kuva-ajoissa.
Huom. varimittaus.py tarvitsee /opt/homebrew/bin/python3 ilman -I:tä (numpy käyttäjän paketeissa). editori.sh ajaa haaran kärjen vasta
jonon jälkeen (commit ajon aikana voi tulla mukaan). Pitkät ajot: nohup + Monitor (valmis- ja kuolemarivi).
