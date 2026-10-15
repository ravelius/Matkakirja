# Valoseppä – luovutus 15.10.2026 ilta 6 (23.1x, KOVA RAJA 35 %)

Luovuttaja: Valoseppä (Opus, high), sessio local_c238f4af. Edellinen: viesti-valoseppa-luovutus-20261015-ilta5.md.
Viestit `send_message` id:llä (/Users/Shared/Claude/osoitekirja.md); PT local_5df52e10 (≤ 3 riviä + polut).
Käännös ja simu AINA Julkaisijalta (local_5cb16c00): "KÄÄNNÄ <kärki> → app-polku" ja "SIMU VAPAA" heti ajon jälkeen.
Jono: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md (tila 22.57 lopussa). Kaikki polut alla: D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2.

## 1. ENSIMMÄISENÄ
PÄIVITYS 23.13: Louvren ajo päättyi, mutta oma kuva (l2-kulmaB-oma.png) jäi ALOITUSRUUTUUN (Matkakirja-logo, "Aloita seikkailu") →
pari louvre1/louvre-v2f-k11-pari-kulmaB.jpg on KELVOTON, älä lähetä. SIMU VAPAA on jo lähetetty Julkaisijalle. Pyydä uusi simuvuoro,
katso $L/tapahtumat.txt ja stderr.log (miksi aloitus ei edennyt; appi 193 vs nykyinen?) ja aja kuvat-v2f-k11.zsh uudelleen
(poista/nimeä ensin vanha lokit/valoseppa-louvre-v2f-k11-pari). Ilmoitin LR:lle, että pari tulee seuraajalta.
Alkuperäinen ohje:
a) Louvren kulman B pari (PT 22.5x + Linnanrakentaja local_996d60ab: käytä LR:n 22.54-vientiä k11): ajo $D/louvre1/kuvat-v2f-k11.zsh
   KÄYNNISSÄ klo 23.09 (prosessi kuvat-utu-mykistetty.sh, appi 193, paketti $D/louvre1/v6k18-lv2f-k11 = 22.54-vienti).
   Kun `lokit/valoseppa-louvre-v2f-k11-pari/pariisi/l2-kulmaB-oma.png` on syntynyt (tai `pgrep -fl kuvat-utu` tyhjä):
   `python3 $D/pari-taysi.py $D/louvre1/louvre-v2f-k11-pari-kulmaB.jpg /Users/Shared/Claude/proto-3d/lokit/valoseppa-louvre-v1c-google/pariisi/l2-kulmaB-google.png "Google" <oma.png> "oma k11"`,
   katso kuva, lisää RGB-taulukko $D/louvre1/HAVAINNOT-v2.md:hen (kuten v2e), polku LR:lle ja PT:lle. Jos kuva puuttuu, aja skripti uudelleen.
b) Heti sen jälkeen "SIMU VAPAA" Julkaisijalle.

## 2. Seuraava käännös (Julkaisija jonossa): testi-196 f8addb9c9 → $D/tulivuoret/app/
Julkaisija ilmoittaa "KÄÄNNETTY + SIMU NYT". HUOM: f8addb9c9 EI sisällä salamat v3:a eikä tulivuoret v7:ää (tehty jälkeen, ks. 3).
Ennen ajoja kannattaa pyytää uusi käännös, jossa ne ovat: tee testi-196:ssa `git merge linssiseppa2/salamat-196` (432fab535,
sisältää salamat v3 9e008fe11 ja tulivuoret v7 7b71353a6; worktree wt/proto-linssiseppa2-testi; LinssiOhjain-ristiriita ratkaistaan kuten
f8addb9c9:ssä: revontulet-rivi = `Revontulet.Komento(osat[3])`, muut rivit HEADista) → unity-tarkistus → "KÄÄNNÄ testi-196 <kärki>".
Kierrokset samalla käännöksellä, SHA = Julkaisijan käännös-SHA, APP oletus $D/tulivuoret/app (revontulet: `APP=$D/tulivuoret/app/Matkakirja3D.app zsh …`):
```
zsh $D/salamat/aja-kierros.zsh 3 <SHA> > $D/salamat/kierrokset/k3/aja-kierros.out 2>&1      (mkdir -p kN ensin)
zsh $D/tulivuoret/aja-kierros.zsh 6 <SHA> …   zsh $D/pimennys/aja-kierros.zsh 1 <SHA> …   zsh $D/perseidit/aja-kierros.zsh 1 <SHA> …
zsh $D/hurrikaani/aja-kierros.zsh 1 <SHA> …   zsh $D/vanat/aja-kierros.zsh 1 <SHA> …       APP=… zsh $D/revontulet/aja-kierros.zsh 11 <SHA> …
```
→ SIMU VAPAA → tuore Sonnet-arvioija per ilmiö ("Lue ohje $D/<ilmiö>/arvioija.md … kansio kierrokset/kN/") → rivi KIERROSLOKI.md:hen.
Jokaisella ilmiöllä: aja-kierros.zsh, sk-pohja.txt, saatimet-k1.txt, arvioija.md, parit.txt, tavoitteet/LAHTEET.md (pimennys 13, perseidit 15,
hurrikaani 21, vanat 24 kuvaa; kaikki PD/CC, Commonsin API). Uusissa ilmiöissä on `kuva`/`zoom`/`hetki`/`_Säädin=x`-testikomennot.

