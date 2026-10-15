# Natiivi-UI: luovutus 14.10.2026 klo 22.4x (nollaus, PT:n pyyntö, konteksti ~55 %)

Natiivi-UI (Opus, high) → seuraava Natiivi-UI-sessio. Edellinen: viesti-natiivi-ui-luovutus-20261014-ilta2.md (säännöt: PT
local_74630a27, viestit send_messagella id:llä osoitekirjasta /Users/Shared/Claude/osoitekirja.md, PT:lle ≤ 3 riviä, ääni aina
mykistetty, nollaus Postivahdin kautta). Ajoskriptit: /Users/Shared/Claude/proto-3d/lokit/natiivi-ui-ajoskriptit-20261012
(irrota.pl <skripti> <ketjuloki>; <aihe>-kaanna.sh + <aihe>-simut.sh + sk-<aihe>.txt; pari-arkki.py). Arkit: proto-3d/lokit/
natiivi-ui-arkit-191 (uusi kansio; -189 ei ole olemassa). Käännökset VAIN Julkaisijan KÄÄNNÖS NYT -viestillä, simut SIMU NYT
(Julkaisija local_22b29f10); LUKKO VAPAA / SIMU VAPAA perään. NS local_bf20055b, PK local_97810d35, LS1 local_45a869de.
Proto-repo: /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei originia).

## Junassa (NS vahvisti)
- Juna 190: museo-auto-190 d71d3062a (museon napit piiloon esityksessä, ‹ ⏸ ›), museo-zoom-190 ac3357f96 (▶ suurennuksesta,
  AUTO ZOOM, nimi pois suurennettuna; sisältää LS1 3d5eba999).
- Juna 191 annettu NS:lle: luettavuus-191 f252d202f (kartan ilmoitus, pelikello, offline-rivi kartan musteella + kerman hehku).

## ISS-ERÄ 191 (omistaja pyysi julkaisua 21.40) — ANNETTU NS:LLE 22.3x
natiivi-ui/cupola-kysymykset-191 51ad20619 (juna-191 7e605b891 päällä; worktree wt/proto-natiivi-ui-cupolakys), PT KUITTASI arkeista.
Sisältö: NUI aad739a3a (Pulu ilman kysymyksiä Cupolassa), 570835034 (näyttö → kohdelista, ylärivi vrk/kausi/LIVE), 502f3fd53 (taulu ja
valikot pohjalle, omistaja 21.42), a954d8b9f (QA kohdevalikko eka), cb30446da (pienoispallo yksi Slerp kelauksessa), cdd56045f (teline:
iso 5 s → puolikoko oikeaan reunaan mini-kehyksen varaan, napautus 10 s), 150492f69 (Palaa maanpinnalle ensimmäisenä, taulu → pallo
telineeseen) + PK: cab8a700e (ikkuna ei avaa listaa; cherry-pick f6516a79b), 562097064 (Cupola ei katoa, katse säilyy, ei sumeaa),
0054480e1 (paikannimet pystyssä, isompi, piste). Käännös 43ed5539. Todisteet: todistus-cupolakys-{nyk,uusi}-{iphone,ipad}-20261014-22*,
todistus-cupolanaytto2-uusi-*; arkit natiivi-ui-arkit-191/iss-191-{iphone,ipad}.png. Varmista NS:ltä, että erä on junan 191 rungossa.
Näytön napautus → lista todistettu iPhonella (todistus-cupolanaytto2-uusi-iphone-20261014-2230 n1/n2); iPadin vaakassa tap 526 719
osui ikkunaan (vaakakoordinaatit ≠ kosketustyökalun pystykoordinaatit) → iPad-kuva puuttuu, ei koodivika.
Sivuhavainto 192:een: ylärivin valitsimet näyttävät LIVEnä molemmat "Nyt" (kumpi on kumpi vain vihjetekstistä).

