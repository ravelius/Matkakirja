# Pelikoodari: luovutus 3.11.2026 klo 04.07 – juna 218

Edellinen: -20261103-0347 (196d9f2a3): KK:n linja (yksi koottu paketti), PT:n hyväksymisehto (arkissa ei yhtään seinä- tai
kattoruutua), maalit valtaistuimen eteen sk3-*.txt:ssä – voimassa, ellei alla toisin. Syy: konteksti.
Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara pelikoodari/kapea-reitti-218 (paikallinen), kärki **7b99e6a1d**.
Runko **sali-218q 037611303** (= kärki + piirtajat-218 b51e69a8b). Peli-testit 802/802, unity-tarkistus 0 virhettä.
(218o f03f7dea9 ja 218p 1aa90d59c välivaiheita, ei ajeta.)

## Tehty tässä vuorossa (kaikki kamerasuojaa, DroneNosto.KameraSuoja + JuoksuV4Maailma)
- **7cc8fdb34** läpikulussa suojan vaakavara 0 (vain kameran piste) + testi KameraSuojaLapikulussaVainKameranPiste.
- **63db78bee** läpikulun katto kameran ensimmäisessä ruudussa suoraan kohteeseen: saliajojen alku (~0,5 s) alkoi 6,4 m:stä ja laski
  5 m/s portin palkiston läpi (th/ty/cx/yk/xf rivi 1.1–1.3).
- **71f723e4e** purkautuva veto ei vie kameraa massan läpi (paluu pysähtyy lähimpään vapaaseen kohtaan rintaa kohti) + testi
  KameraSuojaPaluuEiMassanLapi (hylkää vanhalla koodilla). xf 4.5 ja b2.4: koko ruutu tummaa.
- **7b99e6a1d** suoja ei vedä läpikulun alapinnan alla (hy ≤ raja + 0,3; veto purkautuu jousella). Syy taso1b9:n syylokista:
  kujaportti-3:n aukon 1 m:n ruutu on massaa maasta 4,8 m:iin (pieli ruudussa), kamera aukon keskellä → veto keisarin päälaelle.
- Havainnot: sali-218b/salit-218l-havainnot.md (th tj ty cc xf), tallenne-218t/taso1b6-havainnot.md (taso1b8, taso1b9).
  Arkit (8×6, 2 kuvaa/s, rivi.sarake): sali-218b/arkki-{033818-th,034309-tj,034802-ty,035214-cc,035629-xf,035629-xf-b}.jpg.
  Teko: `ffmpeg -i X-v3.mp4 -vf "fps=2,scale=400:300,tile=8x6" -frames:v 1 arkki.jpg` (ei drawtext-suodinta).

## Tulokset (218l / 218m / 218n)
- Valtaistuin OK tj ty cc xf (uudet maalit; Puyi edessä koko kierroksen + Maali-kortti). th: salissa EI valtaistuinta (maali ennallaan
  −109.13,407.77) – tarkista, kuuluuko th:lle valtaistuin (SaliSolmuDiag).
- taso1b8 (218m): laattareuna f4c11adf8 toimii, ei yhtään "rakennusmassassa"-riviä. Vedot jäljellä vain läpikulussa (→ 7b99e6a1d).
- ys KAATUI 218l:llä (levy 14 Gi < 15), ei vielä ajettu.

## Avoimet
1. JU:lle pyydetty (04.07 + 04.08): L1 `RUNKO=pelikoodari/sali-218q zsh …/sali-218b/ketju8s.zsh yk cx tj ty th xf cc ys`,
   L2 `zsh …/tallenne-218t/ketju-taso1b10.zsh` (218q). Jono odottaa levyn siivousta (PT) ja NS:n muisti-A/B:tä.
   Tarkista arkit: seinä-/kattoruudut, valtaistuin, PIILOSSA, ettei Puyi kierrä valtaistuimen taakse; taso1b10: kujaportti-3 (s 26) ja s 68.
2. SEURAAVA KORJAUS jos 218q:n arkeissa yhä: xf:n ovisarjassa vedot 4,2–4,4 m (kamera 1,5 m:iin keisarin selän taakse) läpikulun katon
   ULKOPUOLELLA (ovikatos, alapinta < PorttiMinAla 2,5 tai sivuseinät eivät täytä ehtoa) + ovipalkki puolessa kuvassa (xf 3.4, 5.5,
   6.5, b1.5). Vaihtoehdot: läpikulun tunnistus matalille ovikatoksille (PorttiMinAla) tai kameran laskeutuminen ajoissa oven eteen.
3. cc 1.2 kattotiilet reunassa (~1/4 kuvasta) – katso 218q:lla.
4. Yksi koottu paketti KK:lle vasta, kun kaikki 8 + tason 1 alku puhtaita. 5. Arkiset hahmot (Codex). 6. VS:n sade (koe). 7. Siivoukset.