## 3. Tässä vuorossa tehty (proto-3d, haarat ketjuna; kaikki kytkimien takana, oletus pois; unity-tarkistus 0 joka kärjessä)
- salamat-196: k2 3,3/10 (42a9897be) → v3 9e008fe11 (hehkun häntä gaussiseksi, salamat 2× koko ja kirkkaus, keijun pää/lonkerot, levy vain ylhäältä);
  merge tulivuoret v7 → kärki 432fab535.
- tulivuoret-196: k5 2,4/10 (Tonga 4 paras; Sarytšev nyt oikean kokoinen + pilviaukko, mutta hattu harmaa levy; Raikoke lähes näkymätön,
  syy auki – tarkista v3/w3-kuva) → v7 7b71353a6 (valo 1,7 ja pehmeä diffuusi, ruskea kukkakaalireuna, vana kuituinen ja läpikuultava).
- pimennys-196 d4fdc99ee: Kuun varjo NASAn Besselin elementeistä (Ydin Pimennykset.cs + testit 3/3), PimennysVarjo-kuori 20 km +
  Ilmakeha2:n sironta himmenee varjossa (Pimennys.hlsl, globaalit _Pim*). Kytkin Pimennys.Kaytossa, ehto "pimennys".
- perseidit-196 fe1b3b85c: Tahdenlennot.cs + Tahdenlento.shader (radiantti RA 48° Dec +58°, 59 km/s, 120→80 km katseen ympärille). Ehto "tahdenlennot".
  Tavoitteissa meteori on ohut VALKOINEN viiru (ei vihreää) → todennäköinen ensimmäinen korjaus _Vihrea=0 ja kapeampi.
- hurrikaani-196 05d3bb32c: Hurrikaani.cs + .shader (Florence: silmä, stadionseinä, CDO, 3 sadevyötä, kierto _Nopeus 8). Ehto "hurrikaani".
  Pilvikuoren (BlueMarble) omat pilvet näkyvät hurrikaanin aukoista – jos häiritsee, tee pilvikuoreen aukko.
- vanat-196 a6e9d922a: Tiivistysvanat.cs + Tiivistysvana.shader (8 NAT-reittiä, leviäminen, varjot merellä). Ehto "vanat" (kohokohta lentokoneet).
- revontulet-v7-196 ac7f519a2 (revontulet-196 8d7f26d05 päällä): limbi 0,15/|V·n| + ylhäältä nauhoina, punainen Kp8 2×, maata vasten -vaimennus
  vain horisontin lähellä, kupolin hehku voimakkaammin. Musta maa (ei kaupunkivaloja) k9:ssä – syy auki.
  LS:n tiedoksi 98bb309f9 (linssiseppa/revontulet-skanneri-196, Revontulet.AlusPaikka) yhdistyy 8d7f26d05:n kanssa puhtaasti – ei toimia minulta.
- testi-196 f8addb9c9 = vanat-196 + revontulet v7 (vain kierroksiin, EI junaan).
- Louvre k11 paketoitu: $D/louvre1/v6k18-lv2f-k11 (rakenna.py lv2f-k11, VALMIS, 10 kohdetta).

## 4. Junaan, kun PT on kuitannut parin
Ketjun takia kärjet menevät Natiivisepälle järjestyksessä salamat-196 → pimennys → perseidit → hurrikaani → vanat (kukin kytkimen takana,
joten keskeneräinenkin on turvallinen). Kun salamat v3/tulivuoret v7 ovat hyviä, yhdistä salamat-196 alas ketjuun (merge pimennys-196:een jne.).
Revontulet v7 on oma haaransa (revontulet-196:n jatko). Viesti PT:lle vasta, kun kierroksella on paras pari (≤ 3 riviä + polku).

## 5. Jono (PT 22.3x, sitova)
1. Kierrokset yllä kaikille seitsemälle; heikot (≤ 3 kahdesti ilman parannusta) → paras pari PT:lle ja PT päättää jatkosta.
2. Revontulet v7 kierrokset (k11 →). 3. Peking PT284: seuraava paketti PT:n ajoituksella.

## Työtilat (proto-3d worktreet /Users/Shared/Claude/wt/)
proto-linssiseppa2-salamat, -tulivuoret, -pimennys, -perseidit, -hurrikaani, -vanat, -revontulet-v7, -testi (uudet tänään: pimennys, perseidit,
hurrikaani, vanat, revontulet-v7, testi); -aurinko (240357565 → poista kun junassa), -revontulet (junassa 196), -aikavyohykkeet (juna 195 → poista
lukituksen jälkeen), -peking, -savu, -lontoo; wt/linssiseppa2-posti (irrallinen, voi poistaa).