## SIIRTYMÄT 192 (omistaja 22.45 "Molemmat alle 250 ms", PT kuittasi 22.5x)
natiivi-ui/siirtymat-192 6dcaa0fad (juna-191 9e92a9a6e päällä; worktree wt/proto-natiivi-ui-siirtymat), KÄÄNTÄMÄTTÄ:
c9c3b948e kuvan suurennos (Ponnahdus.SuurennosS) 320 → 240 ms = Tyylikirja.Kesto.Liuku (PT KUITTASI junaan 192); avauskortti oli jo
240 ms (vain kommentit). 6dcaa0fad kutsuminiatyyri esiin 350 → 240 ms, pois 250 → 200 ms (Kesto.Sulku), PT pyysi; ilmoitettu PT:lle.
Jatko: anna kärki NS:lle junaan 192 PT:n kuittauksen jälkeen. Raamatun rivi 1779 (poikkeukset 320/280) = PT:n läpikäynti.

## TILANNE 15.10. 04.3x (sama sessio jatkuu)
- Junan 192 rungossa (NS 5312cd91d): iss-193 6fca25f2b (A1, C, joystick, taulu odottaa mustan) + lasi-iss-192 b052768c8 (lasipohja ISS-taulu ja chat).
  ISS 5–7 e39809f76 ja yläreuna v2 868688099 myös rungossa.
- SKANNERI (hologrammi) LEPOTILASSA: natiivi-ui/iss-193 d9a144076 (IssSkanneri.Kaytossa = false; ui linssi skanneri <kohde>|kiinni|kaytossa 1|0;
  143 kohdetta Resources/IssSkanneri: <tunnus>-korkeus.bytes + <tunnus>.json + faktat.json + hakemisto.json). PT hyväksyi videon
  (arkit-192/skanneri-puhdas/, käännös c31fa2220) → omistajalle aamulla. Omistajan Kyllä: Kaytossa = true + iss-193 + PK pelikoodari/iss-nimet-192
  (paikannimien napautus → IssSkanneri.NimiNapautettu, pallohaku, Sojuz-radio) NS:lle.
- Jonossa matala: LS1 museon teosnimi kankaan päällä Ranskan salissa iPad vaaka (lokit/todistus-ranskasali2-ipad-20261015-0120).
- Ajot: natiivi-ui-ajoskriptit-20261012 (testi192*-kaanna.sh, skan192*/pisto192-simut.sh, sk-*.txt). Ennen käännöspyyntöä AINA
  sh Linssit-testit/unity-tarkistus.sh + python3 tyokalut/kielivahti.py + tyokalut/pohjavahti.py (192i/192j kaatuivat niihin).
- Videot: simulaattori ei nauhoita ääntä → ffmpeg adelay avauskohtaan; iPad-video transpose=2.

## TILANNE 15.10. 02.1x (jatkoa samasta sessiosta)
Kaikki proto-repossa, worktree wt/proto-natiivi-ui-issikkuna (muut siivottu; wt/proto-natiivi-ui-luettavuus pidetään: todistusajo.sh).
Ajoskriptit natiivi-ui-ajoskriptit-20261012 (testi192*-kaanna.sh, *-simut.sh, sk-*.txt), arkit proto-3d/lokit/natiivi-ui-arkit-192.
- NS:llä junassa 192 (PT kuittasi): siirtymat-192 6dcaa0fad, lippu-kartussi-192 3c23eb73c, iss-ikkuna-192 @ b0094af60, ylareuna-ipad-192
  a1333cc3c, versio-build-192 222fea1d7.
- PT:n kuittausta odottaa: ISS 5–7 iss-ikkuna-192 e39809f76 (arkki iss57-192-*), yläreuna v2 ylareuna-ipad-192 868688099 (arkki
  ylareuna2-192-ipad) → kuittauksen jälkeen SHA:t NS:lle (192 jos ennen lukitusta, muuten 193).
- LASI (omistajalla): lasi-iss-192 102d68516 (Lasitausta + Lasipohja, ui lasi 0|1|mittaa); chat hyväksytty, taululle kevyempi sävy
  → testi-192h a8c97b744 kääntyy + lasi3-simut.sh (b0lvf1w64-ketju) → pari PT:lle. Pohja kaikkialle vasta omistajan hyväksynnän jälkeen.
- JUNA 193 natiivi-ui/iss-193: A1 074217053 (lasi/pallo vain pienentää, mininäytön osuma 44 pt), C 4e11f8d1f (kolmas loppuvalinta,
  IssLoppuvalinta.KameraValittu → PK). SEURAAVA: B aseman skanneri (suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/
  keskustelukanava/iss-skanneri-20261015.md): yksi kohde videona ääniraidan kanssa; KS korkeuskartta, Äänittäjä sirinä.

