# Pelikoodari: luovutus 09.11.2026 klo 02.01

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (pehmeä raja 25 %). Edellinen: `git show origin/pelikoodari-luovutus-20261108-2310:docs/raportit/viesti-pelikoodari-luovutus-20261108-2310.md` (1f/1g/1c, kohdat 2 ennallaan).
Työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu, haara pelikoodari/juoksu-223 (natiivi-backup), kärki 451519f87.

## 1. d2 ovikuva (KK 9.11. 01.5x, omistaja 27.10. "kasvot heti tutuksi") – TOTEUTETTU 451519f87, KUVAT PUUTTUVAT
- Löydös: Mac-kuvat pk2 0cc5ac36c: iPad vaaka kasvot näkyvät (d2a KK:lla, kelpaa); iPhone pysty ovi kuvan ulkopuolella. Syy: kurkistuksessa
  kamera ~12 m keisarista, kenttä kapenee ~39°:een (myös laitteella, horisonttisääntö), pystykuvan vaakakenttä ~19°. Vanha testimalli 65° oli väärä.
- Sääntö (KK: yksi kaikille koille, ≥ 1,2 s): JuoksuAvaus.OviKuva/OviNakyy/OviViipymaS/Kuvasuhde/OviKuvaKentta/KameraPaikka; JuoksuV4Maailma
  avauslohkossa katse oven puolelle + kenttä levenee (KurkistusRajaus) paino × tarve (0 kun kasvot jo kuvassa → iPad vaaka ennallaan).
  Kaarron viive OviViipymaS = 0 kaikilla koilla (mitattu iPhone pysty 1,28 s, iPad pysty 1,30, iPad vaaka 1,60, iPhone vaaka 1,72). 874/874, unity 0.
- iPhone pysty: kenttä levenee ~39° → ~70° 1,2 s:ssa (KK:lle kerrottu, arvioi videosta). Profiili: OVI_PROFIILI=1 ./kaanna.sh Taso1OveltaHetiKujalle.
- JU:lla jonossa: proto-3d/_tyo/pelikoodari/juoksu-223/sk-d2-ovikuva.txt (iPhone pysty, iPhone vaaka, iPad vaaka). TEE: katso d2a–d2c + video
  (kasvot ja keisari kuvassa, ei hyppyä kentässä), sitten kuvat KK:lle; KK hyväksyy → junaan 223 PT:n kautta.

## 2. Skenaario-opit (tallenne)
- Tallenteen aikana avauksen kello (unscaledDeltaTime) kulkee ~4–5 × peliaikaa (odota-peli) nopeammin → avauksen kuvat sidotaan lokin
  tapahtumiin oleta-uusi:lla heti, ei odota-peli-ajoilla. iPhonen tallenne hidas: oleta-uusi-aikarajat ≥ 400 s.
- Avauksen aikaiset säännön tapahtumat tyhjennetään (JuoksupeliNakyma 1253), joten avauksen seinäpysähdys ei näy "seinan edessa" -rivinä.
- "ui juoksupeli kaanna" piilottaa peukalorenkaat (mPeukaloOhjattu) kuten pelaajan pyyhkäisy.

## 3. 1g-pari VALMIS (PT katsoi 01.5x)
- pk-1g-sivuseina-ennen-84a91d530 (sk-1g-sivuseina-ennen.txt) vs pk-1g-sivuseina-a7004996e: sama kohta a (S 22,8), ennen-puoli pysähtyy S 36,3,
  korjaus juoksee. Ohjainten ero = skenaario (PT:lle selitetty). PT vie KK:lle.
