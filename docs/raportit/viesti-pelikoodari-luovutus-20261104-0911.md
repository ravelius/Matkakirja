# Pelikoodari: luovutus 4.11.2026 klo 09.11 – lähitaso pois (KK 09.00), c4a:n reittiajo JU:lla

Korvaa -0858:n kohdat "Odottaa 1" (ovikamera) ja "Ovikameran vika"; muu -0858:sta voimassa (rungot, JU:n iPad-sarja, 1af126155, viivat). Syy: Postivahdin nollaus. Polut kansiossa /Users/Shared/Claude/proto-3d/. Tulokset `lokit/pk-muistipiikki-219/TULOS.md`, lue 09.03 alkaen.

## Päätetty
- **KK 09.00: lähitaso 35b001311 ei junaan.** Koerunko pysyy c4a5bfafb. JU:lla ei ole 35b-ajoja jonossa. Poikkeaman 2.177:stä (kamera kulkee oviaukon läpi) KK kertoo omistajalle ennen TF-pyyntöä.

## Todettu
- **0,30 s:n ylitys:** de60baf01 (be56:n haara ilman 218:a, ei läpikulun kattoa eikä a31589350:tä) kulki seinän yli 3,46 → 3,86 m. 349e ja eec oven alta 2,21 m, ei peittoa. KK:lle ja PT:lle kerrottu.
- **Uudestaan-nappi c4a, Mac:** lento 4/4, QA-uudestaan ei lentoa, Ohita t 4,55 ei jää päälle. JU:n rivin 5 ja 2 olivat aja.zsh:n laskuvirhe (korjattu). Oikea kosketus ja laite todistamatta. KK:lle, PT:lle ja JU:lle kerrottu.
- **KATTO AJETTU c4a ei vastaa:** Puyi ei mennyt juhlasaliin (`keisarin halli 0` 0 riviä). Sama 35b:n sa:ssa, joten "sa 0 peittoa" ei koske salin ovea; eec 6/6, 349e 5/6. Epäily ajoitushajonta, ei todistettu. KK:n viesti 09.10 oli vielä sen jonossa; PT:lle ja JU:lle lähetetty.

## Odottaa
1. **JU, rivi "REITTI AJETTU c4a5bfafb":** Mac-jonossa viimeisenä lav-leivonta6:n jälkeen (`pk-reitti-c4a.zsh`). `aja-runko.zsh` ja `sk-reitti.txt` saivat 09.09 osan xf (botti, taso 0, juhlasalin ovi; testaamatta; vanha `sk-reitti-ennen-xf.txt`). Tulos `_tyo/pelikoodari/peitto-reitti/c4a5bfafb/`.
   **Tee sitten (KK 09.00):** katso ylitys (uu, kohta noin 2,5–3,3 s) ja juhlasalin ovi (sa, jos meni saliin; muuten xf). **Jos jompikumpi näyttää sisuksen tai täyttää ruudun, kuva KK:lle.** Katso myös katon poisto kuvista (2.177). Kirjaa runko TULOS.md:hen, rivi KK:lle ja PT:lle. xf:ää verrataan be56:n xf:ään (0,94 s).
2. **JU:** iPad-sarja c4a ja 1af126155, kuten -0858:ssa.
3. **Viivat:** kuten -0858:ssa, `mika` JU:n Mac-vuorolla.

## Muistiinpanot
- zsh: `git show ${a}:polku`, ei `$a:polku` (`:A` on muunnin). `grep -a` lokeihin, joissa on ääkkösiä.
- SendMessage vaatii roolille nimen ja refin ListAgentsista; KK:lle `local_d5f31591-…`.
