# Natiivi-UI: luovutus 11.11.2026 klo 08.35 (kontekstivahti 25–35 %; korvaa -20261110-2355:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KS local_7b57e35a-3a8e-4943-aba1-c960b9eb4671,
KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a. Tulosrivit JU:n jonolokissa /Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt ("AJO NUI …").
TYÖTAPA: näkyvän työn kuvat/videot suoraan KK:lle, PT kopiona; junaan vasta KK:n katsottua. Tallenteesta ei leikata tunnettua vikaa.

## Valmista (älä toista)
- Lähin 2,7× (KS): ea9e6c633 ei vaikuttanut striimikartalla (Karikatyyri false → elävän kartan 0,625); KS korjasi 684895857 → c032134e7
  (lähin 0,231, eletila 0,620 km ✓). KK 01.0x: NÄYTTÄÄ OIKEALTA → KS vie junaan (PT: 224.51). ND:n itäpuolen kellertävä kolmio ei tule
  c032134e7:sta (vain 3 lähin-tiedostoa; ND-puisto 5f00b2ee6/0aad16c3f ei mukana) → KS selvittää. Kuvat _tyo/natiivi-ui/paisunta/lahin-2-7x-4-*.
- Paisunta + kyltit + Eiffelin valo 1,0 junassa 224.48 (c632c2f41); PT merkitsi kyltit valmiiksi.

## TYÖ (PT 08.1x/08.2x, omistaja 08.11 ja 08.19; KK kannattaa) – JONO TÄSSÄ JÄRJESTYKSESSÄ
Koodi: worktree /Users/Shared/Claude/wt/proto-nui-paisuu, haara natiivi-ui/napautus-lento (natiivi-backup), pohja juna-224 a4ef0d609.

A) NÄHTÄVYYDEN NAPAUTUS (tehty, odottaa KK:ta):
   - f2a844889: kuva heti pieni kaikilla laitteilla (Pinnaus.PienennaKuva(true, heti), ei toista lähestymistä); etäisyys mallin todellisesta
     koosta ilman yleistä lähintä (PalloKierto.EsittelySyvyys 10, AjaKiertaen lahinVapaa, drone-lattia seuraa alas → ei hyppyä ylös);
     paisunta lasketaan tältä etäisyydeltä (yleensä ~1); täyttö puhelin 0,88, iPad enintään 85 % ruudusta (NahtavyysRajaus); kallistus 60°
     (ennen 50); kierto alkaa lennon aikana samaan suuntaan ja jatkuu tasaisella vauhdilla (KohdeKiertoOhje.Jatkuva, KierronKulmatJatkuva:
     suunta sinne, missä ±90°:aan enemmän tilaa, ei vastakkaista esikääntöä), hiipuu 4 s lopussa. Testit rajaus 7/7, PalloLiike 22/22
     (uusi JatkuvaKiertoIlmanPysahdysta), unity 0. Testikomennot `ui nahtavyysesittely jatkuva|kuvaheti|lahinvapaa|keskelle 0|1`, `kallistus <°>`.
   - 50565c427: kohde aina ruudun keskelle (VapaaAlue symmetrinen keskikohdan ympäri, Keskelle).
   - Mac-ajot JU:lla: nui-napautus-lento-1-f2a844889 (sk-napautus-lento-1.txt) ja nui-napautus-lento-2-50565c427 (sk-napautus-lento-2.txt):
     tallenteet a-sainte-chapelle, b-eiffel + kuvat. → Katso lento-2 (tarkista lokista "jatkuva kierto", "rajaus … etäisyys", eletila lähin),
     sitten tallenteet KK:lle (kopio PT) suoraan, ei leikata. "Napit symmetrisesti – symmetriaa rikkova elementti korjataan, kohdetta ei
     siirretä": katso tallenteesta, mikä UI-elementti rikkoo symmetrian (palkki + pieni kuva ylhäällä vs. alanapit), ja kysy KK:lta ennen korjausta.
   - Mahdollinen huoli: 60° kallistus + lähellä → usva/horisontti; kiinteät kierrot (KiinteaKierto) voivat yhä kääntää vastakkaiseen suuntaan lennon aikana.
B) VIKA: nostoesityksen aikana sauva päästää kuvan irti kohteesta. Esityksessä kamera lukittu kohteeseen: vain etäisyys ja kulma; vasen
   sauva vain ylös–alas (zoom). Katso PalloKierto: AjonLiikeSiirto (liiketappi siirtää katselupistettä kierron päällä) → esityksen aikana pois.
C) Ohjaussauvat hieman isommiksi ja herkkyys alas; selvitä, voiko liikkumisalaa kasvattaa (LiikeTappi.cs, KameraEleet Tappi*).
D) Turisti-info Lehden sisälle: Turisti-info-nappi pois kartalta; Lehden etusivulle yhden kappaleen juttu + kuva + linkki matkailusivulle
   (kuten aiemmin oli – HAE VANHA TOTEUTUS GITISTÄ ENSIN: git log -S "Turisti" --oneline). Sivun nimi auki (KK ehdottaa omistajalle).
E) KOE: Lehdelle oma nappi nostopalkin vasemmalle puolelle.
PERUTTU (omistaja 08.19): Lehti ja Turisti-info kaupunkivalikkoon – EI tehdä.
Karkeat tallenteet/kuvat KK:lle (kopio PT) ennen junaa. A, B ja C samaa kamerakoodia: tee samaan haaraan.

## Myöhemmin
- Iso iPad 0f0f950a6 -ajo (JU:n vuorolla; JU 10.11. 20.29: korvautuu KS:n 599b0150d:llä) → grep "esteet ohitettu|estevirheitä|nähtävyyslataus|Exception" PT:lle.
- Tarinamerkit: Codexin toimitus odottaa (origin/claude/postilaatikko: vain tilaus posti/natiivi-ui-codex-tarinamerkit-tilaus-20261110.md).

Huom: tyokalut/tarkista.sh päivittää tyylikirjan (Tyylikirja.uss/.cs, tyylikirja.json) → palauta git checkoutilla ennen committia; POHJAVAHTI-
ja LIIKEVAHTI-rivit (Kartta.uss, Matkakirja.uss, Pinnaus.cs 2) ovat pohjassa jo ennestään.

## LISÄYS 08.2x
Työ D: omistaja 08.21 (PT): sivun nimi "Matkaopas" (etusivun noston linkki ja sivun otsikko).