## AVOIMET (järjestys ISS-erän jälkeen)
1. Pelikello vs suurennuslasi: SULJETTU 21.5x. Oikealla aloituslennolla (peli uusi-matka pariisi) kartan napit eivät näy, joten
   päällekkäisyyttä ei ole; havainto syntyi testikomennosta `ui pelikello lennossa 1` tavallisella kartalla. e6ea6183b
   (natiivi-ui/luettavuus-191) EI junaan. Arkit natiivi-ui-arkit-191/pelikello-191-{iphone,ipad}.png. PT:lle kerrottu.
2. Oppaan valikko paneelipohjalle: tehty 502f3fd53:ssa (junassa 191 ISS-erän mukana) (linssin-valikko.uss: lasi, harmaa, tumma, paperi takaisin) → mukana
   ISS-erässä; varmista simukuvasta (oppaan valikko taivaan päällä, sk-himkoe-*.txt h2/h3 käy) ja kerro PT:lle.
3. Himmennyskokeilu natiivi-ui/himmennys-koe-191 d6b73a500: OMISTAJA KORVASI (21.42) → ÄLÄ AJA, poista worktree
   wt/proto-natiivi-ui-himmennyskoe myöhemmin.
4. Minipallon teline: TEHTY junaan 191 (omistaja 21.51 "Kaikki 191 junaan"), cdd56045f ISS-erässä.
4b. JUNA 192 (PT 22.3x): a) ikkunan napautus pienentää yhä ohjaamopaneelin miniksi (IssKyytiNakyma: AstronauttiKerros.PalloNapautettu
   → ohjaamon UlkoNapautus → AsetaMini(true)) → poista kyydissä (omistaja: "Silloin ei pitäisi tapahtua mitään"); b) telineen pallo osuu
   Pulun taulun oikeaan yläkulmaan → siirrä teline tai taulu, etteivät osu (AstronautinNakyma.PalloTelineeseen / PulunTaulu.Sijoita).
5. Cupolan paikannimet: PK TEKI junaan 191 (0054480e1, ISS-erässä).
6. Luettavuuskierroksen raportti: proto-3d/lokit/natiivi-ui-arkit-191/luettavuus-191.md (ISS-ohjaamo, ajattelija, aikaselain jäivät
   kuvaamatta).

## Opit
- Piilotettu (opacity 0) elementti ei ole ui-puussa → tap-kohta ei löydä; käytä koordinaatteja (tap x y) tai tauko ensin.
- todistusajon `oleta-uusi` laskee askeleen alun viimeisestä komennosta (ui/tap), ei edellisestä oletuksesta.
- ISS-ohjaamon LCD ei löydy ui-puusta luokalla (mk-issohjaamo__lcd): napauta koordinaatteja (iPhone 147 768 toimii; iPad vaaka 526 719 EI – muunna
  pystykoordinaateiksi; matriisin keskikohta). Ikkunan napautus pienentää paneelin miniksi → LCD katoaa (tap ensin, ei ikkunaa).
- Käynnissä olevaa proto-kaanna.sh:ta ei saa tappaa Unityn ollessa käynnissä (yhteinen Library): anna Unityn päättyä, sitten oma
  lukko /tmp/matkakirja-kaannospalvelu.lukko pois vain jos kuka = oma haara.
- `ui kierto vaaka` iPadin vaakaan; `peli uusi-matka <kaupunki>` käynnistää oikean aloituslennon Lontoosta.
- Pohjavahti hylkää C#:n `new Color32(...)`-literaalin → Tyylikirja-arvo.
- zsh: `$c:l…` on muokkain → käytä `${c}`; kuva-arkit PIL:llä (scratchpad ruudukko.py, pari-arkki.py).
- Worktreet: wt/proto-natiivi-ui-{museoauto (museo-zoom-190, valmis), luettavuus (luettavuus-191), cupolakys (ISS-erä),
  himmennyskoe (poistettava)}; vanhat edellisestä luovutuksesta yhä poistettavissa.
